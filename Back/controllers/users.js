const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup an user
exports.signup = (req, res, next) => {
	console.log(req.body.password);
	User.findOne({ where: { email: req.body.email } }).then((user) => {
		if (!user) {
			bcrypt
				.hash(req.body.password, 10)
				.then((hash) => {
					console.log(hash);
					User.create({
						email: req.body.email,
						password: hash,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
					})
						.then((user) => res.status(201).json({ msg: "ok", user }))
						.catch((err) => res.status(400).json({ err }));
				})
				.catch((err) => res.status(500).json({ err }));
		} else {
			return res.status(400).json({ msg: "Email existant" });
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
						userId: user.id,
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
