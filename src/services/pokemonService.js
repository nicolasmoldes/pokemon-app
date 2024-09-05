import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonList = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    throw error;
  }
};

export const getPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${name}:`, error);
    throw error;
  }
};