import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class MainNav extends React.Component {
  render() {
    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="#home">Satsang</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#browse">Browse Books</Nav.Link>
            <Nav.Link href="#users">Browse Users</Nav.Link>
            <Nav.Link href="#search">+ Add Books</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title="Login/Username here"
              id="collapsible-nav-dropdown"
            >
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="dashboard">Dashboard</Nav.Link>
              <Nav.Link href="logout">Logout? I guess, I forgot</Nav.Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNav;
