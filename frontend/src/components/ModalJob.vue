<script>
export default {
  name: "ModalJob",
  props: {
    show: Boolean, // Propriété pour contrôler l'affichage du modal
    advertisement: Object, // Propriété pour l'annonce
  },
    methods: {
      closeModal() {
        this.$emit("close-modal"); // Émettre un événement pour demander la fermeture du modal
      },
      closeOnBackgroundClick(event) {
        if (event.target === this.$el) {
          this.closeModal();
        }
      },
    },


};
</script>

<template>
  <div class="modal-wrapper" v-if="show" @click="closeOnBackgroundClick">
    <div class="modal-content">
      <div class="title-close">
        <div>
          <div class="title-entre-lieux">
            <h2>{{advertisement.title}}</h2>
            <p>{{ advertisement.companie_name }}</p>
          </div>

          <span>{{ advertisement.location }}</span>
        </div>

        <button @click="closeModal()">

        </button>
      </div>
      <div class="description">
        <ul>
          <li>{{ advertisement.description }}</li>
        </ul>
      </div>
      <div class="date">
        <p>Offre Publié il y a {{ advertisement.date_posted }} jours.</p>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">


.modal-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: auto; /* Activer le défilement vertical si le contenu du modal est trop long */

  .modal-content {
    background: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    width: 60vw;
    .date{
      p{
        margin-top: 30px;
        color: #9b9b9b;
        margin-bottom: 0px;
        font-size: 14px;
      }
    }
    .description{
      li{
        width: 100%;
      }
    }
    .title-close{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      span{
        display: inline-block;
        background: #f3f2f1;
        color: #767676;
        border-radius: 5px;
        padding: 5px 10px;
        margin: 10px 15px;
      }
      .title-entre-lieux{
        display: flex;
        flex-direction: column;
        h2{
          margin: 0px;
        }
        p{
          margin: 5px;
          font-size: 17px;
        }

      }
      button{
        border: none;
        border-radius: 10px;
        background-image: url(/src/assets/x.png);
        background-size: 45px;
        background-position: 3px 3px;
        background-repeat: no-repeat;
        background-color: transparent;
        width: 50px;
        height: 50px;
        cursor: pointer;
        padding: 0px;
        &:hover::before {
          content: "";
          position: relative;
          top: 0;
          display: block;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #aeb2dc4a;
          z-index: -1;
          border-radius: 10px;
          transition: ease-in-out 0.18s;
        }
      }
    }
  }
}



.modal-wrapper::-webkit-scrollbar {
  width: 12px;
}

.modal-wrapper::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3); /* Couleur de la thumb (pouce) */
}

.modal-wrapper::-webkit-scrollbar-track {
  background: transparent; /* Masque la piste de la barre de défilement */
}
</style>