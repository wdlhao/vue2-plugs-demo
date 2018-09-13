
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';   // vuex store

// import '@/utils/rem'
import "lib-flexible";
import axios from 'axios';
import VueTouch from "vue-touch";



import VeeValidate, { Validator } from 'vee-validate'
import CN from 'vee-validate/dist/locale/zh_CN.js'; // 中文文件

Validator.addLocale(CN)
Vue.use(VeeValidate, {// 表单验证
  locale: 'zh_CN'
})
// 扩展的自定义正则方法
Validator.extend('ownerPhone', {
  messages: {
    zh_CN: field => '请输入正确手机号'
  },
  validate: value => {
    return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(value)
  }
})

Validator.extend('isCard', {
  messages: {
    zh_CN: field => '请输入正确身份证号'
  },
  validate: value => {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
  }
})

const dictionary = {
  zh_CN: {
    messages: {
      required: (val) => {
        let msg = ''
        switch (val) {
          case 'ownerName':
            msg = '姓名'
            break
          case 'ownerPhone':
            msg = '手机号'
            break
          case 'xiaoquName':
            msg = '社区'
            break
          case 'houseShi':
            msg = '居室'
            break
          case 'houseArea':
            msg = '面积'
            break
          case 'houseZuqiId':
            msg = '租期'
            break
          case 'idCard':
            msg = '身份证'
            break
          case 'seeTime':
            msg = '看房时间'
            break
          default: ;
        }
        msg = msg + '不能为空哦'
        return msg
      },
      numeric: (val) => {
        let msg = ''
        switch (val) {
          case 'houseShi':
            msg = '居室'
            break
          case 'houseArea':
            msg = '面积'
            break
          case 'houseZuqiId':
            msg = '租期'
            break
          default: ;
        }
        msg = msg + '只能为数字'
        return msg
      }
    }
  }
}
Validator.updateDictionary(dictionary)

Vue.use(VueTouch, { name: "v-touch" });




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
