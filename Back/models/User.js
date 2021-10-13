const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
	firstName: {
		type: DataTypes.STRING,
	},
	lastName: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		// allowNull: false,
		// unique: true,
		// isEmail: true,
	},
	password: {
		type: DataTypes.STRING,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = User;
