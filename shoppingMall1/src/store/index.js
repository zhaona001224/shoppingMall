import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
Vue.use(Vuex)

const state = {
	game: {},
	login: localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo')), // 是否登录
	userInfo: localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo')), // 用户信息
	cartList: localStorage.getItem('buyCart')&&JSON.parse(localStorage.getItem('buyCart'))||[], // 加入购物车列表
	currencyInfo:localStorage.getItem('currencyInfo')&&JSON.parse(localStorage.getItem('currencyInfo')),
	currencyInfo:localStorage.getItem('currencyInfo')&&JSON.parse(localStorage.getItem('currencyInfo')),
	countryInfo:localStorage.getItem('countryInfo')&&JSON.parse(localStorage.getItem('countryInfo')),
    showLogin:false,
    clientSize:1900
}

export default new Vuex.Store({
	state,
	action,
	mutations
})