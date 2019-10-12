import React, { useState } from 'react';
import PropTypes from './../utils/propTypes';

import {
    Button, Card,
    InputGroup,
    InputGroupAddon,
    Media,
    Modal,
    ModalBody,
    ModalHeader,
    Popover,
    PopoverBody
} from 'reactstrap';
import { IoIosPlayCircle, IoMdHeart, IoIosMore, IoIosTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { TiTime } from 'react-icons/ti';

import { NavLink } from 'react-router-dom';
import BookmarkButton from "./Widget/BookmarkButton";
import PlayButton from "./PlayButton";

import MusicPlayer from './MusicPlayer';
import PlayButtonContainer from "../containers/PlayButtonContainer";
import {getUrlAction, getDurationFormat} from './../utils/builtInFunction';

const MusicItemPreview = ({ audio, audios, actions, ...restProps }) => {

    // image={"http://localhost:5200/file/images/" + audio.cover}
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

    const [isModalOpenRename, setIsModalRename] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const toggle = (action) => {
        switch(action) {
            case "RENAME":
                setIsModalRename(!isModalOpenRename);
                break;
            case "DELETE":
                setIsModalOpenDelete(!isModalOpenDelete);
                break;
        }
    };

    const handleSubmit = (event, action) => {
        event.preventDefault();
        switch(action) {
            case "RENAME":
                let value = event.target.rename_music.value;
                if(value !== "") {
                    actions.renameAudioDB(audio._id, value);
                    setIsModalRename(!isModalOpenRename);
                }
                break;
            case "DELETE":
                actions.deleteAudioDB(audio._id);
                setIsModalOpenDelete(!isModalOpenDelete);
                break;
        }
    };



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
                <Button outline id={"musicItemPopover" + audio._id} color="primary" style={{ width:"40px", height:"35px", flexDirection: "column" }} >
                    <IoIosMore />
                </Button>
                <Popover
                    placement="left"
                    isOpen={isOpenMusicItemPopover}
                    toggle={toogleMusicItemPopover}
                    target={"musicItemPopover" + audio._id}
                >
                    <PopoverBody>
                        <Media style={{padding: "0 0.5rem"}} onClick={() => toggle("RENAME")}>
                            {/*<NavLink className="p-2" exact to="/dit">*/}
                                <MdEdit className="mr-2" />Rename
                            {/*</NavLink>*/}
                        </Media>
                        <Media style={{padding: "0 0.5rem"}} onClick={() => toggle("DELETE")}>
                            {/*<NavLink className="p-2" exact to="/dit">*/}
                               <IoIosTrash className="mr-2" />Delete
                            {/*</NavLink>*/}
                        </Media>
                    </PopoverBody>
                </Popover>
            </Media>
            <Modal
                isOpen={isModalOpenRename}
                toggle={() => toggle("RENAME")}
                className={restProps.className + " modal-dialog-centered"}>
                <ModalHeader toggle={() => toggle("RENAME")}>Rename a music</ModalHeader>
                <ModalBody>
                    <form
                        onSubmit={(event) => handleSubmit(event, "RENAME")}
                    >
                        <InputGroup>
                            <input
                                type="text"
                                className="form-control"
                                name="rename_music"
                                // onChange={this.handleChange}
                            />
                            <InputGroupAddon addonType="prepend"><Button type="submit" color="primary">Rename</Button></InputGroupAddon>
                        </InputGroup>
                    </form>
                </ModalBody>
            </Modal>
            <Modal
                isOpen={isModalOpenDelete}
                toggle={() => toggle("DELETE")}
                className={restProps.className + " modal-dialog-centered"}>
                <ModalHeader toggle={() => toggle("DELETE")}>DELETE a music</ModalHeader>
                <ModalBody>
                    <form
                        onSubmit={(event) => handleSubmit(event, "DELETE")}
                    >
                        <Media>Are you sure that you want to delete this playlist ?</Media>
                        <Button type="button" color="cancel">Cancel</Button>
                        <Button type="submit" color="danger">Delete</Button>
                    </form>
                </ModalBody>
            </Modal>

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
