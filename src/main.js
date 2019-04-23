import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import animated from 'animate.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  animated,
  render: h => h(App)
}).$mount('#app')
