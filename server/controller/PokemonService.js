const Pokedex = require("pokedex-promise-v2");
const { Pokemon } = require("../model/index.js");
const P = new Pokedex();
const axios = require("axios");

class PokemonService {
  static async getPokemons(req, res, next) {
    let obj;
    const pokData = await P.getPokemonsList({
      limit: 100
    });
    let result = [];
    for (let { name, url } of pokData.results) {
      const data = await P.getPokemonByName(name);
      obj = {
        id: data.id,
        weight: data.weight,
        height: data.height,
        pic: data.sprites.front_default
      };

      const types = [];
      data.types.map(val => {
        types.push(val.type.name);
      });

      const moves = [];
      data.moves.map(({ move: { name } }) => {
        moves.push(name);
      });

      result.push({
        name: data.name,
        type: types,
        moves: moves,
        pokemon_detail: obj
      });
    }
    result.forEach(async data => {
      Pokemon.insertMany(data)
        .then(dep => {
          res.status(201).json({ result: dep });
        })
        .catch(err => next(err));
    });
  }

  static async findOnePokemon(req, res, next) {
    try {
      const getDetailOfPokemon = await Pokemon.findOne({
        _id: req.params.id
      }).populate("owned");
      if (!getDetailOfPokemon) {
        res.status(404).json({ error: `can't found any` });
      } else {
        res.status(200).json({ result: getDetailOfPokemon });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PokemonService;
