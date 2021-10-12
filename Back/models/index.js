const { Sequelize } = require("sequelize/types");
const config = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = sequelize;

db.User = require("../models/User")(sequelize, Sequelize);
db.Post = require("../models/Post")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User, {
	foreignKey: "userId",
});

module.exports = db;
