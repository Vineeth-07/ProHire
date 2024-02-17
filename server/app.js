const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const postRoutes = require("./routes/post");

//routes for post
app.use("/post", postRoutes);

module.exports = app;
