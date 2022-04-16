const express = require("express");
const { get } = require("http");

const studentsRoutes = require("./routes/studentRoutes");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(express.json());

app.use("/api/v1/students", studentsRoutes);

module.exports = app;
