export default {
    namespace: true,
    
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
        isLogin: window.sessionStorage.getItem('isLogin') || 0
    },
    mutations: {
        setUInfo: (state, data) => {
            state.userInfo.username = data
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
        },
        setLogin: (state, data) => {
            state.isLogin = data
            window.sessionStorage.setItem('isLogin', data)
        }
    },
    actions: {

    },
    getters: {

    }
}