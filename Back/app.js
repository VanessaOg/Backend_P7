const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const posts = require("./models/Post");

// Database
const db = require("./config/database");

// Testing the connection
db.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((error) => console.error("Unable to connect to the database:", error));

const app = express();

// Gestion des erreurs de CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
	next();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World");
});

// Post routes
app.use("/posts", require("./routes/posts"));

module.exports = app;
