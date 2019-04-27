import axios from 'axios';
import { Toast } from 'vant';
import Cookies from 'js-cookie';
import store from '@/store/store' ;

 
// create an axios instance
 const service = axios.create({
  baseURL:process.env.BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
  headers: {
    'Content-Type':'application/json',
  }, 
}) 


// 请求拦截
 service.interceptors.request.use(
  config => {
     var token = Cookies.get('token')
      if(token){
        config.headers.Authorization = `Bearer ${token}`
      }
      store.commit('showLoading')
    return config 
  },
  error => {
    console.log(error) 
    return Promise.reject(error)
  }
) 

// 响应拦截
 service.interceptors.response.use(
   response => {
      store.commit('hideLoading')
      store.commit('SET_ABLE')
      return Promise.resolve(response.data)
   },

  error => {
    //错误提示
    store.commit('hideLoading')
    store.commit('SET_DISABLE')
      if(error.response.data.status_code == 429){
        Toast('您访问的太快了,请喝口茶歇一歇吧');
        return  Promise.reject(error.response.data)
      }else{
        Toast(error.response.data.message);
        return  Promise.reject(error.response.data) 
      }
      
  }
) 

export default service
