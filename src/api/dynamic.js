/* 文件信息相关接口 */
import com from './common'

export default {
    /* 获取最新分享 */
    getNewShare: () => {
        return com.post('/api/dynamic/get_new_share')
    },
}