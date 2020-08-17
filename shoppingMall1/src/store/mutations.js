import {
	INIT_BUYCART,
	ADD_CART,
	GET_USERINFO,
	RECORD_USERINFO,
	ADD_ANIMATION,
	SHOW_CART,
	REDUCE_CART,
	EDIT_CART,
	LOGINOUT_USERINFO,
	CHOOSE_CURRENCY,
	CHOOSE_COUNTRY,
	SHOW_LOGIN
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
	// 网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart')
		if(initCart) {
			state.cartList = JSON.parse(initCart)
		}
	},
	// 加入购物车
	[ADD_CART](state, {
		productId,
		salePrice,
		productName,
		productImg,
		productNum = 1,
		type,
		serveId,
		serveName,
		gameId,
		gameName,
		totalPrice = 0
	}) {
		let cart = state.cartList || [] // 购物车
		let falg = true
		let goods = {
			productId,
			salePrice,
			productName,
			productImg,
			type,
			serveId,
			serveName,
			gameId,
			gameName,
			totalPrice
		}
		if(cart && cart.length) { // 有内容
			cart.forEach(item => {
				if(item.productId === productId) {
					if(type == "coin") {
						item.salePrice = (item.productNum * item.salePrice * 1 + salePrice * 1) / (item.productNum * 1 + productNum * 1);
						item.salePrice = Math.round(item.salePrice * 100) / 100;
							item.totalPrice += salePrice * 1
					}
					if(item.productNum >= 0) {
						falg = false
						item.productNum += productNum * 1
					}

				}
			})
		}
		if(!cart || falg) {
			if(type == "coin") {
				goods.salePrice = salePrice * 1 / productNum * 1;
				goods.totalPrice = salePrice * 1
			}
			goods.productNum = productNum * 1
			goods.checked = '1'
			cart.push(goods)
		}

		state.cartList = cart
		// 存入localStorage
		setStore('buyCart', cart)
	},
	// 加入购物车动画
	[ADD_ANIMATION](state, {
		moveShow,
		elLeft,
		elTop,
		img,
		cartPositionT,
		cartPositionL,
		receiveInCart
	}) {
		state.showMoveImg = moveShow
		if(elLeft) {
			state.elLeft = elLeft
			state.elTop = elTop
		}
		state.moveImgUrl = img
		state.receiveInCart = receiveInCart
		if(cartPositionT) {
			state.cartPositionT = cartPositionT
			state.cartPositionL = cartPositionL
		}
	},
	// 是否显示购物车
	[SHOW_CART](state, {
		showCart
	}) {
		// let timer = null
		state.showCart = showCart
		// clearTimeout(timer)
		// if (showCart) {
		//   timer = setTimeout(() => {
		//     state.showCart = false
		//   }, 5000)
		// }
	},
	// 移除商品
	[REDUCE_CART](state, {
		productId,
		productName
	}) {
		let cart = state.cartList
		cart.forEach((item, i) => {
			if(item.productId === productId) {
				if(item.productNum * 1 > 1) {
					item.productNum--
				} else {
					cart.splice(i, 1)
				}
			}
		})
		state.cartList = cart
		// 存入localStorage
		setStore('buyCart', state.cartList)
	},
	// 修改购物车
	[EDIT_CART](state, {
		productId,
		productNum,
		checked
	}) {
		let cart = state.cartList
		if(productNum) {
			cart.forEach((item, i) => {
				if(item.productId === productId) {
					item.productNum = productNum * 1
					item.checked = checked
				}
			})
		} else if(productId) {
			cart.forEach((item, i) => {
				if(item.productId === productId) {
					cart.splice(i, 1)
				}
			})
		} else {
			cart.forEach((item) => {
				item.checked = checked ? '1' : '0'
			})
		}
		state.cartList = cart
		// 存入localStorage
		setStore('buyCart', state.cartList)
	},
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info
		state.login = true
		setStore('userInfo', info);
		setStore('token', info.token);

	},
	[CHOOSE_COUNTRY](state, info) {
		state.countryInfo = info
		setStore('countryInfo', info);
	},
	// 选择货币
	[CHOOSE_CURRENCY](state, info) {
		if(!state.currencyInfo) {
			state.currencyInfo = info;
			state.currencyInfo1=info;
			setStore('currencyInfo', info);
			setStore('currencyInfo1', info);
		} else {
			if(info.type == 1) {
				state.currencyInfo = info
				setStore('currencyInfo', info);
			} else {
				state.currencyInfo1=info;
				setStore('currencyInfo1', info);
			}
		}

	},
	// 退出
	[LOGINOUT_USERINFO](state, info) {
		state.userInfo = ''
		state.login = false
		setStore('userInfo', '');
		setStore('token', '');

	},
	// 获取用户信息
	[GET_USERINFO](state, info) {
		if(state.userInfo && (state.userInfo.username !== info.username)) {
			return
		}
		if(!state.login) {
			return
		}
		if(!info.message) {
			state.userInfo = { ...info
			}
		} else {
			state.userInfo = null
		}
	}, // 获取用户信息
	//是否展示登录弹框
	[SHOW_LOGIN](state, info) {
		state.showLogin = info
	}
}

// WEBPACK FOOTER //
// ./src/store/mutations.js