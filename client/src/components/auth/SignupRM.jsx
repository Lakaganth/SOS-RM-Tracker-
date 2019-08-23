import React, { useState } from "react";
import { Mutation, graphql } from "react-apollo";
import { SIGNUP_RMANAGER } from "./../../queries/index";

const SignupRM = props => {
  const [rmanager, setRmanager] = useState({
    rmanager_name: "",
    rmanager_email: "",
    rmanager_password: ""
  });

  const { rmanager_name, rmanager_email, rmanager_password } = rmanager;

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

  const handleSubmit = (e, signupRM) => {
    e.preventDefault();
    console.log(rmanager);
    signupRM().then(async ({ data }) => {
      console.log("Hello", data);
      localStorage.setItem("token", data.signupRM.token);
      await props.refetch();
    });
    clearState();
    props.history.push("/");
  };

  return (
    <div className="row sign-in-body">
      <h1 className="col s12">Sign Up</h1>

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
            <form className="col s12" onSubmit={e => handleSubmit(e, signupRM)}>
              <div className="row" />
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="rmanager_name"
                    placeholder="Name"
                    id="rmanager_name"
                    type="text"
                    className="validate"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="rmanager_email"
                    placeholder="Email"
                    id="rmanager_email"
                    type="email"
                    className="validate"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    name="rmanager_password"
                    placeholder="Password"
                    id="rmanager_password"
                    type="password"
                    className="validate"
                    required
                    minLength="6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <input
                type="submit"
                className="btn"
                value="Sign In"
                autoComplete="off"
              />
              {error && <p>{error.message}</p>}
            </form>
          );
        }}
      </Mutation>
    </div>
  );
};

const signUpRMwithMutation = graphql(SIGNUP_RMANAGER)(SignupRM);
export default signUpRMwithMutation;
