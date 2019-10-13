import * as types from "../constants/PlayerActionTypes";

const initialState = {
        show: false,
        play: false,
        currentIndex: 0,
        audioLists: []
    };

const player = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_SHOW:
            return Object.assign({}, state,{show: action.show});
        case types.UPDATE_PLAY:
            return Object.assign({}, state,{play: action.play});
        case types.UPDATE_AUDIOLISTS:
            return Object.assign({}, state,{show: action.show, currentIndex: action.currentIndex, audioLists: action.audioLists});
        default:
            return state
    }
}

export default player;