import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlayerActions from '../actions/playerAction';
import PlayerManager from "../components/PlayerManager";

const mapStateToProps = (state) => ({
    player: state.player
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PlayerActions, dispatch),
});

const PlayerManagerContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayerManager);

export default PlayerManagerContainer