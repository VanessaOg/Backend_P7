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
});

// Post.associate = (models) => {
// 	Post.belongsTo(models.User, {
// 		foreignKey: {
// 			allowNull: false,
// 		},
// 	});

// Post.sync({ force: true });
module.exports = Post;
