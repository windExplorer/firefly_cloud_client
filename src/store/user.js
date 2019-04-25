export default {
    namespaced: true,
    
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
        isLogin: window.sessionStorage.getItem('isLogin') || false,
        getVcode: parseInt(window.localStorage.getItem('getVcode')) || 0
    },
    mutations: {
        setUInfo(state, data) {
            //console.log(data)
            state.userInfo = data
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
        },
        setLogin(state, data) {
            if(data == 'false'){
                data = false
            }
            else if(data == 'true'){
                data = true
            }
            state.isLogin = data            
            window.sessionStorage.setItem('isLogin', data)
        },
        set_getVcode(state, data) {
            state.getVcode = data
            window.localStorage.setItem('getVcode', data)
        }
    },
    actions: {

    },
    getters: {
        getIsLogin: (state) => state.isLogin
    }
}