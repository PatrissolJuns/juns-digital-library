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
            res.status(201).json(playlist);
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
    console.log("id = ",req.params.id);

    let oldPlaylist = null;
    Playlist.findOne({
        _id: req.params.id
    }).then(
        (_playlist) => {
            console.log("_playlist_playlist = ",_playlist);
            let newAudioList = [];
            if(req.body.isAdd)
                newAudioList = [...new Set(_playlist.audioList.slice().concat(req.body.audioList))];
            else newAudioList = _playlist.audioList.filter(audio => !req.body.audioList.includes(audio));

            const playlist = new Playlist({
                _id: req.params.id,
                name: req.body.name,
                audioList: newAudioList
            });
            Playlist.updateOne({_id: req.params.id}, playlist).then(
                () => {
                    res.status(200).json(playlist);
                }
            ).catch(
                (error) => {
                    res.status(400).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(404).json({
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

exports.getFromDBOnePlaylist = (_id) => {
    return Playlist.findOne({
        _id: _id
    }).then( (playlist) => playlist)
    .catch(
        (error) => {
            return null;
        }
    );
}

exports.updateFromDBOnePlaylist = async (_id, newName, _newAudioList, isAdd) => {
    let _playlist = await this.getFromDBOnePlaylist(_id);
    if(_playlist !== null) {
        let newAudioList = [];
        if(isAdd)
            newAudioList = [...new Set(_playlist.audioList.slice().concat(_newAudioList))];
        else newAudioList = _playlist.audioList.filter(audio => !_newAudioList.includes(audio));

        const playlist = new Playlist({
            _id: _id,
            name: newName,
            audioList: newAudioList
        });
        return Playlist.updateOne({_id: _id}, playlist).then(
            () => {
                // res.status(200).json(playlist);
                return true;
            }
        ).catch(
            (error) => {
                return false;
            }
        );
    }

}
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






