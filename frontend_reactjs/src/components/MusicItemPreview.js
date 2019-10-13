import React, { useState, Fragment } from 'react';
import PropTypes from './../utils/propTypes';

import {
    Media,
} from 'reactstrap';
import { TiTime } from 'react-icons/ti';

import PlayButtonContainer from "../containers/MusicItemContainers/PlayButtonContainer";
import {getUrlAction, getDurationFormat} from './../utils/builtInFunction';
import ThreeDotsContainer from "../containers/MusicItemContainers/ThreeDotsContainer";
import BookmarkContainer from "../containers/MusicItemContainers/BookmarkContainer";

const MusicItemPreview = ({ audio, audios, actions, ...restProps }) => {

    // image={"http://localhost:5200/file/images/" + audio.cover}
    let album = audio.album;
    let artist = audio.artist;
    let cover = getUrlAction(audio.cover, 'image');
    let duration = getDurationFormat(audio.duration);
    let isBookmark = audio.isBookmark;
    let musicSrc = getUrlAction(audio.musicSrc, 'audio');
    let size = audio.size;
    let track = audio.track;
    let year = audio.year;

    const [isPlay, setIsPlay] = useState(false);
    const handleClickPlay = () => {
        setIsPlay(!isPlay);
    }

    console.log("restProps = ",restProps);
    return (

        <Media {...restProps} className="mb-2" style={{maxHeight: 100 }}>
            <Media left>
                <Media
                    object
                    src={cover}
                    className="img-fluid rounded mr-2 mb-2"
                    style={{ width: 150, height: 'auto', maxHeight: 100 }}
                />
            </Media>
            <Media body className="overflow-hidden">
                <Media className="mb-1" heading tag="h6" style={{fontWeight: 600}}>
                    {track}
                </Media>
                <p className="text-muted text-truncate mb-1" style={{fontSize: "16px"}}>{artist}</p>
                <p className="text-muted text-truncate mb-1" style={{fontSize: "14px"}}>{album}</p>
                <Media body tag="h6">
                    <Media>
                        <TiTime className="mr-2"/> {duration}
                    </Media>
                </Media>
            </Media>
            <Media right className="align-self-center mr-2">
                <PlayButtonContainer audio={audio} audioLists={audios} />
            </Media>
            <Media right className="align-self-center mr-2">
                <BookmarkContainer audio={audio} />
            </Media>
            <Media right className="align-self-center">
                <ThreeDotsContainer audio={audio} />
            </Media>

        </Media>
    );
};

/*MusicItemPreview.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    right: PropTypes.node,
};*/


export default MusicItemPreview;
