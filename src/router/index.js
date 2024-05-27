import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'

import login from './login'
import menu from './menu'

Vue.use(Router)

export default new Router({
  /**
   * vue路由默认是hash，改成history模式   解决路由后边带# 问题
   */
  mode: 'history',
  routes: [
    ...login,
    ...menu
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//禁止未携带token的登录
router.beforeEach(async (to, from,next) => {
  let logintoken =sessionStorage.getItem('token');
  if(!to){
    next({path:"/"});
  }else if(to.path != '/'){
    if(!logintoken){
      next({path:"/"});
    }else{
      next()
    }
  }else{
    next()
  }
})
