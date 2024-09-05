<template>
    <div class="pokemon-details-container" v-if="pokemon">
      <img :src="getPokemonImage(pokemon.name)" alt="Imagen del Pokémon" class="pokemon-image" />
      <div class="pokemon-info">
        <h2>{{ pokemon.name }}</h2>
        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <button @click="sharePokemon" class="share-button">Compartir</button>
      </div>
    </div>
  </template>
  
  <script>
  import { getPokemonDetails } from '@/services/pokemonService';
  
  export default {
    props: ['pokemonName'], // Se pasa el nombre del Pokémon como una prop
    data() {
      return {
        pokemon: null, // Almacenamos los detalles del Pokémon aquí
      };
    },
    watch: {
      // Observar cambios en la prop 'pokemonName'
      pokemonName: {
        immediate: true, // Cargar los detalles cuando el componente se monta
        handler(newPokemonName) {
          if (newPokemonName) {
            this.fetchPokemonDetails(newPokemonName);
          }
        },
      },
    },
    methods: {
      // Llamada a la API para obtener los detalles del Pokémon
      async fetchPokemonDetails(name) {
        try {
          this.pokemon = await getPokemonDetails(name);
        } catch (error) {
          console.error(`Error al obtener los detalles del Pokémon ${name}:`, error);
        }
      },
      // Función para compartir los detalles del Pokémon
      sharePokemon() {
        const pokemonData = `${this.pokemon.name}, Height: ${this.pokemon.height}, Weight: ${this.pokemon.weight}`;
        navigator.clipboard.writeText(pokemonData)
          .then(() => alert('Datos copiados al portapapeles'))
          .catch((err) => console.error('Error al copiar:', err));
      },
      getPokemonImage(name) {
        return `https://img.pokemondb.net/sprites/home/normal/${name}.png`;
      },
    },
  };
  </script>
  
  <style scoped>
  .pokemon-details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .pokemon-image {
    width: 200px;
    height: 200px;
  }
  
  .pokemon-info {
    text-align: center;
  }
  
  .share-button {
    background-color: #ffcb05;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .share-button:hover {
    background-color: #ffb300;
  }
  </style>