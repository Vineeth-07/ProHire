const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("Some secret String"));

// Routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);

module.exports = app;
