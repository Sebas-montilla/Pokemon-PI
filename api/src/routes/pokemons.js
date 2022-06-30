const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");
const { getAll } = require("./middlewares/getAllPokemons");
const { getById } = require("./middlewares/getByID");
const { getByQuery } = require("./middlewares/getByQuery");

//Get all Pokemons and get by query name
router.get("/", (req, res) => {
  const { name } = req.query;
  getAll().then((data) => {
    if (name) {
      getByQuery(name).then((response) => {
        if (response.name) {
          res.json(response);
        } else {
          res.status(404).send("Pokemon not found");
        }
      });
    } else if (data) {
      res.json(data);
    }
  });
  // let allPokemon = await getAll();
  // if (name) {
  //   let pokemonName = allPokemon.filter((el) =>
  //     el.name.toLowerCase().includes(name.toLowerCase())
  //   );
  //   pokemonName.length
  //     ? res.status(200).send(pokemonName)
  //     : res.status(400).send("MISSING BREED");
  // } else {
  //   res.status(200).send(allPokemon);
  // }
});
//Get by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const pokemon = await getById(id);
      pokemon
        ? res.status(200).json(pokemon)
        : res.status(404).send('No existe pokemon con ese id');
    }
  } catch (e) {
    res.status(404).send('Server error');
  }
});
//Post new Pokemon
router.post("/", async (req, res, next) => {
  const { name, hp, attack, defense, speed, height, weight, img, type } =
    req.body;
  try {

    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
    });
    // newPokemon.addType(type)
    const a = await Type.findAll({where: {name: type}});
    newPokemon.addType(a);
    res.send('Pokemon created');
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
