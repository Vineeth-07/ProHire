const express = require("express");
const router = express.Router();
const { Comment } = require("../models");
const authenticateToken = require("../middleware/authMiddleware");

//comment routes
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.getComments();
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/addcomment", authenticateToken, async (req, res) => {
    try {
      const {
       comment,postId
      } = req.body;
      await Comment.addComment(
        comment,postId,req.user.id
      );
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  });

  module.exports = router;
