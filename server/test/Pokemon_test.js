const [chai, chaiHttp, app] = [
  require("chai"),
  require("chai-http"),
  require("../app.js")
];
const expect = chai.expect;
const { clearPokemonDB } = require("../helper/clearDBAfterTest.js");

chai.use(chaiHttp);

describe("POKEMON SERVICE", () => {
  let id;
  after(done => {
    clearPokemonDB();
    done();
  });

  it("Create Pokemons data from POKEAPI.CO to insert to Database", done => {
    console.log(
      "==== it will take time to create this test until > 51000ms, just wait...... ===="
    );
    chai
      .request(app)
      .post(`/api/pokemons/createpokemons`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        id = res.body.result[0]._id;
        done();
      });
  });

  it("Get detail of Pokemon [ SUCCESS ]", done => {
    chai
      .request(app)
      .get(`/api/pokemons/${id}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.result.moves).to.have.length.above(0);
        expect(res.body.result.type).to.have.length.above(0);
        expect(res.body.result.pokemon_detail).to.contains.all.keys([
          "id",
          "weight",
          "height",
          "pic"
        ]);
        done();
      });
  });

  it("Get detail of Pokemon [ FAILED ]", done => {
    chai
      .request(app)
      .get(`/api/pokemons/${id}2`)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});
