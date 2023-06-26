<template>
  <v-card class="mx-auto" max-width="230" elevation="6" :style="{ backgroundColor: typeColors[pokemon.type[0]] }" cover rounded="sm">
      <v-img class="align-end text-black mx-auto" :src="pokemon.imageUrl" bg-color="#FFFFEE" width="100%">
      </v-img>

      <v-card-subtitle class="text-center">#{{ pokemon.id }}</v-card-subtitle>
      <v-card-title class="text-center">{{ pokemon.name }}</v-card-title>
      
      <v-card-text class="pa-0">
        <p class="text-center" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">{{ pokemon.species }}</p>
      </v-card-text>

      <v-card-actions>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            v-bind="props"
            :elevation="isHovering ? 4 : 1"
            class="mx-auto"
            size="small"
            @click="overlay = !overlay">
            more about me!
          </v-btn>
        </v-hover>
        <v-overlay v-model="overlay" class="align-center justify-center" scrim="black">
          <v-card class="mx-auto" max-width="100vw">
            <v-img :src="pokemon.imageUrl" :style="{ backgroundColor: typeColors[pokemon.type[0]] }" height="50vh">
            </v-img>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <v-card-subtitle>{{ pokemon.id }}</v-card-subtitle>
                </v-col>
                <v-col cols="4">
                  <v-card-subtitle class="text-center mt-n2">{{ pokemon.name }}</v-card-subtitle>
                </v-col>
                <v-col cols="4">
                  <v-card-subtitle class="text-end mt-n2">{{ pokemon.species }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-card-text>{{ pokemon.type[0] }}</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-center mt-n2">{{ pokemon.moveData[0] }}</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-end mt-n2">{{ pokemon.health }}</v-card-text>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <template v-if="pokemon.type.length > 1">
                  <v-card-text>{{ pokemon.type[1] }}</v-card-text>
                  </template>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-center mt-n2">{{ pokemon.moveData[1] }}</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-end mt-n2">{{ pokemon.attack }}</v-card-text>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-overlay>
      </v-card-actions>
  </v-card>
</template>

<script>
import { reactive, onMounted, watch, computed } from 'vue'
import axios from 'axios'

export default {
  data: () => ({
    overlay: false
    }),
    setup() {
        const pokemon = reactive({
            id: "",
            name: "",
            imageUrl: "",
            type: "",
            height: "",
            weight: "",
            abilities: [],
            species: "",
            health: 0,
            attack: 0,
            moveData: []
        });
        const fetchPokemonData = (id) => {
            axios
                .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(response => {
                const data = response.data;
                pokemon.id = data.id;
                pokemon.name = data.name;
                pokemon.imageUrl = data.sprites.other["official-artwork"].front_default;
                pokemon.type = data.types.map(type => type.type.name);
                pokemon.height = data.height;
                pokemon.weight = data.weight;
                pokemon.abilities = data.abilities.map(ability => ability.ability.name);
                pokemon.health = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
                pokemon.attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
                fetchPokemonSpecies(data.species.url);
                fetchMoveData(data.moves);
            })
                .catch(error => {
                console.log(error);
            });
        };

    const fetchMoveData = (moves) => {
      const movePromises = moves.slice(0, 2).map(move => {
        return axios.get(move.move.url);
      });

      axios
        .all(movePromises)
        .then(axios.spread((...responses) => {
          const moveNames = responses.map(response => response.data.name);
          pokemon.moveData = moveNames; // Actualizar la asignación de moveData en el objeto pokemon
        }))
        .catch(error => {
          console.log(error);
        });
    };

       const fetchPokemonSpecies = (url) => {
            axios
                .get(url)
                .then(response => {
                const data = response.data;
                pokemon.species = data.genera.find(genus => genus.language.name === "en").genus;
            })
                .catch(error => {
                console.log(error);
            });
        };
        // Propiedad que representa el número de ID del Pokémon
        let pokemonId = 187;
        // Vigila los cambios en la propiedad pokemonId
        watch(() => pokemonId, (newPokemonId) => {
            fetchPokemonData(newPokemonId);
        });
        onMounted(() => {
          fetchPokemonData(pokemonId); // Carga el Pokémon inicialmente
        });
        // Mapeo de tipos de Pokémon con colores
        const typeColors = {
            fire: "#FDDFDF",
            grass: "#DEFDE0",
            electric: "#FCF7DE",
            water: "#DEF3FD",
            ground: "#f4e7da",
            rock: "#d5d5d4",
            fairy: "#fceaff",
            poison: "#98d7a5",
            bug: "#f8d5a3",
            dragon: "#97b3e6",
            psychic: "#eaeda1",
            flying: "#F5F5F5",
            fighting: "#E6E0D4",
            normal: "#F5F5F5"
        };
        // Clase dinámica basada en el tipo de Pokémon
        const pokemonClass = computed(() => {
        const type = pokemon.type.toLowerCase();
        return `poke-card ${type}`;
        });

        return {
            pokemon,
            typeColors,
            pokemonClass,
        };
    }
}
</script>

<style scoped>
ul {
  list-style-type:none;
}
</style>

