const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Post = sequelize.define("post", {
	title: {
		type: DataTypes.STRING,
	},
	content: {
		type: DataTypes.STRING,
	},
	attachement: {
		type: DataTypes.STRING,
	},
	userId: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Post;
