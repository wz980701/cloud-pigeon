import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import Vant from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'
import store from './store/index'
import Vuelidate from 'vuelidate'

import 'vant/lib/index.css'
import '../src/common/sass/common.scss'

Vue.config.productionTip = false

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://dtygfw.top/'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Vant)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
  router,
  store,
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
