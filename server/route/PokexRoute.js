const express = require("express");
const route = express.Router();
const { PokexService } = require("../controller/index.js");

route.get("/:id", PokexService.findOneOfPokex);
route.post("/createpokex", PokexService.createPokemon);
route.delete("/:id", PokexService.deletePokex);

route.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = route;
