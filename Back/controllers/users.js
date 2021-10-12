const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const User = require("../models/User");
const { Op } = require("sequelize");

// Regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;

const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// Signup an user
exports.signup = (req, res, next) => {
	if (
		req.body.firstName == null ||
		req.body.lastname == null ||
		req.body.email == null ||
		req.body.password == null
	) {
		return res.status(400).json({ msg: "Les champs doivent être remplis" });
	}
	if (!emailRegex.test(req.body.email)) {
		return res.status(400).json({ msg: "Veuillez rentrer un email valide" });
	}
	if (!passwordRegex.test(req.body.password)) {
		return res.status(400).json({ msg: "Veuillez rentrer un mot de passe valide" });
	}

	User.findOne({ where: { email: req.body.email } }).then((user) => {
		if (!user) {
			//on hash le MDP//
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					const userNew = User.create({
						email: req.body.email,
						password: hash,
						firstName: req.body.firstName,
						lastname: req.body.lastname,
						isAdmin: false,
					})
						.then((user) => {
							console.log(user);
							res.status(201).json({ message: "Utilisateur créé" });
						})
						.catch((err) => res.status(400).json({ err }));
				})
				.catch((err) => res.status(500).json({ message: "Utilisateur déjà créé " }));
		}
	});
};

exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			if (!user) {
				return res.status(401).json({ message: "Utilisateur non trouvé" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ message: "Mot de passe incorrect" });
					}
					res.status(200).json({
						userId: user._id,
						token: jwt.sign(
							// Fonction sign de JsonWebToken//
							{ userId: user.id }, //  données à encoder //
							"RANDOM_TOKEN_SECRET", // clé secréte encodage //
							{ expiresIn: "24h" } // configuration //
						),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err })); //erreur de connexion, serveur//
};