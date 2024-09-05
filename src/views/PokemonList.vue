<template>
  <div class="pokemon-list-container">
    <h1 class="title">Pokémon List</h1>
    
    <!-- Campo de búsqueda -->
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar Pokémon..."
        class="search-input"
      />
    </div>

    <div>
      <!-- Botones de filtro -->
      <button @click="filter = 'all'">Mostrar Todos</button>
      <button @click="filter = 'favorites'">Mostrar Favoritos</button>
    </div>
    
    <div class="pokemon-grid">
      <div
        class="pokemon-card"
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.name"
        @click="openModal(pokemon.name)"
      >
        <img :src="getPokemonImageUrl(pokemon.url)" alt="Pokemon Image" class="pokemon-image" />
        <h2 :class="{ 'favorite': isFavorite(pokemon.name) }">{{ pokemon.name }}</h2>
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
import { mapGetters } from 'vuex';

export default {
  components: {
    PokemonModal
  },
  data() {
    return {
      pokemonList: [],
      isModalOpen: false,       // Estado del modal (abierto/cerrado)
      selectedPokemon: null,   // Nombre del Pokémon seleccionado
      filter: 'all',           // Estado para el filtro (todos o favoritos)
      searchQuery: ''          // Consulta de búsqueda
    };
  },
  computed: {
    ...mapGetters(['favorites']),
    filteredPokemonList() {
      let list = this.pokemonList;
      
      // Filtrar por favoritos si es necesario
      if (this.filter === 'favorites') {
        list = list.filter(pokemon =>
          this.favorites.some(fav => fav.name === pokemon.name)
        );
      }

      // Filtrar por consulta de búsqueda
      if (this.searchQuery) {
        list = list.filter(pokemon =>
          pokemon.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return list;
    }
  },
  methods: {
    openModal(pokemonName) {
      this.selectedPokemon = pokemonName;  // Guardamos el Pokémon seleccionado
      this.isModalOpen = true;             // Abrimos el modal
    },
    getPokemonImageUrl(url) {
      const id = url.split('/').filter(Boolean).pop();  // Obtener el ID del Pokémon
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    isFavorite(name) {
      return this.favorites.some(fav => fav.name === name);
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

.search-input {
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

div > button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff3d00;
  color: #fff;
  cursor: pointer;
}

div > button:hover {
  background-color: #e03e00;
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

.pokemon-card h2.favorite {
  color: gold; /* Color dorado para los nombres de Pokémon favoritos */
}
</style>