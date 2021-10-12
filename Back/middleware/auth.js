const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// console.log(req.headers);
		const token = req.headers.authorization.split(" ")[1]; // token dans le header bearer et token//
		// console.log(token);
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //on vérifie la clé//
		// console.log(decodedToken);
		const userId = decodedToken.userId; // On récupére l'userId //
		// console.log(userId);
		req.decodedToken = decodedToken;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable";
		} else {
			next();
		}
	} catch (err) {
		res.status(401).json({ err: "Requête non authentifiée" }); //pbl authentification
	}
};
