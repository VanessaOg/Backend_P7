const Post = require("../models/Post");
const Sequelize = require("sequelize");

const fs = require("fs");

const Op = Sequelize.Op;

// Create and save a new Post
exports.createPost = (req, res, next) => {
	// Validate request
	if (!req.body.title || !req.body.content) {
		return res.status(400).json({ msg: "Les champs doivent être remplis" });
	}

	// Create a Post
	const post = {
		userId: req.body.userId,
		title: req.body.title,
		content: req.body.content,
		// attachement: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
	};

	// Save Post in the database
	Post.create(post)
		.then(() => res.status(201).json({ message: "Votre post a été créé", post }))
		.catch((err) => res.status(400).json({ err }));
};

// Get all Posts from the database
exports.findAllPosts = (req, res, next) => {
	Post.findAll({ include: ["user", "comment"] })
		.then((data) => {
			res.send(data).status(200).json({ message: "Tous les posts publiés" });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

// Find a single Post with an id
exports.findOnePost = (req, res, next) => {
	const id = req.params.id;
	// Find by Using primary key
	Post.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data).status(200);
			} else {
				res.status(404).send({
					message: `Impossible de trouver l'identidiant id=${id}`,
				});
			}
		})
		.catch((err) =>
			res
				.status(500)
				.send({ message: "Une erreur s'est produite pendant la recherche avec l'identifiant" + id })
		);
};

// Delete a Post with the specified id in request
exports.deletePost = (req, res) => {
	Post.findOne({ where: { id: req.params.id } })
		.then((post) => {
			const filename = post.attachement.split("/images/")[1];
			fs.unlink(`images/${filename}`, () => {
				Post.destroy({ where: { id: req.params.id } })
					.then(() => res.status(200).json({ message: "Post supprimé" }))
					.catch((err) => {
						res.status(400).json({ err });
					});
			});
		})
		.catch((err) => {
			res.status(500).send({ message: "Un problème est survenu lors de la supression" });
		});
};
