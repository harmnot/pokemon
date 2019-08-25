const express = require("express");
const route = express.Router();
const { PokemonService } = require("../controller/index.js");

route.get("/:id", PokemonService.findOnePokemon);
route.post("/createpokemons", PokemonService.getPokemons);

route.use((err, req, res, next) => {
  if (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = route;
