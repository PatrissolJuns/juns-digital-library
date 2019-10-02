const Playlist = require('../models/Playlist');

exports.getAllPlaylist = (req, res, next) => {
    Playlist.find().then(
        (playlists) => {
            res.status(200).json(playlists);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.getOnePlaylist = (req, res, next) => {
    Playlist.findOne({
        _id: req.params.id
    }).then(
        (playlist) => {
            res.status(200).json(playlist);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
}

exports.createPlaylist = (req, res, next) => {
    const playlist = new Playlist({
        name: req.body.name,
        audioList: []
    });
    playlist.save().then(
        (playlist) => {
            console.log("playlist = ",playlist);
            res.status(201).json({
                message: req.body.name
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

exports.updatePlaylist = (req, res, next) => {
    const playlist = new Playlist({
        _id: req.params.id,
        name: req.body.name,
        audioList: req.body.audioList
    });
    Playlist.updateOne({_id: req.params.id}, playlist).then(
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

exports.deletePlaylist = (req, res, next) => {
    Playlist.deleteOne({_id: req.params.id}).then(
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


exports.de = (req, res, next) => {
    // req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    console.log("req.file = ",req.file);
    res.status(200).json({
        message:  req.file,
        url:  url
    });
};











