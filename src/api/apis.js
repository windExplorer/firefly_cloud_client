/* 接口入口文件 */
import user from './user.js'
import file from './file.js'
import share from './share.js'
import message from './message.js'
import dynamic from './dynamic.js'

export default {
    userApi: user,
    fileApi: file,
    shareApi: share,
    messageApi: message,
    dynamicApi: dynamic,

}