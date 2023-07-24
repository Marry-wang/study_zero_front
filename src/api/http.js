import axios from 'axios';
import { Loading, Message } from 'element-ui';
import Qs from 'qs'

// // 环境的切换
// // if (process.env.NODE_ENV === 'development') {
// //     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// // } else if (process.env.NODE_ENV === 'debug') {
// //     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// // } else if (process.env.NODE_ENV === 'production') {
// //     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// // }

//设置请求超时时间
axios.defaults.timeout = 10000

// //将token带入请求头中
// axios.interceptors.request.use(function(config) {
//     let token = sessionStorage.getItem('accessToken')
//     if (token) { 
//         config.headers['accessToken'] =  token
//     }
//     return config
// }, function(error) {
//     return Promise.reject(error)
// })
// //响应拦截
// axios.interceptors.response.use(function(response) {
//     if(response.status == 200){
//         if(response.data.code !=200){
//             Vue.prototype.$message.error(response.data.message)
//         }
//     }
//     return response
// }, function(error) { //登录失败异常
//     if (error.request) {
//         if (error.request.status == 401) {
//             Vue.prototype.$message.error('未授权，请重新登录')
//             router.replace({
//                 path: '/login' // 到登录页重新获取token
//             })
//         } else if (error.request.status == 400) {
//             Vue.prototype.$message.error('用户名或密码错误')
//         }
//     } else if (error.response) {
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//     }
//     return Promise.reject(error)
// })


/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params){
    return new Promise((resolve,reject) =>{
        axios({
            method: 'get',
            url: url,
            params: params
        })
        .then(res =>{
            resolve(res.data)
            Loading.service(true).close()
            // Message({message:'请求成功',type:'success'})
            return res
        }).catch(err =>{
            reject(err.data)
            Loading.service(true).close()
            Message({message:'加载失败',type:'error'})
        })
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post (url,params){
    // console.log(sessionStorage.getItem('token'))
    return new Promise((resolve,reject)=>{
        axios.post(url,{data:Qs.stringify(params)},{headers:{'Content-Type':"application/json;charset=utf-8"}})
        .then(res =>{
            resolve(res.data)
            Loading.service(true).close()
            // Message({message:'请求成功',type:'success'})
            return res.data
        })
        .catch(err =>{
            reject(err.data)
            Loading.service(true).close()
            Message({message:'加载失败',type:'error'})
        })
    })
}

/**
 * postform方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function postform (url,params){
    // console.log(sessionStorage.getItem('token'))
    return new Promise((resolve,reject)=>{
        axios({
            method: 'post',
            url: url,
            data: params,
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res =>{
            if(res.data.code!==200){
                reject(res.data.message)
                Loading.service(true).close()
                Message({message:res.data.message,type:'error'})
            }else{
                resolve(res.data)
                Loading.service(true).close()
                Message({message:'请求成功',type:'success'})
                return res.data
            }
        })
        .catch(err =>{
            // reject(err.message)
            // Loading.service(true).close()
            Message({message:err.message,type:'error'})
        })
    })
}
export function postUpload (url,params){
    // console.log(sessionStorage.getItem('token'))
    return new Promise((resolve,reject)=>{
        axios({
            method: 'post',
            url: url,
            data: params,
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
        .then(res =>{
            resolve(res.data)
            Loading.service(true).close()
            // Message({message:'请求成功',type:'success'})
            return res.data
        })
        .catch(err =>{
            reject(err.data)
            Loading.service(true).close()
            Message({message:'加载失败',type:'error'})
        })
    })
}



export const updateMenu1 = (form) => {
    return axios({
      url: 'system/system/updateMenu',
      method: 'post',
      data: form
    })
  }