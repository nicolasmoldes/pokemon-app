import { createStore } from 'vuex';

export default createStore({
  state: {
    favorites: [],
  },
  mutations: {
    addFavorite(state, pokemon) {
      state.favorites.push(pokemon);
    },
    removeFavorite(state, name) {
      state.favorites = state.favorites.filter(fav => fav.name !== name);
    },
  },
  getters: {
    getFavorites: (state) => state.favorites,
  },
});