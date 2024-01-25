import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
// 创建axios实例
const service = axios.create({
  // 配置基地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 1000000
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
    // 判断是不是Blob
    if (response.data instanceof Blob) { return response.data }
    // 默认json格式
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
  }, async error => {
    if (error.response.status === 401) {
      Message({
        message: '登录超时',
        type: 'error'
      })
      // 说明token超时了 调用action退出登录
      await store.dispatch('user/logout')
      // 主动跳到登录页
      router.push('/login')
      return Promise.reject(error)
    }
    // error.message 为后端返回的错误信息
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
export default service
