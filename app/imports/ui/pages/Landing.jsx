import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
          Welcome to Clubs At Mānoa
        </h1>
        <h3 style={{ paddingBottom: '20px', color: 'white' }}> Over 150 Registered Independent Organizations (RIOs) at the University of Hawaiʻi at Mānoa <br />
          Serving the campus and greater community
        </h3>
      </Container>
    </div>
    <div className="landing-white-background">
      <Container className="d-flex justify-content-center align-items-center text-center">
        <Row md={1} lg={5}>
          <Col xs={6} className="align-middle text-center">
            <Image src="/images/Manoa_4.jpg" width={900} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={{ color: '#376551' }}> Connect to people and organizations with shared interests!
      </h2>
    </div>
  </div>
);

export default Landing;
