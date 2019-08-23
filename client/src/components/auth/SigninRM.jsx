import React, { useState } from "react";
import { Mutation, graphql } from "react-apollo";
import { SIGNIN_RMANAGER } from "../../queries";
import { withRouter } from "react-router-dom";

const SigninRM = props => {
  const [rmanager, setRmanager] = useState({
    rmanager_email: "",
    rmanager_password: ""
  });

  const { rmanager_email, rmanager_password } = rmanager;

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
      console.log("signin", data.signinRM.token);
      localStorage.setItem("token", data.signinRM.token);
      await props.refetch();
      props.history.push("/");
    });
    clearState();
    // props.history.push("/");
  };

  return (
    <div className="row sign-in-body">
      <h1 className="col s12">Sign In</h1>

      <Mutation
        mutation={SIGNIN_RMANAGER}
        variables={{ rmanager_email, rmanager_password }}
      >
        {(signinRM, { loading, error, data }) => {
          return (
            <form className="col s12" onSubmit={e => handleSubmit(e, signinRM)}>
              <div className="row" />
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

const signinWithMutation = graphql(SIGNIN_RMANAGER)(SigninRM);

export default withRouter(signinWithMutation);
