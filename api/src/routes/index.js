const { Router } = require("express");
// const axios = require("axios");
//  const { Product, User } = require('./db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth',iu authRouter);

// //* Importing all the routers
const pokemons = require('./pokemons');
const types = require('./types');

// //* Now I connect thouse routers to the main router
router.use('/pokemons', pokemons);
router.use('/types', types);

module.exports = router;
