import axios from 'axios'
import store from '../store'

let token,username
if(store.state.user.userInfo == null){
    token = ''
    username = ''
}else{
    token = store.state.user.userInfo.token
    username = store.state.user.userInfo.useranme
}
axios.defaults.headers.common['token'] = token
axios.defaults.headers.common['username'] = username

export default axios