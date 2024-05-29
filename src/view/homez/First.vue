<template>
    <div >
      <div :style="note">
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      note:{
        backgroundImage: 'url('+require('@/assets/img/logo.png')+')',
        height:"100%",
        width:"100%",
      }
    }
  }

}
</script>
<style>

</style>
