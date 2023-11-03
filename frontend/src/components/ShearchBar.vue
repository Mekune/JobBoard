<script>
export default {
  name: "shearchbar",
};
</script>

<template>
  <div class="shearchbar">
    <div>
      <input placeholder="Métier, mots-clé ou entreprise">
    </div>
    <div>
      <input placeholder="Ville, Code Postal">
    </div>
    <div>
      <button>Recherche</button>
    </div>
  </div>
</template>

<style scoped lang="scss">

.shearchbar{
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
  transition: ease-in-out 0.2s;
  box-shadow: rgba(0, 0, 0, 0.20) 0px 3px 17px;
  border-radius: 30px;
  padding: 25px;
  position: relative;
  bottom: 45px;
  &:hover{
    transition: ease-in-out 0.2s;
    box-shadow: rgba(0, 0, 0, 0.20) 0px 0px 0px 2px;
  }
  &:focus-within{
    transition: ease-in-out 0.2s;
    box-shadow: rgba(0, 0, 0, 0.20) 0px 0px 0px 2px;
  }
  div:nth-child(1){
    input{
      background-image: url(/src/assets/694985.png);
      background-size: 20px;
      background-position: 10px 10px;
      background-repeat: no-repeat;
      background-color: white;
      flex: 1;
      padding: 10px;
      padding-left: 50px;
      border: 1px solid #ccc;
      border-radius: 0px;
      font-size: 16px;
      outline: none;
      border: none;
      width: 260px;
      border-right: solid gray 1px;
    }
  }
  div:nth-child(2){
    input{
      background-image: url(/src/assets/pngegg.png);
      background-size: 15px;
      background-position: 10px 9px;
      background-repeat: no-repeat;
      background-color: white;
      flex: 1;
      padding: 10px;
      padding-left: 50px;
      border: 1px solid #ccc;
      font-size: 16px;
      outline: none;
      border: none;
      width: 260px;
    }
  }
  button {
    background-color: #0D3B66;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
    transition: ease-in-out 0.2s;
    &:hover {
      transition: ease-in-out 0.2s;
      background-color: #0056b3;
    }
  }
}



</style>