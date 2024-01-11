import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

/**
 *前置守卫
 */

const whiteList = ['/login', '404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      // 如果已登录，就跳转到首页
      next('/')
      nProgress.done()
    } else {
      // 判断是否获取过资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      // 放过
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nProgress.done()
    }
  }
})

/**
 *后置守卫
 */
router.afterEach((to, from) => {
  nProgress.done()
})
