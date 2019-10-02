import * as types from "../constants/PlaylistActionTypes";

const playlist = (state = [], action) => {
    switch (action.type) {
        case types.ADD_PLAYLIST:
            console.log("statePrev = ",state);
            return [...state, {
                    id: action.id,
                    name: action.name
                }];
        case types.EDIT_PLAYLIST:
            console.log("action.name = ",action.name);
            return state.map((_playlist) => {
                        if (_playlist.id === action.playlist.id) {
                            return Object.assign({}, action.playlist,{name: action.name})
                        }
                        else return _playlist;
                    });
        case types.DELETE_PLAYLIST:
            return state.filter(_playlist => action.playlist.id !== _playlist.id);
        case types.FETCH_PLAYLIST:
            console.log("action = ",action);
            return action.playlists;
        default:
            return state
    }
}

export default playlist;