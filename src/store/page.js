export default {
    namespaced: true,
    
    state: {
        personal: {
            tab_active: '1'
        }
    },
    mutations: {
        setTabActive(state, data) {
            state.personal.tab_active = data
        },
        
    },
    actions: {

    },
    getters: {
        
    }
}