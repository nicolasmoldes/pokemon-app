<template>
  <div class="pokemon-list-container">
    <h1 class="title">Pokémon List</h1>
    
    <div class="pokemon-grid">
      <div
        class="pokemon-card"
        v-for="pokemon in pokemonList"
        :key="pokemon.name"
        @click="openModal(pokemon.name)"
      >
        <img :src="getPokemonImageUrl(pokemon.url)" alt="Pokemon Image" class="pokemon-image" />
        <h2>{{ pokemon.name }}</h2>
      </div>
    </div>

    <!-- Incluimos el componente modal -->
    <PokemonModal
      :show="isModalOpen"
      :pokemonName="selectedPokemon"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import PokemonModal from '@/components/PokemonModal.vue';

export default {
  components: {
    PokemonModal
  },
  data() {
    return {
      pokemonList: [],
      isModalOpen: false,       // Estado del modal (abierto/cerrado)
      selectedPokemon: null     // Nombre del Pokémon seleccionado
    };
  },
  methods: {
    openModal(pokemonName) {
      this.selectedPokemon = pokemonName;  // Guardamos el Pokémon seleccionado
      this.isModalOpen = true;             // Abrimos el modal
    },
    getPokemonImageUrl(url) {
      const id = url.split('/').filter(Boolean).pop();  // Obtener el ID del Pokémon
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
  },
  mounted() {
    // Llamada a la API para obtener la lista de Pokémones
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        this.pokemonList = data.results;
      });
  }
};
</script>

<style scoped>
.pokemon-list-container {
  padding: 20px;
  text-align: center;
}

.title {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #ff3d00;
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.pokemon-card {
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 15px;
  width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
  cursor: pointer;
}

.pokemon-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
}

.pokemon-card h2 {
  text-transform: capitalize;
  color: #2c3e50;
  font-size: 1.2em;
  margin: 0;
}
</style>