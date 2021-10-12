const express = require("express");
const sequelize = require("sequelize");
const router = express.Router();

const usersCtrl = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;
