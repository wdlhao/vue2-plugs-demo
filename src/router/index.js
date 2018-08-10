import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'ps/HelloWorld' // ps-->src/components
import Login from 'ps/Login'
import HouseEntrust from 'ps/HouseEntrust'
import baiduMap from 'ps/baiduMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/HouseEntrust',
    //   name: 'HouseEntrust',
    //   component: HouseEntrust
    // },
    {
      path: '/baiduMap',
      name: 'baiduMap',
      component: baiduMap
    }
  ]
})
