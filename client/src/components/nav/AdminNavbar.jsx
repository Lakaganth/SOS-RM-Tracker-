import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { NavLink, Link } from "react-router-dom";

import FirebaseContext from "../../context/firebase/firebaseContext";

import "./NavbarApp.scss";

const AdminNavbar = props => {
  const { user, firebase } = React.useContext(FirebaseContext);

  const adminSignOut = () => {
    firebase.logout();
  };

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
          {user ? (
            <div className="mx-3">
              <Button onClick={adminSignOut} variant="danger">
                Admin SignOut
              </Button>
            </div>
          ) : (
            <div className="mx-3">
              <Link to="/admin/sign-in">
                <Button>Admin</Button>
              </Link>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
