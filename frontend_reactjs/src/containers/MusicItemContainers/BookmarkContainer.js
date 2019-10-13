import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AudioAction from "../../actions/audioAction";
import Bookmark from "../../components/MusicItem/Bookmark";

const mapStateToProps = (state) => ({
    audios: state.audios
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(AudioAction, dispatch),
});

const BookmarkContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Bookmark);

export default BookmarkContainer