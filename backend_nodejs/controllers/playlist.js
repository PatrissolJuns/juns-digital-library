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
            // const set1 = new Set([1, 2, 3, 4, 5]);

            // console.log("set1 = ",set1.has(1));
            // expected output: true


            /*oldPlaylist = _playlist;
            console.log("_playlist = ",oldPlaylist);
            let fusion = oldPlaylist.audioList.slice().concat(req.body.audioList);
            console.log("fusion = ",fusion);*/
            // first merge the two items of audioList in order to not loose old data
            let newAudioList = [];
            if(req.body.isAdd)
                newAudioList = [...new Set(_playlist.audioList.slice().concat(req.body.audioList))];
            else newAudioList = _playlist.audioList.filter(audio => !req.body.audioList.includes(audio));
            // let arr = [oldPlaylist.audioList, req.body.audioList];
            // let newTab = [...new Set([].concat(...arr))];

            console.log("newAudioList = ", newAudioList);

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











