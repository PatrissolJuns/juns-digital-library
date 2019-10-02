import Page from './../components/Page';
import React, { useEffect, useState } from 'react';
import {
    Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row,
    Modal, ModalBody, ModalFooter, ModalHeader, InputGroupAddon, Input, InputGroup
} from 'reactstrap';

import bg11Image from "../assets/img/bg/background_1920-11.jpg";
import MusicPlayer from "../components/MusicPlayer";
import axios from 'axios';

const PlaylistPage = ({...props}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = (event) => {
        let value = event.target.new_playlist.value;
        if(value !== "")
            props.actions.createPlaylistDB(value)
    };

    return (
        <Page
            title="All playlist"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row className="display-page-row">
                <Col md="11" sm="12" xs="12">
                    <Row>
                        <Button
                            onClick={() => toggle()}
                            outline className="mb-12" color="primary" size="sm">
                            Ajouter une nouvelle playlist
                        </Button>
                        <Modal
                            isOpen={isModalOpen}
                            toggle={() => toggle()}
                            className={props.className + " modal-dialog-centered"}>
                            <ModalHeader toggle={() => toggle()}>Add a new playlist</ModalHeader>
                            <ModalBody>
                                <form
                                    onSubmit={handleSubmit}
                                >
                                <InputGroup>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="new_playlist"
                                        // onChange={this.handleChange}
                                    />
                                    <InputGroupAddon addonType="prepend"><Button type="submit" color="primary">Submit</Button></InputGroupAddon>
                                </InputGroup>
                                </form>
                            </ModalBody>
                        </Modal>
                    </Row>

                    <Row>
                        {props.playlists.map((playlist, index) => {
                            return (
                                <Col key={index} md="4" sm="6" xs="12" className="mb-3">
                                    {/*<MusicPlayer audioLists={audioList}/>*/}
                                    <Card>
                                        <CardImg top src={bg11Image} />
                                        <CardBody>
                                            <CardTitle>{playlist.id}</CardTitle>
                                            <CardText style={{ "fontSize": '13px' }}>
                                                {playlist.name}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })}
                        {/*<Col md="4" sm="6" xs="12" className="mb-3">
                            <MusicPlayer audioLists={audioList}/>
                            <Card>
                                <CardImg top src={bg11Image} />
                                <CardBody>
                                    <CardTitle>Card with image</CardTitle>
                                    <CardText style={{ "fontSize": '13px' }}>
                                        Some quick example text to build on the card title and make up
                                        the bulk of the card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>*/}
                        {/*<Col md="4" sm="6" xs="12" className="mb-3">
                            <Card>
                                <CardImg top src={bg11Image} />
                                <CardBody>
                                    <CardTitle>Card with image</CardTitle>
                                    <CardText style={{ "fontSize": '13px' }}>
                                        Some quick example text to build on the card title and make up
                                        the bulk of the card's content.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>*/}
                    </Row>
                </Col>
            </Row>

        </Page>
    );
};

export default PlaylistPage;


/*const [dat, setDat] = useState('');
const [audioList, setAudioList] = useState([]);
function getDataFromDb () {
    fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => {
            console.log("res[0] = ",res[0]);
            setAudioList(res);
            console.log("audioList = ",audioList);
        });
};
useEffect(() => {
    // console.log("dat = ",dat);
    getDataFromDb();
}, []);*/


/*var d = new jsmediatagsq.Reader(soundFile)
    .setTagsToRead(["title", "artist"])
    .read({
        onSuccess: function(tag) {
            console.log(tag);
        },
        onError: function(error) {
            console.log(':(', error.type, error.info);
        }
    });*/


/*const tmp_audioList = [
    /!*{
        name: 'test',
        singer: 'Coco Argenté',
        cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
        musicSrc: soundFile,
    },*!/
    /!*{
        name: '高尚',
        singer: '薛之谦',
        cover: '//cdn.lijinke.cn/nande.jpg',
        musicSrc: '//cdn.lijinke.cn/gaoshang.mp3',
    },
    {
        name: 'Despacito',
        singer: 'Luis Fonsi',
        cover:
            'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
        musicSrc: 'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3',
        /!*musicSrc: () => {
            return Promise.resolve(
                'http://res.cloudinary.com/alick/video/upload/v1502689683/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw9.mp3'
            )
        }*!/
    },
    {
        name: 'Bedtime Stories',
        singer: 'Jay Chou',
        cover:
            'http://res.cloudinary.com/alick/image/upload/v1502375978/bedtime_stories_bywggz.jpg',
        musicSrc:
            'http://res.cloudinary.com/alick/video/upload/v1502375674/Bedtime_Stories.mp3'
    },
    {
        name: '难得',
        singer: '安来宁',
        cover: '//cdn.lijinke.cn/nande.jpg',
        musicSrc: '//cdn.lijinke.cn/nande.mp3'
    }*!/
];*/

