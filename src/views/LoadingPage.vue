<template>
    <div class="loading-container">
      <img src="@/assets/pokeball.png" alt="Loading" class="loading-image" />
      <p>Loading Pokémon data...</p>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Simula un tiempo de carga de 3 segundos y luego redirige a la lista de pokémones
      setTimeout(() => {
        this.$router.push('/pokemon-list');
      }, 3000);
    }
  }
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  
  .loading-image {
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>