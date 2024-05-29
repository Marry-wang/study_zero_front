<template>
  <div id="home">
    <!-- 外层容器 -->
    <el-container style="height:100vh; border: 0px solid #eee">
      <!-- 顶栏容器 -->
      <el-header>
        <div style="float: right; font-size: 14px">
          <span>用户名:{{name}}</span>
          <button @click="logOut">退出登录</button>
        </div>
        <div style="float: left">
          <el-image
            style="width: 70px; height: 70px"
            :fit="contain"
            :src="logo"
          ></el-image>
        </div>
      </el-header>

      <el-container>
        <!-- 侧边栏容器 -->
        <el-aside width="200px"  style="background-color: rgb(238, 241, 246);overflow:hidden">
          <el-menu
           :router="true"
           :default-active="$router.apth"
          >
            <el-menu-item index="/home">首页</el-menu-item>
          </el-menu>

          <el-menu
            :default-active="this.$route.path"
            router
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu :index="menu.menuName"  v-for="(menu , index ) in menuList" :key="index" >
                <template slot="title">
                  <i :class="menu.icon"></i>
                  <span>{{menu.menuName}}</span>
                </template>
                <el-menu-item :index="menuC.path"  v-for="(menuC,indexs) in menu.children" :key="indexs" >
                  <i :class="menuC.icon"></i>
                  {{menuC.menuName}}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <!-- 控制展示屏的大小 -->
          <div style="width:100%;height: 100%;margin: 0">
            <!-- <el-tabs v-model="TabsValue" type="border-card" closable
            @tab-remove="removeTab"
            @tab-click="clickTab"
            >
              <el-tab-pane v-for="item in Tabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              >
              </el-tab-pane>
            </el-tabs> -->
          <!-- 主要容器区域 -->

            <el-main>
              <router-view class="router-view-style"/>
            </el-main>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {getMenuList} from '@/api/login/system';
  import {userName} from '@/api/login/login';
  import logo from '@/assets/img/logo.png'
  export default {
    data() {
      return {
        logo,
        name:'',
        TabsValue:'',
        Tabs:[],
        menuList:[
          // {
          //   menuName:'第一级',
          //   path:'',
          //   icon:'el-icon-location',
          //   children:[
          //     {
          //       menuName:'用户管理',path:'/mesageUser',icon:'el-icon-s-marketing',
          //     },
          //     {
          //       menuName:'角色管理',path:'/mesageRoule',icon:'el-icon-s-opportunity',
          //     }
          //   ]
          // },
          // {
          //   menuName:'第二级',
          //   path:'',
          //   icon:'el-icon-star-off',
          //   children:[
          //     {
          //       menuName:'菜单管理',path:'/mesageMenu',icon:'el-icon-umbrella',
          //     }
          //   ]
          // },
          // {
          //   menuName:'Element组件',
          //   path:'',
          //   icon:'el-icon-star-off',
          //   children:[
          //     {
          //       menuName:'添加页',path:'/add',icon:'el-icon-umbrella',
          //     },
          //     {
          //       menuName:'展示页',path:'/table',icon:'el-icon-umbrella',
          //     },
          //     {
          //       menuName:'上传页',path:'/upload',icon:'el-icon-umbrella',
          //     },
          //     {
          //       menuName:'下载页',path:'/download',icon:'el-icon-umbrella',
          //     }
          //   ]
          // }
        ]
      }
    },
    mounted(){
      this.menuList1();
      this.getUserName();
    },
    methods: {
      logOut(){
        sessionStorage.setItem('token',"");
        this.$router.push('/')
      },
      getUserName(){
        userName({'token':sessionStorage.getItem('token')})
            .then((response) =>{
                this.name =  response.data.userName
                // window.console.log(response);
            }).catch((error) =>
                window.console.log(error)

            )
      },
      menuList1(){
        const that = this;
        let params = {};
        getMenuList(params)
          .then(function (response) {
            var menus = response.data;
            that.menuList = menus;
           })
        .catch(function (error) {
             console.log(error);
       });

      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
    },
  };
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-tabs--border-card>.el-tabs__content{
    padding: 0px;
  }
  .el-aside {
    color: #333;
  }
  .el-main{
    height: 100%;
    width: 100%;
    padding:0
  }
  .router-view-style{
    height: 100%;
    width: 100%;
  }
</style>
