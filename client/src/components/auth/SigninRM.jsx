import React, { useState } from "react";
import { Mutation, graphql } from "react-apollo";
import { SIGNIN_RMANAGER } from "../../queries";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import FirebaseContext from "./../../context/firebase/firebaseContext";

import "./AuthStyles.scss";
import history from "./../../history";

const SigninRM = props => {
  const [rmanager, setRmanager] = useState({
    rmanager_email: "",
    rmanager_password: ""
  });

  const { rmanager_email, rmanager_password } = rmanager;

  // Admin user Sign in
  const { user } = React.useContext(FirebaseContext);
  console.log(user);

  const clearState = () => {
    setRmanager({
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

  const handleSubmit = (e, signinRM) => {
    e.preventDefault();

    signinRM().then(async ({ data }) => {
      localStorage.setItem("token", data.signinRM.token);
      await props.refetch();
      history.push("/");
    });
    clearState();
    // props.history.push("/");
  };

  return (
    <div className=" sign-in-body mt-5">
      <h1 className="text-center ">RM Sign In</h1>

      <Mutation
        mutation={SIGNIN_RMANAGER}
        variables={{ rmanager_email, rmanager_password }}
      >
        {(signinRM, { loading, error, data }) => {
          return (
            <Form className="mt-3" onSubmit={e => handleSubmit(e, signinRM)}>
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
                <p style={{ paddingTop: "2vh" }}>New Manager?</p>
                <Link to="/sign-up" className="reg-link">
                  Register
                </Link>
                <div className="home-aux-links">
                  {user ? (
                    <Button
                      variant="success"
                      className="mx-auto"
                      style={{ marginTop: "2vh" }}
                    >
                      <Link to="/admin/page" className="reg-link">
                        Admin
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant="dark"
                      className="mx-auto home-admin-button "
                      style={{ marginTop: "2vh" }}
                    >
                      <Link to="/admin/sign-in" className="reg-link">
                        Admin
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {error && <p>{error.message}</p>}
              {/* </form> */}
            </Form>
          );
        }}
      </Mutation>
    </div>
  );
};

const signinWithMutation = graphql(SIGNIN_RMANAGER)(SigninRM);

export default withRouter(signinWithMutation);
