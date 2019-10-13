import * as types from '../constants/PlayerActionTypes'

export const updateShow = (show) => ({
    type: types.UPDATE_SHOW,
    show
});

export const updatePlay = (play) => ({
    type: types.UPDATE_PLAY,
    play
});

export const updateAudioLists = (currentIndex, audioLists, show = false) => ({
    type: types.UPDATE_AUDIOLISTS,
    show,
    currentIndex,
    audioLists
});

export const updateGenAudioLists = (currentIndex, audioLists) => {
    return (dispatch) => {
        // first update the currentIndex by dispatching the updateAudioLists function
        dispatch(updateAudioLists(currentIndex, audioLists));

        // show the player updated
        setTimeout( function() {
            dispatch(updateShow(true));
        }, 10);
    };
};