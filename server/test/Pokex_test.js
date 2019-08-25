const [chai, chaiHttp, app, mongoose] = [
  require("chai"),
  require("chai-http"),
  require("../app.js"),
  require("mongoose")
];
const expect = chai.expect;
const Pokedex = require("pokedex-promise-v2");
const P = new Pokedex();
const { Pokemon, Pokex } = require("../model/index.js");
const {
  clearPokexDB,
  clearPokemonDB,
  clearPersonDB
} = require("../helper/clearDBAfterTest.js");

chai.use(chaiHttp);

describe("POKEX SERVICE", () => {
  before(done => {
    clearPersonDB();
    done();
  });

  after(done => {
    clearPokemonDB();
    done();
  });

  it("Create pokex [SUCCESS]", done => {
    const insertData = {
      name: "Agumonn Chu",
      type: ["bolt"],
      moves: ["run-fast"],
      pokemon_detail: {
        id: 1,
        pic: "https://raw.pics.com",
        weight: 10,
        height: 80
      }
    };
    Pokemon.create(insertData)
      .then(data => {
        let id = data._id;
        const objData = {
          nickname: "name here",
          email: "muhammad@email.com",
          idPokemon: id
        };

        chai
          .request(app)
          .post("/api/pokex/createpokex")
          .send(objData)
          .end((err, res) => {
            expect(err).to.be.null;
            id = res.body.result.pokex._id;
            expect(res).status(201);
            expect(res.body.result).to.contains.all.keys(["email", "pokex"]);
            clearPokexDB();
            done();
          });
      })
      .catch(err => console.log(err));
  });

  it("Create pokex [FAILED] because nickname includes symbols and numbers", done => {
    const insertDataTwo = {
      name: "Burbosor",
      type: ["bolt"],
      moves: ["run-fast"],
      pokemon_detail: {
        id: 2,
        pic: "https://raw.pics.com",
        weight: 90,
        height: 80
      }
    };

    Pokemon.create(insertDataTwo)
      .then(data => {
        let id = data._id;
        const objDatatwo = {
          nickname: "name 33",
          email: "mhd@email.com",
          idPokemon: id
        };

        chai
          .request(app)
          .post("/api/pokex/createpokex")
          .send(objDatatwo)
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body.error.errors.nickname).to.have.property("message");
            expect(res.body.error.name).to.equal("ValidationError");
            done();
          });
      })
      .catch(err => console.log(err));
  });

  it("Create pokex [FAILED] because invalid email", done => {
    const insertDataTwo = {
      name: "Ivysaur",
      type: ["water"],
      moves: ["run-fast"],
      pokemon_detail: {
        id: 10,
        pic: "https://raw.pics.com",
        weight: 30,
        height: 30
      }
    };
    Pokemon.create(insertDataTwo)
      .then(data => {
        let id = data._id;
        const objDatatwo = {
          nickname: "Third name",
          email: "failedemail",
          idPokemon: id
        };

        chai
          .request(app)
          .post("/api/pokex/createpokex")
          .send(objDatatwo)
          .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res.body.error.errors.email).to.have.property("message");
            expect(res.body.error.name).to.equal("ValidationError");
            done();
          });
      })
      .catch(err => console.log(err));
  });

  it("delete pokex [SUCCESS]", done => {
    const insertData = {
      name: "Squirtle",
      type: ["fly"],
      moves: ["fly-fast"],
      pokemon_detail: {
        id: 3,
        pic: "https://raw.pics.com",
        weight: 60,
        height: 20
      }
    };
    Pokemon.create(insertData)
      .then(data => {
        let id = data._id;
        const objData = {
          nickname: "name here",
          email: "mhd@email.com",
          idPokemon: id
        };

        return Pokex.create(objData);
      })
      .then(response => {
        chai
          .request(app)
          .delete(`/api/pokex/${response._id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).status(200);
            done();
          });
      })
      .catch(err => console.log(err));
  });

  it("findPokex pokex [SUCCESS]", done => {
    const insertData = {
      name: "Venusaur",
      type: ["water"],
      moves: ["run-fast"],
      pokemon_detail: {
        id: 1,
        pic: "https://raw.pics.com",
        weight: 10,
        height: 80
      }
    };
    Pokemon.create(insertData)
      .then(data => {
        let id = data._id;
        const objData = {
          nickname: "name here",
          email: "muhammad@email.com",
          idPokemon: id
        };

        return Pokex.create(objData);
      })
      .then(response => {
        chai
          .request(app)
          .get(`/api/pokex/${response._id}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).status(200);
            clearPokexDB();
            done();
          });
      })
      .catch(err => console.log(err));
  });
});
