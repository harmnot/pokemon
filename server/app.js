const [express, cors, morgan, mongoose, Pokedex] = [
  require("express"),
  require("cors"),
  require("morgan"),
  require("mongoose"),
  require("pokedex-promise-v2")
];
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express();
const P = new Pokedex();
const NODE_ENV = process.env.NODE_ENV || "development";
const dbName = NODE_ENV === "test" ? "test" : process.env.DB_NAME;
const { PersonRoute, PokexRoute, PokemonRoute } = require("./route/index.js");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-siq6o.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log(`======== CONNECTED VIA MONGO DB ========`))
  .catch(err => console.log(`got error => ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(morgan("dev"));

app.use("/api/pokemons", PokemonRoute);
app.use("/api/user", PersonRoute);
app.use("/api/pokex", PokexRoute);

app.listen(PORT, () => console.log(`you are connected with PORT = ${PORT}`));

module.exports = app;
