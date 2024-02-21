const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");
const authenticateToken = require("../middleware/authMiddleware");

//post routes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.getPosts();
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

router.post("/createpost", authenticateToken, async (req, res) => {
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
    console.log(user);

    if (user) {
      const savedJobs = JSON.parse(user.savedJobs);

      // Check if postId already exists in savedJobs
      const index = savedJobs.indexOf(postId);

      if (index === -1) {
        // PostId not found, add postId to savedJobs
        savedJobs.push(postId);
      } else {
        // PostId found, remove postId from savedJobs
        savedJobs.splice(index, 1);
      }

      // Update user with the modified savedJobs array
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

module.exports = router;
