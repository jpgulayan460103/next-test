import axios from 'axios'
import ls from 'local-storage'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Router from 'next/router'


if(ls('user')){
  let token = ls('user').access_token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status == 401) {
      console.log("errorrr");
    }else if (error.response && error.response.status == 404) {
      console.log("errorrr");
      Swal.fire({
        title: 'Error!',
        text: 'The system cannot find what you are looking for. It may not have existed or it has been removed.',
        icon: 'error',
        confirmButtonText: 'Back to Home',
        onClose: () => {
          Router.push('/')
        }
      })
    }else if (error.response && error.response.status == 403) {
      console.log("errorrr");
    }else if (error.response && error.response.status >= 500) {
      console.log("errorrr");
    }
    return Promise.reject(error);
  });
}
export default axios;