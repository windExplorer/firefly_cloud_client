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
                path_name: `/`
            }
        },
        home_nav_path: JSON.parse(window.sessionStorage.getItem('home_nav_path')) || {
            active_path: ['0'],
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
            //console.log(data)
            //console.log(state)
            state.home_nav_items[data.a]['list'] = data.b.list
            window.sessionStorage.setItem('home_nav_items', JSON.stringify(state.home_nav_items))
        },

        setFileAllow(state, data) {
            //console.log(data)
            state.file_allow.allow_ext = data.allow_ext
            state.file_allow.allow_size = parseInt(data.allow_size)
            window.sessionStorage.setItem('file_allow', JSON.stringify(state.file_allow))

        }
        
        
    },
    actions: {
        // data为folder_id
        setHomeNav: (context, data) => {
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
        }
    },
    getters: {
        
    }
}