<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import GridContainer from './components/GridContainer.vue'
import ToolBarsSearch from './components/ToolBarsSearch.vue';
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>

<header>
    <div id="vacio">
      <img src="/imgs/logo.png" alt/>
    </div>
    <v-toolbar density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar density="comfortable" color="#1D2C5E"></v-toolbar>
  </header>
 <main> 
 <ToolBarsSearch/> 
    <GridContainer />
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
