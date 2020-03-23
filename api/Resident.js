import axios from './axios-settings'

export default {
  add(formdata){
    return axios.post('http://brgy.test/api/residents',formdata);
  },
  getBarangay(){
    return axios.get('http://brgy.test/api/psgcs/dropdown');
  }
}