import http from './axios'
// 获取列表
export const getTemplete = (params) => {
  return http.fetchGet('/api/v1/contents'+params,{})
}
// 获取公告列表
export const getConfig = (params) => {
  return http.fetchPost('/api/v1/config',{})
}
// 获取订单列表
export const getOrder = (params) => {
  return http.fetchGet('/admin/v1/contents/search'+params,{})
}
