import axios from 'axios'

let ss = {}
if(window.sessionStorage.getItem('userInfo') != null){
    ss = JSON.parse(window.sessionStorage.getItem('userInfo'))
}else{
    ss.token = ''
    ss.username = ''
}


axios.defaults.headers.common['token'] = ss.token
axios.defaults.headers.common['username'] = ss.username

export default axios