import axios from 'axios'
import cookie from '@/storage/cookies'
import { ElMessage } from 'element-plus'

// axios基础配置
const timeout = 50000
const baseUrl = '/api'
axios.defaults.timeout = timeout
axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
let white:any [] = [] // 白名单
// 请求拦截器
axios.interceptors.request.use(
  (config:any): any => {
    let musicToken = cookie.cookieRead('musicToken')
    // 判断指定接口不带token
    if (musicToken && !white.includes(config.url)) {
      config.headers.Authorization = `Bearer ${musicToken}`
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
    // post请求默认添加时间戳
    data.timestamp = new Date().getTime()
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
