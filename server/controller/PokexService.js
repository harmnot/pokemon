const Pokedex = require("pokedex-promise-v2");
const { Pokemon, Person, Pokex } = require("../model/index.js");
const P = new Pokedex();
const axios = require("axios");

class PokexService {
  static async createPokemon(req, res, next) {
    const { nickname, email, idPokemon } = req.body;
    try {
      const createPokex = await Pokex.create({
        nickname,
        pokemon: idPokemon
      });
      const addPokexToPokemen = await Pokemon.updateOne(
        { _id: idPokemon },
        { $addToSet: { owned: createPokex._id } }
      );

      const isEmailExist = await Person.findOne({ email });
      if (!isEmailExist) {
        const createAccount = await Person.create({ email });
        await Person.updateOne(
          { email },
          { $addToSet: { pokex: createPokex._id } }
        );
        await Pokex.updateOne(
          { _id: createPokex._id },
          { owner: createAccount._id }
        );
        res.status(201).json({
          result: { email: createAccount.email, pokex: createPokex }
        });
      } else {
        await Person.updateOne(
          { email },
          { $addToSet: { pokex: createPokex._id } }
        );
        await Pokex.updateOne(
          { _id: createPokex._id },
          { owner: isEmailExist._id }
        );
        res
          .status(201)
          .json({ result: { email: isEmailExist.email , pokex: createPokex });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletePokex(req, res, next) {
    try {
      const deletingPokex = await Pokex.findOneAndDelete({
        _id: req.params.id
      });

      await Pokemon.findOneAndUpdate(
        {
          _id: deletingPokex.pokemon
        },
        { $pull: { owned: req.params.id } }
      );

      await Person.updateOne(
        {
          _id: deletingPokex.owner
        },
        { $pull: { pokex: req.params.id } }
      );

      res.status(200).json({ result: `successfully deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async findOneOfPokex(req, res, next) {
    try {
      const getOnePokexDetail = await Pokex.findOne({
        _id: req.params.id
      })
        .populate("owner")
        .populate("pokemon");
      if (!getOnePokexDetail) {
        res.status(404).json({ error: `can't found any` });
      } else {
        res.status(200).json({ result: getOnePokexDetail });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PokexService;
