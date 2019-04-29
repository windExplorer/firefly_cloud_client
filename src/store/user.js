import $global from '@/global'
import $apis from '@/api/apis.js'

export default {
    namespaced: true,
    
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('userInfo')) || ``,
        isLogin: window.sessionStorage.getItem('isLogin') || false,
        getVcode: parseInt(window.localStorage.getItem('getVcode')) || 0,
        logintime: window.sessionStorage.getItem('logintime') || '',
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
        setLoginTime(state, data) {
            state.logintime = data
            window.sessionStorage.setItem('logintime', data)
        },
        logout(state) {
            sessionStorage.clear()
            state = null
            window.location.reload()
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
        },
        setUseSize(state, data) {
            //设置使用空间
            //console.log(data)
            //console.log(state.userInfo.use_size)
            state.userInfo.use_size = parseInt(state.userInfo.use_size) + parseInt(data)
            window.sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        }
    },
    actions: {
        checkLogin(context) {
            //判断
            let time = Date.parse(new Date())/1000
            let start = Date.parse(new Date(new Date(new Date().toLocaleDateString()).getTime()))/1000
            if(typeof(context.state.logintime) != 'undefined' && context.state.logintime != ''){
                if(context.state.logintime < start){
                    console.log('需要重新验证登录!')
                    $apis.userApi.checkLogin().the(res => {
                        res = res.data
                        if(res.code == 1){
                            contxt.commit('setUInfo', res.data)
                            context.commit('setLogin', true)
                            context.commit('setLoginTime', res.time)
                            $vue.$axios.defaults.headers.common['token'] = res.data.token
                            $vue.$axios.defaults.headers.common['username'] = res.data.username
                            $vue.$notify({
                                title: '成功',
                                message: res.msg,
                                type: 'success',
                                duration: 1500
                            })
                            //this.$router.push('/')
                        }else{
                            $vue.$notify.error({
                                title: '错误',
                                message: res.msg,
                                duration: 2000
                            })
                            $vue.$router.push('/login')
                        }
                    })
                }

            }
            //console.log(context)
        }
    },
    getters: {
        getIsLogin: (state) => state.isLogin,
        getUserInfo: state => {
            if(typeof(state.userInfo.avatar) != 'undefined')
                if(state.userInfo.avatar.indexOf('http://') == -1 && state.userInfo.avatar.indexOf('https://') == -1)
                    state.userInfo.avatar = $global.adminUrl + state.userInfo.avatar
            return state.userInfo
        }
    }
}