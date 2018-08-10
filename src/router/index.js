import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'ps/HelloWorld'
import Login from 'ps/Login'
import HouseEntrust from 'ps/HouseEntrust'

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
    {
      path: '/HouseEntrust',
      name: 'HouseEntrust',
      component: HouseEntrust
    }
  ]
})
