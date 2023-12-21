import axios from 'axios'
import store from '@/store'
// 创建axios实例
const service = axios.create({
  // 配置基地址
  baseURL: '/api',
  timeout: 10000
})
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
export default service
