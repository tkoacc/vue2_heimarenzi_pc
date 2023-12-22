import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  // 从缓存中读取初始值
  token: getToken()
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken() {
    // 删除vuex的token
    state.token = null
    // 删除缓存的token
    removeToken()
  }
}

const actions = {
  async login(context, data) {
    console.log(data)
    // todo: 调用接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
