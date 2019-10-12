const Playlist = require('../models/Playlist');
const Audio = require('../models/Audio');
const AudioController = require('../controllers/audio');

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

exports.getFromDBOnePlaylist = (_id) => {
    return Playlist.findOne({
        _id: "" + _id
    }).then( (playlist) => {
        return playlist;
    })
        .catch(
            (error) => {
                return null;
            }
        );
}

exports.getFromDBPlaylists = () => {
    return Playlist.find()
        .then( (playlists) => {return playlists;})
        .catch( (error) => {return null;});
}

exports.createPlaylist = (req, res, next) => {
    const playlist = new Playlist({
        name: req.body.name,
        audioList: []
    });
    playlist.save().then(
        (playlist) => {
            console.log("playlist = ",playlist);
            res.status(201).json(playlist);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
}

exports.updatePlaylist = async (req, res, next) => {
    let response = await this.updateFromDBOnePlaylist(req.params.id, req.body.name,
        req.body.audioList, req.body.isAdd);
    let playlist = await this.getFromDBOnePlaylist(req.params.id);
    console.log("playlist = ",playlist);
    // let response = true;
    console.log("response = ",response);
    if(response) res.status(200).json(playlist);
    else {
        res.status(400).json({
            error: 'An error occur while trying to update the playlist'
        });
    }
}

exports.de = (req, res, next) => {
    // req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    console.log("req.file = ",req.file);
    res.status(200).json({
        message:  req.file,
        url:  url
    });
};

exports.updateFromDBOnePlaylist = async (_id, _newName, _newAudioList, _isAdd) => {
    let _playlist = await this.getFromDBOnePlaylist(_id);
    if(_playlist !== null) {
        let newAudioList = [];

        if(_isAdd)
            newAudioList = [...new Set([..._playlist.audioList, ..._newAudioList])];
        else newAudioList = _playlist.audioList.filter(audio => !_newAudioList.includes(audio));

        const playlist = new Playlist({
            _id: _id,
            name: _newName,
            audioList: newAudioList
        });
        return Playlist.updateOne({_id: _id}, playlist).then(
            () => {
                return true;
            }
        ).catch(
            (error) => {
                return false;
            }
        );
    }
}

exports.deletePlaylist = async (req, res, next) => {
    let playlist = await this.getFromDBOnePlaylist(req.params.id);

    console.log("audioListaudioList = ",playlist.audioList);
    Playlist.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Playlist deleted successfully!'
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


/*let PlaylistJuns = {};
const t = async () => {
    PlaylistJuns = await this.getFromDBOnePlaylist("5d951e1bf5d45107c3be9e8d");
    console.log('PlaylistJuns = ',PlaylistJuns);

    let response = null;
    const r = async () =>{
        console.log('debut ');
        response = await this.updateFromDBOnePlaylist(
            PlaylistJuns._id, PlaylistJuns.name, ["5d959e072351295af4757fb7"], false
        );
        console.log('response = ',response);
    }
    r();
}
t();*/


/*let response = this.updateFromDBOnePlaylist(
    PlaylistJuns._id, PlaylistJuns.name, [audioId], false
);
console.log("response = ",response);*/

console.log("************************************* start action *************************************  ");

const a = async () => {
    let res = await this.updateFromDBOnePlaylist("5d9ca5a25837a208e50c63f6",
        "dqsdqs", ["5da238792f0e9f1ae7eb4f6e"], false);

    console.log("a = ",res);
    /*res.then(
        (data) => console.log("data = ",data)
    ).catch(
        (error) => console.log("error = ",error)
    );*/
}

// a();

console.log("************************************* end action *************************************  ");





