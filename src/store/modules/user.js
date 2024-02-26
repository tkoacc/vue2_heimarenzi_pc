import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'

const state = {
  // 从缓存中读取初始值
  token: getToken(),
  // 储存用户基本资料状态
  userInfo: {},
  // 储存用户的权限
  routes: constantRoutes
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    // 删除vuex的token
    state.token = null
    // 删除缓存的token
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  async login(context, data) {
    // todo: 调用接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo(context) {
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
    return res
  },
  // 退出登录的action
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 设置用户信息为空对象
    context.commit('setUserInfo', {})
    // 重置路由
    resetRouter()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
