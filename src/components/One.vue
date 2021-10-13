<template>
    <div id="one">
        <img src="../assets/logo.png">
        <html>{{msg}}</html>
    </div>
</template>
<script>
export default {
    name:'One',
    data () {
    return {
      msg: 'Welcome '
    }
  }
}
</script>
<style>
    #app {
        width: 1000pm;
        height: 1000pm;
        background-image: 
            linear-gradient(
                to left bottom, 
                #6bd178, 
                #00d0a3, 
                #00ccc9, 
                #00c4e4, 
                #26b9f0, 
                #44bbf3, 
                #58bdf6, 
                #69bff8, 
                #52cffe, 
                #41dfff, 
                #46eefa, 
                #5ffbf1
            );
    }
</style>