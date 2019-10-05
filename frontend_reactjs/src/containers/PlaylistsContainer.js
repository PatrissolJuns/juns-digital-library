import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaylistActions from '../actions/playlistAction';
import PlaylistPage from './../pages/PlaylistPage';

const mapStateToProps = (state) => ({
    playlists: state.playlists
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PlaylistActions, dispatch),
});

const PlaylistsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlaylistPage);

export default PlaylistsContainer