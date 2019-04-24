/* 用户信息相关接口 */
import com from './common'

export default {
    /* 登录 */
    loginIn: (data) => {
        return com.post('/api/user/login', data)
    }
}