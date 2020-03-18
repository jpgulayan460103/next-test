import axios from 'axios'
import ls from 'local-storage'

if(ls('user')){
  let token = ls('user').access_token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
export default axios;