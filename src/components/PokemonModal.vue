<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div v-if="pokemon">
        <h2>{{ pokemon.name }}</h2>
        <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
        <p>Height: {{ pokemon.height }}</p>
        <p>Weight: {{ pokemon.weight }}</p>
        <p>Types: {{ typeList }}</p>
        <button v-if="!isFavorite" @click="addToFavorites(pokemon)">Agregar a Favoritos</button>
        <button v-if="isFavorite" @click="removeFromFavorites(pokemon.id)">Eliminar de Favoritos</button>
        <button @click="sharePokemon">Compartir</button>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    show: Boolean,
    pokemonName: String
  },
  data() {
    return {
      pokemon: null
    };
  },
  computed: {
    ...mapGetters(['favorites']),
    isFavorite() {
      return this.favorites.some(p => p.id === this.pokemon?.id);
    },
    typeList() {
      if (!this.pokemon) return '';
      return this.pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    }
  },
  watch: {
    pokemonName(newName) {
      this.fetchPokemonDetails(newName);
    }
  },
  methods: {
    fetchPokemonDetails(name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
          this.pokemon = data;
        });
    },
    ...mapActions(['addFavorite', 'removeFavorite']),
    addToFavorites(pokemon) {
      this.addFavorite(pokemon)
        .then(() => {
          // No hacer nada si la adición es exitosa
        })
        .catch(error => {
          // Mostrar una alerta si ocurre un error
          alert(error.message);
        });
    },
    removeFromFavorites(pokemonId) {
      this.removeFavorite(pokemonId);
    },
    sharePokemon() {
      const pokemonData = `${this.pokemon.name}, Height: ${this.pokemon.height}, Weight: ${this.pokemon.weight}`;
      navigator.clipboard.writeText(pokemonData)
        .then(() => alert('Datos copiados al portapapeles'))
        .catch((err) => console.error('Error al copiar:', err));
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style>
/* Estilos básicos para el modal */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 1.5em;
}
</style>