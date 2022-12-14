require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const codeblockRoutes = require("./api/routes/codeblocks");
const userRoutes = require("./api/routes/users");
const sessionRoutes = require("./api/routes/sessions");

// DB Connection
mongoose
  .connect(process.env.DB_URL, {
    //   these are options to ensure that the connection is done properly
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(() => {})
  .catch((error) => {
    console.error(error);
  });
mongoose.Promise = global.Promise;
// MiddleWare
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, PUT, GET, DELETE"
    );
    return res.status(200).json({});
  }
  next();
});

// Routes
app.use("/codeblocks", codeblockRoutes);
app.use("/user", userRoutes);
app.use("/session", sessionRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
