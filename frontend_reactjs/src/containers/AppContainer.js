import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlaylistActions from '../actions/playlistAction';
import App from '../App';

const mapStateToProps = (state) => ({
    playlists: state.playlists
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PlaylistActions, dispatch),
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default AppContainer