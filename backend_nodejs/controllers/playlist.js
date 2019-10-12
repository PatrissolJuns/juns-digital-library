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

exports.updatePlaylist = async (req, res, next) => {
    let response = await this.updateFromDBOnePlaylist(req.params.id, req.body.name,
        req.body.audioList, req.body.isAdd);
    let playlist = await this.getFromDBOnePlaylist(req.params.id);
    console.log("playlist = ",playlist);
    // let response = true;
    console.log("response = ",response);
    if(response) {
        res.status(200).json({
            error: 'An error occur'
        });
    }
    else {
        res.status(400).json({
            error: 'An error occur'
        });
    }
}


exports.updatePlaylist2 = (req, res, next) => {
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

/*exports.deletePlaylist = (req, res, next) => {
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
};*/


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
    console.log("_id == ",_id);
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

exports.updateFromDBAudioList = async (_id, _newAudioList, _isAdd) => {
    let playlist = await this.getFromDBOnePlaylist(_id);
    let newAudioList = [];

    if(_isAdd) {
        /*console.log("_newAudioList = ",_newAudioList);
        console.log("_newAudioList = " +_newAudioList[0]+ " typeof ", typeof _newAudioList[0]);
        console.log("playlist.audioList = ",playlist.audioList);
        console.log("++++++++++++++++++ = ");*/
        newAudioList = [...new Set([...playlist.audioList, ..._newAudioList])];
        /*console.log("_newAudioList = ",_newAudioList);
        console.log("newAudioList = ",newAudioList);*/
    }

    else {
        newAudioList = playlist.audioList.filter(audioId => {
            // console.log("audioId = "+ audioId+" value = " + !_newAudioList.includes(audioId));
            return !_newAudioList.includes(audioId);
        });
    }
    const newPlaylist = JSON.parse(JSON.stringify(playlist));
    newPlaylist.audioList = newAudioList;

    // update the audio
    return Playlist.updateOne({_id: _id}, newPlaylist).then(() => {return true;}).catch(() => {return false;});
}

exports.updateFromDBOnePlaylist = async (_id, _newName, _newAudioList, _isAdd) => {
    let _playlist = await this.getFromDBOnePlaylist(_id);
    if(_playlist !== null) {
        let response = [];
        let newAudioList = [];


        // update the playlist first
        _newAudioList.map(async item => {
            let audioItem = AudioController.getFromDBOneAudio(item);

            if(audioItem !== null) response.push(await AudioController.updateFromDBBelongToPlaylist(item,[_playlist._id], _isAdd))
        });
        if(response.some(i => i === false)) return false;

        if(_isAdd)
            newAudioList = [...new Set([...playlist.audioList, ..._newAudioList])];
        else newAudioList = _playlist.audioList.filter(audio => !_newAudioList.includes(audio));

        const playlist = new Playlist({
            _id: _id,
            name: _newName,
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

exports.deletePlaylist = async (req, res, next) => {
    // let audio = {};
    // getFromDBOneAudio(req.params.id).then((_audio => audio = _audio));

    let playlist = await this.getFromDBOnePlaylist(req.params.id);
    let playlistId = playlist._id;
    let audioList = playlist.audioList;

    console.log("audioListaudioList = ",audioList);
    Playlist.deleteOne({_id: req.params.id}).then(
        () => {
            audioList.map(async item => {
                let audio = await AudioController.getFromDBOneAudio(item);
                let response = await AudioController.updateFromDBOneAudio(
                    audio._id, audio.name, [playlistId], false
                );
                if(!response) {
                    res.status(500).json({
                        error: "something went wrong"
                    });
                }
            });
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
    /*res.status(200).json({
        message: 'Deleted!'
    });*/
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
    let res = await this.updateFromDBOnePlaylist("5d9cab9ec294a40d091e7e88",
        "Test 2", ["5d97eb5703ca1a32aab08786"], false);

    console.log("a = ",res);
    /*res.then(
        (data) => console.log("data = ",data)
    ).catch(
        (error) => console.log("error = ",error)
    );*/
}

// a();

console.log("************************************* end action *************************************  ");





