import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import { UserTypes } from '../../models/userTypes';
import DropdownNav from './DropdownNav';

const MyNavbar = () => {
  const {auth} = useAuth()
  
  return (
    <Navbar variant="dark shadow-md" >
      <Container>
        <Navbar.Brand href="/">TableScript</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
       
          <Navbar.Collapse className="justify-content-end">
            <DropdownNav></DropdownNav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;