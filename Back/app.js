const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

// importation des routeurs
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");

// Database
const sequelize = require("./config/database");

// const db = require("./models");
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and Resync Db");
// });

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

User.hasMany(Post);
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);

// Testing the connection
sequelize
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.then(() => sequelize.sync({ force: true }))
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
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/images", express.static(path.join(__dirname, "images")));

// enregistrement des routers
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);
// app.use("/api/comments", commentRoutes);

module.exports = app;
