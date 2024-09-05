<template>
    <div class="loading-screen">
      <img src="@/assets/pokeball.png" alt="Cargando" class="pokeball-spin" />
    </div>
  </template>
  
  <style scoped>
  .loading-screen {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .pokeball-spin {
    animation: spin 2s linear infinite;
    width: 100px;
    height: 100px;
  }
  
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  </style>