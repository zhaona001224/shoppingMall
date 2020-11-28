import http from './axios'
// 游戏列表
export const addCart = (params) => {
  return http.fetchGet('/api/v1/contents'+params,{})
}
export const getPay = (str,params) => {
  return http.fetchPost('/payment/'+str+'/dopay',params)
}