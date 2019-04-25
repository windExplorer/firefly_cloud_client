/* 用户信息相关接口 */
import com from './common'

export default {
    /* 登录 */
    loginIn: (data) => {
        return com.post('/api/user/login', data)
    },
    loginOut: () => {
        return com.post('/api/user/logout')
    },
    register: (data) => {
        return com.post('/api/user/register', data)
    },
    resetpwd: (data) => {
        return com.post('/api/user/resetpwd', data)
    },
    getvcode: (data) => {
        return com.post('/api/user/getvcode', data)
    }

}