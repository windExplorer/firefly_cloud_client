import $global from '@/global.js'
import $apis from '@/api/apis.js'

export default {
  namespaced: true,
  
  state: {
      userInfo: JSON.parse(window.sessionStorage.getItem('userInfo_test')),
      isLogin: window.sessionStorage.getItem('isLogin_test') || false
  },
  mutations: {
      setUInfo(state, data) {
          state.userInfo = data
          window.sessionStorage.setItem('userInfo_test', JSON.stringify(data))
      },
      setLogin(state, data) {
          state.isLogin = data
          window.sessionStorage.setItem('isLogin_test', data)
      }
  },
  actions: {

  },
  getters: {
      getIsLogin: (state) => state.isLogin
  }
}