import layout from '@/layout'
export default {
  path: '/department',
  name: 'department',
  component: layout,
  children: [
    {
      // 二级路由地址为空时
      path: '',
      component: () => import('@/views/department'),
      name: 'department',
      // 路由元信息 储存数据的
      meta: { icon: 'tree', title: '组织' }
    }
  ]
}
