import Page from './../components/Page';
import React, {Fragment, useState} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Media,
    Row,
    Modal,
    ModalHeader, ModalBody, InputGroup, InputGroupAddon, Input, Label, FormGroup
} from 'reactstrap';
import defaultPlaylistImage from "../assets/img/default_playlist.jpg";
import MusicItemTable from "../components/MusicItemTable";
import { TiTime } from 'react-icons/ti';

const DisplayPlaylist = (props) => {
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenRemove, setIsModalOpenRemove] = useState(false);
    console.log("props.actions = ",props.actions);
    const playlist = props.playlists;

    const handleListenPlaylist = (event) => {
        event.preventDefault();
        props.actions.updateGenAudioLists(0, playlist.audioList);
    }

    const toggle = (event, action) => {
        event.preventDefault();
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
                let dataToBeAdd = null;
                if(props.audios.length === 1)
                    dataToBeAdd = [event.target.audioSelectedAdd.value];
                else
                    dataToBeAdd = Object.values(event.target.audioSelectedAdd).filter(input => input.checked === true).map(input => input.value);

                props.actions.updatePlaylistDB(playlist._id, playlist.name, dataToBeAdd);
                toggle(event,"ADD");
                break;
            case "REMOVE":
                let dataToBeRemove = Object.values(event.target.audioSelectedRemove).filter(input => input.checked === true).map(input => input.value);
                props.actions.updatePlaylistDB(playlist._id, playlist.name, dataToBeRemove, false);
                toggle(event,"REMOVE");
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
                                    src={defaultPlaylistImage}
                                    style={{ width: 'auto', height: 200 }}
                                />
                                <CardBody>
                                    <CardTitle className="album-title">{playlist.name}</CardTitle>
                                    {/*<CardSubtitle className="album-sub-title">Maître Gims</CardSubtitle>*/}
                                    <Media className="album-detail">
                                        <ul>
                                            <li>30 musics</li>
                                            <li className="dot-before">2 h 34 min</li>
                                            {/*<li className="dot-before">2018</li>*/}
                                        </ul>
                                    </Media>
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
                            <Button
                                onClick={(event) => handleListenPlaylist(event)}
                                className="mr-12" color="primary" size="sm">
                                Listen
                            </Button>
                            <Button
                                onClick={(event) => toggle(event,"ADD")}
                                outline className="mr-12" color="primary" size="sm">
                                Add new music
                            </Button>
                            <Button
                                onClick={(event) => toggle(event,"REMOVE")}
                                outline className="mr-12" color="danger" size="sm">
                                Remove music
                            </Button>
                            <Modal
                                isOpen={isModalOpenAdd}
                                toggle={(event) => toggle(event,"ADD")}
                                className={props.className + " modal-dialog-centered"}>
                                <ModalHeader toggle={(event) => toggle(event,"ADD")}>Add a music to playlist</ModalHeader>
                                <ModalBody>
                                    <form
                                        onSubmit={(event) => handleSubmit(event, "ADD")}
                                    >
                                        {props.audios.length > 0 ?
                                            <Fragment>
                                                {props.audios.map(audio => (
                                                    <FormGroup key={audio._id} check>
                                                        <Label check>
                                                            <Input value={audio._id} type="checkbox" name="audioSelectedAdd"/> {audio.track}
                                                        </Label>
                                                    </FormGroup>
                                                ))}
                                                <Button type="submit" color="primary">Submit</Button>
                                            </Fragment>
                                            : <p>No music found please add one first</p>
                                        }
                                    </form>
                                </ModalBody>
                            </Modal>

                            <Modal
                                isOpen={isModalOpenRemove}
                                toggle={(event) => toggle(event,"REMOVE")}
                                className={props.className + " modal-dialog-centered"}>
                                <ModalHeader toggle={(event) => toggle(event,"REMOVE")}>Remove a music to the playlist</ModalHeader>
                                <ModalBody>
                                    <form
                                        onSubmit={(event) => handleSubmit(event, "REMOVE")}
                                    >
                                        {playlist.audioList.length > 0 ?
                                            <Fragment>
                                                {playlist.audioList.map(audio => (
                                                    <FormGroup key={audio._id} check>
                                                        <Label check>
                                                            <Input value={audio._id} type="checkbox" name="audioSelectedRemove"/> {audio.track}
                                                        </Label>
                                                    </FormGroup>
                                                ))}
                                                <Button type="submit" color="primary">Remove</Button>
                                            </Fragment>
                                            : <p>No music found please add one first</p>
                                        }
                                    </form>
                                </ModalBody>
                            </Modal>

                        </Media>
                        <Media right>

                        </Media>
                    </Row>
                    <Row>
                        {playlist.audioList.length > 0 ?
                            <MusicItemTable
                                headers={[
                                    '',
                                    'track',
                                    'artist',
                                    'album',
                                    <TiTime size={25}/>,
                                    ''
                                ]}
                                musicData={playlist.audioList}
                            />
                            :
                            <p>There is no music in this playlist please add one</p>
                        }
                    </Row>
                </Col>
            </Row>

        </Page>
    );
};

export default DisplayPlaylist;
