import { createSelector } from 'reselect'

const getPlaylist = (state, props) => state.playlists.filter(playlist => {
    return playlist._id === props.match.params.id
})[0];

const getAudio = (state) => state.audios;

const getAudioById = (audios, _id) => audios.filter(audio => audio._id === _id)[0];

const getOnePlaylist = createSelector(
    [getPlaylist, getAudio],
    (playlists, audios) => {
        /*console.log("playlists selector = ",playlists);
        console.log("audios selector= ",audios);*/
        // return playlists;
        if(playlists === undefined) {
            // console.log("playlist is undefined");
            return playlists;
        }
        // else return playlists;
        else return {
            ...playlists,
            audioList: playlists.audioList.map(item => getAudioById(audios, item))
        }
    }
);

export default getOnePlaylist;

/*
db.playlists.updateOne(
    {"_id": ObjectId("5d951e1bf5d45107c3be9e8d")},
    {$set: {"audioList": ["5d97e86203ca1a32aab08783", "5d95930a2351295af4757fb3", "5d9593192351295af4757fb5"]}}
)*/
