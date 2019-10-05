import Page from './../components/Page';
import React, { useEffect, useState } from 'react';
import {Button, Card, CardBody,CardText, CardTitle, Col, Form, Input, Row} from 'reactstrap';
import { MdCloudUpload } from 'react-icons/md';
import {createAudioDB} from "../actions/audioAction";
import { toast } from "react-toastify";

const AddTrackPage = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const onChangeHandler = (event) => {
        // append to data to the state
        setSelectedFile(event.target.files[0]);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        // create a variable to carry our form data
        const data = new FormData();
        data.append('audio', selectedFile);

        props.actions.createAudioDB(data).then(
            (_status) => {
                // redirect to the home page in case of success
                props.history.push('/');
            }
        );
    }

    return (
        <Page
            title="All playlist" className="center-hor-ver"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            <Row className="center-hor" style={{marginBottom: "10rem"}}>
                <Col md="10" sm="11" xs="12">
                    <Form onSubmit={(event) => onSubmitHandler(event)}>
                    <Card className="no-bg-color no-border">
                        {/*<CardImg top src={bg11Image} />*/}
                        <CardTitle style={{textAlign: "center"}}>
                            <MdCloudUpload size={100} color="primary"/>
                        </CardTitle>
                        <CardBody>
                            <CardTitle>Choose your audio file</CardTitle>
                            <CardText>
                                    <Input type="file" name="audio" onChange={(event) => onChangeHandler(event)} />
                                    <Button
                                        className="mt-12"
                                        color="primary"
                                        size="sm"
                                    >
                                        submit
                                    </Button>
                            </CardText>
                        </CardBody>
                    </Card>
                    </Form>
                </Col>
            </Row>

        </Page>
    );
};

export default AddTrackPage;
