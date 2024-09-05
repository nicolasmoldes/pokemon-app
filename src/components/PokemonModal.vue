<template>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="pokemon">
          <h2>{{ pokemon.name }}</h2>
          <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
          <p>Height: {{ pokemon.height }}</p>
          <p>Weight: {{ pokemon.weight }}</p>
          <!-- Agrega más detalles si es necesario -->
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
    watch: {
      // Cuando el nombre del Pokémon cambia, realizamos una nueva solicitud
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
      closeModal() {
        this.$emit('close');  // Emitimos un evento para cerrar el modal
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