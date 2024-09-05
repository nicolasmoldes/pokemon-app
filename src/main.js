import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Asegúrate de que la ruta sea correcta

const app = createApp(App);

app.use(router);
app.use(store); // Agrega esta línea para usar Vuex
app.mount('#app');