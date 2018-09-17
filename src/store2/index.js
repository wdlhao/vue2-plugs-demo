// 如果项目中使用的状态管理的变量较少时，可以采用一个文件进行集中管理；
const state = {
    name: 'weish',
    age: 22
};

const types = {
    SET_NAME: 'SET_NAME',
    SET_AGE: 'SET_AGE'
};

const mutations =  {
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AGE] (state, age) {
      state.age = age
    }
  }

const actions = {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
    }
}

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions
  })
  