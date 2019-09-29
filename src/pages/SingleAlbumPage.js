import Page from './../components/Page';
import React from 'react';
import {Button, Card, CardBody, CardImg, CardText, CardTitle, CardSubtitle, Col, Media, Row} from 'reactstrap';
import bg1Image from "../assets/img/bg/background_640-1.jpg";
import {musicItemTable} from "../demos/dashboardPage";
import MusicItemTable from "../components/MusicItemTable";
import { MdPersonPin } from 'react-icons/md';
import { TiTime } from 'react-icons/ti';

const SingleAlbumPage = () => {
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
                                <CardTitle className="album-title">Centure Noir</CardTitle>
                                <CardSubtitle className="album-sub-title">Maître Gims</CardSubtitle>
                                <CardText className="album-detail">
                                    <ul>
                                        <li>30 musics</li>
                                        <li className="dot-before">2 h 34 min</li>
                                        <li className="dot-before">2018</li>
                                    </ul>
                                </CardText>
                                <div className="juns-show-div-circle center-hor-ver">
                                    <span className="thing-circle rounded-circle mb-2"></span>
                                    <h4 className="m-0">40</h4>
                                    <h5 className="m-0">Tracks</h5>
                                </div>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                    <Row className="mb-12">
                        <Media>
                            <Button className="mr-12" color="primary" size="sm">
                                Ecouter
                            </Button>
                            <Button outline className="mr-12" color="primary" size="sm">
                                Ajouter à la playlist
                            </Button>
                            <Button outline className="mr-12" color="primary" size="sm">
                                Ajouter aux favoris
                            </Button>
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
                            musicData={musicItemTable}
                        />
                    </Row>
                </Col>
            </Row>

        </Page>
    );
};

export default SingleAlbumPage;
