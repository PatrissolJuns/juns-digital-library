import React, { useState } from "react";
import {Button, Media} from "reactstrap";
import { IoIosPlayCircle, IoIosPause } from 'react-icons/io';

const PlayButton = ({audio, ...props}) => {
    const [isPlay, setIsPlay] = useState(false);

    const handleClickPlay = (event) => {
        event.preventDefault();
        props.actions.updateGenAudioLists(props.audioList.indexOf(audio), props.audioList);

        setIsPlay(!isPlay);
    };
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