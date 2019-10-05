import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaylistActions from '../actions/playlistAction';
import DisplayPlaylist from './../pages/DisplayPlaylist';
import getOnePlaylist from './../selectors/playlist';

const mapStateToProps = (state, props) => ({
    playlists: getOnePlaylist(state, props)
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PlaylistActions, dispatch),
});

const DisplayPlaylistContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DisplayPlaylist);

export default DisplayPlaylistContainer