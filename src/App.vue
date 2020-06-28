<template>
  <div id="app">
    <!-- <img src="./assets/timg.jpg"> -->
    <router-view  />
    <div class="cominfor" >
        <p class="company">创鑫智慧医疗</p>
        <p class="company">Copyright © 2018 chuangxin</p>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};

</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  position: relative;
  min-height: 100vh;
  padding-bottom: 38px;
  box-sizing: border-box;
}
/* #app img{
    width: 100%;
} */
#app .cominfor{
    position: absolute;
    height: 38px;
    width: 100%;
    left: 0;
    bottom: 0px;
    margin: auto;
}
#app .company{
    font-size: 12px;
    color: #cccccc;
}
.chois .vs__dropdown-toggle {
border: none !important;
border: 0;
}


</style>
