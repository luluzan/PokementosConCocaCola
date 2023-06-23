<template>
  <v-card class="mx-auto" max-width="300">
    <v-img class="align-end text-white" height="300" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
      <v-card-title>ID: </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> Name: </v-card-subtitle>

    <v-card-text>
      <div>Type:</div>
    </v-card-text>

    <v-card-actions>
      <div class="text-center">
        <v-btn color="error" @click="overlay = !overlay"> Click me! </v-btn>

        <v-overlay v-model="overlay" class="align-center justify-center">
          <v-card class="mx-auto" max-width="600">
            <v-img class="align-end text-white" height="600" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
              <v-card-title> ID: </v-card-title>
            </v-img>

            <v-card-subtitle class="pt-4"> Name: </v-card-subtitle>

            <v-card-text>
              <div>Type:</div>
              <div>Other:</div>
              <div>Height:</div>
              <div>Weight:</div>
            </v-card-text>
          </v-card>
        </v-overlay>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
  }),
}
</script>
