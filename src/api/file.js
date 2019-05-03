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
    },
    /* 获取上传记录 */
    getMyUp: (data) => {
        return com.post('/api/file/get_my_up', data)
    },
    /* 删除上传记录 */
    delMyUp: (data) => {
        return com.post('/api/file/del_my_up', data)
    },
    /* 获取下载记录 */
    getMyDown: (data) => {
        return com.post('/api/file/get_my_down', data)
    },
    /* 删除下载记录 */
    delMyDown: (data) => {
        return com.post('/api/file/del_my_down', data)
    },
    /* 编辑文件/文件夹 */
    edit: (data) => {
        return com.post('/api/file/edit', data)
    },
    /* 删除文件/文件夹 */
    del: (data) => {
        return com.post('/api/file/del', data)
    },
    /* 获取我的文件夹无限极菜单 */
    getFolderMenu: () => {
        return com.post('/api/file/getFolderMenu')
    },
    /* 复制文件/文件夹 */
    copy: (data) => {
        return com.post('/api/file/copy', data)
    },
    /* 移动文件/文件夹 */
    move: (data) => {
        return com.post('/api/file/move', data)
    },
    /* 下载文件 */
    download: (data) => {
        return com.post('/api/file/download', data)
        /* return com({
            method: 'post',
            url: '/api/file/download',
            data: data,
            responseType: 'blob'
        }) */
    },
    

}