<script>
import axios from 'axios';
import { ref } from 'vue';

const colorsType = {
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
};

const objColors = Object.keys(colorsType);
const  pokemonCount=1110;
//const APIUrl='https://pokeapi.co/api/v2/pokemon/?limit=1126';
const APIUrl='https://pokeapi.co/api/v2/pokemon/';
let name='Nombre';
let type='';
let color='';
let id='';
let image='';
let idImg='';

const generateData=async()=>{
        for (let i = 1; i <= pokemonCount; i++) {
                let url = `${APIUrl}${i}`;
                try {
                        const res = await axios.get(url);
                        name=convert(res.data.name);
                        id=res.data.id;
                        type=res.data.types.map(type => type.type.name);
                        color=colorsType[objColors.find(type => type.indexOf(type) > -1)];
                        console.log(id);
                } catch (error) {
                        console.log(error);
                }
        }
}

const searchId=async(idSearch)=>{
  let url = `${APIUrl}${idSearch}`;
  try {
          const res = await axios.get(url);
          name=convert(res.data.name);
          id=res.data.id;
          type=res.data.types.map(type => type.type.name);
          //image = res.data.sprites.front_default;//? Obtener la imagen desdde la API
          idImg=insertZero(id);
          image=`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idImg}.png`;
          type=type[0];
          color=colorsType[objColors.find(type => type.indexOf(type) > -1)];
          console.log(name);
          console.log(id);
          console.log(type);
          console.log(image);
          console.log(color);
  } catch (error) {
          console.log(error);
  }
}

const searchName=async(namePokemon)=>{
  for (let i = 1; i <= pokemonCount; i++) {
          let url = `${APIUrl}${i}`;
          try {
                  const res = await axios.get(url);
                  if (namePokemon===res.data.name){
                    name=convert(res.data.name);
                    id=res.data.id;
                    type=res.data.types.map(type => type.type.name);
                    type=type[0];
                    color=colorsType[objColors.find(type => type.indexOf(type) > -1)];
                    console.log(name);
                    console.log(id);
                    console.log(type);
                    console.log(color);
                  }
          } catch (error) {
                  console.log(error);
          }
  }
}

const searchType=async(typePokemon)=>{
  let typeVer='';
  for (let i = 1; i <= pokemonCount; i++) {
          let url = `${APIUrl}${i}`;
          try {
                  const res = await axios.get(url);
                  type=res.data.types.map(type => type.type.name);
                  // console.log(type);
                  // console.log(type.length);
                  if(type.length>1){
                    typeVer=type[0]+' | '+type[1];
                  } else {                
                    typeVer=type[0];
                  }
                  if (typePokemon===type[0]){
                    name=convert(res.data.name);
                    id=res.data.id;
                    color=colorsType[objColors.find(type => type.indexOf(type) > -1)];
                    console.log(name);
                    console.log(id);
                    console.log(typeVer);
                    console.log(color);
                  }

                
          } catch (error) {
                  console.log(error);
          }
  }
}

export default {
  setup() {
    const idPokemon = ref('');

    const submitFormId = () => {
      searchId(idPokemon.value);
    };

    const namePokemon = ref('');

    const submitFormName = () => {
      searchName(namePokemon.value);
    };

    const typePokemon = ref('');

    const submitFormType = () => {
      searchType(typePokemon.value);
    };

    return {
      idPokemon,
      submitFormId,
      namePokemon,
      submitFormName,
      typePokemon,
      submitFormType
    };
  }
};

const convert=(str)=>{
  return str.slice(0,1).toUpperCase()+str.slice(1);
}

const insertZero=(str)=>{
        let strZero=str.toString();
        let exit=true;
        do{
                if(strZero.length!==3){
                        strZero='0'+strZero;
                }else{
                        exit=false;
                }
        }while(exit);
        return strZero;
}

// generateData();

</script>

<template>
    <h2>BUSCAR POR ID</h2>
    <form @submit.prevent="submitFormId">
      <label for="idPokemon">ID:</label>
      <input type="text" id="idPokemon" v-model="idPokemon">
      <button type="submit">Enviar</button>
    </form>

    <h2>BUSCAR POR NOMBRE</h2>
    <form @submit.prevent="submitFormName">
      <label for="namePokemon">Name:</label>
      <input type="text" id="namePokemon" v-model="namePokemon">
      <button type="submit">Enviar</button>
    </form>

    <h2>BUSCAR POR TIPO</h2>
    <form @submit.prevent="submitFormType">
      <label for="typePokemon">Selección:</label><br>
      <select id="typePokemon" v-model="typePokemon">
        <option value="">Seleccione una opción</option>
        <option value="fire">fire</option>
        <option value="grass">grass</option>
        <option value="electric">electric</option>
        <option value="water">water</option>
        <option value="ground">ground</option>
        <option value="rock">rock</option>
        <option value="fairy">fairy</option>
        <option value="poison">poison</option>
        <option value="bug">bug</option>
        <option value="dragon">dragon</option>
        <option value="psychic">psychic</option>
        <option value="flying">flying</option>
        <option value="fighting">fighting</option>
        <option value="normal">normal</option>
      </select>
      <br>
      <button type="submit">Enviar</button>
    </form>

    <h2></h2>
</template>

<style>
input {
  width: 100%;
  box-shadow: none;
  border: none;
  outline: none;
  font: 200 20px/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
}
</style>


