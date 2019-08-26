const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://lakaganth89:Kiru1989@rmtracker-ntgpn.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );

    console.log("Mongo DB connected");
  } catch (err) {
    console.error(`DB connect error ${err}`);
    process.exit(1);
  }
};

module.exports = connectDB;
