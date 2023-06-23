<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <v-toolbar density="comfortable" color="#C83D34"></v-toolbar>
    <v-divider   :thickness="5"   class="border-opacity-100"  color="warning"></v-divider>
    <v-toolbar density="comfortable" color="#1D2C5E"></v-toolbar>
    <v-img  :width="300"  aspect-ratio="16/9"   variant=elevado src="../public/imgs/Lupa_29.webp"></v-img>
  </header>

  <h1>Hola Frikis</h1>


</template>

<style scoped>


</style>
