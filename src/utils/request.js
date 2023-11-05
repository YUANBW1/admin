
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import QS from 'qs';
import router from '@/router';
import { getKey } from '@/utils/auth'
 axios.defaults.baseURL = process.env.VUE_APP_BASE_API
axios.defaults.timeout = 10000;//http请求响应等待时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
console.log( process.env.VUE_APP_BASE_API)
axios.interceptors.request.use(

   
    config => {
        //post请求data过滤
        if(config.method=='post'){
            Object.keys(config.data).forEach((item) => {
                if (config.data[item]===null || config.data[item] ===undefined) {
                    delete config.data[item] 
                }
            })
            config.data = QS.stringify(config.data) // 序列化post 参数
        }
        //token
        let lc =  getKey('user');
        if(lc){
            config.headers.token  = JSON.parse(lc).token;
        }
    
        return config
    },
    error => {
        // do something with request error

        return Promise.reject(error)
    }
)

// response interceptor
axios.interceptors.response.use(

    response => {
        
        if (response.data.code != 0) {

            if (response.data.code == 102) {
                Message({
                    message: '请重新登录',
                    type: 'error'
                })
                router.replace({ path: '/login' })
             
            }
           
           
        }

        return response
    },
    error => {
      
        return Promise.reject(error)
    }
)

export function get(url, params) {

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url,params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    })
}