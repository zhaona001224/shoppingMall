<template>
	<div class="home-container touch" style="padding-top: 0.71rem;">
		<div class="top" style="position: fixed;top:0;">
			<div class="left-img" @click="$router.push('/Mobile/Home')"> <img style="width: 1.03rem;" src="../assets/image/home/mobile-logo.png" /> </div>
			<div class="menu">
				<el-dropdown class="point" style="margin-right: 8.5px;" v-if="currencyInfo"> <span class="el-dropdown-link">
					     {{currencyInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="(item,index) in currencyData" :key="index" @click.native="setCurrency(JSON.parse(item).symbol,JSON.parse(item).name,JSON.parse(item).rate)">{{JSON.parse(item).name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown class="point"> <span class="el-dropdown-link">
					    {{countryInfo&&countryInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="(item,index) in countryData" :key="index" @click='setCountry(item)'>{{JSON.parse(item).name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown  v-if="login"   trigger="click" >
								<div  style="margin-left: 0.25rem;" class="menu-cart"><img style="width: 0.185rem;" src="../assets/image/mobile/icon-my.png"> </div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item @click.native="$router.push('/Profile')"> <i class="el-icon-circle-close-outline"></i><span class="user-name">Profile</span>					</el-dropdown-item>
				<el-dropdown-item @click.native="$router.push('/HistoryOrder')">
				<i class="el-icon-circle-close-outline"></i><span class="user-name">My Order</span>					</el-dropdown-item>
				<el-dropdown-item @click.native="doLoginOut"> <i class="el-icon-circle-close-outline"></i><span class="user-name">Login Out</span>					</el-dropdown-item>
			</el-dropdown-menu>
			</el-dropdown>
			
				<div v-else @click="$router.push('/Mobile/Login')"  style="margin-left: 0.25rem;" class="menu-cart"><img style="width: 0.185rem;" src="../assets/image/home/mobile-my.png"> </div>
				<div class="menu-cart" style="margin-left: 0.14rem;"> <img @click="menuPop=!menuPop" src="../assets/image/home/mobild-menu.png" style="width: 0.2rem;"
					/> </div>
			</div>
		</div>
		<div class="select" ref="tabsWrapper" style="position: fixed;top:0.36rem;z-index:1000;width:100%">
			<ul class="select-ul" style="text-align: left;margin:0 auto;display: flex;">
				<li style="width: 1.3rem;flex-shrink: 0;margin:0;height: 0.35rem;line-height: 0.35rem;border-right:0"
				 :class="gamePop?'active tri_top point':'active tri_bottom point'" @click="getGame();gamePop=!gamePop">
					<a href="javascript:void(0)"><img style="width: 0.18rem;height: 0.2rem;margin-left: -0.2rem;margin-right: 2px;vertical-align: -4px;"
						 src="../assets/image/home/icon_hot.png" />All Games</a>
				</li>
				<li v-for="(item,index) in tabList" class="user-name" @click="$router.push(item.url)">
					<a href="javascript:void(0)">{{item.text}}</a> <img class="border" src="../assets/image/mobile/icon_split.png"
					/> </li>
			</ul>
			<div :class="gamePop?'active choose-game':'choose-game'"> </div>
		</div>
		<van-swipe class="select-game" ref="swiper" v-if="gamePop" height="300px" :loop="false" :show-indicators="false" :autoplay="false" arrow="always">
			<van-swipe-item v-for="item in result" :key="item.id">
				 <img class="left" @click="$refs.swiper.prev()" src="../assets/image/mobile/left.png"
					/> <img class="right" @click="$refs.swiper.next()" src="../assets/image/mobile/right.png"
					/>
				<div class="game-ul"> <span :class="$route.params.id==subItem.id?'active':''" v-if="subItem.online"
					 v-for="(subItem,index) in item" @click="chooseGame(subItem)">
					{{subItem.name}}
				</span> </div>
			</van-swipe-item>
		</van-swipe>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<nav :class="menuPop?'menu-style active':'menu-style'">
			<ul class="list-inline nav-main">
				<li class="nav-primary" @click="$router.push('/Mobile/Home')">
					<a href="javascript:void(0)"> Home </a>
				</li>
				<li class="nav-primary" @click="$router.push('/Mobile/HistoryOrder')">
					<a href="javascript:void(0)"> My Order </a>
				</li>
				<li class="nav-primary" @click="$router.push('/Mobile/BlankPage/2')">
					<a href="javascript:void(0)"> Discount </a>
				</li>
				<li class="nav-primary" @click="$router.push('/Mobile/NewsList')">
					<a href="javascript:void(0)"> News </a>
				</li>
				<li class="nav-primary" @click="$router.push('/Mobile/BlankPage/3')">
					<a href="javascript:void(0)"> Sell to US </a>
				</li>
				<li class="nav-primary" @click="$router.push('/Mobile/FAQ')">
					<a href="javascript:void(0)">FAQ</a>
				</li>
				<li class="nav-primary" @click="doLoginOut">
					<a href="javascript:void(0)">LoginOut</a>
				</li>
			</ul>
		</nav>
		<div class="footer">
			<div class="tip special"> <span class="point" @click="$router.push('/Mobile/AboutUs')">About US</span>
				<span
				 class="point" @click="$router.push('/Mobile/DeliveryPolicy')"> Delivery Policy</span> <span class="point" @click="$router.push('/DMCANotice')">DMCA Notice</span>					<span class="point" @click="$router.push('/Mobile/FAQ')">FAQ </span> <span class="point"
					 @click="$router.push('/ReturnPolicy')">Return Policy</span> <span @click="$router.push('/Mobile/BlankPage/1')"
					 class="point"> Contact US</span> </div>
			<div class="img"> <img src="../assets/image/home/icon_footer.png" /></div>
			<!-- <div class="img">
				<div class="trustedsite-trustmark" data-type="202"></div>
				<div class="trustedsite-trustmark" data-type="102"></div> </div>
			<div class="icon">
			<img src="../assets/image/icon/icon_footer1.png" /> <img src="../assets/image/icon/icon_footer2.png"
				/> <img src="../assets/image/icon/icon_footer3.png" /> <img src="../assets/image/icon/icon_footer4.png"
				/> <img src="../assets/image/icon/icon_footer5.png" /> </div> -->
			<div style="margin:0 auto;width:100%;font-size: 12px;color: #4a4a4a;">Trademarks are the copyright and property of their respective owners.</div>
			<div
			 style="margin:0 auto;width:100%;font-size: 12px;color: #4a4a4a;">The use of this Website constitutes the acceptance of the <span style="color:rgba(2, 145, 205)"
				 class="point" @click="$router.push('/TermsCon')">Terms&Conditions</span> and
				<span @click="$router.push('/PrivacyPolicy')" class="point" style="color:rgba(2, 145, 205)">Privacy Policy</span>				</div>
		<div style="margin:0 auto;width:100%;font-size: 12px;color: #4a4a4a;">Copyright © 2006-2020, J&S Network Technology Limited</div>
		<div class="tip" style="margin:0.2rem auto;opacity: 0.4;">
		<span v-for="(item,index) in gameConfig" :key="index" class="point" @click="chooseGame(item)">{{item.display_name}}</span>			</div>
	</div>
	<div class="fix-bottom" v-if="$route.fullPath!=='/Mobile/payPage'&&$route.fullPath!=='/Mobile/Result'&&$route.name!=='Login'">
		<div class="left">
			<div class="menu-cart"><span class="num">{{cartList.length}}</span><img src="../assets/image/mobile/car.png">				</div>
			<div class="price">{{totalAmout}}<span class="unit">{{currencyInfo.name}}</span></div>
		</div>
		<div class="btn" @click="goPayPage()">Check Out</div>
	</div>
	</div>
</template>
<script>
	import { getTemplete, getConfig } from '../api/common.js'
	import { login, register, loginOut, recover } from '../api/user.js'
	import { mapMutations, mapState } from 'vuex'
	import BScroll from "better-scroll";
	import { ptn } from '@/utils/common/validate'
	import { Swipe, SwipeItem } from 'vant';
	export default {
		name: "app",
		data() {
			return {
				gameList: [],
				imgUrl: '',
				scrollTop: 0,
				gameConfig: [],
				countryData: [],
				currencyData: [],
				result: [],
				totalAmout: 0,
				selectCurrency: '',
				selectList:  ['Discord', 'Skype','Phone',  'Whatsapp','Facebook-Message','Instagram','Telegram',
        'ICQ','Line', 'Snapchat','QQ', 'Wechat'],
				width: '100%',
				gamePop: false,
				totalPrice: 0,
				selectType: 'login',
				form: {
					social_type: 'Discord'
				},
				showCart: true,
				menuPop: false,
				tabList: [{
					text: 'Home',
					url: '/'
				}, {
					text: 'Discount',
					url: '/Mobile/BlankPage/2'
				}, {
					text: 'My Order',
					url: '/Mobile/HistoryOrder'
				}, {
					text: 'Contact Us',
					url: '/Mobile/BlankPage/1'
				}]
			}
		},
		computed: { ...mapState(["game", "userInfo", "login", 'currencyInfo',
				'cartList', 'countryInfo', 'showLogin', 'clientSize'
			]),
			totalNum() {
				var totalNum = 0;
				this.cartList && this.cartList.map((item) => {
					totalNum = totalNum + item.productNum;
				})
				return totalNum
			},
		},
		methods: { ...mapMutations(['CHOOSE_GAME', 'RECORD_USERINFO',
				'LOGINOUT_USERINFO', 'CHOOSE_CURRENCY', 'CHOOSE_COUNTRY', 'SHOW_LOGIN', ,
				'CLEAR_CART'
			]),
			setCurrency(symbol, name, rate) {
				this.CHOOSE_CURRENCY({
					name: name,
					symbol: symbol,
					rate: rate,
					type: 2
				})
			},
			setCountry(item) {
				this.CHOOSE_COUNTRY(JSON.parse(item));
			},
			goPayPage() {
				//				if(this.login) {
				//					this.$router.push('/payPage');
				//				} else {
				//					this.SHOW_LOGIN(true);
				//				}
				if (this.cartList.length == 0) {
					this.$message({
						type: 'warning',
						message: 'Please Select Product'
					});
					return
				}
				this.$router.push('/payPage');
			},
			//退出登录
			doLoginOut() {
				var that = this;
				this.$confirm('Confirm Exit?', 'Tips', {
					confirmButtonText: 'Confirm',
					cancelButtonText: 'Cancel',
					type: 'warning'
				}).then(() => {
					loginOut("").then(response => {
						if (response.retCode == 0) {
							this.LOGINOUT_USERINFO()
							this.$router.push('/Mobile/Home')
						} else {
							that.$message({
								type: 'warning',
								message: response.message
							});
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: 'Cancel'
						});
					});
				})
			},
			chooseGame(item) {
				localStorage.setItem('gameId', item.id);
				localStorage.setItem('gameName', item.name);
				if (this.$route.path == "/Mobile/ItemList" || this.$route.path ==
					"/Mobile/CoinList") {
					window.location.reload()
				} else {
					this.$router.push('/Mobile/ItemList/' + localStorage.getItem('gameId'));
				}
			},
			//登录方法
			submit() {
				var that = this;
				this.$refs.form.validate((valid) => {
					if (valid) {
						login({
							email: this.form.email,
							password: this.form.password
						}).then(response => {
							if (response.retCode == 0) {
								this.$message({
									type: 'success',
									message: 'success'
								});
								var user = {
									token: response.data,
									email: this.form.email,
									social_link: response.social_link,
									social_type: response.social_type
								}
								localStorage.setItem('token', response.data);
								this.RECORD_USERINFO(user);
								this.SHOW_LOGIN(false);
								this.form = {}
								//								window.location.reload();
							} else {
								this.$message({
									type: 'warning',
									message: response.Msg
								});
							}
						})
					} else {
						that.$message.error("Please fill in the form correctly!");
					}
				})
			},
			forget() {
				if (!this.form.email) {
					this.$message({
						type: 'warning',
						message: 'Please fill in email'
					});
					return
				}
				forget({
					email: this.form.email
				}).then(response => {
					if (response.retCode == 0) {
						this.$message({
							type: 'success',
							message: 'success'
						});
					} else {
						this.$message({
							type: 'warning',
							message: response.Msg
						});
					}
				})
			},
			//注册方法
			register() {
				var that = this;
				if (this.form.password != this.form.repassword) {
					this.$message({
						type: 'warning',
						message: 'The two passwords do not match'
					});
					return
				}
				//				if (!(/^1[0-9]{10}$/.test(this.form.phone))) {
				//					this.$message({
				//						type: 'warning',
				//						message: 'Please fill in correct phone'
				//					});
				//					return;
				//				}
				this.$refs.form.validate((valid) => {
					if (valid) {
						register({
							email: this.form.email,
							password: this.form.password,
							phone: this.form.phone,
							social_type: this.form.social_type,
							social_link: this.form.social_link
						}).then(response => {
							if (response.retCode == 0) {
								this.$message({
									type: 'success',
									message: 'success'
								});
								this.form.password = "";
								this.selectType = "login"
							} else {
								this.$message({
									type: 'warning',
									message: response.Msg
								});
							}
						})
					} else {
						that.$message.error("Please fill in the form correctly!");
					}
				})
			},
			getGame() {
				if (this.gameList.length > 0) return
				//获取游戏列表
				getTemplete('?type=Game&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						if (!window.interVal) {
							window.interVal = setInterval(() => {
								this.CLEAR_CART();
							}, 1200000)
						}
						response.data.sort((a,b) => {
							
							 let fa = a.name.trim().toLowerCase(),
								fb = b.name.trim().toLowerCase();

							if (fa < fb) {
								return -1;
							}
							if (fa > fb) {
								return 1;
							}
							return 0;
							}); 
						this.gameList = response.data.filter((item) => {
							return item.online;
						});
						//this.gameList = response.data;
						var array = response.data
						var result = [];
						for (var x = 0; x < Math.ceil(array.length / 12); x++) {
							var start = x * 12;
							var end = start + 12;
							result.push(array.slice(start, end));
						}
						this.result = result
						
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			scrollToTop() {　　
				this.scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop;
			},
		},
		created() {
			var that = this;
			this.getGame();
			this.imgUrl = window.imgUrl;
			window.addEventListener('scroll', this.scrollToTop)
			//			this.width=document.body.clientWidth>1000?document.body.clientWidth+'px':'400px';
			getConfig().then(response => {
				if (response.retCode == 0) {
					this.countryData = response.country;
					this.currencyData = response.currency;
					if (!this.currencyInfo) {
						this.CHOOSE_CURRENCY({
							name: JSON.parse(this.currencyData[0]).name,
							symbol: JSON.parse(this.currencyData[0]).symbol,
							rate: JSON.parse(this.currencyData[0]).rate,
							type: 2
						})
						this.CHOOSE_COUNTRY(JSON.parse(this.countryData[0]));
					}
					localStorage.setItem("countryData", JSON.stringify(response.country));
					localStorage.setItem("currencyData", JSON.stringify(response.currency));
				} else {
					this.$message({
						type: 'warning',
						message: response.message
					});
				}
			})
			getTemplete('?type=DirectGame').then(response => {
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.tabsWrapper, {
							scrollX: true,
							eventPassthrough: "vertical",
						});
					} else {
						this.scroll.refresh();
					}
				});
				if (response.retCode == 0) {
					this.gameConfig = response.data
					response.data.map((item) => {
						item.id = item.game.split(',')[0]
					})
					var array1 = this.gameConfig.filter((item) => item.order)
					array1 = array1.sort((a, b) => a.order - b.order)
					var array2 = this.gameConfig.filter((item) => !item.order)
					array2 = array2.sort(function compareFunction(param1, param2) {
						return param1.name.trim().localeCompare(param2.name.trim(), "zh");
					})
					this.gameConfig = array1.concat(array2)
				} else {
					this.$message({
						type: 'warning',
						message: response.message
					});
				}
			})
		},
		mounted() {
			if(!this.login){
				localStorage.token=''
			}
//			var a = setInterval(() => {
//				var deleteNode = document.getElementById("chat-widget-container");
//				var deleteNode2 = document.getElementById("livechat-eye-catcher");
//				if (deleteNode2) {
//					clearInterval(a);
//				}
//				if (this.$route.fullPath !== '/Home'&&this.$route.fullPath !== '/Mobile/Home') {
//					deleteNode ? deleteNode.className = 'style-none' : ''
//					deleteNode2 ? deleteNode2.className = 'style-none' : ''
//				} else {
//					deleteNode ? deleteNode.className = '' : ''
//					deleteNode2 ? deleteNode2.className = '' : ''
//				}
//			}, 500)
			this.totalAmout = 0
			var price = 0
			setTimeout(() => {
				this.cartList && this.cartList.map((item) => {
					price = price + item.salePrice * item.productNum
				})
				this.totalAmout = (price * this.currencyInfo.rate).toFixed(2)
			}, 1000)
		},
		watch: {
			'cartList' () {
				this.totalAmout = 0
				var price = 0
				this.cartList && this.cartList.map((item) => {
					price = price + item.salePrice * item.productNum
				})
				this.totalAmout = (price * this.currencyInfo.rate).toFixed(2)
			}
		},
	}
</script>
<style lang="less" scoped="">
	body, html {
		padding: 0;
		margin: 0;
	}
	
	.home-container {
		font-size: 0.13rem;
	}
	
	.home-container .top {
		padding: 5px 6px;
		box-sizing: border-box;
		z-index: 1000;
		background: #f1f1f1;
		width: 100%;
		display: flex;
		height: 0.36rem;
		justify-content: space-between;
	}
	
	.home-container .top .left-img {
		display: flex;
		align-items: center;
	}
	
	.home-container .top .menu {
		margin-right: 0;
		display: flex;
		align-items: center;
	}
	
	/deep/ .el-carousel__arrow--right {
		right: 0px;
	}
	
	/deep/ .el-carousel__arrow--left {
		left: 0px;
	}
	
	.home-container .point.el-dropdown.point {
		background-color: #fff;
		border-radius: 0.02rem;
		border: solid 1px #e5e5e5;
		display: block;
		min-width: 0.6rem;
		color: #212121;
		margin-top: 0;
		width: auto;
		height: 0.27rem;
		line-height: 0.27rem;
		font-size: 0.14rem;
	}
	
	.home-container .top .menu .menu-cart {
		display: flex;
		align-items: center;
	}
	
	.select-ul {
		width: 5rem;
		flex-wrap: nowrap;
	}
	
	.select {
		width: 100%;
		overflow: hidden;
		position: relative;
		text-align: center;
		background-color: #212121;
		li {
			cursor: pointer;
			padding: 0 0.13rem;
			font-family: font, Arial, Helvetica Neue, Helvetica, sans-serif;
			font-size: 0.14rem;
			line-height: 0.26rem;
			letter-spacing: 0px;
			color: #ffffff;
			margin: 0.045rem 0;
			display: inline-block;
			height: 0.26rem;
			text-align: center;
			color: #fff;
			position: relative;
			.border {
				position: absolute;
				width: 1px;
				height: 0.3rem;
				right: 0;
				top: 0;
			}
			&:hover {
				background-color: #29303a;
			}
			a {
				color: #fff;
				text-decoration: none;
			}
			&.tri_bottom:before {
				right: 0.1rem;
				content: "";
				width: 0px;
				height: 0px;
				border-top: 6px solid #fff;
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				position: absolute;
				top: 0.15rem;
			}
			&.tri_top:before {
				right: 0.1rem;
				content: "";
				width: 0px;
				height: 0px;
				border-bottom: 6px solid #fff;
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				position: absolute;
				top: 0.15rem;
			}
			&.active {
				background-image: linear-gradient(90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient( #e1251b, #e1251b);
			}
		}
	}
	
	.el-carousel--horizontal, .menu-style,.select-game {
		position: fixed;
		left: 0;
		top: 0.71rem;
		z-index: 999;
		width: 100%;
		background: #363e43;
	}
	
	.menu-style {
		height: 0;
		transform-origin: 0 0;
		transition: all .5s;
		overflow-y: auto;
		&.active {
			height: 3.16rem;
			transform: scale(1);
		}
	}
	
	.menu-style .nav-main {
		background-color: #434d53;
		max-height: 5rem;
		overflow-y: scroll;
		li {
			display: block;
			padding: 0;
			border-top: 1px solid #363e43;
			a {
				padding: 0 15px;
				line-height: 44px;
				font-size: 0.15rem;
				font-family: font, Arial, Helvetica Neue, Helvetica, sans-serif;
				text-decoration: none;
				outline: none;
				color: #fff;
			}
		}
	}
	
	
	/deep/ .van-swipe-item{
			position: relative;
			.left{
				position: absolute;
				left: 10px;
				top:1.4rem;
				width: 14px;
			}
			.right{
				position: absolute;
				right: 10px;
				top:1.4rem;
				width: 14px;
			}
		}
	.game-ul {
		background: #212121;
		padding: 20px 25px;
		font-size: 0.15rem;
		height: 3rem;
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		
		span {
			text-align: left;
			width: 50%;
			flex-shrink: 0;
			margin-top: 0.12rem;
			font-family: font, Arial, Helvetica Neue, Helvetica, sans-serif;
			&.active {
				color: #f39800 ;
			}
		}
	}
	
	.footer {
		text-align: center;
		width: 100%;
		padding: 27px;
		background-color: #181818;
		height: auto;
		box-sizing: border-box;
		padding-bottom: 0.6rem;
		.tip {
			display: flex;
			flex-wrap: wrap;
			&.special {
				span {
					width: 33%;
					font-size: 0.13rem;
					font-weight: 600;
					font-family: PingFang-SC-Medium;
					text-decoration: underline;
					color: #999999;
					padding: 0;
					margin-bottom: 0.15rem;
					&:nth-child(3n) {
						border-right: none
					}
				}
			}
			span {
				display: inline-block;
				color: rgba(245, 245, 245, 0.8);
				text-align: center;
				font-size: 0.13rem;
				padding: 0 0.1rem;
				width: auto;
				text-align: center;
				border-right: 1px solid #4a4a4a;
				&:last-child {
					border-right: none;
				}
			}
		}
		.img {
			margin: 0
		}
		img {
			width: 100%;
			margin: 0.12rem auto 0.2rem;
		}
		.icon {
			margin: 32px auto 28px;
			text-align: center;
			img {
				width: 30px;
				height: 30px;
				margin-right: 6px;
			}
		}
	}
	
	.fix-bottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		display: flex;
		height: 0.6rem;
		background: #fff;
		align-items: center;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.menu-cart {
				width: 0.58rem;
				height: 0.6rem;
				background-color: #ebebeb;
				margin-left: 0;
				position: relative;
				text-align: center;
				.num {
					position: absolute;
					right: 0.1rem;
					top: 0.1rem;
					color: #666;
					font-size: 0.13rem;
					position: absolute;
					width: 0.18rem;
					height: 0.18rem;
					text-align: center;
					line-height: 0.18rem;
					background-color: #e60012;
					border-radius: 50%;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: #fff;
				}
				img {
					margin-top: 0.16rem;
					width: 0.28rem;
					height: 0.28rem;
				}
			}
			.price {
				color: #333;
				font-weight: bold;
				font-size: 0.2rem;
				margin-left: 0.25rem;
				.unit {
					font-size: 0.12rem;
					margin-left: 4px;
				}
			}
		}
		.btn {
			width: 1.22rem;
			height: 0.42rem;
			background-image: linear-gradient(90deg, #f75b1f 0%, #e10e0d 100%), linear-gradient(0deg, #f7571e 0%, #f6902b 100%);
			background-blend-mode: normal, normal;
			border-radius: 0.21rem;
			font-family: PingFang-SC-Medium;
			font-size: 0.16rem;
			font-weight: 600;
			color: #ffffff;
			text-align: center;
			line-height: 0.42rem;
			margin-right: 0.11rem;
		}
	}
</style>