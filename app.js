const express = require("express");
const { default: mongoose } = require("mongoose");
const { urlencoded } = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const { corsOption } = require("./config/corsOptions");
// const { logger } = require("./middleware/logger");
require("dotenv").config();

// Database import
const connectToDB = require("./config/dbConn");
const { logEvents } = require("./middleware/logger");

// const mongodburl = `${process.env.MONGO_URI}/?retryWrites=true&w=majority`;
connectToDB();

const app = express();
const PORT = process.env.NODE_LOCALHOST;

//  to update api loggings
// app.use(logger);

// app.use(express.static("build"));

// import all routes

// Allow cross-origin request
const serverURL =
  process.env.NODE_APP_MODE === "production"
    ? process.env.HOSTED_URL
    : process.env.LOCAL_URL;

console.log(serverURL);
app.use(cors(corsOption));

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// get error logs
// app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log(`Connected To MongoDB`);
  app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});

module.exports = app;
