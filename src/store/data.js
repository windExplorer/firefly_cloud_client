import $global from '@/global.js'
import $apis from '@/api/apis.js'

export default {
    namespaced: true,
    // tab_active
    state: {
        home_nav_items: JSON.parse(sessionStorage.getItem('home_nav_items')) ||  {
            0: {
                name : `全部文件`,
                list: {
                    folder: [],
                    file: []
                },
                path: [],
                pid_path: [],
                folder: {}
            }
        },
        home_nav_path: JSON.parse(sessionStorage.getItem('home_nav_path')) || {
            active_path: ['首页'],
            active_pid_path: [0],
            active_item: 0 //文件夹id
        },
        file_allow: JSON.parse(sessionStorage.getItem('file_allow')) || {
            allow_ext: '',
            allow_size: ''
        },
        myup: JSON.parse(sessionStorage.getItem('my_up')) || [],
        mydown: JSON.parse(sessionStorage.getItem('my_down')) || [],
        folderTree: JSON.parse(sessionStorage.getItem('folderTree')) || [],

        
    },
    mutations: {
        /* home_nav_items页面 */
        
        setHomeNavItemsList(state, data) {
            // a:folder_id b.数据库返回的记录 th为当前目录详情，list分为该目录中的folder和file
            //console.log(data)
            let folder = data.b.th
            let path,pid_path
            if(folder.pid_path && folder.pid_path != '')
                pid_path = (folder.pid_path + '' + folder.id).split('/')
            else
                pid_path = [0]

            if(folder.path && folder.path != '')
                path = (folder.path + folder.name).split('/')
            else
                path = ['首页']
            let obj = {
                name: data.b.th.name,
                list: {
                    folder: data.b.list.folder,
                    file: data.b.list.file
                },
                path: path,
                pid_path: pid_path,
                folder: folder
            }
            state.home_nav_items[data.a] = obj
            sessionStorage.setItem('home_nav_items', JSON.stringify(state.home_nav_items))
            
            state.home_nav_path = {
                active_item: data.a,
                active_path: path,
                active_pid_path: pid_path
            }
            sessionStorage.setItem('home_nav_path', JSON.stringify(state.home_nav_path))
        },

        setHomeNavActive(state, data) {
            /* let folder = state.home_nav_items[data.id]
            let path,pid_path
            if(folder.pid_path && folder.pid_path != '')
                pid_path = folder.pid_path.split('/')
            else
                pid_path = [0]

            if(folder.path && folder.path != '')
                path = folder.path.split('/')
            else
                path = ['首页'] */
            state.home_nav_path = {
                active_item: data.id,
                active_pid_path: state.home_nav_items[data.id].pid_path,
                active_path: state.home_nav_items[data.id].path
            }
            sessionStorage.setItem('home_nav_path', JSON.stringify(state.home_nav_path))
        },

        setFileAllow(state, data) {
            //console.log(data)
            state.file_allow.allow_ext = data.allow_ext
            state.file_allow.allow_size = parseInt(data.allow_size)
            sessionStorage.setItem('file_allow', JSON.stringify(state.file_allow))

        },

        /* 设置我的上传记录 */
        setMyUp(state, data) {
            state.myup = data
            //console.log(data)
            sessionStorage.setItem('my_up', JSON.stringify(data))
        },

        /* 设置我的下载记录 */
        setMyDown(state, data) {
            state.mydown = data
            //console.log(data)
            sessionStorage.setItem('my_down', JSON.stringify(data))
        },

        /* 设置目录树 */
        setFolderTree(state, data) {
            state.folderTree = data
            sessionStorage.setItem('folderTree', JSON.stringify(data))
        },

        /* 重置文件夹 */
        resetFolder(state, data) {
            delete state.home_nav_items[data]
            //console.log(data)
            //console.log(state.home_nav_items)
            sessionStorage.setItem('home_nav_items', JSON.stringify(state.home_nav_items))
        },

        /* 清空state */
        setNull(state) {
            console.log('清空state')
            state = null
        }
        
        
    },
    actions: {
        // data为folder_id
        setHomeNav: (context, data) => {
            //console.log('Huoqu')
            $apis.fileApi.getFileList({folder_id: data}).then(res => {
                res = res.data
                if(res.code == 1){
                    context.commit('setHomeNavItemsList', {a: data, b: res.data})
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
        //获取允许上传的文件类型
        setFileAllow: (context) => {
            $apis.fileApi.getFileAllow().then(res => {
                res = res.data
                if(res.code == 1){
                    context.commit('setFileAllow', res.data)
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
        // 进入文件夹
        enterFolder: (context, data) => {
            /* if(typeof(context.state.home_nav_items[data.id]) != 'undefined'){
                context.commit('setHomeNavActive', data)
            }else{
                context.dispatch('setHomeNav', data.id)
            } */
            context.dispatch('setHomeNav', data.id)
        },
        // 获取我的上传记录
        getMyUp: context => {
            $apis.fileApi.getMyUp({type: 'month'}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.commit('setMyUp', res.data)
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
        //删除上传记录
        delMyUp: (context, data) => {
            let ids = []
            data.map(item => {
                ids.push(item.id)
            })
            $apis.fileApi.delMyUp({ids: ids}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.dispatch('getMyUp')
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
        //编辑文件
        edit: (context, data) => {
            $apis.fileApi.edit(data).then(res => {
                res = res.data
                if(res.code == 1){
                    $vue.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                    })
                    context.dispatch('setHomeNav', context.state.home_nav_path.active_item)
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
        // 删除文件
        del: (context, data) => {
            //console.log(data)
            let load = $vue.$loading({ fullscreen: true })
            //console.log($vue)
            $apis.fileApi.del(data).then(res => {
                res = res.data
                if(res.code == 1){
                    $vue.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                    })
                    context.commit('setHomeNavItemsList', res.data.home_nav)
                    
                    context.dispatch('getFolderMenu')         
                    $vue.$store.commit('user/setUInfo', res.data.userInfo)
                    load.close()
                }else if(res.code == -100){
                    load.close()
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    load.close()
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }
            })
        },
        //刷新文件夹
        refreshFolder: (context, data) => {

        },
        //获取无限极菜单(全部)
        getFolderMenu: (context) => {
            $apis.fileApi.getFolderMenu().then(res => {
                res = res.data
                if(res.code == -100){
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    context.commit('setFolderTree', res.data)
                }
            })
        },
        //复制文件/文件夹到
        copy: (context, data) => {
            let load = $vue.$loading({ fullscreen: true })
            $apis.fileApi.copy(data).then(res => {
                res = res.data
                console.log(res)
                if(res.code == 1){
                    $vue.$notify({
                        title: '成功',
                        message: res.msg+' 【若找不到复制后的文件请点击左上角刷新按钮！】',
                        type: 'success',
                        duration: 2000
                    })
                    //context.commit('resetFolder', data.folder_id)
                    context.dispatch('getFolderMenu')
                    load.close()
                }else if(res.code == -100){
                    load.close()
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    load.close()
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }
            })
        },
        //移动文件/文件夹到
        move: (context, data) => {
            let load = $vue.$loading({ fullscreen: true })
            $apis.fileApi.move(data).then(res => {
                res = res.data
                console.log(res)
                if(res.code == 1){
                    $vue.$notify({
                        title: '成功',
                        message: res.msg+' 【若找不到移动后的文件请点击左上角刷新按钮！】',
                        type: 'success',
                        duration: 2000
                    })
                    context.dispatch('setHomeNav', context.state.home_nav_path.active_item)
                    context.commit('resetFolder', data.to_key)
                    context.dispatch('getFolderMenu')
                    load.close()
                }else if(res.code == -100){
                    load.close()
                    $vue.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    $vue.$router.push('/login')
                }else{
                    load.close()
                    $vue.$notify({
                        title: '失败',
                        message: res.msg,
                        type: 'error',
                        duration: 2000
                    })
                }
            })
        },
        //下载文件
        download: (context, data) => {
            //根据传递过去的token和id查找此用户是否能够下载
            $apis.fileApi.download(data).then(res => {
                res = res.data
                console.log(res.data)
                //return
                window.location.href = res.data.href
                //window.location.href = ``
                //$global.download(res, file)
                context.dispatch('getMyDown', )
            })
        },
        // 获取我的下载记录
        getMyDown: context => {
            $apis.fileApi.getMyDown({type: 'month'}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.commit('setMyDown', res.data)
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
        //删除上传记录
        delMyDown: (context, data) => {
            let ids = []
            data.map(item => {
                ids.push(item.id)
            })
            $apis.fileApi.delMyDown({ids: ids}).then(res => {
                res = res.data
                //console.log(res)
                if(res.code == 1){
                    context.dispatch('getMyDown')
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

    },
    getters: {
        
    }
}