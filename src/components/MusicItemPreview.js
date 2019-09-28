import React, { useState } from 'react';
import PropTypes from './../utils/propTypes';

import {Button, Media, Popover, PopoverBody} from 'reactstrap';
import { IoIosPlayCircle, IoMdHeart, IoIosMore, IoIosTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { TiTime } from 'react-icons/ti';

import Typography from './../components/Typography';

import { NavLink } from 'react-router-dom';


const MusicItemPreview = ({ image, title, description, right, ...restProps }) => {

    const [isOpenMusicItemPopover, setIsOpenMusicItemPopover] = useState(false);

    function toogleMusicItemPopover(status) {
        setIsOpenMusicItemPopover(!isOpenMusicItemPopover);
    }

    return (
        <Media {...restProps}>
            <Media left>
                <Media
                    object
                    src={image}
                    className="img-fluid rounded mr-2 mb-2"
                    style={{ width: 200, height: 'auto' }}
                />
            </Media>
            <Media body className="overflow-hidden">
                <Media heading tag="h5" style={{fontWeight: 600}}>
                    {title}
                </Media>
                <p className="text-muted text-truncate">{description}</p>
                <Media body tag="h5">
                    <Media>
                        <TiTime className="mr-2"/> 3:15
                    </Media>

                    {/*<Button outline color="secondary">
                        Add to a playlist
                    </Button>*/}
                </Media>
            </Media>
            <Media right className="align-self-center mr-2">
                <a href="/components/"> <IoIosPlayCircle size={50} /> </a>
            </Media>
            <Media right className="align-self-center mr-2">
                <Button outline color="primary"
                        style={{ width:"43px", height:"43px" }}
                        className="rounded-circle">
                    <IoMdHeart />
                </Button>
            </Media>
            <Media right className="align-self-center">
                <Button outline id="musicItemPopover" color="primary">
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

MusicItemPreview.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    right: PropTypes.node,
};


export default MusicItemPreview;
