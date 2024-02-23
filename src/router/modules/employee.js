import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  name: 'employee',
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    // 员工详情的地址
    path: '/employee/detail/:id?',
    component: () => import('@/views/employee/detail.vue'),
    // 表示隐藏在左侧菜单
    hidden: true,
    meta: {
      title: '员工详情'
    }
  }]
}
