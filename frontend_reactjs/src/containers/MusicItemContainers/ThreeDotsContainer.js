import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AudioAction from "../../actions/audioAction";
import ThreeDots from "../../components/MusicItem/ThreeDots";

const mapStateToProps = (state) => ({
    audios: state.audios
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(AudioAction, dispatch),
});

const ThreeDotsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ThreeDots);

export default ThreeDotsContainer