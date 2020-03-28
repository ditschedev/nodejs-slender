const express = require("express");
const authRoutes = require('./auth');
const postRoutes = require('./posts');
const groupRoutes = require('./groups');
const roleRoutes = require('./roles');

const app = express();

app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use('/groups', groupRoutes);
app.use('/roles', roleRoutes);

module.exports = app;