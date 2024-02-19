// axios
import axios from 'axios'

// const domain = "https://backend.alkhalijya.com/"
const domain = "http://127.0.0.1:8000/"
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default axios.create({
  domain,
  // You can add your headers here
  headers:{
    common:{
      // 'Authorization' : 'Bearer '+ localStorage.accessToken
      // 'common' : 'Bearer '+ localStorage.accessToken
      // 'Accept-Language' : 'en', 
    }
  }

})