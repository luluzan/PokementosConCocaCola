<script setup>
<<<<<<< HEAD
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
=======
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ToolBarsSearch from './components/ToolBarsSearch.vue'
</script>

<template>
  <header>
    <v-toolbar density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar density="comfortable" color="#1D2C5E"></v-toolbar>
    <v-img  :width="300"  aspect-ratio="16/9"   variant=elevation src="../public/imgs/logo.png"></v-img>
  </header>
 <main> 
<HelloWorld/>
 <ToolBarsSearch/> 



</main>
>>>>>>> 18c4a446fefcc70ec22577f3da9ff7fb0a609aeb
</template>
