import axios from './axios-settings'
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status == 401) {
    console.log("errorrr");
  }else if (error.response && error.response.status == 403) {
    console.log("errorrr");
  }else if (error.response && error.response.status >= 500) {
    console.log("errorrr");
  }
  return Promise.reject(error);
});

export default {
  
  add(formdata){
    return axios.post('http://brgy.test/api/residents',formdata);
  },
  update(formdata,id){
    return axios.put(`http://brgy.test/api/residents/${id}`,formdata);
  },
  getBarangay(){
    return axios.get('http://brgy.test/api/psgcs/dropdown');
  },
  get(id){
    return axios.get(`http://brgy.test/api/residents/${id}`);
  }
}