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
        case types.RENAME_AUDIO:
            // console.log("action.name = ",action.name);
            return state.map((_audio) => {
                        if (_audio._id === action._id) {
                            return Object.assign({}, _audio,{track: action.track})
                        }
                        else return _audio;
                    });
        case types.DELETE_AUDIO:
            return state.filter(_audio => action._id !== _audio._id);
        case types.FETCH_AUDIO:
            return action.audios;
        case types.TOGGLE_BOOKMARK_AUDIO:
            return state.map((_audio) => {
                if (_audio._id === action._id) {
                    return Object.assign({}, _audio,{isBookmark: !_audio.isBookmark})
                }
                else return _audio;
            });
        default:
            return state
    }
}

export default audio;