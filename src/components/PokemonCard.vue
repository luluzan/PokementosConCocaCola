<template>
  <v-card class="mx-auto mb-6" max-width="230" max-height="332" elevation="8"  rounded="lg">
    <!-- <v-img :src="pokemon.imageUrl" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">
      </v-img> -->

        <v-img class="pokemonimg" :src="pokemon.imageUrl" height="210">
        </v-img>
      
    <div class="wrap">
      <v-img src="/imgs/fondoPokeCard.jpg" class="bg" ></v-img>
      <div class="content">
      <v-card-text>
                <v-row class="mt-n6">
                  <v-col cols="3.5">
                    <h6 class="text-start">{{ pokemon.id }}</h6>
                  </v-col>
                  <v-col cols="5">
                    <h6 class="text-center">{{ pokemon.name }}</h6>
                  </v-col>
                  <v-col cols="3.5">
                    <h6 class="text-end">{{ pokemon.species }}</h6>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3.5" class="pa-0 pl-3 mt-n2">
                    <btn class="text-center px-1" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">{{ pokemon.type[0] }}</btn>
                  </v-col>
                  <v-col cols="5" class="pa-0 mt-n2">
                    <p class="text-center">{{ pokemon.moveData[0] }}</p>
                  </v-col>
                  <v-col cols="3.5" class="pa-0 pr-3 mt-n2">
                    <p class="text-end">{{ pokemon.health }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3.5" class="pa-0 pl-3">
                    <btn class="text-center px-1" :style="{ backgroundColor: typeColors[pokemon.type[1]] }">{{ pokemon.type[1] }}</btn>
                  </v-col>
                  <v-col cols="5" class="pa-0">
                    <p class="text-center">{{ pokemon.moveData[1] }}</p>
                  </v-col>
                  <v-col cols="3.5" class="pa-0 pr-3">
                    <p class="text-end">{{ pokemon.attack }}</p>
                  </v-col>
                </v-row>
       </v-card-text>
       </div>
      <v-card-actions>
        <v-hover v-slot="{ isHovering, props }">
          <v-btn
            v-bind="props"
            :elevation="isHovering ? 4 : 1"
            class="mx-auto mt-n9"
            size="small"
            @click="overlay = !overlay">
            more about me!
          </v-btn>
        </v-hover>
        
        <v-overlay v-model="overlay" class="align-center justify-center" scrim="black">
          <v-card class="mx-auto" width="50vw" height="95vh" rounded="lg">
            <v-card-title class="pokemonnameoverlay text-center pb-12 pt-6">{{ pokemon.name }}</v-card-title>
            <v-img :src="pokemon.imageUrl" :style="{ backgroundColor: typeColors[pokemon.type[0]] }" height="40vh">
            </v-img>
            <v-divider></v-divider>
            <v-card-text class="mx-auto">
              <v-row>
                <v-col cols="2">

                </v-col>
                <v-col cols="4">
                  <v-card-title>Height</v-card-title>
                </v-col>
                <v-col cols="4">
                  <v-card-title class="text-end mt-n2">Ability 1</v-card-title>
                </v-col>
                <v-col cols="2"></v-col>
              </v-row>
              <v-row>
                <v-col cols="2">
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-center">{{ pokemon.height }} m</v-card-text>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-end mt-n2">{{ pokemon.abilities[0] }}</v-card-text>
                </v-col>
                <v-col cols="2"></v-col>
              </v-row>
              <v-row>
                <v-col class="2"></v-col>
                  <v-col cols="4">
                    <v-card-title>Weight</v-card-title>
                  </v-col>
                  <v-col cols="4">
                    <v-card-title class="text-end mt-n2">Ability 2</v-card-title>
                  </v-col>
                  <v-col cols="2"></v-col>
                </v-row>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="4">
                  <template v-if="pokemon.type.length > 1">
                  <v-card-text>{{ pokemon.weight }}</v-card-text>
                  </template>
                </v-col>
                <v-col cols="4">
                  <v-card-text class="text-end mt-n2">{{ pokemon.abilities[1] }}</v-card-text>
                </v-col>
                <v-col cols="2"></v-col>
              </v-row>
            </v-card-text>
            <v-btn 
              class="text-none"
              color="red-darken-3"
              size="x-large"
              variant="flat"
              rounded="lg"
              >
              Pokedex
            </v-btn>
          </v-card>
        </v-overlay>
      </v-card-actions>
    </div>
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
                pokemon.imageUrl = data.sprites.other.dream_world.front_default;
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
                pokemon.region = data.generation.name; // Asignar el nombre de la región a la propiedad pokemon.region
            })
                .catch(error => {
                console.log(error);
            });
        };
        // Propiedad que representa el número de ID del Pokémon
        let pokemonId = 238;
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
.pokemonimg {
  background-color: #FFFFEE;
}
p {
  font-size: 0.625rem;
}
h6 {
  font-size: 0.75rem;
}
ul {
  list-style-type:none;
}
.wrap {
  overflow: hidden;
  position: relative;
}
.bg {
  opacity: 0.2;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: auto;
}
.content {
  position: relative;
}
btn {
  border-radius: 8px;
  font-size: 0.625rem;
 }

 .pokemonnameoverlay {
  font-size: 6rem;
 }
</style>

