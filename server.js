const { ApolloServer } = require("apollo-server-express");
const { MemcachedCache } = require("apollo-server-cache-memcached");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");
// Connection to Mongo DB
const connectDB = require("./config/db");
const path = require("path");

const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const app = express();

app.use(cors());

connectDB();

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJybWFuYWdlcl9uYW1lIjoibGFrYWdhbnRoIiwicm1hbmFnZXJfZW1haWwiOiJsYWthZ2FudGg4OUBnbWFpbC5jb20iLCJpYXQiOjE1NjYwNjg5MjcsImV4cCI6MTU2NjA3MjUyN30.cUhc8CpvGmy64DqqbkkB16R_etEI01vsYeWtSmv_X5s";
  // console.log("Check for token", token);
  if (token !== "null") {
    try {
      const currentRM = await jwt.verify(token, process.env.SECRET);
      req.currentRM = currentRM;
      // console.log("jwt middleware server.js", req.currentRM);
    } catch (err) {
      console.log("There is ERROR");
    }
  } else {
    console.log("Token is null");
    return null;
  }
  next();
});

// Setting up Apollo server

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new MemcachedCache(
      ["memcached-server-1", "memcached-server-2", "memcached-server-3"],
      { retries: 10, retry: 10000 } // Options
    )
  },
  context: ({ req, res }) => {
    return { currentRM: req.currentRM };
  }
  // playground: {
  //   endpoint: "/graphql",
  //   settings: {
  //     "editor.theme": "dark"
  //   }
  // }
});

schema.applyMiddleware({ app });

//PORT Config

// app.use((req, res, next) => {
//   res.send("<h1>Hello</h1>");
//   next();
// });

// serve statc assets if in production

console.log("NODE", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  // Set static folder

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
