<template>
    <div class="app">
        <button @click="getDemo1Message">{{text}}</button>
    </div>
</template>
<script>
export default {
    name:"Demo2",
    props:["text"],
    data(){
        return {
            msg:"2222222"
        }
    },
    methods:{
        getDemo1Message(){
            this.$emit("messagew",this.text)
        }
    }
    
}
</script>
<style scoped>

</style>