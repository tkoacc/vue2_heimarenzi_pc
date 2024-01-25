import request from '@/utils/request'
/**
 * 获取员工列表
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    // 查询参数
    params
  })
}
