import axios from 'axios'
import cookie from '@/storage/cookies'
import { ElMessage } from 'element-plus'

// axios基础配置
const timeout = 50000
const baseUrl = 'http://192.168.0.21:9527/'
axios.defaults.timeout = timeout
axios.defaults.baseURL = baseUrl
let white:any [] = [] // 白名单
// 请求拦截器
axios.interceptors.request.use(
  (config:any): any => {
    let token = cookie.cookieRead('token')
    // 判断指定接口不带token
    if (token && !white.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers.tag = 'burry'
    return config
  },
  (error:any): Promise<never> => Promise.reject(error),
)
// 响应拦截器
axios.interceptors.response.use(
  (response:any): any => response,
  (error:any): Promise<never> => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        case 403:
          ElMessage.error(error.response.data.msg)
          break
        case 490:
          break
      }
    }
    return Promise.reject(error)
  },
)

// 封装请求
export default {
  get(url: string, params?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        params,
        url,
      }).then((res:any): any => {
        resolve(res)
      })
    })
  },
  post(url: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        data,
        url,
      }).then((res:any): any => {
        resolve(res)
      })
    })
  },
  delete(url: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        data,
        url,
      }).then((res:any): any => {
        resolve(res)
      })
    })
  },
}
