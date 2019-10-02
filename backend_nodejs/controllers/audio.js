// in controllers/audio.js
const jsmediatags  = require("jsmediatags");
const Audio = require('../models/Audio');
const btoa = require('btoa');
const fs = require('fs');
const { getAudioDurationInSeconds } = require('get-audio-duration');


/**
 * This function get the various property of an audio
 * @param audio
 * @returns {Promise<Object>}
 */
getAudioInformation = (audio) => {
    let data = {}; let tag = null; let cover = 'default.png'; let duration = null;
    return new Promise((resolve, reject) => {
        jsmediatags.read(audio, {
            onSuccess: function(_tag) {
                // console.log(tag);
                tag = _tag;
                if(_tag.tags.hasOwnProperty('title')) {
                    if(_tag.tags.hasOwnProperty('picture') && _tag.tags.picture.hasOwnProperty('data')) {
                        let image = _tag.tags.picture; let base64String = "";
                        for (let i = 0; i < image.data.length; i++) {
                            base64String += String.fromCharCode(image.data[i]);
                        }
                        /* old system
                        let base64String = "";
                        var base64 = "data:" + image.format + ";base64," +  btoa(base64String); */

                        cover = Date.now() + ".png";

                        // transform the base64 into an image file and save it
                        fs.writeFile("Storage/images/" + cover, btoa(base64String), {encoding: 'base64'}, function(err) {
                            // check if there is an error
                            if(err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });
                    }
                }

                getAudioDurationInSeconds(audio).then((_duration) => {
                    // console.log("duration = ", duration)
                    // console.log("duration = ", parseInt(duration / 60, 10) + ":" + parseInt(duration % 60))
                    duration = _duration;
                });

                data = {
                    artist: tag.tags.artist === undefined ? "unknown" : tag.tags.artist,
                    album: tag.tags.album === undefined ? "unknown" : tag.tags.album,
                    cover: cover,
                    duration: duration,
                    track: tag.tags.track === undefined ? "unknown" : tag.tags.track,
                    year: tag.tags.year === undefined ? "unknown" : tag.tags.year,
                };
                resolve(data);
            },
            onError: function(error) {
                console.log(':(', error.type, error.info);
                reject();
            }
        });
    });
};

exports.createAudio = (req, res, next) => {
    getAudioInformation(req.file.path).then(
        (_data) => {
            // console.log("data = ",_data);
            const audio = new Audio({
                artist: _data.artist,
                album: _data.album,
                belongToPlaylist: [],
                cover: _data.cover,
                duration: _data.duration,
                isBookmark: false,
                musicSrc: req.file.filename,
                size: req.file.size,
                track: _data.track,
                year: _data.year,
            });
            audio.save().then(
                (audio) => {
                    res.status(201).json({
                        message: req.file
                    });
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    );
};

exports.getAllAudio = (req, res, next) => {
    Audio.find().then(
        (audios) => {
            console.log(audios);
            res.status(200).json(audios);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneAudio = (req, res, next) => {
    Audio.findOne({
        _id: req.params.id
    }).then(
        (audio) => {
            res.status(200).json(audio);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.updateAudio = (req, res, next) => {
    const audio = new Audio({
        _id: req.params.id,
        name: req.body.name,
        audioList: req.body.audioList
    });
    Audio.updateOne({_id: req.params.id}, audio).then(
        () => {
            res.status(201).json({
                message: 'audio updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteAudio = (req, res, next) => {
    Audio.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

/*
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
    /!*Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });*!/
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
});*/


/*

exports.createThing = (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifyThing = (req, res, next) => {
    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getAllStuff = (req, res, next) => {
    Thing.find().then(
        (things) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};*/
