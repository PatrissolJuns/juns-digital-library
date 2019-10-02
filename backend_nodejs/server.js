const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
// const Data = require('./data');

const app = express();

const audioRoutes = require('./routes/audio');
const playlistRoutes = require('./routes/playlist');
// const folderRoutes = require('./routes/folder');
const path = require('path');

require('dotenv').config();


/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

app.use(cors());
const router = express.Router();

// this is our MongoDB database
// connects our back end code with the database
mongoose.connect(process.env.MONGO_DB_URL, function(err){
    if(err){
        console.log('Error connecting to: '+ process.env.MONGO_DB_URL)
    }
    else{
        console.log('Connected to: '+ process.env.MONGO_DB_URL)
    }
});

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false, limit:'50mb', parameterLimit: 1000000 }));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));

// Setting entry point to get static file
app.use('/file/audios', express.static(path.join(__dirname, '/Storage/audios')));
app.use('/file/images', express.static(path.join(__dirname, '/Storage/images')));

// Setting general model route
router.use('/audio', audioRoutes);
router.use('/playlist', playlistRoutes);
// router.use('/folder', folderRoutes);

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(process.env.PORT || 5000, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));