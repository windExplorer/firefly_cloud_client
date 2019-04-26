/* 文件信息相关接口 */
import com from './common'

export default {
    /* 文件md5 */
    checkFileMd5: (data) => {
        return com.post('/api/file/checkmd5', data)
    }
    

}