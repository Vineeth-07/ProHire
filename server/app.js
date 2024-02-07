const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  const data = {
    name: ["a", "b"],
    age: [1, 2],
  };
  res.status(200).json(data);
});

module.exports = app;
