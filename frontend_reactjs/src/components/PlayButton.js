import React, { useState } from "react";
import {Button, Media} from "reactstrap";
import { IoIosPlayCircle, IoIosPause } from 'react-icons/io';
import MusicPlayer from "./MusicPlayer";
import PropTypes from "../utils/propTypes";
import {getUrlAction, getDurationFormat} from './../utils/builtInFunction';


const PlayButton = ({audio, ...props}) => {
    const [isPlay, setIsPlay] = useState(false);

    const handleClickPlay = (event) => {
        event.preventDefault();

        // Check whether the PlayerManager is shown
        if(!props.player.show) {
            props.actions.updateShow(!props.player.show);
        }
        // props.actions.updateShow(!props.player.show);
        props.actions.updateAudioLists(props.audioLists.indexOf(audio), props.audioLists);


        setIsPlay(!isPlay);
    };
    console.log("_audioListsprops = ",props);
    /*const audioLists = props.audioLists.map(audio => {
        return {
            name: audio.track,
            singer: audio.artist,
            cover: getUrlAction(audio.cover, 'image'),
            musicSrc: getUrlAction(audio.musicSrc, 'audio'),
        }
    })*/

    return (
        <Media>
            <a href="#" onClick={(event) => handleClickPlay(event)}
                    // style={{ color: "#6a82fb", height:"35px", flexDirection: "column" }}
                    className="rounded-circle center-hor-ver">
                <IoIosPlayCircle size={42} />
                {/*{!isPlay ? <IoIosPlayCircle size={42} /> : <IoIosPause size={42} />}*/}
            </a>
        </Media>
    )
}

/*PlayButton.propTypes = {
    audioLists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            singer: PropTypes.string,
            cover: PropTypes.string,
            musicSrc: PropTypes.string,
        })
    )
}*/


export default PlayButton;