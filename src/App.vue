<script>
//import { RouterLink, RouterView } from 'vue-router'
import FooterComponent from './components/FooterComponent.vue'

export default {
  components: {FooterComponent}
}
</script>

<template>

  <h1>Hola Frikis</h1>
  <div id="app">
    <!-- Contenido de tu aplicación -->  
    <div class="content">
      <!-- Contenido principal de la aplicación -->
    </div>
    <FooterComponent />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
