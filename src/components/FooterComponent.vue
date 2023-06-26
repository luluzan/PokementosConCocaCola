<script>
// import Pokeball from '/public/imgs/pokeball.png'
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
<template>
  <footer class="footer">
    <div>
      <img src="/public/imgs/pokeball.png" class="pokeball" />
    </div>
    <p>&copy; {{ currentYear }} Mi Sitio Web</p>
  </footer>
</template>
<style>
.footer {
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #3c5aa6;
  padding: 20px;
  text-align: center;
  /* position: fixed;  */
  bottom: 0;
  left: 0;
  width: 100%;
}
.pokeball{
  width:47px;
}
</style>
