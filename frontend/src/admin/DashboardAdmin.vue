<template>
  <div>
    <NavBar />
    <div class="container">
      <div class="dashboard">
        <h1>Tableau de bord de l'administrateur</h1>
        <!-- Section d'ajout de job -->
        <div class="job-form">
          <h2>Ajouter un nouvel emploi</h2>
          <form @submit="addJob">
            <input v-model="newJob.title" placeholder="Titre de l'emploi" required />
            <input v-model="newJob.salary" placeholder="Salaire" required />
            <select v-model="newJob.id_responsable">
              <option>Responsable</option>
              <option v-for="responsable in responsables" :value="responsable.id">{{responsable.username}} ({{responsable.companiesname}})
              </option>
            </select>
            <textarea v-model="newJob.description" placeholder="Description de l'emploi" required></textarea>
            <button type="submit">Ajouter</button>
          </form>
        </div>

        <!-- Liste des emplois existants -->
        <div class="job-list">
          <h2>Liste des emplois</h2>
          <ul>
            <li v-for="job in jobs" :key="job.id">
              {{ job.title }}
              <div>
                <button @click="editJob(job)">Éditer</button>
                <button @click="deleteJob(job.id)">Supprimer</button>
              </div>
            </li>
          </ul>
        </div>

        <!-- Formulaire d'édition d'emploi -->
        <div v-if="editingJob">
          <h2>Éditer l'emploi</h2>
          <form>
            <input v-model="editingJob.title" placeholder="Titre de l'emploi" required />
            <input v-model="editingJob.salary" placeholder="Salaire" required />
            <select v-model="editingJob.id_responsable">
              <option>Responsable</option>
              <option v-for="responsable in responsables" :value="responsable.id">{{responsable.username}} ({{responsable.companiesname}})
              </option>
            </select>
            <textarea v-model="editingJob.description" placeholder="Description de l'emploi" required></textarea>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

export default {
  name: "DashboardAdmin",
  components: { NavBar },
  data() {
    return {
      newJob: { title: "", description: "", salary: "", id_responsable: "" },
      jobs: [],
      responsables: [],
      editingJob: { id:"", title: "", description: "", salary: "", id_responsable: "" },
    };
  },
  mounted() {
    this.fetchJobs();
    this.fetchResponsable();
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await axios.get("http://localhost:3000/api/advertisement");
        this.jobs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchResponsable() {
      try {
        const response = await axios.get("http://localhost:3000/api/responsable");
        this.responsables = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addJob() {
      try {
        const response = await axios.post("http://localhost:3000/api/advertisement/add", this.newJob);
        this.jobs.push(response.data);
        this.newJob = { title: "", description: "", salary: "", id_responsable: "" };
      } catch (error) {
        console.error(error);
      }
    },
    async editJob(job) {
      this.editingJob.id = job.id;
      try {
        const response = await axios.put("http://localhost:3000/api/advertisement/update", {
          id: this.editingJob.id,
          title: this.editingJob.title,
          description: this.editingJob.description,
          salary: this.editingJob.salary,
          id_responsable: this.editingJob.id_responsable,
        });

        // Mettre à jour la liste des emplois après l'édition
        await this.fetchJobs();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteJob(jobId) {
      try {
        await axios.delete("http://localhost:3000/api/advertisement/delete", {
          data: { id: jobId }
        });
        this.jobs = this.jobs.filter((job) => job.id !== jobId);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>

<style scoped lang="scss">
/* Styles spécifiques pour le tableau de bord administrateur */
.container {
  display: flex;
  justify-content: center;
  .dashboard {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    h1 {
      margin-top: 5px;
    }
  }
}

.job-form {
  margin-top: 20px;

  h2 {
    font-size: 1.5rem;
  }

}
form {
  display: flex;
  flex-direction: column;
  input,
  select,
  textarea {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    option {
      font-family: sans-serif;
      font-size: 1rem;
      padding-right: 10px;
    }
  }
  button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }
}
.job-list {
  margin-top: 20px;
  h2 {
    font-size: 1.5rem;
  }
  ul {
    list-style-type: none;
    margin-bottom: 0;
    padding: 10px;
    li {
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        margin-left: 10px;
        background-color: #FF2E2E;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
