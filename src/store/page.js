

export default {
    namespaced: true,
    // tab_active
    state: {
        personal: JSON.parse(window.sessionStorage.getItem('pagePersonal')) || {tab_active: '1'},
        home: JSON.parse(window.sessionStorage.getItem('pageHome')) || {tab_active: '1'},
        dynamic: JSON.parse(window.sessionStorage.getItem('pageDynamic')) || {tab_active: '1'},
        message: JSON.parse(window.sessionStorage.getItem('pageMessage')) || {tab_active: '1'},
        title: window.sessionStorage.getItem('title') || global.name + ' - 全部文件',
    },
    mutations: {
        /* personal页面 */
        setPersonal(state, data) {
            state.personal = data
            window.sessionStorage.setItem('pagePersonal', JSON.stringify(data))
        },
        setPersonal_tabActive(state, data) {
            state.personal.tab_active = data
            window.sessionStorage.setItem('pagePersonal', JSON.stringify(state.personal))
        },

        /* home页面 */
        setHome(state, data) {
            state.home = data
            window.sessionStorage.setItem('pageHome', JSON.stringify(data))
        },
        setHome_tabActive(state, data) {
            state.home.tab_active = data
            window.sessionStorage.setItem('pageHome', JSON.stringify(state.home))
        },

        /* dynamic页面 */
        setDynamic(state, data) {
            state.dynamic = data
            window.sessionStorage.setItem('pageDynamic', JSON.stringify(data))
        },
        setDynamic_tabActive(state, data) {
            state.dynamic.tab_active = data
            window.sessionStorage.setItem('pageDynamic', JSON.stringify(state.dynamic))
        },

        /* message页面 */
        setMessage(state, data) {
            state.message = data
            window.sessionStorage.setItem('pageMessage', JSON.stringify(data))
        },
        setMessage_tabActive(state, data) {
            state.message.tab_active = data
            window.sessionStorage.setItem('pageMessage', JSON.stringify(state.message))
        },

        /* 设置页面标题 */
        setTitle(state, data) {
            state.title = data
            window.sessionStorage.setItem('title', data)
            window.document.title = data
        },

        /* 清空state */
        setNull(state) {
            state = null
        }
        
    },
    actions: {

    },
    getters: {
        
    }
}