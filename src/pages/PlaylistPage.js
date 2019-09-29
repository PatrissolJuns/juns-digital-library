import Page from './../components/Page';
import React from 'react';
import {Card, CardBody, CardHeader, CardImg, CardText, CardTitle, Col, Row} from 'reactstrap';
import bg11Image from "../assets/img/bg/background_1920-11.jpg";

const PlaylistPage = () => {
    return (
        <Page
            title="All playlist"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row>
                <Col md="10" sm="11" xs="12">
                    <Row>
                        <Col md="4" sm="6" xs="12" className="mb-3">
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
                        </Col>
                        <Col md="4" sm="6" xs="12" className="mb-3">
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
                        </Col>
                    </Row>
                </Col>
            </Row>

        </Page>
    );
};

export default PlaylistPage;
