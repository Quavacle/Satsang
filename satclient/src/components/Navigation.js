import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavigationBar = (props) => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Navbar.Brand href="/">Satsang</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/browse">Browse Books</Nav.Link>
          <Nav.Link href="/users">Browse Users</Nav.Link>
          <Nav.Link href="/AddBooks">+ Add Books</Nav.Link>
        </Nav>
        <Nav>
          {
            props.user ?
              <NavDropdown
                title={props.user}
                id="collapsible-nav-dropdown"
              >
                <Nav.Link href="dashboard">Dashboard</Nav.Link>
                <Nav.Link href="logout">Logout? I guess, I forgot</Nav.Link>
              </NavDropdown>
              :
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="register">Register</Nav.Link>
              </Navbar.Collapse>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavigationBar;
