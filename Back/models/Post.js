// const { Sequelize, DataTypes } = require("sequelize");
// const db = require("../config/database");

// module.exports = (Sequelize, DataTypes) => {
// 	const Post = db.define("Post", {
// 		title: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		content: {
// 			type: DataTypes.STRING,
// 			allowNull: false,
// 		},
// 		attachement: {
// 			type: DataTypes.STRING,
// 		},
// 	});
// 	Post.associate = (models) => {
// 		Post.belongsTo(models.User, {
// 			foreignKey: {
// 				allowNull: false,
// 			},
// 		});
// 	};

// 	return Post;
// };
const { Sequelize, DataTypes } = require("sequelize");

const db = require("../config/database");

const Post = db.define("post", {
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
Post.associate = (models) => {
	Post.belongsTo(models.User, {
		foreignKey: {
			allowNull: false,
		},
	});
};

Post.sync({ force: true });
module.exports = Post;
