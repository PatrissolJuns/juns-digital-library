import React, { useState } from "react";
import {Button, Media} from "reactstrap";
import { IoMdHeart } from 'react-icons/io';

const Bookmark = ({audio, ...props}) => {
    const [isBookmark, setIsBookmark] = useState(audio.isBookmark);

    const handleClickBookmark = (event) => {
        event.preventDefault();
        props.actions.toggleBookmarkAudioDB(audio._id);

        setIsBookmark(!isBookmark);
    };
    return (
        <Media>
            <Button outline color="primary" onClick={(event) => handleClickBookmark(event)}
                    style={{ width:"35px", height:"35px", flexDirection: "column", paddingTop: "7px" }}
                    className={"rounded-circle center-hor-ver mr-2 ml-2 " + (isBookmark ? "bookmarked" : "")}>
                <IoMdHeart size={20} />
            </Button>
        </Media>
    )
}

/*Bookmark.propTypes = {
    audioLists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            singer: PropTypes.string,
            cover: PropTypes.string,
            musicSrc: PropTypes.string,
        })
    )
}*/


export default Bookmark;