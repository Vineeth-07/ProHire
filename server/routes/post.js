const express = require("express");
const router = express.Router();
const { Post } = require("../models");

//post routes
router.get("/", async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/createpost", async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      location,
      salary,
      deadline,
      experience,
    } = req.body;
    await Post.createPost(
      title,
      company,
      description,
      location,
      salary,
      deadline,
      experience
    );
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
