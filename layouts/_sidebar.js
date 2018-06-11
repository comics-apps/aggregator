import { Nav, NavItem } from 'react-bootstrap';

export default () => {
  return (
    <Nav className="nav-sidebar">
      <NavItem eventKey={1} href="/">
        Dashboard
      </NavItem>
    </Nav>
  );
};
