const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/new", commentCtrl.createComment);
router.get("/:id/display", auth, commentCtrl.getAllAnswers);
router.get("/:id", auth, commentCtrl.getOneAnswer);
router.delete("/:id", auth, commentCtrl.deleteAnswer);

module.exports = router;
