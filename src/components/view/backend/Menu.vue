<template>
<div id="menu">
  <div id="tac">
    <el-row >
        <el-col :span="12">
            <!-- <h5>自定义颜色</h5> -->
            <el-header>首页</el-header>
            <el-menu
               :default-active="this.$route.path" 
                router
                class="demo"
                @open="handleOpen"
                @close="handleClose">
                <!-- background-color="#545c64" -->
                <!-- text-color="#fff" -->
                <!-- active-text-color="#ffd04b" -->
                
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
        </el-col>
    </el-row>
  </div>
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
                  menuName:'helolo world',path:'/one',icon:'el-icon-location',
                },
                {
                  menuName:'登录',path:'/',icon:'el-icon-location',
                }
              ]
            },
            {
              menuName:'第二级',
              path:'',
              icon:'el-icon-location',
              children:[
                {
                  menuName:'登录',path:'/',icon:'el-icon-location',
                }
              ]
            }
          ]
      }
    }, 
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style scoped>
.demo{
  width: 40%;
  height: 100%;
  background-color:  #5ffbf1
    
}
</style>