const db = require("../config/database");

const Post = db.posts;
const Op = db.Sequelize.Op;

// Create en save a new Post
exports.create = (req, res) => {
	// Validate request
	if (!req.body.title || !req.body.content) {
		res.status(400).json({ msg: "Les champs doivent être remplis" });
	}

	// Create a Post
	const post = {
		title: req.body.title,
		content: req.body.content,
		attachement: req.body.attachement,
	};

	// Save Post in the database
	Post.create(post)
		.then((data) => {
			res.send(data);
			res.redirect("/posts");
		})
		.catch((err) => console.log(err));
};

// Get all Posts from the database
exports.findAll = (req, res) => {
	const title = req.body.title;
	const content = req.body.content;
	let condition = title
		? { title: { [Op.like]: `%${title}%` } }
		: null || content
		? { content: { [Op.like]: `%${content}%` } }
		: null;

	Post.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message || "Une erreur s'est produite pendant la recherche" });
		});
};

// Find a single Post with an id
exports.findOne = (req, res) => {
	const id = req.params.id;
	// Find by Using primary key
	Post.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Impossible de trouver l'identidiant id=%{id}`,
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
exports.delete = (req, res) => {
	const id = req.params.id;
	Post.destroy({
		where: { id: id },
	})
		.then(res.redirect("/posts"))
		.catch((err) => {
			res.status(500).send({ message: "Un problème est survenu lors de la supression" });
		});
};
