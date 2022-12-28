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
                <el-menu-item :index="menuC.path"  v-for="(menuC,indexs) in menu.children" :key="indexs" @click="addtab(menuC)"> 
                  <i :class="menuC.icon"></i>
                  {{menuC.menuName}}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <!-- 控制展示屏的大小 -->
          <div style="width:100%">
            <el-tabs v-model="TabsValue" type="border-card" closable
            @tab-remove="removeTab"
            @tab-click="clickTab"
            >
              <el-tab-pane v-for="item in Tabs" 
              :key="item.name" 
              :label="item.title" 
              :name="item.name"
              >
              </el-tab-pane>
            </el-tabs>
            <!-- <el-tag
              :key="item.title" 
              v-for="item in Tabs"
              closable
              :disable-transitions="false"
              @click="clickTab"
              @close="removeTab(item.title)">
              {{item.title}}
            </el-tag> -->
          
          <!-- 主要容器区域 -->
          
            <el-main>
              <router-view/>
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
        TabsValue:'',
        Tabs:[],
        menuList:[
          {
            menuName:'第一级',
            path:'',
            icon:'el-icon-location',
            children:[
              {
                menuName:'用户管理',path:'/mesageUser',icon:'el-icon-s-marketing',
              },
              {
                menuName:'角色管理',path:'/mesageRoule',icon:'el-icon-s-opportunity',
              }
            ]
          },
          {
            menuName:'第二级',
            path:'',
            icon:'el-icon-star-off',
            children:[
              {
                menuName:'菜单管理',path:'/mesageMenu',icon:'el-icon-umbrella',
              }
            ]
          },
          {
            menuName:'Element组件',
            path:'',
            icon:'el-icon-star-off',
            children:[
              {
                menuName:'添加页',path:'/add',icon:'el-icon-umbrella',
              },
              {
                menuName:'展示页',path:'/table',icon:'el-icon-umbrella',
              },
              {
                menuName:'上传页',path:'/upload',icon:'el-icon-umbrella',
              },
              {
                menuName:'下载页',path:'/download',icon:'el-icon-umbrella',
              }
            ]
          }
        ]
      }
    },
    mounted(){
        let tab1={
          title: '首页',
          name: '/home',
          content:'',
        }
        this.Tabs.push(tab1);
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      addtab(params){
        let tab={
          title: params.menuName,
          name: params.path,
          content:'',
        }
        let tabNum =0;
        for( let i = 0; i< this.Tabs.length;i++) { 
          if(this.Tabs[i].title ==params.menuName ){
                tabNum=tabNum+1;
            }
        }
        if(tabNum ==0){
          this.Tabs.push(tab);
        }
        
      },
       removeTab(targetName) {
        console.log("targetName",targetName)
        if(targetName !='/home'){
          let tabs = this.Tabs;
          let activeName = this.TabsValue;
           console.log("activeName",activeName)
          // if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                 console.log("nextTab",nextTab)
                if (nextTab) {
                  activeName = nextTab.name;
                  console.log("activeName11",activeName)
                   this.$router.push({path: activeName})
                }
              }
            });
        //  }
          
          this.TabsValue = activeName;
          // this.Tabs.splice(this.Tabs.indexOf(targetName), 1);
          this.Tabs = tabs.filter(tab => tab.name !== targetName);
          if(this.Tabs.length ==1){
            this.$router.push({path: "/home"})
          }else if(this.Tabs.length ==0){
            let tab1={
              title: '首页',
              name: '/home',
              content:'',
            }
            this.Tabs.push(tab1);
          }
        }
      },
      clickTab (tab) {
        this.$router.push({path: tab._props.name})
      }
    },
  };
</script>

<style  scoped>
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
</style>