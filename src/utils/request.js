import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  // 配置基地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    // 注入token
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认包裹了data
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      // message 为后端返回的错误信息
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }
  }, error => {
    // error.message 为后端返回的错误信息
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
