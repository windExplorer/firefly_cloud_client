import $global from '@/global.js'
import $apis from '@/api/apis.js'

export default {
    namespaced: true,
    
    state: {
        share_success: false,
        shareSuccess: {
            share_link: '123',
            share_password: '',
            expire_time: '',
            frequency: '',
            expire_day: '',
            copy_link: '',
            copy_link_pwd: ''
        },
        myshare: JSON.parse(sessionStorage.getItem('my_share')) || [],
        //分享页面的路径
        share_path: {
            active_folder_id: 0, //0表示首页
            to: {},
            form: {},
            items: {
 
                folder: [],
                file: [],
                list: []
                
            },
            info: {},
            downUrl: ''
        },
        //分享用户
        shareUser: {},
        //提取码
        encrypt: sessionStorage.getItem('encrypt') || '',
        showShare: ''
    },
    mutations: {
        set_share_success(state, data) {
            state.share_success = data
        },
        set_shareSuccess(state, data) {
            state.shareSuccess = data
        },
        /* 设置我的分享记录 */
        setMyShare(state, data) {
            state.myshare = data
            //console.log(data)
            sessionStorage.setItem('my_share', JSON.stringify(data))
        },
        //设置分享页面路径已经活动文件夹
        set_share_path(state, data) {
            state.share_path.active_folder_id = data.to.id
            state.share_path.items.file = data.file
            state.share_path.items.folder = data.folder
            state.share_path.items.list = data.list
            state.share_path.to = data.to
            state.share_path.from = data.from
            state.share_path.info = data
            state.share_path.downUrl = data.downUrl
            state.shareUser = data.user
            sessionStorage.setItem('encrypt', data.encrypt)
            console.log(state)
        },
        //提取码
        set_encrypt(state, data) {

        },
        //设置文件夹
        set_share_folder(state, data) {
            console.log(data)
            state.share_path.active_folder_id = data.to.id
            state.share_path.items.file = data.file
            state.share_path.items.folder = data.folder
            state.share_path.items.list = data.list
            state.share_path.to = data.to
            state.share_path.from = data.from
            console.log(state.share_path)
        }
        
    },
    actions: {
        // 分享文件/文件夹
        share: (context, data) => {
            //context.commit('set_share_success', true)
            //return
            let load = $vue.$loading({ fullscreen: true })
            $apis.shareApi.share(data).then(res => {
                res = res.data
                context.dispatch('getMyShare')
                setTimeout(() => {
                    context.commit('set_share_success', true)
                    context.commit('set_shareSuccess', res.data)
                    load.close()
                }, 700)
                
            })
        },
        // 获取我的分享
        getMyShare: context => {
            $apis.shareApi.getMyShare({type: 'month'}).then(res => {
                res = res.data
                if(res.code == 1){
                    context.commit('setMyShare', res.data)
                }else if(res.code == -100){
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    console.log(res.msg)
                }
            })
        },
        //删除分享
        delMyShare: (context, data) => {
            let ids = []
            data.map(item => {
                ids.push(item.id)
            })
            $apis.shareApi.delMyShare({ids: ids}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.dispatch('getMyShare')
                    $vue.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                      })
                }else if(res.code == -100){
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                      })
                }
            })
        },
        // 取消分享
        hideMyShare: (context, data) => {
            let ids = []
            data.map(item => {
                ids.push(item.id)
            })
            $apis.shareApi.hideMyShare({ids: ids}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.dispatch('getMyShare')
                    $vue.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                      })
                }else if(res.code == -100){
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                      })
                }
            })
        },
        // 恢复分享
        showMyShare: (context, data) => {
            let ids = []
            data.map(item => {
                ids.push(item.id)
            })
            $apis.shareApi.showMyShare({ids: ids}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.dispatch('getMyShare')
                    $vue.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                      })
                }else if(res.code == -100){
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                      })
                }
            })
        },

        // 获取分享的文件
        get_share: (context) => {
            let load = $vue.$loading({ fullscreen: true })
            let data = {
                link: $vue.$route.params.link, 
                encrypt: context.state.encrypt
            }
            $apis.shareApi.getShare(data).then(res => {
                res = res.data
                load.close()
                console.log(res)
                if(res.code == -1){
                    //需要提取码
                    context.state.showShare = false
                }
                else if(res.code == 0){
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }
                else if(res.code == 1){
                    res.data.encrypt = context.state.encrypt
                    context.commit('set_share_path', res.data)
                    context.state.showShare = true
                }
            })
        },
        //下载文件
        download: (context, id) => {
            context.state.share_path.info.use_frequency += 1
            let href = context.state.share_path.downUrl + '/' + id + '/' + context.state.encrypt + '/' + $vue.$route.params.link + '/' 
            window.location.href = href
        },
        //进入文件夹
        enter_folder: (context, id) => {
            let load = $vue.$loading({ fullscreen: true })
            let data = {
                to: {id: id},
                link: $vue.$route.params.link,
                from: context.state.share_path.to,
                encrypt: context.state.encrypt
            } 
            $apis.shareApi.enterShare(data).then(res => {
                res = res.data
                load.close()
                console.log(res)
                if(res.code == -1){
                    //需要提取码
                    context.state.showShare = false
                }
                else if(res.code == 0){
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }
                else if(res.code == 1){
                    
                    context.commit('set_share_folder', res.data)
                    context.state.showShare = true
                }
            })
        }
   
    },
    getters: {
        
    }
}