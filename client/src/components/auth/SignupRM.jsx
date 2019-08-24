import React, { useState } from "react";
import { Mutation, graphql } from "react-apollo";
import { SIGNUP_RMANAGER } from "./../../queries/index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const SignupRM = props => {
  const [rmanager, setRmanager] = useState({
    rmanager_name: "",
    rmanager_email: "",
    rmanager_password: ""
  });

  const { rmanager_name, rmanager_email, rmanager_password } = rmanager;

  const clearState = () => {
    setRmanager({
      rmanager_name: "",
      rmanager_email: "",
      rmanager_password: ""
    });
  };

  const handleChange = e => {
    setRmanager({
      ...rmanager,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, signupRM) => {
    e.preventDefault();

    signupRM().then(async ({ data }) => {
      localStorage.setItem("token", data.signupRM.token);
      await props.refetch();
      props.history.push("/");
    });
    clearState();
  };

  return (
    <div className=" sign-in-body">
      <h1 className="text-center mt-5">RM Sign Up</h1>

      <Mutation
        mutation={SIGNUP_RMANAGER}
        variables={{
          rmanager_name,
          rmanager_email,
          rmanager_password
        }}
      >
        {(signupRM, { loading, error, data }) => {
          return (
            <Form className="mt-3" onSubmit={e => handleSubmit(e, signupRM)}>
              <Form.Group controlId="rmanager_name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="rmanager_name"
                  value={rmanager_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="rmanager_email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="rmanager_email"
                  value={rmanager_email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="rmanager_password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="rmanager_password"
                  value={rmanager_password}
                  onChange={handleChange}
                  required
                  minLength="6"
                  required
                />
              </Form.Group>

              <div className="btns">
                {" "}
                <Button
                  variant="primary"
                  className="mx-auto"
                  type="submit"
                  disabled={loading}
                >
                  Submit
                </Button>
                <Link to="/sign-in" className="reg-link">
                  back
                </Link>
              </div>
              {error && <p>{error.message}</p>}
            </Form>
          );
        }}
      </Mutation>
    </div>
  );
};

const signUpRMwithMutation = graphql(SIGNUP_RMANAGER)(SignupRM);
export default withRouter(signUpRMwithMutation);
