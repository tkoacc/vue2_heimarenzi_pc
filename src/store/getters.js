const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  // 头像
  avatar: state => state.user.userInfo.staffPhoto,
  // 用户名称
  name: state => state.user.userInfo.username
}
export default getters
