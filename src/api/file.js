/* 文件信息相关接口 */
import com from './common'

export default {
    /* 文件md5 */
    checkFileMd5: (data) => {
        return com.post('/api/file/checkmd5', data)
    },
    /* 获取文件列表，data为folder_id 文件夹的id，如果为0，就是获取根目录 */
    getFileList: (data) => {
        return com.post('/api/file/get_file_list', data)
    },
    /* 新建文件夹，data为name,remark_context,folder_id(父id) */
    createFolder: (data) => {
        return com.post('/api/file/create_folder', data)
    },
    /* 获取允许上传的文件后缀 */
    getFileAllow: () => {
        return com.post('/api/file/get_file_allow')
    },
    /* 上传文件 */
    upFile: (data, config, self) => {
        return com.post('/api/file/up_file', data, {
            onUploadProgress: progressEvent => {
                console.log(self)
                let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                self.uploadMessage = '上传 ' + complete
                
                console.log(complete)
              }
        })
    }
    

}