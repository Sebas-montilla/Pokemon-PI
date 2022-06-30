import axios from "axios";
//*GET-POKEMONS
//*GET-POKEMON-BY-ID
//*GET-POKEMON-BY-NAME
//*FILTER-POKEMON-BY-TYPE
//*FILTER-BY-CREATED_IN_DB
//*FILTER-BY-ATTACK
//*FILTER-BY-ALPHABETIC-ORDER
//*POST-POKEMON
//*SET-TYPES
//*GET-TYPES
//*GET-CLEAN

//Get all the pokemons
export function getPokemons() {
  return function (dispatch) {
    axios.get("http://localhost:3001/pokemons").then((pokemons) =>
      dispatch({
        type: "GET_POKEMONS",
        payload: pokemons.data,
      })
    );
  };
}
//Post the types to the DB
export function setTypes() {
  return function (dispatch) {
    axios.post("http://localhost:3001/types").then((types) =>
      dispatch({
        type: "SET_TYPES",
        payload: types.data,
      })
    );
  };
}
//Get the types from DB
export function getTypes() {
  return function (dispatch) {
    axios.get("http://localhost:3001/types").then((types) =>
      dispatch({
        type: "GET_TYPES",
        payload: types.data,
      })
    );
  };
}
//Post Pokemon
export function postPokemon(payload) {
  return async function () {
    try {
      await axios.post("http://localhost:3001/pokemons", {
        ...payload,
      });
      alert("Successfully Created");
    } catch (e) {
      alert("Something went wrong creating the pokemon :(");
    }
  };
}
// Get Pokemon by Name
export function getPokemonByName(search) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/pokemons?name=` + search).then((pokemons) =>
        dispatch({
          type: "GET_POKEMON_BY_NAME",
          payload: pokemons.data,
        })
      )
      .catch((err) => alert(`That pokemon doesn't exist "${search}"`));
  };
}
// Get Pokemon by ID
export function getPokemonByID(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/pokemons/${id}`).then((pokemon) =>
      dispatch({
        type: "GET_POKEMON_BY_ID",
        payload: pokemon.data,
      })
    ).catch((err) => alert("The pokemon doesn't exist"))
  };
}

//!!!!!! FILTERS !!!!!!!

//Filter By Type
export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
//Filter By Name
export function filterAlphabetic(payload) {
  return {
    type: "FILTER_ALPHABETIC",
    payload,
  };
}
//Filter by Attack
export function filterByAttack(payload) {
  return {
    type: "FILTER_BY_ATTACK",
    payload,
  }
}
//Filter by created in DB
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  }
}
export function getClean() {
  return {
    type: 'GET_CLEAN',
    payload: [],
  };
}