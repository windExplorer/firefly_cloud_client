import $global from '@/global.js'
import $apis from '@/api/apis.js'

export default {
    namespaced: true,
    
    state: {
        new_share: JSON.parse(sessionStorage.getItem('new_share')) || [],
    },
    mutations: {
        set_new_share(state, data) {
            state.new_share = data
            window.sessionStorage.setItem('new_share', JSON.stringify(data))
        }
    },
    actions: {
        // 获取最新分享
        getNewShare: context => {
            $apis.dynamicApi.getNewShare().then(res => {
                res = res.data
                console.log(res)
                if(res.code == 1){
                    context.commit('set_new_share', res.data)
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
    },
    getters: {
        
    }
}