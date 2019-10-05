import * as types from '../constants/PlayerActionTypes'

export const updateShow = (show) => ({
    type: types.UPDATE_SHOW,
    show
});

export const updatePlay = (play) => ({
    type: types.UPDATE_PLAY,
    play
});

export const updateAudioLists = (currentIndex, audioLists) => ({
    type: types.UPDATE_AUDIOLISTS,
    currentIndex,
    audioLists
});