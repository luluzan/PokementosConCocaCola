<template>
  <v-card class="mx-auto" max-width="220" :style="{ backgroundColor: typeColors[pokemon.type] }" cover>
    <v-img class="align-end text-black" :src="pokemon.imageUrl" :style="{ backgroundColor: typeColors[pokemon.type] }"
      cover contain>
    </v-img>

    <v-card-subtitle class="text-center">ID: {{ pokemon.id }}</v-card-subtitle>
    <v-card-title class="text-center">Name: {{ pokemon.name }}</v-card-title>

    <v-card-text>
      <div class="text-center" :style="{ backgroundColor: typeColors[pokemon.type] }" cover>Type: {{ pokemon.type }}</div>
    </v-card-text>

    <v-card-actions>
      <div class="text-center">
        <v-btn color="black" @click="overlay = !overlay">Click me!</v-btn>

        <v-overlay v-model="overlay" class="align-center justify-center">
          <v-card class="mx-auto" width="70vw">
            <v-img class="align-end text-black" :src="pokemon.imageUrl"
              :style="{ backgroundColor: typeColors[pokemon.type] }" fit>
              <v-card-title class="text-center">ID: {{ pokemon.id }}</v-card-title>
            </v-img>

            <v-card-title class="pt-4 text-center">Name: {{ pokemon.name }}</v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <div>Type: {{ pokemon.type }}</div>
                  <div>Species: {{ pokemon.species }}</div>
                  <div>Height: {{ pokemon.height }}</div>
                  <div>Weight: {{ pokemon.weight }}</div>
                </v-col>
                <v-col cols="6" class="text-end">
                  <div>Number of Abilities: {{ pokemon.abilities.length }}</div>
                  <div>Abilities:</div>
                  <ul>
                    <li v-for="ability in pokemon.abilities" :key="ability" :style="{ listStyleType: none }">
                      {{ ability }} </li>
                  </ul>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-overlay>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { reactive, onMounted, watch, computed } from 'vue'
import axios from 'axios'

export default {
  data: () => ({
    overlay: false,
  }),
  setup() {
    const pokemon = reactive({
      id: '',
      name: '',
      imageUrl: '',
      type: '',
      height: '',
      weight: '',
      abilities: [],
      species: ''
    })

    const fetchPokemonData = (id) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          const data = response.data
          pokemon.id = data.id
          pokemon.name = data.name
          pokemon.imageUrl = data.sprites.other['official-artwork'].front_default
          pokemon.type = data.types[0].type.name
          pokemon.height = data.height
          pokemon.weight = data.weight
          pokemon.abilities = data.abilities.map(ability => ability.ability.name)
          fetchPokemonSpecies(data.species.url)
        })
        .catch(error => {
          console.log(error)
        })
    }

    const fetchPokemonSpecies = (url) => {
      axios
        .get(url)
        .then(response => {
          const data = response.data
          pokemon.species = data.genera.find(genus => genus.language.name === 'en').genus
        })
        .catch(error => {
          console.log(error)
        })
    }

    // Propiedad que representa el número de ID del Pokémon
    let pokemonId = 28

    // Vigila los cambios en la propiedad pokemonId
    watch(() => pokemonId, (newPokemonId) => {
      fetchPokemonData(newPokemonId)
    })

    onMounted(() => {
      fetchPokemonData(pokemonId) // Carga el Pokémon inicialmente
    })

    // Mapeo de tipos de Pokémon con colores
    const typeColors = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5'
    }

    // Clase dinámica basada en el tipo de Pokémon
    const pokemonClass = computed(() => {
      const type = pokemon.type.toLowerCase()
      return `poke-card ${type}`
    })

    return {
      pokemon,
      typeColors,
      pokemonClass
    }
  }
}
</script>

