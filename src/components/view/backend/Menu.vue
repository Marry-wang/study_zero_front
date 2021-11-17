<template>
<div id="menu">
    <el-row class="tac">
        <el-col :span="12">
            <!-- <h5>自定义颜色</h5> -->
            <el-menu
               :default-active="this.$route.path" 
                router
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu :index="menu.menuName" v-for="(menu , index ) in menuList" :key="index" >
                    <template slot="title">
                      <!-- <i class="el-icon-location"></i> -->
                      <span>{{menu.menuName}}</span>
                    </template>
                        <el-menu-item :index="menuC.path" v-for="(menuC,indexs) in menu.children" :key="indexs"> 
                          <!-- <i class="el-icon-s-tools"></i> -->
                          {{menuC.menuName}}
                        </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
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
              children:[
                {
                  menuName:'helolo world',path:'/one'
                },
                {
                  menuName:'登录',path:'/'
                }
              ]
            },
            {
              menuName:'第二级',
              path:'',
              children:[
                {
                  menuName:'登录',path:'/'
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
.tac .el-menu-vertical-demo{
  width: 200px;

}
</style>