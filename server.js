const { ApolloServer } = require("apollo-server-express");
const { MemcachedCache } = require("apollo-server-cache-memcached");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");
// Connection to Mongo DB
// const connectDB = require("./config/db");
const path = require("path");
const mongoose = require("mongoose");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");
require("dotenv").config({ path: "variables.env" });
const app = express();

console.log(process.env.MONGO_URI);

// Setting up Apollo server

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });

//     console.log("Mongo DB connected");
//   } catch (err) {
//     console.error(`DB connect error ${err}`);
//     process.exit(1);
//   }
// };

// connectDB();

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

app.use(cors("*"));

app.use(async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token !== "null") {
    try {
      const currentRM = await jwt.verify(token, process.env.SECRET);
      req.currentRM = currentRM;
    } catch (err) {
      console.log("There is ERROR");
    }
  }
  next();
});

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  // persistedQueries: {
  //   cache: new MemcachedCache(
  //     ["memcached-server-1", "memcached-server-2", "memcached-server-3"],
  //     { retries: 10, retry: 10000 } // Options
  //   )
  // },
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

// serve statc assets if in production

console.log("NODE", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
