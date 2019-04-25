export default {
    namespaced: true,
    
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
        isLogin: window.sessionStorage.getItem('isLogin') || false
    },
    mutations: {
        setUInfo(state, data) {
            console.log(data)
            state.userInfo = data
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
        },
        setLogin(state, data) {
            state.isLogin = data
            window.sessionStorage.setItem('isLogin', data)
        }
    },
    actions: {

    },
    getters: {
        getIsLogin: (state) => state.isLogin
    }
}