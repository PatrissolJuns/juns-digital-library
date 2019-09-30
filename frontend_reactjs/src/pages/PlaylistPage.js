import Page from './../components/Page';
import React, { useEffect, useState } from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from 'reactstrap';
import bg11Image from "../assets/img/bg/background_1920-11.jpg";
import MusicPlayer from "../components/MusicPlayer";
import axios from 'axios';

const PlaylistPage = ({...props}) => {
    const [playlists, setPlaylists] = useState(props.playlists);
    console.log("props = ", props);
    const newPlaylist = {id: 5, name:"Je vais tout caser"};

    const handleOnClick = () => {
        /*setPlaylists([...playlists, {
            name: r(Number(Math.random() * 10).toPrecision(1)),
            id: Number(Math.random() * 10).toPrecision(1)
        }]);*/
        props.actions.createPlaylist("Je vais tout caser");
    };

    return (
        <Page
            title="All playlist"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row className="display-page-row">
                <Col md="11" sm="12" xs="12">
                    <Row>
                        <Button
                            onClick={() => handleOnClick()}
                            outline className="mb-12" color="primary" size="sm">
                            Ajouter une nouvelle playlist
                        </Button>
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

// const tr = "data:image/jpeg;base64,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"