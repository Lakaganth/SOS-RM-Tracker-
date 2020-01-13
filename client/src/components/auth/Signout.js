import React from "react";
import Button from "react-bootstrap/Button";
import { ApolloConsumer } from "react-apollo";
import history from "../../history";

const Signout = props => {
  console.log(props);
  const handleSignout = client => {
    localStorage.setItem("token", "");
    client.resetStore();
    history.push("/auth");
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <Button variant="danger" onClick={() => handleSignout(client)}>
            Sign Out
          </Button>
        );
      }}
    </ApolloConsumer>
  );
};

export default Signout;
