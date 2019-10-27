import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import logo from "./img/logo.png";

function MainNavbar(props) {
  function clickHandler() {
    props.setShowRepo(false);
    props.setShowIssues(false);
    props.setShowComments(false);
  }

  return (
    <Navbar id="mainNav" bg="light" sticky="top" expand="lg">
      <a className="navbar-brand" href="#">
        {" "}
        <img className="logo" src={logo} />
      </a>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => clickHandler()} href="#home">
            Home
          </Nav.Link>
          <Nav.Link href="#link"></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar;
