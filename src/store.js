import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import test from '@/store/test'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    test: test
  }
})

export default store
