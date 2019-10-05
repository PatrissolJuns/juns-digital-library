import Page from './../components/Page';
import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
    Col,
    Media,
    Row,
    Modal,
    ModalHeader, ModalBody, InputGroup, InputGroupAddon, Input, Label, FormGroup
} from 'reactstrap';
import bg1Image from "../assets/img/bg/background_640-1.jpg";
import {musicItemTable} from "../demos/dashboardPage";
import MusicItemTable from "../components/MusicItemTable";
import { MdPersonPin } from 'react-icons/md';
import { TiTime } from 'react-icons/ti';

const DisplayPlaylist = (props) => {
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);

    const playlist = props.playlists;

    const toggle = (action) => {
        switch (action) {
            case "ADD":
                setIsModalOpenAdd(!isModalOpenAdd);
                break;
            case "REMOVE":
                setIsModalOpenRemove(!isModalOpenRemove);
                break;
        }

    }
    const handleSubmit = (event, action) => {
        event.preventDefault();
        switch (action) {
            case "ADD":
                let dataToBeAdd = Object.values(event.target.audioSelectedAdd).filter(input => input.checked === true).map(input => input.value);
                props.actions.updatePlaylistDB(playlist._id, playlist.name, dataToBeAdd);
                toggle("ADD");
                break;
            case "REMOVE":
                let dataToBeRemove = Object.values(event.target.audioSelectedRemove).filter(input => input.checked === true).map(input => input.value);
                props.actions.updatePlaylistDB(playlist._id, playlist.name, dataToBeRemove, false);
                toggle("REMOVE");
                break;
        }

    }

    if(playlist === undefined || playlist.audioList.some(item => item === undefined)) {
        return null;
    }
    return (
        <Page
            title="All playlist"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row className="display-page-row">
                <Col md="11" sm="11" xs="11">
                    <Row className="mb-12">
                        <Col md="12" sm="12" xs="12" className="p-0">
                            <Card className="flex-row no-border no-bg-color">
                                <CardImg
                                    className="card-img-left img-fluid"
                                    src={bg1Image}
                                    style={{ width: 'auto', height: 200 }}
                                />
                                <CardBody>
                                    <CardTitle className="album-title">{playlist.name}</CardTitle>
                                    {/*<CardSubtitle className="album-sub-title">Maître Gims</CardSubtitle>*/}
                                    <CardText className="album-detail">
                                        <ul>
                                            <li>30 musics</li>
                                            <li className="dot-before">2 h 34 min</li>
                                            {/*<li className="dot-before">2018</li>*/}
                                        </ul>
                                    </CardText>
                                    <div className="juns-show-div-circle center-hor-ver">
                                        <span className="thing-circle rounded-circle mb-2"></span>
                                        <h4 className="m-0">{playlist.audioList.length}</h4>
                                        <h5 className="m-0">Tracks</h5>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mb-12">
                        <Media>
                            <Button className="mr-12" color="primary" size="sm">
                                Listen
                            </Button>
                            <Button
                                onClick={() => toggle("ADD")}
                                outline className="mr-12" color="primary" size="sm">
                                Add new music
                            </Button>
                            <Button
                                onClick={() => toggle("REMOVE")}
                                outline className="mr-12" color="danger" size="sm">
                                Remove music
                            </Button>
                            <Modal
                                isOpen={isModalOpenAdd}
                                toggle={() => toggle("ADD")}
                                className={props.className + " modal-dialog-centered"}>
                                <ModalHeader toggle={() => toggle("ADD")}>Add a music to playlist</ModalHeader>
                                <ModalBody>
                                    <form
                                        onSubmit={(event) => handleSubmit(event, "ADD")}
                                    >
                                        {props.audios.map(audio => (
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value={audio._id} type="checkbox" name="audioSelectedAdd"/> {audio.track}
                                                </Label>
                                            </FormGroup>
                                        ))}
                                        <Button type="submit" color="primary">Submit</Button>
                                    </form>
                                </ModalBody>
                            </Modal>

                            <Modal
                                isOpen={isModalOpenRemove}
                                toggle={() => toggle("REMOVE")}
                                className={props.className + " modal-dialog-centered"}>
                                <ModalHeader toggle={() => toggle("REMOVE")}>Remove a music to the playlist</ModalHeader>
                                <ModalBody>
                                    <form
                                        onSubmit={(event) => handleSubmit(event, "REMOVE")}
                                    >
                                        {playlist.audioList.map(audio => (
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value={audio._id} type="checkbox" name="audioSelectedRemove"/> {audio.track}
                                                </Label>
                                            </FormGroup>
                                        ))}
                                        <Button type="submit" color="primary">Remove</Button>
                                    </form>
                                </ModalBody>
                            </Modal>

                        </Media>
                        <Media right>

                        </Media>
                    </Row>
                    <Row>
                        <MusicItemTable
                            headers={[
                                <MdPersonPin size={25} />,
                                'track',
                                'artist',
                                'album',
                                <TiTime size={25}/>,
                                ''
                            ]}
                            musicData={playlist.audioList}
                        />
                    </Row>
                </Col>
            </Row>

        </Page>
    );
};

export default DisplayPlaylist;
