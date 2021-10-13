const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Comment = sequelize.define("comment", {
	content: {
		type: DataTypes.STRING,
	},
	postId: {
		type: DataTypes.STRING,
	},
	userId: {
		type: DataTypes.STRING,
	},
});

module.exports = Comment;
