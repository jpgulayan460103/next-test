import axios from './axios-settings'

export default {
  login(formdata){
    return axios.post('http://brgy.test/api/login',formdata);
  },
  getUsers(){
    return axios.get('http://brgy.test/api/users');
  }
}