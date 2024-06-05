import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'

import login from './login'
import Home from '@/view/homez/Home'


Vue.use(Router)

export default new Router({
  /**
   * vue路由默认是hash，改成history模式   解决路由后边带# 问题
   */
  mode: 'history',
  routes: [
    ...login,
    // ...menu
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//禁止未携带token的登录
router.beforeEach(async (to, from,next) => {
  let loginToken =sessionStorage.getItem('token');
  if(!to){
    next({path:"/"});
  }else if(to.path !== '/'){
    if(!loginToken){
      next({path:"/"});
    }else{
      //根据路由有多少进行处理  如果路由里边只包含静态路由 那么进行动态路由添加  否则直接跳过
      if(router.options.routes.length>1){
        next()
      }else {
        let routerNum = [];
        let menuList = sessionStorage.getItem('menuList');
        if (menuList) {
          let row = JSON.parse(menuList)
          for (let i = 0; i < row.length; i++) {
            if (row[i].children) {
              for (let z = 0; z < row[i].children.length; z++) {
                let url = routerCom(row[i].children[z].component);
                let obj = {
                  path: row[i].children[z].path,
                  component: url
                }
                routerNum.push(obj)
              }
            }
          }
          //此处添加首页页面
          let firstUrl =routerCom('/src/view/homez/First');
          let firstObj = {
            path: '/first',
            component: firstUrl
          }
          routerNum.push(firstObj)
          let routerObj = [{
            path: '/home',
            component: Home,
            redirect: '/first',
            children: routerNum
          }]
          // router.push(routerObj[0])
          //添加动态路由
          router.addRoute(routerObj[0]);
          //整合静态以及动态路由
          router.options.routes.push(routerObj[0])
          //确保路由生效
          next({...to,replace:true})
        }
      }
    }
  }else{
    next()
  }
})

export  const routerCom=(path)=> { //对路由的component解析
  path=path.substring(9)
  console.log(path)
  //此处component从数据库获取后进行处理，  因为必须'@/view'或者‘@/view/’进行拼接，否则不起作用
  return (resolve) => require([`@/view${path}`], resolve);
  // return ()=>import(`${path}`)
}
