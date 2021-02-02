import React from "react";
//import { NavLink } from "react-router-dom"; Using Bootstrap's NavBar instead
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand,
  .navbar-nav,
  .nav-link {
    color: #bbb !important;
  }
  .navbar-toggler {
    border-color: #bbb;
  }
`;
export default function Header() {
  return (
    <Styles>
      <Navbar expand="sm" className="mb-5">
        <Navbar.Brand href="/">
          <i className="fas fa-music"></i>
          &nbsp;Nic's Sheet Music
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Scores/add">New Score</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}
