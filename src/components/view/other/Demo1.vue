<template>
    <div class="app">
        {{msg}}
        <demo text="zhuce" @messagew="getMeaagse"></demo>
    </div>
</template>
<script>
import Demo from './Demo2.vue'
export default {
    name:"Demo1",
    components:{
        Demo
    },
    data(){
        return {
            msg:"111111111111"
        }
    },
    methods:{
        getMeaagse(val){
            alert(val);
        }
    }
    
}
</script>
<style scoped>

</style>