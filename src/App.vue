<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  width: 100%;
  height: 100%;
}
body{
  margin: 0px;
  width: 100%;
  height: 100%;
}
.el-container.is-vertical{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  /* background-image: 
    linear-gradient(
      to left bottom, 
      #6bd178, 
      #69d68c, 
      #6adb9f, 
      #6edfb0, 
      #76e3c0, 
      #72e7c1, 
      #6eeac3, 
      #6aeec4, 
      #5af2b5, 
      #52f6a1, 
      #54f989, 
      #5ffb6d
    ); */
} 
.el-tabs--border-card>.el-tabs__content{
  padding: 0px;
}
</style>
