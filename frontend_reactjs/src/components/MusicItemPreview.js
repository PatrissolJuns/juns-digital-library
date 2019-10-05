import React, { useState } from 'react';
import PropTypes from './../utils/propTypes';

import {Button, Media, Popover, PopoverBody} from 'reactstrap';
import { IoIosPlayCircle, IoMdHeart, IoIosMore, IoIosTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { TiTime } from 'react-icons/ti';

import { NavLink } from 'react-router-dom';
import BookmarkButton from "./Widget/BookmarkButton";
import PlayButton from "./PlayButton";

import MusicPlayer from './MusicPlayer';
import PlayButtonContainer from "../containers/PlayButtonContainer";

const getUrlAction = (oldImage, type) => {
    if(type === "audio") return "http://localhost:3001/file/audios/" + oldImage;
    else if (type === "image") return "http://localhost:3001/file/images/" + oldImage;
    else return "";
}

const getDurationFormat = (duration) => {
    return parseInt(duration / 60, 10) + ":" + parseInt(duration % 60);
}

const MusicItemPreview = ({ audio, audios, ...restProps }) => {

    // image={"http://localhost:3001/file/images/" + audio.cover}
    let album = audio.album;
    let artist = audio.artist;
    let belongToPlaylist = audio.artist;
    let cover = getUrlAction(audio.cover, 'image');
    let duration = getDurationFormat(audio.duration);
    let isBookmark = audio.isBookmark;
    let musicSrc = getUrlAction(audio.musicSrc, 'audio');
    let size = audio.size;
    let track = audio.track;
    let year = audio.year;

    const [isOpenMusicItemPopover, setIsOpenMusicItemPopover] = useState(false);
    const [isPlay, setIsPlay] = useState(false);

    function toogleMusicItemPopover(status) {
        setIsOpenMusicItemPopover(!isOpenMusicItemPopover);
    }

    const handleClickPlay = () => {
        setIsPlay(!isPlay);
    }



    const right = "right";
    console.log("restProps = ",restProps);
    return (

        <Media {...restProps}>
            <Media left>
                <Media
                    object
                    src={cover}
                    className="img-fluid rounded mr-2 mb-2"
                    style={{ width: 200, height: 'auto', maxHeight: 150 }}
                />
            </Media>
            <Media body className="overflow-hidden">
                <Media heading tag="h5" style={{fontWeight: 600}}>
                    {track}
                </Media>
                {/*<p className="text-muted text-truncate">{artist}</p>*/}
                <p className="text-muted text-truncate">{album}</p>
                <Media body tag="h5">
                    <Media>
                        <TiTime className="mr-2"/> {duration}
                    </Media>

                    {/*<Button outline color="secondary" size="sm">
                        Add to a playlist
                    </Button>*/}
                </Media>
            </Media>
            <Media right className="align-self-center mr-2">
                <PlayButtonContainer audio={audio} audioLists={audios} />
            </Media>
            <Media right className="align-self-center mr-2">
                <BookmarkButton />
            </Media>
            <Media right className="align-self-center">
                <Button outline id="musicItemPopover" color="primary" style={{ width:"40px", height:"35px", flexDirection: "column" }} >
                    <IoIosMore />
                </Button>
                <Popover
                    placement="left"
                    isOpen={isOpenMusicItemPopover}
                    toggle={toogleMusicItemPopover}
                    target="musicItemPopover"
                >
                    <PopoverBody>
                        <Media style={{padding: "0 0.5rem"}}>
                            <NavLink className="p-2" exact to="/dit">
                                <MdEdit className="mr-2" /> Rename
                            </NavLink>
                        </Media>
                        <Media style={{padding: "0 0.5rem"}}>
                            <NavLink className="p-2" exact to="/dit">
                                <FaEdit className="mr-2"/> Edit
                            </NavLink>
                        </Media>
                        <Media style={{padding: "0 0.5rem"}}>
                            <NavLink className="p-2" exact to="/dit">
                               <IoIosTrash className="mr-2" /> Delete
                            </NavLink>
                        </Media>
                    </PopoverBody>
                </Popover>
            </Media>


            {/*<Media right className="align-self-center">
                {right && typeof right === 'string' ? (
                    <Typography type="h4">{right}</Typography>
                ) : (
                    right
                )}
            </Media>*/}

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
