const axios = require("axios");
const { Pokemon, Type } = require("../../db.js");

// First I get the api info
const getApiData = async () => {
  // FirstCall gets the first 20 pokemons
  const firstCall = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=2&offset=0"
    // ?limit=40&offset=0
  );
  // SecondCall gets the second 20 pokemons
  const secondCall = await axios.get(firstCall.data.next);
  // Then I saved the 40 pokemons in api
  const api = [...firstCall.data.results, ...secondCall.data.results];
  // const api = firstCall.data.results;

  //Promise.all so I can get the data from the two api calls at the same time
  //and not get an array with promises pending
  const format = await Promise.all(
    api.map(async (a) => {
      let pokemon = await axios(a.url);
      const obj = {
        id: pokemon.data.id,
        name: pokemon.data.name,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat,
        speed: pokemon.data.stats[5].base_stat,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        img: pokemon.data.sprites.other.home.front_default,
        type: pokemon.data.types.map((t) => t.type.name)
      };
      return obj;
    })
  );
  return format;
};

const DbCall = async () => {
  try {
    const pokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attribute: ['name'],
        through: {
            attributes: [],
        }
      },
    });
    const pokeInfo = pokemons.map((obj) => {
        return {
            id: obj.id,
            name: obj.name,
            hp: obj.hp,
            attack: obj.attack,
            defense: obj.defense,
            speed: obj.speed,
            height: obj.height,
            weight: obj.weight,
            img: obj.img,
            type: obj.types.map((type) => {
                return type.name;
            }),
            createdInDb: obj.createdInDb
        }
    })
    return pokeInfo;
  } catch (e) {
    console.log(e);
  }
};

const getAll = async () => {
    const apiData = await getApiData();
    const dbData = await DbCall();
    const allData = [...apiData, ...dbData];
    return allData;
}

module.exports = { getAll };
