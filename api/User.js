import axios from './axios-settings'

export default {
  login(formdata){
    return axios.post('https://brgy.test/api/login',formdata);
  },
  getUsers(){
    return axios.get('https://brgy.test/api/users');
  }
}