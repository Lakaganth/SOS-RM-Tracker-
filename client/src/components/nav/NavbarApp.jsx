import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";
import Signout from "../auth/Signout";

import "./NavbarApp.scss";

const NavbarApp = ({ session }) => {
  console.log(session);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="nav-Container"
    >
      <Navbar.Brand>
        <NavLink to="/">SOS DASHBOARD</NavLink>
      </Navbar.Brand>
      <br />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {!session ? (
            <Nav className="mr-auto pr-2 ">
              <NavLink to="/sign-in">
                {" "}
                <Button>Sign In </Button>
              </NavLink>
            </Nav>
          ) : (
            <Nav className="mx-5 pl-5">
              <Signout />
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarApp;
