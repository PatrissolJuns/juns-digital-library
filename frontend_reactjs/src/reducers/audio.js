import * as types from "../constants/AudioActionTypes";

const audio = (state = [], action) => {
    switch (action.type) {
        case types.ADD_AUDIO:
            // console.log("statePrev = ",state);
            return [...state, {
                    _id: action._id,
                    artist: action.artist,
                    album: action.album,
                    belongToPlaylist: action.belongToPlaylist,
                    cover: action.cover,
                    duration: action.duration,
                    isBookmark: action.isBookmark,
                    musicSrc: action.musicSrc,
                    size: action.file.size,
                    track: action.track,
                    year: action.year,
                }];
        case types.EDIT_AUDIO:
            // console.log("action.name = ",action.name);
            return state.map((_audio) => {
                        if (_audio._id === action.audio._id) {
                            return Object.assign({}, action.playlist,{track: action.track})
                        }
                        else return _audio;
                    });
        case types.DELETE_AUDIO:
            return state.filter(_audio => action.audio.id !== _audio.id);
        case types.FETCH_AUDIO:
            // console.log("action = ",action);
            return action.audios;
        default:
            return state
    }
}

export default audio;