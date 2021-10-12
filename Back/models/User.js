const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		isEmail: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
	},
});
User.associate = (models) => {
	User.hasMany(models.Post, {
		onDelete: "CASCADE",
	});
};

User.sync({ force: true });
module.exports = User;
