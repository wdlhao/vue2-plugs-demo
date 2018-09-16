// 如果项目中，使用的状态管理操作非常频繁，可以将状态管理的对象进行细分，最后汇集之后集中管理；
import vue from 'vue'
import vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

vue.use(vuex)

export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
