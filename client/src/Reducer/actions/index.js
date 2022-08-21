export const GET_POKEMON_DETAILS = "GET_POKEMON_DETAILS";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_TIPOS = "GET_TIPOS";
export const CREATE_POKEMON = "CREATE_POKEMON";


export function getPokemosDetails(payload) {
  return {
    type : GET_POKEMON_DETAILS,
    payload
  }
}

export function getPokemons(payload) {
  return {
    type : GET_POKEMONS,
    payload
  }
}

export function getPokemosByName(payload) {
  return {
    type : GET_POKEMON_BY_NAME,
    payload
  }
}

export function createPokemon(payload) {
  return {
    type : CREATE_POKEMON,
    payload
  }
}

export function getTipos(payload) {
  return {
    type : GET_TIPOS,
    payload
  }
}
