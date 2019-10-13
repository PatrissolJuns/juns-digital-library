import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AudioAction from '../actions/audioAction';
import BookmarkedPage from "../pages/BookmarkedPage";

const mapStateToProps = (state) => ({
    audios: state.audios
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(AudioAction, dispatch),
});

const BookmarkedPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookmarkedPage);

export default BookmarkedPageContainer