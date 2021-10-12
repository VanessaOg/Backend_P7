const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Post = sequelize.define("post", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	attachement: {
		type: DataTypes.STRING,
	},
});

// Post.associate = (models) => {
// 	Post.belongsTo(models.User, {
// 		foreignKey: {
// 			allowNull: false,
// 		},
// 	});

// Post.sync({ force: true });
module.exports = Post;
