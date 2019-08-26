import React from "react";
// import * as serviceWorker from "./serviceWorker";

import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Appollo imports
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import withSession from "./components/withSession";

// Server Connection
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  fetchOptions: {
    credentials: "include"
  },
  cache: new InMemoryCache(),
  request: operation => {
    const token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      // console.log("Network error bad", networkError);
      console.log("err");
    }
  }
});

const RootWithSession = withSession(App);

// console.log(RootWithSession);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById("root")
);
