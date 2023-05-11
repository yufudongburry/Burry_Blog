import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ResponseDataType } from "./responseData"

export class Api {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL: "", timeout: 0 }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))
    // 请求拦截器
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = localStorage.getItem("token") as string
      if(token) {
        config.headers!.Authorization = token
      }
      return config
    }, (err: AxiosError) => {
      return Promise.reject(err)
    })

    // 响应拦截器
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      return res
    },(err: AxiosError) => {
      return Promise.reject(err.response)
    })
  }
  // 请求
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDataType<T>>>{
    return this.instance.get(url, config)
  }
  public post<T = any, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseDataType<T>>> {
    return this.instance.post(url, data, config)
  }
}

// 默认导出Api实例
export default new Api({})
