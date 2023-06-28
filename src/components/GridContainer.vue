<script setup>

import PokemonLittleCard from './PokemonLittleCard.vue';

    // export default {
    // name: 'GridContainer'
    // }
</script>

<template>
    <div>
        <v-container class="custom-bg-opacity mb-6">
            <v-row  no-gutters medida>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                    <div class="card1">
                       <PokemonLittleCard />
                    </div>                                
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>
                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

                <v-col cols="12" sm="6" lg="3" elevation="24" class="medida my-10">
                   <PokemonLittleCard />                   
                </v-col>

            </v-row>
        </v-container>
     </div>
 
</template>


<style>
.medida {
    text-align: center;
    width: 200px;
    height: 382px;
      /* background-color: aqua;
    border: 3px solid black; */
}
.custom-bg-opacity {
  background-color: rgba(255, 255, 255, 0.9); 
}

</style>