const express = require("express");
const route = express.Router();
const { PersonService } = require("../controller/index.js");

route.get("/detail", PersonService.getDetailUser);

route.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = route;
