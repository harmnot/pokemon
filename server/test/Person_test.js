const [chai, chaiHttp, app, mongoose] = [
  require("chai"),
  require("chai-http"),
  require("../app.js"),
  require("mongoose")
];
const expect = chai.expect;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const { Pokemon, Pokex, Person } = require("../model/index.js");
const {
  clearPokexDB,
  clearPokemonDB,
  clearPersonDB
} = require("../helper/clearDBAfterTest.js");

chai.use(chaiHttp);

describe("PERSON SERVICE", () => {
  before(done => {
    clearPokexDB();
    done();
  });

  after(done => {
    clearPokemonDB();
    done();
  });

  it("SUCCESSFULLY GET DETAIL OF USER", async () => {
    let email = `name@email.com`;

    const insertData = {
      name: "Bulbasaur",
      type: ["bolt"],
      moves: ["run-fast"],
      pokemon_detail: {
        id: 1,
        pic: "https://raw.pics.com",
        weight: 10,
        height: 80
      }
    };
    const createPokemon = await Pokemon.create(insertData);

    const createPokex = await Pokex.create({
      nickname: "apalah",
      pokemon: createPokemon._id
    });
    const addPokexToPokemen = await Pokemon.updateOne(
      { _id: createPokemon._id },
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
    } else {
      await Person.updateOne(
        { email },
        { $addToSet: { pokex: createPokex._id } }
      );
      await Pokex.updateOne(
        { _id: createPokex._id },
        { owner: isEmailExist._id }
      );
    }

    const getDetail = await chai
      .request(app)
      .get(`/api/user/detail?email=${email}`);

    expect(getDetail).status(200);
    expect(getDetail.body.result).to.have.property("pokex");
    expect(getDetail.body.result).to.have.property("emails");
  });

  it("CAN'T FOUND USER TO SEARCH THE EMAIL", async () => {
    let emailTwo = `yes@email.com`;
    const getDetailTwo = await chai
      .request(app)
      .get(`/api/user/detail?email=${emailTwo}`);

    expect(getDetailTwo).status(404);
    expect(getDetailTwo.body).to.have.property("error");
    expect(getDetailTwo.body.error).to.equal(`can't found any`);
  });
});
