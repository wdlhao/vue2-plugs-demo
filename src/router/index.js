import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'ps/HelloWorld' // ps-->src/components
import Login from 'ps/Login'
import HouseEntrust from 'ps/HouseEntrust'
import baiduMap from 'ps/baiduMap'
import Test from 'ps/Test'
import Transition from 'ps/Transition'
import LazyLoad from 'ps/LazyLoad' // vue-lazyload,图片延迟加载

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/transition',
      name: 'Transition',
      component: Transition
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/HouseEntrust',
      name: 'HouseEntrust',
      component: HouseEntrust
    },
    {
      path: '/baiduMap',
      name: 'baiduMap',
      component: baiduMap
    },
    {
      path: '/lazyLoad',
      name: 'LazyLoad',
      component: LazyLoad
    }
  ]
})
