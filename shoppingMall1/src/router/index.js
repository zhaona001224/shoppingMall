import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Mainpage from '../views/Mainpage'
import GameList from '../views/GameList'
import ForgetPage from '../views/ForgetPage'
import CoinList from '../views/CoinList'
import ItemList from '../views/ItemList'
import PayPage from '../views/PayPage'
import Result from '../views/Result'
import NewsList from '../views/NewsList'
Vue.use(VueRouter);

const routes = [{
		path: '*',
		redirect: '/Home'

	},
	{
		path: '/Home',
		name: 'Mainpage',
		component: Home,
		children: [{
			path: '',
			name: 'Mainpage',
			component: Mainpage
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/gameList',
		name: 'GameList',
		component: Home,
		children: [{
			path: '',
			name: 'Game List',
			component: GameList
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/forget',
		name: 'Forget',
		component: Home,
		children: [{
			path: '',
			name: 'Forget',
			component: ForgetPage
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/CoinList',
		name: 'CoinList',
		component: Home,
		children: [{
			path: '',
			name: 'Coin List',
			component: CoinList
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/itemList',
		name: 'ItemList',
		component: Home,
		children: [{
			path: '',
			name: 'Item List',
			component: ItemList
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/payPage',
		name: 'PayPage',
		component: Home,
		children: [{
			path: '',
			name: '支付页',
			component: PayPage
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/result',
		name: 'Result',
		component: Home,
		children: [{
			path: '',
			name: '购买结果',
			component: Result
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/newsList',
		name: 'NewsList',
		component: Home,
		children: [{
			path: '',
			name: 'News List',
			component: NewsList
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},

];

const router = new VueRouter({
	routes
});
export default router;