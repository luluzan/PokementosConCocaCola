<script setup>
//  import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import GridContainer from './components/GridContainer.vue'
import PokemonLittleCard from './components/PokemonLittleCard.vue';
import ToolBarsSearch from './components/ToolBarsSearch.vue';
</script>

<template>

  
  <header>
    <v-toolbar density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar density="comfortable" color="#1D2C5E"></v-toolbar>
    <v-img  :width="300"  aspect-ratio="16/9"   variant=elevation src="../public/imgs/logo.png"></v-img>
  </header>
 

 <ToolBarsSearch/> 

<GridContainer />

<main> 


  <!-- <PokemonLittleCard /> -->
</main>
</template>

<style scoped>

</style>
