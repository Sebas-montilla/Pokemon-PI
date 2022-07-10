const axios = require("axios");
const { Pokemon, Type } = require("../../db.js");

const getByQuery = async (name) => {
  try {
    const dB = await Pokemon.findOne({
      where: { name },
      indlude: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    //  const obj = {
    //   id: dB.id,
    //     name: dB.name,
    //     hp: dB.hp,
    //     attack: dB.attack,
    //     defense: dB.defense,
    //     speed: dB.speed,
    //     height: dB.height,
    //     weight: dB.weight,
    //     //if the image exist get it from db, otherwise send the other image
    //     img: dB.img
    //       ? dB.img
    //       : "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
    //     type: dB.types.map((type) => 
    //       type.name
    //     ),
    // }

    if (obj) {
      return obj;
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
    // throw new Error("Ups, server error");
    console.log('Ups, server error');
  }
};

module.exports = { getByQuery };
