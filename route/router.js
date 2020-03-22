const express = require("express");
const authRoutes = require('./auth');

const app = express();

app.use("/", authRoutes);

module.exports = app;