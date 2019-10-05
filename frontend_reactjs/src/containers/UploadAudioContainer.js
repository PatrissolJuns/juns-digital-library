import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AudioActions from '../actions/audioAction';
import AddTrackPage from "../pages/AddTrackPage";

const mapStateToProps = (state) => ({
    player: state.player
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(AudioActions, dispatch),
});

const UploadAudioContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddTrackPage);

export default UploadAudioContainer