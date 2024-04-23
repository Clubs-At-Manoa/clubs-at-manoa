import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Badge, Container, Card, Image, Row, Col, Collapse, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import { PageIDs } from '../utilities/ids';

/* Gets the Project data as well as Profiles and Interests associated with the passed Project name. */
function getProjectData(name) {
  return Clubs.collection.findOne({ name });
}

/* Component for layout out a Club Card. */
const MakeCard = ({ project }) => {
  // State to control the visibility of the Collapse component
  const [open, setOpen] = useState(false);

  return (
    <Col>
      <Card className="h-100">
        <Card.Body>
          <Card.Title style={{ marginTop: '0px' }}>{project.name}</Card.Title>
          <Card.Subtitle>{project.clubType}</Card.Subtitle>
          <Card.Text>{project.description}</Card.Text>
          <Card.Text>Approved Date: {project.approvedDate}</Card.Text>
          <Card.Text>Expiration Date: {project.expirationDate}</Card.Text>
          <Card.Text>Manager: {project.clubManager}</Card.Text>
          <Card.Text>Contact: {project.contact}</Card.Text>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            variant="link"
          >
            Show Purpose
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <Card.Text>Purpose: {project.purpose}</Card.Text>
            </div>
          </Collapse>
          <div>
            Interests: {project.interests?.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}
          </div>
          <div>
            Participants: {project.participants?.map((participant, index) => <Image key={index} roundedCircle src={participant} width={50} />)}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

MakeCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    approvedDate: PropTypes.string,
    expirationDate: PropTypes.string,
    clubType: PropTypes.string,
    purpose: PropTypes.string,
    clubManager: PropTypes.string,
    contact: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    title: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

/* Renders the Project Collection as a set of Cards. */
const ClubsPage = () => {
  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub2 = Meteor.subscribe(Projects.userPublicationName);
    const sub3 = Meteor.subscribe(ProjectsInterests.userPublicationName);
    const sub4 = Meteor.subscribe(Profiles.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);
  const projects = _.pluck(Projects.collection.find().fetch(), 'name');
  const projectData = projects.map(project => getProjectData(project));
  return ready ? (
    <Container id={PageIDs.projectsPage} style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {projectData.map((project, index) => <MakeCard key={index} project={project} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubsPage;
