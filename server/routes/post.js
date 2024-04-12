const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");
const getResponse = require("../middleware/chatGPT");
const authenticateToken = require("../middleware/authMiddleware");

//post routes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/createpost", authenticateToken, async (req, res) => {
  try {
    const { aitext } = req.body;
    const response = await getResponse(aitext);
    const argumentsObject = JSON.parse(response.arguments);
    const title = argumentsObject.title;
    const company = argumentsObject.company;
    const description = argumentsObject.description;
    const location = argumentsObject.location;
    const salary = argumentsObject.salary;
    const deadline = new Date(argumentsObject.deadline);
    const experience = argumentsObject.experience;

    await Post.createPost(
      title,
      company,
      description,
      location,
      salary,
      deadline,
      experience,
      req.user.id
    );
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/:postId/apply/:userId", authenticateToken, async (req, res) => {
  try {
    const { postId, userId } = req.body;
    await Post.addApplication(postId, userId);
    res.status(201).json({ message: "Job applied successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/:postId/save/:userId", authenticateToken, async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const user = await User.findByPk(userId);
    if (user) {
      const savedJobs = JSON.parse(user.savedJobs);
      const index = savedJobs.indexOf(postId);
      if (index === -1) {
        savedJobs.push(postId);
      } else {
        savedJobs.splice(index, 1);
      }
      await user.update({ savedJobs: JSON.stringify(savedJobs) });
      return res
        .status(200)
        .json({ message: "Saved jobs updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const uid = req.user.id;
    const posts = await Post.getUserPosts(uid);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
