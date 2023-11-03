<template>
  <NavBar />
  <div class="loginMenu">
    <div class="form">
      <div v-if="showLogin" class="loginForm">
        <input type="email" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Mot de passe" v-model="password"/>
        <button @click="login">Connexion</button>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
        <p class="message">Vous n'avez pas de compte ? <a @click="showRegisterForm">Créer un compte</a></p>
      </div>
      <form v-else class="registerForm">
        <input type="text" placeholder="Nom"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Mot de Passe"/>
        <div class="check"><input type="checkbox" id="maCheckbox" v-model="isResponsable"><label for="maCheckbox">S'inscrire en tant que responsable.</label></div>
        <div v-show="isResponsable">
          <select>
            <option v-for="companie in companies">{{ companie.name }}</option>
          </select>
        </div>
        <button @click="register">Inscription</button>
        <p class="message">Vous avez déjà un compte ?<a @click="showLoginForm">Se connecter</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "../components/NavBar.vue";


axios.defaults.withCredentials = false;
export default {
  name: "Login",
  components: {NavBar},
  data() {
    return {
      showLogin: true,
      isResponsable: false,
      companies: [],
      email: '',
      password: '',
      loginError: '',
    };
  },
  created() {
    axios.get('http://localhost:3000/api/companie')
        .then((response) => {
          this.companies = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
  },
  methods: {
    showRegisterForm() {
      this.showLogin = false;
    },
    showLoginForm() {
      this.showLogin = true;
    },
    register() {
      // Ajoutez ici la logique d'inscription
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/users/connexion', {
          email: this.email,
          password: this.password,
        });

        // Gérez la réponse du backend ici.
        if (response.data === "Email ou password incorrect") {
          // Afficher un message d'erreur en cas d'authentification échouée
          this.loginError = "Email ou Mot de passe incorrect";
        } else {
          // L'authentification a réussi. Vous pouvez rediriger l'utilisateur vers une autre page ou effectuer d'autres actions nécessaires.
          // Créer un cookie
          this.$cookies.set('Name', response.data, 0);
          // Lire un cookie
          const valeurCookie = this.$cookies.get('Name');
          // Rediriger en fonction de la valeur d'isAdmin
          if (valeurCookie.isAdmin === 1) {
            this.$router.push('/dashboard-admin');
          } else {
            this.$router.push('/profil');
          }
        }
      } catch (error) {
        console.error(error);
        // Gérez les erreurs d'Axios ici.
      }
    }
  },
};
</script>


<style scoped lang="scss">
body{
  background-color: #aeaeae;
}
.loginMenu{
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  border-radius: 2rem;
}
select{
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
select option {
  background-color: #f2f2f2;
  color: #333;
  font-size: 14px;
  padding: 5px;
  border-radius: 10px;
}

select option:hover {
  background-color: #e0e0e0;
}
.error-message{
  font-size: 14px;
  color: crimson;
}

.form input[type=checkbox]{
  box-shadow: none;
  box-shadow: none;
  width: auto;
  margin: 10px;
  margin-bottom: 20px;
}
.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
.check{
  display: flex;
  align-items: center;
  label{
    font-size: 14px;
    margin-bottom: 10px;
    color: #595959;
  }
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #696969;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 10px;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #595959;
  transition: 0.5s;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #696969;
  text-decoration: none;
  cursor: pointer;
}

</style>