const axios = require("axios");
const { Pokemon, Type } = require("../../db.js");

const getByQuery = async (name) => {
  try {
    const db = await Pokemon.findOne({
      where: { name },
      indlude: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    if (db) {
      return db;
    }

    const pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return {
      id: pokemon.data.id,
      name: pokemon.data.name,
      hp: pokemon.data.stats[0].base_stat,
      attack: pokemon.data.stats[1].base_stat,
      defense: pokemon.data.stats[2].base_stat,
      speed: pokemon.data.stats[5].base_stat,
      weight: pokemon.data.weight,
      height: pokemon.data.height,
      img: pokemon.data.sprites.other.home.front_default,
      type: pokemon.data.types.map((type) => {
        return type.type.name;
      }),
    };
  } catch (e) {
    throw new Error("Ups, server error");
  }
};

module.exports = { getByQuery };
