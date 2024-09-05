import { createStore } from 'vuex';

export default createStore({
  state: {
    favorites: [],
    allPokemons: [] // Aquí almacenamos todos los Pokémon
  },
  mutations: {
    ADD_FAVORITE(state, pokemon) {
      if (!state.favorites.some(p => p.id === pokemon.id)) {
        state.favorites.push(pokemon);
      }
    },
    REMOVE_FAVORITE(state, pokemonId) {
      state.favorites = state.favorites.filter(p => p.id !== pokemonId);
    },
    SET_ALL_POKEMONS(state, pokemons) {
      state.allPokemons = pokemons;
    }
  },
  actions: {
    addFavorite({ commit }, pokemon) {
      try {
        commit('ADD_FAVORITE', pokemon);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    removeFavorite({ commit }, pokemonId) {
      commit('REMOVE_FAVORITE', pokemonId);
    },
    fetchAllPokemons({ commit }) {
      fetch('https://pokeapi.co/api/v2/pokemon')
        .then(response => response.json())
        .then(data => {
          commit('SET_ALL_POKEMONS', data.results);
        });
    }
  },
  getters: {
    favorites: state => state.favorites,
    allPokemons: state => state.allPokemons
  }
});