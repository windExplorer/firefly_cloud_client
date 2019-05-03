

export default {
    namespaced: true,
    // tab_active
    state: {
        personal: JSON.parse(sessionStorage.getItem('pagePersonal')) || {tab_active: '1'},
        home: JSON.parse(sessionStorage.getItem('pageHome')) || {tab_active: '1'},
        dynamic: JSON.parse(sessionStorage.getItem('pageDynamic')) || {tab_active: '1'},
        message: JSON.parse(sessionStorage.getItem('pageMessage')) || {tab_active: '1'},
        title: sessionStorage.getItem('title') || global.name + ' - 全部文件',
    },
    mutations: {
        /* personal页面 */
        setPersonal(state, data) {
            state.personal = data
            sessionStorage.setItem('pagePersonal', JSON.stringify(data))
        },
        setPersonal_tabActive(state, data) {
            state.personal.tab_active = data
            sessionStorage.setItem('pagePersonal', JSON.stringify(state.personal))
        },

        /* home页面 */
        setHome(state, data) {
            state.home = data
            sessionStorage.setItem('pageHome', JSON.stringify(data))
        },
        setHome_tabActive(state, data) {
            state.home.tab_active = data
            sessionStorage.setItem('pageHome', JSON.stringify(state.home))
        },

        /* dynamic页面 */
        setDynamic(state, data) {
            state.dynamic = data
            sessionStorage.setItem('pageDynamic', JSON.stringify(data))
        },
        setDynamic_tabActive(state, data) {
            state.dynamic.tab_active = data
            sessionStorage.setItem('pageDynamic', JSON.stringify(state.dynamic))
        },

        /* message页面 */
        setMessage(state, data) {
            state.message = data
            sessionStorage.setItem('pageMessage', JSON.stringify(data))
        },
        setMessage_tabActive(state, data) {
            state.message.tab_active = data
            sessionStorage.setItem('pageMessage', JSON.stringify(state.message))
        },

        /* 设置页面标题 */
        setTitle(state, data) {
            state.title = data
            sessionStorage.setItem('title', data)
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