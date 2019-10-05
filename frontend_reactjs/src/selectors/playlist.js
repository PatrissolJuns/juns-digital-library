import { createSelector } from 'reselect'

const getPlaylist = (state, props) => state.playlists.filter(playlist => {
    console.log("playlist._id = " + playlist._id + "  props.id = ",props.match.params.id);
    return playlist._id === props.match.params.id
});

const getOnePlaylist = createSelector(
    getPlaylist,
    playlist => playlist
);

export default getOnePlaylist;