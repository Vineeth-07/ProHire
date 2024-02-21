const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware/authMiddleware");
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

//user routes
router.post("/signup", async (req, res) => {
  try {
    const { name, gender, qualification, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      gender,
      qualification,
      email,
      password: hashedPassword,
      savedJobs: JSON.stringify([]),
    });
    const token = createToken(newUser.id);
    return res
      .status(200)
      .json({ email: req.body.email, name: req.body.name, token });
  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.status(500).json({ error: "An error occurred during signup" });
  }
});

router.post("/signin", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "All fields must be entered" });
  }
  try {
    const user = await User.getUser(req.body.email);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = createToken(user.id);
    return res
      .status(200)
      .json({ email: req.body.email, name: user.name, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
});

router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const uid = req.user.id;
    const user = await User.findByPk(uid);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error occurred while finding user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/allusers", authenticateToken, async (req, res) => {
  try {
    const users = await User.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

module.exports = router;
