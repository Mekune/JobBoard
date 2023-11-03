<script>

import {onMounted, ref, watchEffect} from "vue";
import VueCookies from "vue-cookies";

export default {
  name: "NavBar",
  setup() {
    const cookieValue = ref(null);
    const showSubMenu = ref(false);

    // Lire le cookie lors de la montée du composant
    onMounted(() => {
      const cookieData = VueCookies.get("Name");
      if (cookieData) {
        cookieValue.value = cookieData;
      }
    });

    // Ajoutez un watcher sur la route actuelle
    watchEffect(() => {
      const cookieData = VueCookies.get("Name");
      if (cookieData) {
        cookieValue.value = cookieData;
      }
    });

    const logout = () => {
      // Ajoutez ici la logique de déconnexion (par exemple, suppression du cookie)
      // Après la déconnexion, vous pouvez rediriger l'utilisateur vers la page d'accueil.
      VueCookies.remove("Name");
      window.location.href = "/"; // Redirection vers la page d'accueil
    };

    return {
      cookieValue,
      showSubMenu,
      logout,
    };
  },
};
</script>

<template>
  <header>
    <div>
      <a href="/">
        <img src="/src/assets/logo.svg" alt="Work Finder">
      </a>
    </div>
    <div>
      <!-- Affiche le bouton de connexion si l'utilisateur n'est pas connecté -->
      <a v-if="!cookieValue" class="button-56" href="/login-register">Connexion</a>

      <!-- Affiche le nom de l'utilisateur et le sous-menu si l'utilisateur est connecté -->
      <div class="user-name" @mouseover="showSubMenu = true" @mouseleave="showSubMenu = false">
        <span class="name" v-if="cookieValue">Connecté avec : <span>{{ cookieValue.UserName }}</span></span>
        <div v-if="showSubMenu" class="sub-menu">
          <a @click="logout">Déconnexion</a>
          <a href="/profile">Profil</a>
          <a v-if="cookieValue.isAdmin === 1" href="/dashboard-admin">Dashboard</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  align-items: center;
  display: flex;
  justify-content: space-around;
  line-height: 1.5;
  padding: 20px;
  width: calc(100% - 40px);
  div{
    img{
      width: 90px;
    }
    .name{
      background: #e0e0e0;
      padding: 10px;
      border-radius: 20px;
      span{
        padding: 5px 10px;
        background: #f2f2f2;
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
}

.button-56 {
  align-items: center;
  background-color: #FAF0CA;
  border: 2px solid #111;
  font-weight: bold;
  border-radius: 30px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-56:after {
  background-color: #111;
  border-radius: 30px;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transform: translate(8px, 8px);
  transition: transform .2s ease-out;
  z-index: -1;
}

.button-56:hover:after {
  transform: translate(0, 1px);
}

.button-56:active {
  background-color: #E1D8B5;
  outline: 0;
}

.button-56:hover {
  outline: 0;
}

.user-name {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.sub-menu {
  position: absolute;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 0px 0px 10px 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  top: 100%; /* Positionnez-le sous le nom de l'utilisateur */
  right: 15%;
}

.sub-menu a {
  padding: 10px 20px;
  text-decoration: none;
  display: block;
  color: #111;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin: 4px;
}

.sub-menu a:hover {
  background-color: #f2f2f2;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .button-56 {
    padding: 0 40px;
  }
}

</style>