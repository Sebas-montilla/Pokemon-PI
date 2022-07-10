const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  getTypes: [],
  detail: [],
};
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

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS": {
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    }
    case "SET_TYPES": {
      return {
        ...state,
        types: action.payload,
        getTypes: action.payload,
      };
    }
    case "GET_TYPES": {
      return {
        ...state,
        getTypes: action.payload,
      };
    }
    case "FILTER_BY_TYPE":
      const allPoke = state.allPokemons;
      const typeFiltered =
        action.payload === "all"
          ? allPoke
          : allPoke.filter((pokemon) => {
              return pokemon.type.includes(action.payload);
            });
      return {
        ...state,
        pokemons: typeFiltered,
      };
    case "GET_POKEMON_BY_ID":
      return {
        ...state,
        detail: action.payload,
      };

    case "GET_POKEMON_BY_NAME":
      return {
        ...state,
        pokemons: action.payload,
      };

    case "POST_POKEMON":
      return {
        ...state,
      };

    case "GET_CLEAN":
      return {
        ...state,
        detail: action.payload,
      };

    case "DELETE": 
      return {
        ...state
      }

    //!!!!!! FILTERS !!!!!!
    //By Type

    //By Name (Asc or Desc)
    case "FILTER_ALPHABETIC": {
      const nameFiltered =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.pokemons.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        pokemons: nameFiltered,
      };
    }
    case "FILTER_BY_ATTACK": {
      const pokeAttack = state.allPokemons;
      const sortedByAttack =
        action.payload === "fuer-asc"
          ? pokeAttack.sort((a, b) => {
              if (a.attack > b.attack) return 1;
              if (b.attack > a.attack) return -1;
              return 0;
            })
          : pokeAttack.sort((a, b) => {
              if (b.attack > a.attack) return 1;
              if (a.attack > b.attack) return -1;
              return 0;
            });
      return {
        ...state,
        pokemons: sortedByAttack,
      };
    }
    //If it's created in my DB or Not
    case "FILTER_CREATED": {
      const allPoke = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPoke.filter((p) => p.createdInDb)
          : allPoke.filter((p) => !p.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "all" ? allPoke : createdFilter,
      };
    }

    default:
      return { ...state };
  }
}
