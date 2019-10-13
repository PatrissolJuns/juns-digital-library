import Page from './../components/Page';
import MusicItemPreview from './../components/MusicItemPreview';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import PlaylistItem from "../components/Playlist/PlaylistItem";

const DashboardPage = ({...props}) => {
    return (
      <Page
        className="DashboardPage"
        title="Home"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >
        <Row className="display-page-row">
          <Col md="11" sm="12" xs="12">
            <Row>
              <Col md="12" sm="12" xs="12">
                <Card>
                  <CardHeader>Playlist</CardHeader>
                  <CardBody>
                    <Row>
                      {props.playlists.length > 0 ?
                          props.playlists.map((playlist, index) => {
                              return (
                                  <Col key={index} md="4" sm="6" xs="12" className="mb-3">
                                    <PlaylistItem
                                        key={index}
                                        playlist={playlist}
                                        actions={props.actions}
                                    />
                                  </Col>
                              )
                            })
                          :
                          <p className="ml-2">No music found please add one first</p>
                      }
                    </Row>
                  </CardBody>
                </Card>
              </Col>

            </Row>

            {/* This feature is disable for the moment */}
            {/*<Row>
              <Col md="12" sm="12" xs="12">
                <Card>
                  <CardHeader>Music folder</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="4" sm="6" xs="6">
                        <IconWidget
                            bgColor="white"
                            inverse={false}
                            icon={MdFolder}
                            title="Fally"
                            subtitle="Control - Albums"
                        />
                      </Col>
                      <Col md="4" sm="6" xs="6">
                        <IconWidget
                            bgColor="white"
                            inverse={false}
                            icon={MdFolder}
                            title="Fally"
                            subtitle="Tokoos"
                        />
                      </Col>
                      </CardGroup>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>*/}

            <Row>
              <Col md="12" sm="12" xs="12">
                <Card>
                  <CardHeader>Music</CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="12" sm="12" xs="12" className="mb-3">
                        {props.audios.length > 0 ?
                            props.audios.map(
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

          </Col>
        </Row>

      </Page>
    );
}

export default DashboardPage;
