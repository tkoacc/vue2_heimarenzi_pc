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
/**
 * 导出员工的excel
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 使用blob接收二进制文件流
    responseType: 'blob'
  })
}
