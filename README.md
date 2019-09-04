# Pokemon 

Pokemon server build by [Express](https://expressjs.com), [MongoDB](https://www.mongodb.com) for Database,
for logger we are using [Morgan](https://www.npmjs.com/package/morgan), [pokedex-promise-v2](https://github.com/PokeAPI/pokedex-promise-v2) based on 
[Pokeapi.co](https://pokeapi.co/docs/v2.html) for get data of pokemons, [Jenkins](https://jenkins.io) for CI and CD, we are also using [Docker](https://www.docker.com) and
[docker-compose](https://github.com/docker/compose) for run Jenkins on server, 
for deploy we are using [Google Cloud](https://cloud.google.com).


## Integration Testing and Unit Testing 

pokemon server will do test before deploy on Jenkins with Docker test
just run 
```npm run test``` it will show the coverage test.
for unit and integration testing we are [Mocha](https://mochajs.org), [Chai](https://www.chaijs.com), and [Istanbul](https://istanbul.js.org)


### Routing 

for documentation routing you can go to the [server folder](https://github.com/harmnot/pokemon/tree/master/server).
