const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/new", commentCtrl.createComment);
router.get("/:id/display", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;