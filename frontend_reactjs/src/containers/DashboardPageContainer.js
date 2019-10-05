import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as AudioAction from '../actions/audioAction';
import DashboardPage from './../pages/DashboardPage';

const mapStateToProps = (state) => ({
    audios: state.audios
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(AudioAction, dispatch),
});

const DashboardPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DashboardPage);

export default DashboardPageContainer