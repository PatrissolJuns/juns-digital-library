import Page from './../components/Page';
import ProductMedia from './../components/ProductMedia';
import MusicItemPreview from './../components/MusicItemPreview';
import { IconWidget } from './../components/Widget';

import {
  productsData,
  userProgressTableData,
} from './../demos/dashboardPage';
import React from 'react';
import {
  MdPersonPin,
  MdRateReview,
  MdShare,
  MdThumbUp,
  MdFolder,
} from 'react-icons/md';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader, CardImg, CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from './../utils/colors';
import bg11Image from "../assets/img/bg/background_1920-11.jpg";

class DashboardPage extends React.Component {


  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Home"
        breadcrumbs={[{ name: 'Home', active: true }]}
      >
        <Row className="p-24 mr-ml-20 pb-2 center-hor">
          <Col md="10" sm="11" xs="12">
            <Card>
              <CardHeader>Playlist</CardHeader>
              <CardBody>
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
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="p-24 mr-ml-20 pb-2 center-hor">
          {/*<CardGroup style={{ marginBottom: '1rem' }}>*/}
          <Col md="10" sm="11" xs="12">
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
                {/*</CardGroup>*/}
              </Row>
            </CardBody>
          </Card>
          </Col>
        </Row>

        <Row className="p-24 mr-ml-20 pb-2 center-hor" style={ {justifyContent: "center"} }>
          <Col md="10" sm="11" xs="12">
            <Card>
              <CardHeader>Frequent Music...</CardHeader>
              <CardBody>
                <Row>
                  <Col md="12" sm="12" xs="12" className="mb-3">
                    {productsData.map(
                        ({ id, image, title, description, right }) => (
                            <MusicItemPreview
                                key={id}
                                image={image}
                                title={title}
                                description={description}
                                right={right}
                            />
                        ),
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
