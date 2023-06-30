<script>
import axios from "axios";

export default {
  data() {
    return {
      overlay: false,
      pokemonList: [],
      filteredPokemonList: [],
      selectedType: "",
      filterId: "",
      filterName: "",
      types: [
        "fire",
        "grass",
        "electric",
        "water",
        "ground",
        "rock",
        "fairy",
        "poison",
        "bug",
        "dragon",
        "psychic",
        "flying",
        "fighting",
        "normal",
        ""
      ],
      typeColors: {
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
        normal: "#F5F5F5",
      },
    };
  },
  created() {
    this.fetchPokemon();
    this.filterPokemonById();
  },
  methods: {
    fetchPokemon() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=1010")
        .then((response) => {
          const pokemonData = response.data.results;
          const promises = pokemonData.map((pokemon) =>
            axios.get(pokemon.url)
          );
          Promise.all(promises)
            .then((responses) => {
              const speciesPromises = responses.map((response) =>
                axios.get(response.data.species.url)
              );

              Promise.all(speciesPromises)
                .then((speciesResponses) => {
                  const generationPromises = speciesResponses.map((speciesResponse) =>
                    axios.get(speciesResponse.data.generation.url)
                  );

                  Promise.all(generationPromises)
                    .then((generationResponses) => {
                      const movesPromises = responses.map((response) =>
                        axios.get(response.data.moves[0].move.url)
                      );

                      Promise.all(movesPromises)
                        .then((movesResponses) => {
                          movesResponses.forEach((movesResponse, index) => {
                            const genusInfo = speciesResponses[index].data.genera.find((genus) => genus.language.name === "en");
                            const genus = genusInfo ? genusInfo.genus : "";
                            const region = generationResponses[index].data.main_region.name;
                            const genderRate = this.getGender(speciesResponses[index].data.gender_rate);
                            const moves = movesResponses[index].data.names.filter((name) => name.language.name === "en").map((name) => {
                              return {
                                name: name.name,
                                language: name.language,
                              };
                            });

                            const pokemon = {
                              id: index + 1,
                              name: responses[index].data.name,
                              image: responses[index].data.sprites.other["official-artwork"].front_default,
                              type: responses[index].data.types[0].type.name,
                              height: responses[index].data.height,
                              weight: responses[index].data.weight,
                              baseExperience: responses[index].data.base_experience,
                              abilities: responses[index].data.abilities.map((ability) => ability.ability.name),
                              hp: responses[index].data.stats.find((stat) => stat.stat.name === "hp").base_stat,
                              attack: responses[index].data.stats.find((stat) => stat.stat.name === "attack").base_stat,
                              genus,
                              region,
                              genderRate,
                              moves,
                            };

                            this.pokemonList.push(pokemon);
                            this.filterPokemonByType();
                          });
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    filterPokemonByType() {
      let filteredList = this.pokemonList;
      if (this.selectedType) {
        filteredList = filteredList.filter((pokemon) => pokemon.type === this.selectedType);
      }
      this.filteredPokemonList = filteredList;
    },

    filterPokemonById() {
      let filteredList = this.pokemonList;
      if (this.filterId) {
        filteredList = filteredList.filter((pokemon) => pokemon.id.toString() === this.filterId);
      }
      this.filteredPokemonList = filteredList;
    },

    filterPokemonByName() {
      let filteredList = this.pokemonList;
      if (this.filterName) {
        filteredList = filteredList.filter((pokemon) => pokemon.name.toLowerCase() === this.filterName.toLowerCase());
      }
      this.filteredPokemonList = filteredList;
    },

    getGender(genderRate) {
      if (genderRate === -1) {
        return "Genderless";
      } else if (genderRate === 0) {
        return "Male";
      } else if (genderRate === 8) {
        return "Female";
      } else {
        return "Both";
      }
    },
    getEnglishMoveNames(moves) {
      return moves.filter((move) => move.language.name === "en").map((move) => move.name);
    },
  },
  watch: {
    selectedType() {
      this.filterPokemonByType();
    },
    filterId() {
      this.filterPokemonById();
    },
    filterName() {
      this.filterPokemonByName();
    },
  },
};
</script>

<template>
  <div>
    <div class="pokeSearch">
    <v-text-field class="custom-text-field" v-model="filterName" label="Buscar NOMBRE"></v-text-field>
    <v-text-field class="custom-text-field" v-model="filterId" label="Introduce ID"></v-text-field>
    <v-select class="custom-select" v-model="selectedType" :items="types" label="Selecciona TIPO"></v-select>
  </div>

    <v-container>
      <v-row>
        <v-col v-for="pokemon in filteredPokemonList" :key="pokemon.id" cols="12" sm="6" md="4"     lg="3">
          <v-card elevation="6" rounded="lg">
            <v-img :src="pokemon.image" :style="{ backgroundColor: typeColors[pokemon.type] }" height="200"></v-img>
            <div class="wrap">
              <v-img src="/imgs/fondoPokeCard.jpg" class="bg" ></v-img>
              <div class="content">
                <v-card-text>
              <div>Id: {{ pokemon.id }}</div>
              <div>Nombre: {{ pokemon.name }}</div>
              <div>Tipo: {{ pokemon.type }}</div>
              <div>Altura: {{ pokemon.height }} m</div>
              <div>Peso: {{ pokemon.weight }} kg</div>
              <div>Habilidades: {{ pokemon.abilities.join(", ") }}</div>
              <div>Puntos de Experiencia: {{ pokemon.baseExperience }}</div>
              <div>Salud: {{ pokemon.hp }}</div>
              <div>Ataque: {{ pokemon.attack }}</div>
              <div>Especie: {{ pokemon.genus.replace(' Pokémon', '') }}</div>
              <div>Region: {{ pokemon.region }}</div>
              <div>Género: {{ pokemon.genderRate }}</div>
              <div>Movimiento de ataque: {{ getEnglishMoveNames(pokemon.moves).join(", ") }}</div>
            </v-card-text>
              </div>
              <v-card-actions>
                  <v-btn
                    class="mx-auto mt-n6 text-none" size="x-large" block  @click="overlay = !overlay"> Más detalles
                  </v-btn>
                <v-overlay v-model="overlay" class="align-center justify-center" scrim="black">
                  <v-card class="mx-auto" rounded="lg" :style="{ backgroundColor: typeColors[pokemon.type] }" width="95vmin">
                    <v-container class="d-flex align-center justify-center">
                      <img class="pokeball" src="/imgs/pokeball.png" height="60">
                      <v-card-title class="pokemonnameoverlay text-center pa-6
                        text-h4            [1]
                        text-md-h2         [2]
                        text-lg-h2         [2]
                        text-xl-h2         [2] 
                        text-truncate      [3]" :style="{ backgroundColor: typeColors[pokemon.type] }">{{ pokemon.name }}</v-card-title>
                        </v-container>
                      <v-img :src="pokemon.image" height="50vh" class="mx-auto">
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
                            <v-card-text class="text-end">{{ pokemon.genderRate }}</v-card-text>
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
                  </v-card>
                </v-overlay>
              </v-card-actions> 
            </div> 
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
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
