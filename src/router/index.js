import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import LoadingPage from '@/views/LoadingPage.vue';
import PokemonList from '@/views/PokemonList.vue';

const routes = [
  { path: '/', component: HomePage },        // Página de inicio
  { path: '/loading', component: LoadingPage },  // Pantalla de carga
  { path: '/pokemon-list', component: PokemonList } // Lista de Pokémones
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;