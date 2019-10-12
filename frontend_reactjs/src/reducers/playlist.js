import * as types from "../constants/PlaylistActionTypes";

const playlist = (state = [], action) => {
    switch (action.type) {
        case types.ADD_PLAYLIST:
            return [...state, {
                    _id: action._id,
                    name: action.name,
                    audioList: action.audioList
                }];
        case types.UPDATE_PLAYLIST:
            // console.log("action.name = ",action.playlist.name);
            return state.map((_playlist) => {
                        if (_playlist._id === action.playlist._id) {
                            return Object.assign({}, _playlist,{name: action.playlist.name, audioList: action.playlist.audioList})
                        }
                        else return _playlist;
                    });
        case types.DELETE_PLAYLIST:
            return state.filter(_playlist => _playlist._id !== action._id);
        case types.FETCH_PLAYLIST:
            return action.playlists;
        default:
            return state
    }
}

export default playlist;