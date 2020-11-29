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
import BlankPage from '../views/BlankPage'
import NewDetail from '../views/NewDetail'
import AboutUs from '../views/AboutUs'
import FAQ from '../views/FAQ'
import DeliveryPolicy from '../views/DeliveryPolicy'
import DMCANotice from '../views/DMCANotice'
import ReturnPolicy from '../views/ReturnPolicy'
import TermsCon from '../views/TermsCon'
import PrivacyPolicy from '../views/PrivacyPolicy'
import Profile from '../views/Profile'
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
		path: '/CoinList/:id',
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
		path: '/itemList/:id',
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
	{
		path: '/BlankPage',
		name: 'BlankPage',
		component: Home,
		children: [{
			path: '',
			name: 'BlankPage',
			component: BlankPage
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/NewDetail',
		name: 'NewDetail',
		component: Home,
		children: [{
			path: '',
			name: 'NewDetail',
			component: NewDetail
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/AboutUs',
		name: 'AboutUs',
		component: Home,
		children: [{
			path: '',
			name: 'AboutUs',
			component: AboutUs
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/FAQ',
		name: 'FAQ',
		component: Home,
		children: [{
			path: '',
			name: 'FAQ',
			component: FAQ
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/DeliveryPolicy',
		name: 'DeliveryPolicy',
		component: Home,
		children: [{
			path: '',
			name: 'DeliveryPolicy',
			component: DeliveryPolicy
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/DMCANotice',
		name: 'DMCANotice',
		component: Home,
		children: [{
			path: '',
			name: 'DMCANotice',
			component: DMCANotice
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/ReturnPolicy',
		name: 'ReturnPolicy',
		component: Home,
		children: [{
			path: '',
			name: 'ReturnPolicy',
			component: ReturnPolicy
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/PrivacyPolicy',
		name: 'PrivacyPolicy',
		component: Home,
		children: [{
			path: '',
			name: 'PrivacyPolicy',
			component: PrivacyPolicy
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/TermsCon',
		name: 'TermsCon',
		component: Home,
		children: [{
			path: '',
			name: 'TermsCon',
			component: TermsCon
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Profile',
		name: 'Profile',
		component: Home,
		children: [{
			path: '',
			name: 'Profile',
			component: Profile
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