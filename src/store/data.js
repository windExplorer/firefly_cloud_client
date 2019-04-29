import $global from '@/global.js'
import $apis from '@/api/apis.js'

export default {
    namespaced: true,
    // tab_active
    state: {
        home_nav_items: JSON.parse(window.sessionStorage.getItem('home_nav_items')) ||  {
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
        home_nav_path: JSON.parse(window.sessionStorage.getItem('home_nav_path')) || {
            active_path: ['首页'],
            active_pid_path: [0],
            active_item: 0 //文件夹id
        },
        file_allow: JSON.parse(window.sessionStorage.getItem('file_allow')) || {
            allow_ext: '',
            allow_size: ''
        },

        
    },
    mutations: {
        /* home_nav_items页面 */
        

        setHomeNavItemsList(state, data) {
            console.log(data)
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
            window.sessionStorage.setItem('home_nav_items', JSON.stringify(state.home_nav_items))
            
            state.home_nav_path = {
                active_item: data.a,
                active_path: path,
                active_pid_path: pid_path
            }
            window.sessionStorage.setItem('home_nav_path', JSON.stringify(state.home_nav_path))
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
            window.sessionStorage.setItem('home_nav_path', JSON.stringify(state.home_nav_path))
        },

        setFileAllow(state, data) {
            //console.log(data)
            state.file_allow.allow_ext = data.allow_ext
            state.file_allow.allow_size = parseInt(data.allow_size)
            window.sessionStorage.setItem('file_allow', JSON.stringify(state.file_allow))

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
                }else{
                    console.log(res.msg)
                }
            })
        },
        // 进入文件夹
        enterFolder: (context, data) => {
            if(typeof(context.state.home_nav_items[data.id]) != 'undefined'){
                context.commit('setHomeNavActive', data)
            }else{
                context.dispatch('setHomeNav', data.id)
            }
        }

    },
    getters: {
        
    }
}