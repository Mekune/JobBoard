<script>
import ModalJob from "./ModalJob.vue"

export default {
  name: "card",
  components: {
    ModalJob,
  },
  props: {
    advertisement: Object
  },
  data() {
    return {
      showModal: false,
    };
  },
};

</script>

<template>
  <div class="card" @click="showModal = true">
    <div class="all-info">
      <div class="title-Menu">
        <div class="title-entr">
          <h2><h2>{{ advertisement.title }}</h2></h2>
          <p>{{ advertisement.companie_name }}</p>
        </div>
        <div class="menu-emploi"></div>
      </div>
      <div class="lieux">
        <p>{{ advertisement.location }}</p>
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
  <ModalJob :advertisement="advertisement" :show="showModal" @close-modal="showModal = false" />
</template>

<style scoped lang="scss">

.card {
  transition: all 0.2s;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 3px 0px, rgba(27, 41, 35, 0.19) 0px 0px 0px 1px;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  min-width: 40vw;
  &:hover{
    transition: all 0.2s;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    cursor: pointer;
    .title-Menu{
      display: flex;
      h2{
        text-decoration: underline;
      }
    }

  }

  &:hover::after {
    width: 100%;
    transition: ease-in-out 0.18s;

  }

  &::after {
    background-color: #6874d9;
    border-radius: 30px;
    content: "";
    display: block;
    height: 4px;
    width: 0px;
    position: relative;
    top: 22px;
    transition: ease-in-out 0.18s;
    z-index: -1;
  }
  h2{
  margin: 0;
  }
  p{
  margin: 0;
  font-size: 17px;
  }
  .all-info{
  //display: flex;
  //flex-direction: column;
    .title-Menu{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title-entr{
        display: flex;
        padding-left: 10px;
        flex-direction: column;
        gap: 5px;
      }
        .menu-emploi{
          background-image: url(/src/assets/menu-right.png);
          background-size: 40px;
          background-position: 5px 5px;
          background-repeat: no-repeat;
          background-color: transparent;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          transition: ease-in-out 0.18s;

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
  .date{
    p{
      font-size: 14px;
      color: gray;

    }
  }
.lieux{
  p{
    display: inline-block;
    background: #f3f2f1;
    color: #767676;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 20px;
    margin: 10px 15px;
  }
}
.description{
  margin-bottom: 25px;
  max-width: 40vw;
  ul {
    li {
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

}
}
}




</style>