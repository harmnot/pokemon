const { Person, Pokex, Pokemon } = require("../model/index.js");

const clearPersonDB = () => {
  if (process.env.NODE_ENV === "test") {
    Person.deleteMany({})
      .then(() => {})
      .catch(err => console.log({ err: err }));
  }
};

const clearPokexDB = () => {
  if (process.env.NODE_ENV === "test") {
    Pokex.deleteMany({})
      .then(() => {})
      .catch(err => console.log({ err: err }));
  }
};

const clearPokemonDB = () => {
  if (process.env.NODE_ENV === "test") {
    Pokemon.deleteMany({})
      .then(() => {})
      .catch(err => console.log({ err: err }));
  }
};

module.exports = { clearPersonDB, clearPokexDB, clearPokemonDB };
