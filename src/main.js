import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import animated from 'animate.css'
import apis from './api/apis'
import axios from './api/common'
import qs from 'qs'
import global from './global'
import vuescroll from 'vuescroll'
import './plugins/spark-md5.min.js'
import clipboard from 'clipboard'


Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$apis = apis 
Vue.prototype.$global = global 
Vue.prototype.$clipboard = clipboard 

Vue.config.productionTip = false

Vue.use(element)
Vue.use(vuescroll) // install the vuescroll first
Vue.prototype.$vuescrollConfig = {
  scrollPanel: {
    easing: 'easeInOutQuart'
  },
  bar: {
    background: '#1DDCFD',
    showDelay: 1000
  }
}


/* 自定义组件 */
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el, {value}) {
    if(value)
      // 聚焦元素
      el.focus()
  },
  //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
  //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
  //update: function (el) {
      //el.focus()
  //}
})


window.$vue = new Vue({
  router,
  store,
  animated,
  render: h => h(App)
}).$mount('#app')
