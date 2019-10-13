import React, { useState, Fragment } from 'react';
import PropTypes from './../../utils/propTypes';

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
import { IoIosMore, IoIosTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

const ThreeDots = ({audio, ...props}) => {

    const [isOpenMusicItemPopover, setIsOpenMusicItemPopover] = useState(false);

    function toggleMusicItemPopover() {
        setIsOpenMusicItemPopover(!isOpenMusicItemPopover);
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
                    props.actions.renameAudioDB(audio._id, value);
                    setIsModalRename(!isModalOpenRename);
                }
                break;
            case "DELETE":
                props.actions.deleteAudioDB(audio._id);
                setIsModalOpenDelete(!isModalOpenDelete);
                break;
        }
    };

    return (
        <Fragment>
            <Media right className="align-self-center">
                <Button outline
                        id={"musicItemPopover" + audio._id}
                        color="primary"
                        style={{
                            width:"35px",
                            height:"35px",
                            flexDirection: "column",
                            padding: "5px",
                            paddingBottom: "10px"
                        }} >
                    <IoIosMore size={25} />
                </Button>
                <Popover
                    placement="left"
                    isOpen={isOpenMusicItemPopover}
                    toggle={toggleMusicItemPopover}
                    target={"musicItemPopover" + audio._id}
                >
                    <PopoverBody>
                        <a href="#" style={{padding: "0 0.5rem 0.5rem"}} onClick={() => toggle("RENAME")}>
                            <MdEdit className="mr-2" />Rename
                        </a>
                        <br/>
                        <a href="#" style={{padding: "0 0.5rem"}} onClick={() => toggle("DELETE")}>
                            <IoIosTrash className="mr-2" />Delete
                        </a>
                    </PopoverBody>
                </Popover>
            </Media>
            <Modal
                isOpen={isModalOpenRename}
                toggle={() => toggle("RENAME")}
                className={props.className + " modal-dialog-centered"}>
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
                className={props.className + " modal-dialog-centered"}>
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
        </Fragment>
    );
};

/*ThreeDots.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    right: PropTypes.node,
};*/


export default ThreeDots;
