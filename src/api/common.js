import axios from 'axios'

let ss = {
    token: '',
    id: 0
}

if(window.sessionStorage.getItem('userInfo') != null){
    ss = JSON.parse(window.sessionStorage.getItem('userInfo'))
}

axios.defaults.headers.common['token'] = ss.token
axios.defaults.headers.common['username'] = ss.id

export default axios