const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Post = require("../models/Post");

const postsCtrl = require("../controllers/posts");

// Get post list
router.get("/", postsCtrl.findAll);

// Add a post
router.post("/", postsCtrl.create);

// Find a single Post with an id
router.get("/:id", postsCtrl.findOne);

// Delete a Post with the specified id in request
router.delete("/:id", postsCtrl.delete);

module.exports = router;
