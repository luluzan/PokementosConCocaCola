<script setup>
// import { RouterLink, RouterView } from 'vue-router'
//import GeneralView  from './components/GeneralView.vue';
import FooterComponent from './components/FooterComponent.vue'
import PokemonList from './components/PokemonList.vue';
</script>

<template>

<header>
    <div id="vacio">
      <img src="/imgs/logo.png" alt/>
    </div>
    <v-toolbar class="custom-toolbar" density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar class="custom-toolbar" density="comfortable" color="#1D2C5E"></v-toolbar>
  </header>
<main> 
  <!-- <ToolBarsSearch/> -->
  <PokemonList /> 
  </main>
  <FooterComponent />
</template>

<style>
/* #app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex: 1;
} */
</style>
