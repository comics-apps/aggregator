import { Navbar, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

import {logout} from '../lib/auth';
import Sidebar from './_sidebar';

export default ({ router, children }) => {
  const signOut = () => {
    logout();
    router.push('/sign_in');
  };

  return (
    <div>
      <Navbar inverse fixedTop fluid>
        <Navbar.Header>
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target="#navbar"
                  aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Navbar.Brand>
            <a href="#">Comics Aggregator</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={0} onClick={signOut}>Sign Out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Grid fluid>
        <Row>
          <Col sm={3} md={2} className="sidebar">
            <Sidebar/>
          </Col>
          <Col sm={9} smOffset={3} md={10} mdOffset={2} className="main">
            {children}
          </Col>
        </Row>
      </Grid>
    </div>
  );
};
