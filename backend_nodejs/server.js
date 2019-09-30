// const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jsmediatags  = require("jsmediatags");
// const Data = require('./data');
const btoa = require('btoa');
const atob = require('atob');

const API_PORT = 3001;
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors());
const router = express.Router();

// this is our MongoDB database
/*
const dbRoute =
    'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';
*/

/*
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

let globalState = [
    { id: 1, name: "Dashgum - Admin Panel Theme"},
    { id: 2, name: "Extensive collection of plugins"},
    { id: 3, name: "Free updates always, no extra fees."},
    { id: 4, name: "More features coming soon"}
];


router.get('/getPlaylists', (req, res) => {
    return res.json(globalState);
});

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    /*Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });*/
    jsmediatags.read("./longue.mp3", {
        onSuccess: function(tag) {
            console.log(tag);
            console.log(tag.tags.picture);
            // console.log(tag.tags.picture.data);
            // console.log(tag.tags.APIC);
            let image =tag.tags.picture; let base64String = "";
            for (var i = 0; i < image.data.length; i++) {
                base64String += String.fromCharCode(image.data[i]);
            }
            // console.log("base64String = ",base64String);
            // console.log("base64String = ",btoa(base64String));
            // var base64 = "data:" + image.format + ";base64," +  (new Buffer.from(base64String).toString('base64'));
            var base64 = "data:" + image.format + ";base64," +  btoa(base64String);
            // console.log("base64 = ", base64);
            return res.json([{
                name: tag.tags.title,
                singer: tag.tags.artist,
                cover: base64,
                musicSrc: "http://localhost:3001/api/music"
            }]);

        },
        onError: function(error) {
            console.log(':(', error.type, error.info);
        }
    });
});

router.get('/music', (req, res) => {
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    res.download("./longue.mp3");
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

let r = (l = 7) => Math.random().toString(36).substr(2, l);

router.post('/add', (req, res) => {
    const { name } = req.body;
    console.log("name = ", name);
    let newPlalist = {
        id: globalState.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        name: name
    };
    globalState = [...globalState, newPlalist];
    return res.json(newPlalist);
});



// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));