const Sequelize = require("sequelize");

// Connecting to a database
module.exports = new Sequelize("groupomania", "root", "", {
	host: "localhost",
	dialect: "mysql",

	pool: {
		// max number of connection
		max: 5,
		// min number of connection
		min: 0,
		// maximum time, in milliseconds, that pool will try to get connection before throwing error
		acquire: 30000,
		// maximum time, in milliseconds, that a connection can be idle before being released
		idle: 10000,
	},
});
