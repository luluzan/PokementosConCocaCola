<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <v-toolbar density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar density="comfortable" color="#1D2C5E"></v-toolbar>
    <v-img  :width="300"  aspect-ratio="16/9"   variant=elevation src="../public/imgs/logo.png"></v-img>
  </header>
  

  

  <h1>Hola Frikis</h1>

  <div class="text--primary">
    <!-- Using the elevation prop -->
    <v-hover v-slot="{ isHovering, props }">
      <v-card
        v-bind="props"
        :elevation="isHovering ? 24 : 6"
        class="mx-auto pa-6"
      >
        Prop based elevation
      </v-card>
    </v-hover>

    <div class="my-6"></div>

    <!-- Using a dynamic class -->
    <v-hover v-slot="{ isHovering, props }">
      <div
        v-bind="props"
        :class="`elevation-${isHovering ? 24 : 6}`"
        class="mx-auto pa-6 transition-swing"
      >
        Class based elevation
      </div>
    </v-hover>
  </div>


</template>

<style scoped>


</style>
