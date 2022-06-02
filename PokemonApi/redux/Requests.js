import axios from 'axios';
import { ApiRequests } from "../src/api/BaseApi";

export const pokemonColors = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#FA6C6C",
  water: "#6890F0",
  grass: "#48CFB2",
  electric: "#FFCE4B",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

export function setNext(payload) {
  return {type: 'NEXT/SETNEXT', payload}
}

export function addPokemons(payload) {
  return {type: 'POKEMONS/ADDPOKEMONS', payload}
}

export function addMoves(payload) {
  return {type: 'POKEMONDETAIL/ADDMOVES', payload}
}

export function addTypes(payload) {
  return {type: 'POKEMONDETAIL/ADDTYPES', payload}
}

export function addPokebag(payload) {
  return {type: 'POKEBAG/ADDPOKEBAG', payload}
}

export function deletePokebag(payload) {
  return {type: 'POKEBAG/DELETEPOKEBAG', payload}
}

export function setLoading(payload) {
  return {type: 'LOADING/SETLOADING', payload}
}

export function setPokemonDetail(payload) {
  return {type: 'POKEMONDETAIL/SETPOKEMONDETAIL', payload}
}

export function fetchPokemons(next) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      let url = ''
      if (next){
        url = next
      } else {
        url = ApiRequests.fetchPokemons
      }
      const res = await axios.get(url);
      let result = res.data;

      const pokemonsArray = [];
      for await (const pokemon of result.results) {
        const pokemonDetailsResponse = await axios.get(pokemon.url);
        const pokemonDetails = pokemonDetailsResponse.data;

        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.substring(1),
          type: pokemonDetails.types[0].type.name,
          types: pokemonDetails.types,
          moves: pokemonDetails.moves,
          order: pokemonDetails.order,
          imgUrl: pokemonDetails.sprites.other["official-artwork"].front_default,
          species: pokemonDetails.species.name,
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          abilities: pokemonDetails.abilities,
          stats: pokemonDetails.stats,
        });
      }

      await dispatch(addPokemons(pokemonsArray))
      await dispatch(setNext(result.next))
    } catch (error) {
      console.log(error)
      dispatch(setLoading(false))
    }
  }
}

export function fetchPokemonDetail(url) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const res = await axios.get(url)
      let result = res.data;
      await dispatch(setPokemonDetail(+url.split("pokemon/")[1].split('/')[0]))
      await dispatch(addMoves(result.moves))
      await dispatch(addTypes(result.types))
      dispatch(setLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(setLoading(false))
    }
  }
}
