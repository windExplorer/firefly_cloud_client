export default {
    namespaced: true,
    
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')),
        isLogin: window.sessionStorage.getItem('isLogin') || false,
        getVcode: parseInt(window.localStorage.getItem('getVcode')) || 0,
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
        },
        setEmail(state, data) {
            state.userInfo.email = data
            window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        setBase(state, data) {
            //昵称，性别，出生日期，个性签名，个人描述
            state.userInfo.nickname = data.nickname
            state.userInfo.gender = data.gender
            state.userInfo.born = data.born
            state.userInfo.sign_context = data.sign_context
            state.userInfo.description_context = data.description_context
            window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        setAvatar(state, data) {
            //头像
            state.userInfo.avatar = data
            window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        }
    },
    actions: {

    },
    getters: {
        getIsLogin: (state) => state.isLogin
    }
}