<template>
  <div id="home">
    <!-- 外层容器 -->
    <el-container style="height: 800px; border: 1px solid #eee">
      <!-- 顶栏容器 -->
      <el-header>
          <span  style="float: left; font-size: 12px">logo</span>
          <span  style="float: right; font-size: 12px">退出登录</span>
      </el-header>
        
      <el-container>
        <!-- 侧边栏容器 -->
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu 
            :default-active="this.$route.path" 
            router
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

        <el-container>
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              
            </el-breadcrumb>  
          </div>
          <!-- 主要容器区域 -->
          <div>
            <el-main>
              
            </el-main>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuList:[
          {
            menuName:'第一级',
            path:'',
            icon:'el-icon-location',
            children:[
              {
                menuName:'helolo world',path:'/one',icon:'el-icon-s-marketing',
              },
              {
                menuName:'登录',path:'/',icon:'el-icon-s-opportunity',
              }
            ]
          },
          {
            menuName:'第二级',
            path:'',
            icon:'el-icon-star-off',
            children:[
              {
                menuName:'登录',path:'/',icon:'el-icon-umbrella',
              }
            ]
          }
        ]
      }
    },
    methods: {
      
    },
  };
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>