import { combineReducers } from 'redux'

import playlists from './playlist'
import audios from "./audio";
import player from "./player";

const rootReducer = combineReducers({
    audios,
    playlists,
    player,
});

export default rootReducer