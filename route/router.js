const express = require("express");
const authRoutes = require('./auth');
const postRoutes = require('./posts');

const app = express();

app.use("/", authRoutes);
app.use("/posts", postRoutes);

module.exports = app;