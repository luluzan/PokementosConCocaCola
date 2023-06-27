<script setup>
<<<<<<< HEAD
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
=======
//import { RouterLink, RouterView } from 'vue-router'
//import HomeView from './components/HomeView.vue'
import PokemonLittleCard from './components/PokemonLittleCard.vue';
</script>

<template>
  <PokemonLittleCard />
  <!--<RouterView /> -->
>>>>>>> 587635f0db0feafa6c2c753d1e72974992bf7933
</template>

<style scoped>

<<<<<<< HEAD

=======
>>>>>>> 587635f0db0feafa6c2c753d1e72974992bf7933
</style>
