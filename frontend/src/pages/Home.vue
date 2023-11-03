<script>
import shearchbar from "../components/ShearchBar.vue";
import card from "../components/CardEmploi.vue"
import axios from 'axios';
import VueCookies from 'vue-cookies';
import { ref, onMounted } from 'vue';
import NavBar from "../components/NavBar.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    shearchbar,
    card,
  },
  data() {
    return {
      advertisements: [], // Ajoutez cette ligne
    };
  },
  created() {
    axios.get('http://localhost:3000/api/advertisement')
        .then((response) => {
          this.advertisements = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },

  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
};

</script>

<template>
  <NavBar />

  <main>

    <img src="/src/assets/imageBG.jpg" alt="">
    <shearchbar></shearchbar>
    <card v-for="advertisement in advertisements" :key="advertisement.id" :advertisement="advertisement" />
  </main>

</template>

<style scoped lang="scss">


main{
  display: flex;
  flex-direction: column;
  align-items: center;
  img{
    margin-top: 50px;
    width: 55%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    border-radius: 12px;
  }
}


//@media (min-width: 1024px) {
//  header {
//    display: flex;
//    place-items: center;
//    padding-right: calc(var(--section-gap) / 2);
//    .wrapper {
//      display: flex;
//      place-items: flex-start;
//      flex-wrap: wrap;
//    }
//  }
//}

</style>