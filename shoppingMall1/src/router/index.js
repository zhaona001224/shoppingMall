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
import HistoryOrder from '../views/HistoryOrder'
import MobileHome from '../components/MobileHome'
import MobileMainpage from '../views/Mobile/Mainpage'
import MobileNewsList from '../views/Mobile/NewsList'
import MobileNewDetail from '../views/Mobile/NewDetail'
import MobileResult from '../views/Mobile/Result'
import MobileAboutUs from '../views/Mobile/AboutUs'
import MobileBlankPage from '../views/Mobile/BlankPage'
import MobileFAQ from '../views/Mobile/FAQ'
import MobileDeliveryPolicy from '../views/Mobile/DeliveryPolicy'
import MobileDMCANotice from '../views/Mobile/DMCANotice'
import MobileReturnPolicy from '../views/Mobile/ReturnPolicy'
import MobileTermsCon from '../views/Mobile/TermsCon'
import MobilePrivacyPolicy from '../views/Mobile/PrivacyPolicy'
import MobileProfile from '../views/Mobile/Profile'
import MobileHistoryOrder from '../views/Mobile/HistoryOrder'
import Login from '../views/Mobile/Login'
import MobileCoinList from '../views/Mobile/CoinList'
import MobileItemList from '../views/Mobile/ItemList'
import MobilePayPage from '../views/Mobile/PayPage'
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/BlankPage/:id',
		name: 'BlankPage',
		component: Home,
		children: [{
			path: '',
			name: 'BlankPage',
			component: BlankPage
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
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
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/HistoryOrder',
		name: 'HistoryOrder',
		component: Home,
		children: [{
			path: '',
			name: 'HistoryOrder',
			component: HistoryOrder
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/Home',
		name: 'MobileMainpage',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileMainpage',
			component: MobileMainpage
		}]
	},
	{
		path: '/Mobile/NewsList',
		name: 'MobileNewsList',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileNewsList',
			component: MobileNewsList
		}]
	},
	{
		path: '/Mobile/NewDetail',
		name: 'MobileNewDetail',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileNewDetail',
			component: MobileNewDetail
		}]
	},
	{
		path: '/Mobile/Result',
		name: 'MobileResult',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileResult',
			component: MobileResult
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/AboutUs',
		name: 'MobileAboutUs',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileAboutUs',
			component: MobileAboutUs
		}]
	},
	{
		path: '/Mobile/BlankPage/:id',
		name: 'MobileBlankPage',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileBlankPage',
			component: MobileBlankPage
		}]
	},
	{
		path: '/Mobile/FAQ',
		name: 'MobileFAQ',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileFAQ',
			component: MobileFAQ
		}]
	},
	{
		path: '/Mobile/DeliveryPolicy',
		name: 'MobileDeliveryPolicy',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileDeliveryPolicy',
			component: MobileDeliveryPolicy
		}]
	},
	{
		path: '/Mobile/DMCANotice',
		name: 'MobileDMCANotice',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileDMCANotice',
			component: MobileDMCANotice
		}]
	},
	{
		path: '/Mobile/ReturnPolicy',
		name: 'MobileReturnPolicy',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileReturnPolicy',
			component: MobileReturnPolicy
		}]
	},
	{
		path: '/Mobile/PrivacyPolicy',
		name: 'MobilePrivacyPolicy',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobilePrivacyPolicy',
			component: MobilePrivacyPolicy
		}]
	},
	{
		path: '/Mobile/TermsCon',
		name: 'MobileTermsCon',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileTermsCon',
			component: MobileTermsCon
		}]
	},
	{
		path: '/Mobile/Profile',
		name: 'MobileProfile',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileProfile',
			component: MobileProfile
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/HistoryOrder',
		name: 'MobileHistoryOrder',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileHistoryOrder',
			component: MobileHistoryOrder
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/CoinList/:id',
		name: 'MobileCoinList',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileCoinList',
			component: MobileCoinList
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/ItemList/:id',
		name: 'MobileItemList',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobileItemList',
			component: MobileItemList
		}],
		meta: {
			requireAuth: false //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	},
	{
		path: '/Mobile/Login',
		name: 'Login',
		component: MobileHome,
		children: [{
			path: '',
			name: 'Login',
			component: Login
		}]
	},
	{
		path: '/Mobile/PayPage',
		name: 'Login',
		component: MobileHome,
		children: [{
			path: '',
			name: 'MobilePayPage',
			component: MobilePayPage
		}],
		meta: {
			requireAuth: true //添加该字段，true表示进入这个路由是需要登录的,false不需要登录
		}
	}


];

const router = new VueRouter({
	routes,
	 scrollBehavior(to,from,savedPosition){
      if(savedPosition){
        return savedPosition;
      }else{
        return {x:0,y:0}
      }
    },
});
export default router;