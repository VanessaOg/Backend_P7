const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Get post list
router.get("/", auth, multer, postsCtrl.findAllPosts);

// Add a post
router.post("/", auth, postsCtrl.createPost);

// Find a single Post with an id
router.get("/:id", auth, postsCtrl.findOnePost);

// Delete a Post with the specified id in request
router.delete("/:id", auth, postsCtrl.deletePost);

module.exports = router;
