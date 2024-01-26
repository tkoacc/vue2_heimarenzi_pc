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
/**
 * 下载员工导入模板
 */
export function getExportTemplate() {
  return request({
    url: '/sys/user/import/template',
    // 使用blob接收二进制文件流
    responseType: 'blob'
  })
}
/**
 * 上传用户的excel
 */
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}
/**
 * 删除员工
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
