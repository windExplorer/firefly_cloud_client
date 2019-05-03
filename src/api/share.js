/* 文件信息相关接口 */
import com from './common'

export default {
    /* 分享文件 */
    share: (data) => {
        return com.post('/api/share/share', data)
    },
    /* 分享记录 */
    getMyShare: (data) => {
        return com.post('/api/share/get_myshare', data)
    },
    /* 删除分享记录 */
    delMyShare: (data) => {
        return com.post('/api/share/del_myshare', data)
    },
    /* 取消分享，status置0 */
    hideMyShare: (data) => {
        return com.post('/api/share/hide_myshare', data)
    },
    /* 恢复分享，status置1 */
    showMyShare: (data) => {
        return com.post('/api/share/show_myshare', data)
    },
    /* 获取分享 */
    getShare: (data) => {
        return com.post('/api/share/get_share', data)
    },
    /* 进入分享文件夹 */
    enterShare: (data) => {
        return com.post('/api/share/enter_folder', data)
    },
    /* 下载分享文件 */
    /* downShare: (data) => {
        return com.post('/api/share/down', data)
    } */
}