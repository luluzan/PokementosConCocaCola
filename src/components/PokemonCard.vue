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
      moveData: [],
      baseExperience: 0,
    });
    const fetchPokemonData = (id) => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
          const data = response.data;
          pokemon.id = String(data.id).padStart(4, '0');
          pokemon.name = data.name;
          pokemon.imageUrl = data.sprites.other["official-artwork"].front_default;
          pokemon.type = data.types.map(type => type.type.name);
          pokemon.height = data.height;
          pokemon.weight = data.weight;
          pokemon.abilities = data.abilities.map(ability => ability.ability.name);
          pokemon.health = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
          pokemon.attack = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
          pokemon.baseExperience = data.base_experience;
          fetchPokemonSpecies(data.species.url);
          fetchMoveData(data.moves);
          const speciesUrl = data.species.url;
          fetchPokemonRegion(speciesUrl);
        })
        .catch(error => {
          console.log(error);
        });
    };

    const fetchPokemonRegion = (speciesUrl) => {
      axios
        .get(speciesUrl)
        .then(response => {
          const data = response.data;
          const regionUrl = data.generation.url;
          axios.get(regionUrl)
            .then(regionResponse => {
              const regionData = regionResponse.data;
              pokemon.regionName = regionData.main_region.name;
            })
            .catch(error => {
              console.log(error);
            });
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
          pokemon.gender = getGender(data.gender_rate); // Asignar el sexo del Pokémon usando la función getGender
        })
        .catch(error => {
          console.log(error);
        });
    };

    // Función para obtener el sexo del Pokémon basado en la tasa de género
    const getGender = (genderRate) => {
      if (genderRate === -1) {
        return "Genderless";
      } else if (genderRate === 0) {
        return "Male";
      } else if (genderRate === 8) {
        return "Female";
      } else {
        return "Both";
      }
    };
    // Propiedad que representa el número de ID del Pokémon
    let pokemonId = 721;
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
  
  <template>
  <v-card class="mx-auto mb-6" max-width="221" max-height="331" elevation="8"  rounded="lg">
    <!-- <v-img :src="pokemon.imageUrl" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">
      </v-img> -->
        <div :style="{ backgroundColor: typeColors[pokemon.type[0]] }">
          <v-img class="mx-auto pa-2" height="222" :src="pokemon.imageUrl">
          </v-img>
        </div>
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
                    <h6 class="text-end">{{ pokemon.regionName }}</h6>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="3.5" class="pa-0 pl-3 mt-n2">
                    <button class="text-center px-1" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">{{ pokemon.type[0] }}</button>
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
                    <button class="text-center px-1" :style="{ backgroundColor: typeColors[pokemon.type[1]] }">{{ pokemon.type[1] }}</button>
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
            class="mx-auto mt-n6 text-none"
            size="small"
            @click="overlay = !overlay">
            More about me!
          </v-btn>
        </v-hover>
        
        <v-overlay v-model="overlay" class="align-center justify-center" scrim="black">
          <v-card class="mx-auto" rounded="lg" :style="{ backgroundColor: typeColors[pokemon.type[0]] }" width="95vmin">
            <v-container class="d-flex align-center justify-center">
              <img class="pokeball" src="/imgs/pokeball.png" height="60">
              <v-card-title class="pokemonnameoverlay text-center pa-6
              text-h4            [1]
              text-md-h2         [2]
              text-lg-h2         [2]
              text-xl-h2         [2] 
              text-truncate      [3]" :style="{ backgroundColor: typeColors[pokemon.type[0]] }">{{ pokemon.name }}</v-card-title>
            </v-container>
              <v-img :src="pokemon.imageUrl" height="50vh" class="mx-auto">
              </v-img>
            <v-divider></v-divider>
            <v-card color="#E46D6D" width="85%" rounded="xl" class="carddata mx-auto my-4">
              <v-card-text class="mx-auto my-n3">
                <v-row class="mb-n12">
                  <v-col cols="6">
                    <v-card-title>Height</v-card-title>
                  </v-col>
                  <v-col cols="6">
                    <v-card-title class="text-end">Gender</v-card-title>
                  </v-col>
                </v-row>
                <v-row class="mb-n12">
                  <v-col cols="6">
                    <v-card-text>{{ pokemon.height }} m</v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-text class="text-end">{{ pokemon.gender }}</v-card-text>
                  </v-col>
                </v-row>
                <v-row class="mb-n12">
                    <v-col cols="6">
                      <v-card-title>Weight</v-card-title>
                    </v-col>
                    <v-col cols="6">
                      <v-card-title class="text-end">Ability</v-card-title>
                    </v-col>
                  </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-card-text>{{ pokemon.weight }} kg</v-card-text>
                  </v-col>
                  <v-col cols="6">
                    <v-card-text class="text-end">{{ pokemon.abilities[0] }}</v-card-text>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
           <!-- <div class="text-end">
              <v-btn
                class="pokedexbtn text-none my-6 mr-16"
                color="#E46D6D"
                size="x-large"
                variant="flat"
                rounded="lg"
              >
                Pokedex
              </v-btn> 
            </div> -->
          </v-card>
        </v-overlay>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style scoped>
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

button {
  border-radius: 6px;
  font-size: 0.625rem;
 }

 .pokemonnameoverlay {
  font-size: 5rem;
 }

 .carddata {
  border: 4px solid black;
 }

 .pokedexbtn {
  border: 4px solid black;
 }

 /* Media queries para los tamaños de imagen */
@media (max-width: 960px) {
  .pokeball {
    height: 45px !important;
  }
}

@media (max-width: 600px) {
  .pokeball {
    height: 30px !important;
  }
}
</style>

