<template>
    <div id="nav-wrap">
        <!-- 侧边栏容器 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu 
            :default-active="this.$route.path" 
            router
            background-color="#344a5f"
          >
            <el-submenu :index="menu.menuName" v-for="(menu , index ) in menuList" :key="index" >
                <template slot="title">
                  <i :class="menu.icon"></i>
                  <span>{{menu.menuName}}</span>
                </template>
                <el-menu-item :index="menuC.path" v-for="(menuC,indexs) in menu.children" :key="indexs"> 
                  <i :class="menuC.icon"></i>
                  {{menuC.menuName}}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
    </div>
</template>
<script>
export default {
 data(){
     return{
         menuList:[
          {
            menuName:'第一级',
            path:'',
            icon:'el-icon-location',
            children:[
              {
                menuName:'helolo world',path:'/demo1',icon:'el-icon-s-marketing',
              },
              {
                menuName:'主要',path:'/one',icon:'el-icon-s-opportunity',
              }
            ]
          },
          {
            menuName:'第二级',
            path:'',
            icon:'el-icon-star-off',
            children:[
              {
                menuName:'登录',path:'/hello',icon:'el-icon-umbrella',
              }
            ]
          },
          {
            menuName:'第三级',
            path:'',
            icon:'el-icon-star-off',
            children:[
              {
                menuName:'案子',path:'/demo2',icon:'el-icon-umbrella',
              }
            ]
          }
        ]
     }
 }
    
}
</script>
<style scoped>
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background-color: #344a5f;
}
</style>