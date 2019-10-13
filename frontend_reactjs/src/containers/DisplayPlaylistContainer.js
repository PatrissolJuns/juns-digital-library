import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaylistActions from '../actions/playlistAction';
import DisplayPlaylist from './../pages/DisplayPlaylist';
import getOnePlaylist from './../selectors/playlist';
import { updateGenAudioLists } from "../actions/playerAction";

const mapStateToProps = (state, props) => ({
    audios: state.audios,
    playlists: getOnePlaylist(state, props)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...PlaylistActions, updateGenAudioLists}, dispatch),
});

const DisplayPlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisplayPlaylist);

export default DisplayPlaylistContainer