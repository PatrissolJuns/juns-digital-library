import Page from './../components/Page';
import React from 'react';
import {
    Card, CardBody, CardHeader,
    Col,
    Row
} from 'reactstrap';
import MusicItemPreview from "../components/MusicItemPreview";

const BookmarkedPage = (props) => {
    console.log("props.actions = ",props);
    const audios = props.audios.filter(audio => audio.isBookmark === true);

    if(audios === undefined) {
        return null;
    }
    return (
        <Page
            title="All playlist"
            breadcrumbs={[{ name: 'All playlist', active: true }]}>

            {/*<Row className="display-page-row">
                <Col md="11" sm="11" xs="11">
                    <Row>
                        {audios.length > 0 ?
                            audios.map(
                                (audio) => (
                                    <MusicItemPreview
                                        key={audio._id}
                                        audio={audio}
                                        audios={props.audios}
                                        actions={props.actions}
                                    />
                                ),
                            )
                            :
                            <p>No music found please add one first</p>
                        }
                    </Row>
                </Col>
            </Row>*/}

            <Row>
                <Col md="12" sm="12" xs="12">
                    <Card>
                        <CardHeader>Music</CardHeader>
                        <CardBody>
                            <Row>
                                <Col md="12" sm="12" xs="12" className="mb-3">
                                    {audios.length > 0 ?
                                        audios.map(
                                            (audio) => (
                                                <MusicItemPreview
                                                    key={audio._id}
                                                    audio={audio}
                                                    audios={props.audios}
                                                    actions={props.actions}
                                                />
                                            ),
                                        )
                                        :
                                        <p>No music found please add one first</p>
                                    }

                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </Page>
    );
};

export default BookmarkedPage;
