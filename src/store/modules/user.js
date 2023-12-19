const state = {
  token: null
}

const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  login(context, data) {
    console.log(data)
    // todo: 调用接口
    // 返回一个token
    context.commit('setToken', 123456)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
