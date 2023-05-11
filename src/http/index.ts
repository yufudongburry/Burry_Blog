import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import cookie from '@/storage/cookies'
import { ElMessage } from 'element-plus'

// axios基础配置
const http: AxiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

const white: any [] = [] // 白名单
// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = cookie.cookieRead('token')
    // 判断指定接口不带token
    if (token && !white.includes(config.url)) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<never> => Promise.reject(error),
)
// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse): any => response,
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
      }).then((res: AxiosResponse) => {
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
      }).then((res: AxiosResponse) => {
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
      }).then((res: AxiosResponse) => {
        resolve(res)
      })
    })
  },
}
