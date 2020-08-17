import http from './axios'
// 游戏列表
export const addCart = (params) => {
  return http.fetchGet('/api/v1/contents'+params,{})
}
export const getPay = (params) => {
  return http.fetchPost('/payment/paypal/pay',params)
}
export const getPay2 = (params) => {
  return http.fetchPost('/payment/payssion/pay',params)
}
export const getPay3 = (params) => {
  return http.fetchPost('payment/skrill/pay',params)
}