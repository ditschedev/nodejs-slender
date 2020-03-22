const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
const router = require("./route/router");
const RestResponse = require('./app/response/RestResponse');
const cors = require("cors");

// DB connection
const MONGODB_URL = process.env.MONGODB_URL;
const mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
const db = mongoose.connection;

let app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

app.use("/", router);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return RestResponse.notFound(res);
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return RestResponse.unauthorized(res, err.message);
	}
});

module.exports = app;
