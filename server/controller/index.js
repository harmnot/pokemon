const [PersonService, PokemonService, PokexService] = [
  require("./PersonService.js"),
  require("./PokemonService.js"),
  require("./PokexService.js")
];

module.exports = { PersonService, PokemonService, PokexService };
