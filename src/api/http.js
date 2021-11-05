import axios from 'axios';
import { Loading, Message } from 'element-ui';
import Qs from 'qs'

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// } else if (process.env.NODE_ENV === 'debug') {
//     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// } else if (process.env.NODE_ENV === 'production') {
//     axios.defaults.baseURL = 'https://cnodejs.org/api/v1'
// }

//设置请求超时时间
axios.defaults.timeout = 10000

//将token带入请求头中
axios.interceptors.request.use(function(config) {
    let token = sessionStorage.getItem('token')
    if (token) { 
        config.headers['token'] =  token
    }
    return config
}, function(error) {
    return Promise.reject(error)
})



/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params){
    return new Promise((resolve,reject) =>{
        axios.get(url,{
            params: params
        }).then(res =>{
            resolve(res.data)
            Loading.service(true).close()
            Message({message:'请求成功',type:'success'})
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
    console.log(sessionStorage.getItem('token'))
    return new Promise((resolve,reject)=>{
        axios.post(url,Qs.stringify(params))
        .then(res =>{
            resolve(res.data)
            Loading.service(true).close()
            Message({message:'请求成功',type:'success'})
            return res.data
        })
        .catch(err =>{
            reject(err.data)
            Loading.service(true).close()
            Message({message:'加载失败',type:'error'})
        })
    })
}

