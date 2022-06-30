const axios = require("axios");
const { Type } = require("../../db.js");

const getAndSetTypesFromApi = async () => {
  try {
    const pokemonTypes = await axios.get("https://pokeapi.co/api/v2/type");

    const types = pokemonTypes.data.results.map((obj) => obj.name);

    types.forEach((tipo) => {
      Type.findOrCreate({
        where: { name: tipo },
      });
    });

    return types;
  } catch (e) {
    throw new Error("error L26 gettypes");
  }
};
const getTypesFromDB = async () => {
  try {
    const pokemonTypes = await Type.findAll();
    return pokemonTypes;
  } catch (e) {
    throw new Error("Error L28 gettypes");
  }
};

module.exports = { getAndSetTypesFromApi, getTypesFromDB };
