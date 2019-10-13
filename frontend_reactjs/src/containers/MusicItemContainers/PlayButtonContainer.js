import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as PlayerActions from '../../actions/playerAction';
import PlayButton from "../../components/MusicItem/PlayButton";

const mapStateToProps = (state) => ({
    player: state.player
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(PlayerActions, dispatch),
});

const PlayButtonContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PlayButton);

export default PlayButtonContainer