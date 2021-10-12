const multer = require("multer");

const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/gif": "gif",
};

const storage = multer.diskStorage({
	destination: (req, res, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_"); // On élimine les espaces //
		const extension = MIME_TYPES[file.mimetype]; // Création de l'extension diu fichier //
		callback(null, name + Date.now() + "." + extension);
	},
});
module.exports = multer({ storage }).single("image");
