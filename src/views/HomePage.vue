<template>
    <div class="home-container">
      <img src="@/assets/pikachu.png" alt="Pikachu" class="pikachu-image" />
      <h1>Welcome to Pokédex</h1>
      <p>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <button @click="goToLoadingPage" class="get-started-button">Get started</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      // Redirige a la pantalla de carga
      goToLoadingPage() {
        this.$router.push('/loading');
      }
    }
  }
  </script>
  
  <style scoped>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .pikachu-image {
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
  }
  
  .get-started-button {
    background-color: #ff5959;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .get-started-button:hover {
    background-color: #ff4040;
  }
  </style>