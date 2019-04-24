import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import animated from 'animate.css'
import axios from 'axios'
import qs from 'qs'
import apis from './api/apis'


let token,username
if(store.state.user.userInfo == null){
    token = ''
    username = ''
}else{
    token = store.state.user.userInfo.token
    username = store.state.user.userInfo.useranme
}
axios.defaults.headers.common['token'] = token
axios.defaults.headers.common['username'] = username
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$apis = apis 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  animated,
  render: h => h(App)
}).$mount('#app')
