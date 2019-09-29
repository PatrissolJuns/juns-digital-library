import Page from './../components/Page';
import React from 'react';
import {Button, Card, CardBody, CardHeader, CardImg, CardText, CardTitle, Col, Form, Input, Row} from 'reactstrap';
import bg11Image from "../assets/img/bg/background_1920-11.jpg";
import { MdCloudUpload } from 'react-icons/md';

const AddTrackPage = () => {
    return (
        <Page
            title="All playlist" className="center-hor-ver"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row className="center-hor" style={{marginBottom: "10rem"}}>
                <Col md="10" sm="11" xs="12">
                    <Card className="no-bg-color no-border">
                        {/*<CardImg top src={bg11Image} />*/}
                        <CardTitle style={{textAlign: "center"}}>
                            <MdCloudUpload size={100} color="primary"/>
                        </CardTitle>
                        <CardBody>
                            <CardTitle>Choose your mp3 file</CardTitle>
                            <CardText>
                                <Form>
                                    <Input type="file" name="file" />
                                    <Button className="mt-12" color="primary" size="sm">
                                        submit
                                    </Button>
                                </Form>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Page>
    );
};

export default AddTrackPage;
