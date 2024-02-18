const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

//user routes
router.get("/", async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});

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
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.status(500).json({ error: "An error occurred during signup" });
  }
});

router.post("/signin", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ message: "Sign-in successful" });
});

router.get("/signout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Signout successful" });
  });
});

router.get("/check-authentication", (req, res) => {
  console.log(req.user.id);
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

module.exports = router;
