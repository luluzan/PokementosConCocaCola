<script>
export default{
    
}

</script>
<template>
    <div class="search">
        <v-select v-model="selectedType" :items="types" label="Seleccionar TIPO"></v-select>
        <v-text-field v-model="filterId" label="Buscar por ID"></v-text-field>
        <v-text-field v-model="filterName" label="Buscar por nombre"></v-text-field>
    </div>
</template>
<style>
.search{
    background-color: #fff;
}
</style>