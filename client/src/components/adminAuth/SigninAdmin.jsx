import React, { useState } from "react";
import firebase from "./../../context/firebase/FirebaseState";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SigninAdmin = props => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const loginuser = async (email, password) => {
    try {
      await firebase.login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = user;
    loginuser(email, password);
    props.history.push("/admin/page");
    console.log("Signed in");
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">Admin Sign in</h2>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="email">
          <Form.Label>Admin Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Admin Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="btns">
          <Button variant="primary" className="mx-3" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SigninAdmin;
