// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Home from './components/Home'
import util from './utils/common/util'
import i18n from './utils/common/i18n/i18n'
import store from './store/'
import VueLazyload from 'vue-lazyload'
Vue.use(Vuex);
Vue.use(Router);

Vue.use(ElementUI);　　　　　
Vue.prototype.$util = util;
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
	loading: '/static/timg.gif'
})
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
router.beforeEach((to, from, next) => {
	// 判断该路由是否需要登录权限
	if(to.matched[0]&&to.matched[0].meta.requireAuth&&document.documentElement.clientWidth<=1200) {
		if(localStorage.getItem('token')) {
			next();
		} else {
			next({
				path: '/Mobile/Login',
				query: {
					redirect: to.fullPath
				} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next();
	}
})
new Vue({
	el: '#app',
	store,
	i18n,
	router,
	components: {
		App
	},
	template: '<App/>'
});