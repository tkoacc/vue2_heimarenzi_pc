const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userId: state => state.user.userInfo.userId,
  // 头像
  avatar: state => state.user.userInfo.staffPhoto,
  // 用户名称
  name: state => state.user.userInfo.username,
  routes: state => state.user.routes,
  company: state => state.user.userInfo.company,
  departmentName: state => state.user.userInfo.departmentName
}
export default getters
