import React from "react";
import Button from "react-bootstrap/Button";
import { ApolloConsumer } from "react-apollo";

const Signout = () => {
  const handleSignout = client => {
    localStorage.setItem("token", "");
    client.resetStore();
  };

  return (
    <ApolloConsumer>
      {client => {
        return <Button onClick={() => handleSignout(client)}>Sign Out</Button>;
      }}
    </ApolloConsumer>
  );
};

export default Signout;
