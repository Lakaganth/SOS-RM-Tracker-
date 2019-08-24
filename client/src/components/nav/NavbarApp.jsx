import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";
import Signout from "../auth/Signout";
import FirebaseContext from "../../context/firebase/firebaseContext";

import "./NavbarApp.scss";

const NavbarApp = ({ session }) => {
  const { user, firebase } = React.useContext(FirebaseContext);
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
              <div className="btns">
                <NavLink to="/sign-in">
                  {" "}
                  <Button>Sign In </Button>
                </NavLink>
              </div>
            </Nav>
          ) : (
            <Nav className="mx-3 ">
              <div className="btns">
                <Signout />
              </div>
            </Nav>
          )}
        </Nav>
        {user ? (
          <div className="mx-3">
            <Button onClick={() => firebase.logout()} variant="danger">
              Admin SignOut
            </Button>
          </div>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarApp;
