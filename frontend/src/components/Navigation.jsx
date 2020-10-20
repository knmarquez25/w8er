import React, { Component, components } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const nav_style = {
  height: "80px",
};

export default class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" style={{ height: "px" }}>
        <Navbar.Brand href="#home">W8er</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link activeClassName="active" href="/">
              Home
            </Nav.Link>
            <Nav.Link activeClassName="active" href="/reservation">
              Reservation
            </Nav.Link>
            <Nav.Link activeClassName="active" href="/List">
              Guestlist
            </Nav.Link>
            <Nav.Link activeClassName="active" href="/SeatingLayout">
              Seating-Layout
            </Nav.Link>
            <Nav.Link activeClassName="active" href="/waitlist">
              Waitlist
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/settings">Setting</Nav.Link>
            <Nav.Link eventKey={2} href="/login_signup">
              Log-in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
