import http from './axios'
// 登录
export const login = (params) => {
  return http.fetchPost('/api/v1/login',params)
}
//注册
export const register = (params) => {
  return http.fetchPost('/api/v1/register',params)
}
//退出
export const loginOut = () => {
  return http.fetchPost('/api/v1/logout',{})
}
//恢复
export const recover = (params) => {
  return http.fetchPost('/api/v1/forgot',params)
}
