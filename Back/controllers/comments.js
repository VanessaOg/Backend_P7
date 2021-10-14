const Comment = require("../models/Comment");
const Sequelize = require("sequelize");
const auth = require("../middleware/auth");

exports.createComment = (req, res, next) => {
	const comment = {
		userId: req.decodedToken.userId,
		postId: req.body.postId,
		content: req.body.content,
	};
	Comment.create(comment)
		.then(() => res.status(201).json({ message: "Votre commentaire a été publié" }))
		.catch((err) => res.status(400).json({ err }));
};

exports.getAllComments = (req, res, next) => {
	Comment.findAll({ where: { postId: req.params.id } })
		.then((comments) => res.status(200).json(comments))
		.catch((err) => res.status(400).json({ err }));
};

exports.getOneComment = (req, res, next) => {
	Comment.findOne({ where: { id: req.params.id } })
		.then((comment) => res.status(200).json(comment))
		.catch((err) => res.status(400).json({ err }));
};

exports.deleteComment = (req, res, next) => {
	Comment.findOne({ where: { id: req.params.id } })
		.then((comment) => {
			Post.destroy({ where: { id: req.params.id } })
				.then(() => res.status(200).json({ message: "Commentaire supprimé" }))
				.catch((err) => res.status(400).json({ err }));
		})
		.catch((error) => res.status(500).json({ error }));
};
