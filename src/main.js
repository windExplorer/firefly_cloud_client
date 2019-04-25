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

/* 自定义组件 */
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
      // 聚焦元素
      el.focus()
  },
  //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
  //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
  //update: function (el) {
      //el.focus()
  //}
})


new Vue({
  router,
  store,
  animated,
  render: h => h(App)
}).$mount('#app')
