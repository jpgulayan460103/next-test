import axios from './axios-settings'

export default {
  
  add(formdata){
    return axios.post('http://brgy.test/api/residents',formdata);
  },
  update(formdata,id){
    return axios.put(`http://brgy.test/api/residents/${id}`,formdata);
  },
  delete(id){
    return axios.delete(`http://brgy.test/api/residents/${id}`);
  },
  all(formData){
    return axios.get('http://brgy.test/api/residents',{
      params: formData
    });
  },
  getBarangay(){
    return axios.get('http://brgy.test/api/psgcs/dropdown');
  },
  get(id){
    return axios.get(`http://brgy.test/api/residents/${id}`);
  }
}