import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    InputGroup, InputGroupAddon,
    Media,
    Modal,
    ModalBody,
    ModalHeader, Row
} from "reactstrap";
import bg11Image from "../../assets/img/bg/background_1920-11.jpg";
import { MdRemoveRedEye, MdEdit} from 'react-icons/md';
import { IoIosTrash} from 'react-icons/io';

const PlaylistItem = (props) => {
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
                let value = event.target.rename_playlist.value;
                if(value !== "") {
                    props.actions.updatePlaylistDB(props.playlist._id, value, props.playlist.audioList);
                    setIsModalRename(!isModalOpenRename);
                }
                break;
            case "DELETE":
                props.actions.deletePlaylistDB(props.playlist._id);
                setIsModalOpenDelete(!isModalOpenDelete);
                break;
        }
    };

    return (
        <Card>

            <Modal
                isOpen={isModalOpenRename}
                toggle={() => toggle("RENAME")}
                className={props.className + " modal-dialog-centered"}>
                <ModalHeader toggle={() => toggle("RENAME")}>Rename a playlist</ModalHeader>
                <ModalBody>
                    <form
                        onSubmit={(event) => handleSubmit(event, "RENAME")}
                    >
                        <InputGroup>
                            <input
                                type="text"
                                className="form-control"
                                name="rename_playlist"
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
                <ModalHeader toggle={() => toggle("DELETE")}>DELETE a playlist</ModalHeader>
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
            <CardImg top src={bg11Image} />
            <CardBody>
                <CardTitle>{props.playlist.name}</CardTitle>
                <CardText className="playlist-item center-hor-ver">
                    <h5 className="mb-0">{props.playlist.audioList.length}</h5>
                    <h6 className="mt-0">tracks</h6>
                </CardText>
                <Media>
                    <Button
                        outline className="mr-2" color="primary" size="sm">
                        <Link to={{pathname:`/view-playlist/:${props.playlist._id}`}} ><MdRemoveRedEye className="mr-2" />View</Link>
                    </Button>
                    <Button
                        onClick={() => toggle("RENAME")}
                        className="mr-2"size="sm">
                        <MdEdit className="mr-2" />Rename
                    </Button>
                    <Button
                        onClick={() => toggle("DELETE")}
                        color="danger" size="sm">
                        <IoIosTrash className="mr-1" />Delete
                    </Button>
                </Media>
            </CardBody>
        </Card>
    )
}

export default PlaylistItem;