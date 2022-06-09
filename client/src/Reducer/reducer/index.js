import { CREATE_POKEMON, GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_DETAILS, GET_TIPOS } from '../actions';

const initialState = {
  pokemonsLoaded: [],
  tipos: [],
  pokemonDetail: {},
  pokemonSearch: {}
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POKEMON:
      return {
        ...state,
        pokemonsLoaded: state.pokemonsLoades.concat(action.payload)
      }
    case GET_POKEMONS:
      return {
        ...state,
        pokemonsLoaded: action.payload
      }
    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonSearch: action.payload
      }
    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemonDetail: action.payload
      }
    case GET_TIPOS:
      return {
        ...state,
        tipos: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
