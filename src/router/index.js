import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import One from '@/components/One'

Vue.use(Router)

export default new Router({
  /**
   * vue路由默认是hash，改成history模式   解决路由后边带# 问题
   */
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'One',
      component: One
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
