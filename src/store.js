import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import page from '@/store/page'
import data from '@/store/data'
import test from '@/store/test'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    page: page,
    data: data,
    test: test
  }
})

export default store
