const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Comment = sequelize.define("comment", {
	content: {
		type: DataTypes.STRING,
	},
	postId: {
		type: DataTypes.INTEGER,
	},
	userId: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Comment;
