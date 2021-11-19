<template>
    <div>
        <layout-header/>
        <layout-main/>
        <layout-nav/>
    </div>
</template>
<script>
import LayoutHeader from './Componts/Header.vue'
import LayoutMain from './Componts/Main.vue'
import LayoutNav from './Componts/Nav.vue'
export default {
    namne:'layout',
    components :{LayoutHeader,LayoutMain,LayoutNav}
    
}
</script>
<style scoped>

</style>