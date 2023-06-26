<script setup>
//import { RouterLink, RouterView } from 'vue-router'
//import Pokemoncard from './components/PokemonCard.vue'
//import { VApp, VMain } from 'vuetify/lib/components/index.mjs';
import HomeView from './views/HomeView.vue';
</script>

<template>
  <v-app>
    <v-main class="bg-amber-lighten-5">
      <HomeView />
    </v-main>
  </v-app>
  
  <!--<RouterView /> -->
</template>
