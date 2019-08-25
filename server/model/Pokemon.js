const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: {
    type: String,
    unique: [true, "pokemon already exist"],
    required: [true, "required name"]
  },
  type: {
    type: Array,
    required: [true, "required type"]
  },
  owned: [{ type: Schema.Types.ObjectId, ref: "Pokex" }],
  moves: {
    type: Array,
    required: [true, "required type"]
  },
  pokemon_detail: {
    type: Schema.Types.Mixed,
    required: [true, "required detail of pokemon"]
  }
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
