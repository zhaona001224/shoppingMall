<template>
	<div class="home-container" style="padding-top: 0.88rem;">
		<div class="top" style="position: fixed;top:0;">
			<div class="left-img">
				<div style="width: 0.44rem;height:0.44rem;background: rgb(242, 165, 6);"> <img style="padding-top:0.07rem;padding-left:0.07rem;width: 0.3rem;height: 0.3rem;"
					 @click="menuPop=!menuPop" src="../assets/image/icon/icon-menu.png" /> </div>
				<img style="width: 0.8rem;margin-left: 0.1rem;" src="../assets/image/home/logo.png"
				/> </div>
			<div class="menu">
				<el-dropdown class="point" style="margin-right: 4px;" v-if="currencyInfo"> <span class="el-dropdown-link">
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
				<div class="menu-cart point user user-name" style="background: #434d53;"><img src="../assets/image/icon/icon_my.png"> </div>
				<div class="menu-cart point user user-name"
				 style="background: #de6262;" @click="goPayPage()"><span class="num">{{cartList.length}}</span><img src="../assets/image/icon/icon_cart.png">					</div>
			</div>
		</div>
		<div class="select" ref="tabsWrapper" style="position: fixed;top:0.44rem;z-index:1000;width:100%">
			<ul class="select-ul" style="text-align: left;margin:0 auto;display: flex;">
				<li style="width: 1.1rem;flex-shrink: 0;" :class="gamePop?'active tri_top point':'active tri_bottom point'"
				 @click="getGame();gamePop=!gamePop">
					<a href="javascript:void(0)"><img style="width: 0.18rem;height: 0.2rem;margin-left: -0.2rem;margin-right: 2px;vertical-align: -4px;"
						 src="../assets/image/home/icon_hot.png" />All Games</a>
				</li>
				<li class="user-name" @click="$router.push('/')">
					<a href="javascript:void(0)">Home</a>
				</li>
				<li class="user-name">
					<a href="javascript:void(0)" @click="$router.push('/BlankPage/2')">Discount</a>
				</li>
				<li class="user-name">
					<a href="javascript:void(0)" @click="$router.push('/BlankPage/1')">My order</a>
				</li>
				<!--<li class="user-name">
					<a href="javascript:void(0)" @click="$router.push('/FAQ')">FAQ</a>
				</li>-->
				<li class="user-name">
					<a href="javascript:void(0)" @click="$router.push('/BlankPage/3')">Contact us</a>
				</li>
			</ul>
			<div :class="gamePop?'active choose-game':'choose-game'"> </div>
		</div>
		<el-carousel v-if="gamePop" height="300px" :autoplay="false" arrow="always">
			<el-carousel-item v-for="item in result" :key="item.id">
				<div class="game-ul"> <span :class="$route.params.id==subItem.id?'active':''" v-if="subItem.online"
					 v-for="(subItem,index) in gameList" @click="chooseGame(subItem)">
					·{{subItem.name}}
				</span> </div>
			</el-carousel-item>
		</el-carousel>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>

			<nav :class="menuPop?'menu-style active':'menu-style'">
			<ul class="list-inline nav-main">
				<li class="nav-primary">
					<a href="javascript:void(0)" MobileNewDetail> Home </a>
				</li>
				<li class="nav-primary">
					<a href="javascript:void(0)" MobileNewDetail @click="$router.push('/MobileBlankNewsList')"> My Order </a>
				</li>
				<li class="nav-primary">
					<a href="javascript:void(0)" MobileNewDetail @click="$router.push('/MobileBlankPage/2')"> Discount </a>
				</li>
				<li class="nav-primary">
					<a href="javascript:void(0)" @click="$router.push('/MobileNewsList')"> News </a>
				</li>
				<li class="nav-primary">
					<a href="javascript:void(0)" @click="$router.push('/BlankPage/1')" MobileNewDetail> Sell to US </a>
				</li>
				<li class="nav-primary">
					<a href="javascript:void(0)" @click="$router.push('/MobileBlankPage/3')"  MobileNewDetail> Contact US </a>
				</li>
			</ul>
		</nav>
		
		<div class="footer" v-if="$route.fullPath!='/BlankPage'">
			<div class="tip"> <span class="point" @click="$router.push('/MobileAboutUs')">About US</span> <span class="point"
				 @click="$router.push('/MobileFAQ')">FAQ  </span> <span class="point" @click="$router.push('/DeliveryPolicy')"> Delivery Policy</span>				<span class="point" @click="$router.push('/ReturnPolicy')">Return Policy</span>				<span class="point" @click="$router.push('/DMCANotice')">DMCA Notice</span>
				<span
				 @click="$router.push('/MobileBlankPage/3')" class="point"> Contact US</span>
			</div>
			<div class="img"> <img src="../assets/image/home/icon_footer.png" /></div>
			<!-- <div class="img">
				<div class="trustedsite-trustmark" data-type="202"></div>
				<div class="trustedsite-trustmark" data-type="102"></div> </div>
			<div class="icon">
			<img src="../assets/image/icon/icon_footer1.png" /> <img src="../assets/image/icon/icon_footer2.png"
				/> <img src="../assets/image/icon/icon_footer3.png" /> <img src="../assets/image/icon/icon_footer4.png"
				/> <img src="../assets/image/icon/icon_footer5.png" /> </div> -->
			<div style="margin:0 auto;width:100%;font-size: 12px;color: rgba(245, 245, 245, 0.3);">Trademarks are the copyright and property of their respective owners.</div>
			<div
			 style="margin:0 auto;width:100%;font-size: 12px;color: rgba(245, 245, 245, 0.3);">The use of this Website constitutes the acceptance of the <span style="color:rgba(2, 145, 205)"
				 class="point" @click="$router.push('/TermsCon')">Terms&Conditions</span> and
				<span @click="$router.push('/PrivacyPolicy')" class="point" style="color:rgba(2, 145, 205)">Privacy Policy</span>				</div>
		<div style="margin:0 auto;width:100%;font-size: 12px;color: rgba(245, 245, 245, 0.3);">Copyright © 2006-2020, J&S Network Technology Limited</div>
		<div class="tip" style="margin:15px auto;">
		<span v-for="(item,index) in gameConfig" :key="index" class="point" @click="chooseGame(item)">{{item.display_name}}</span>			</div>
	</div>
	<div class="fix-bottom" v-if="$route.fullPath!=='/Mobile/payPage'||$route.fullPath!=='/Mobile/Result'">
		<div class="left">
			<div class="menu-cart point user user-name" @click="goPayPage()"><span class="num">{{cartList.length}}</span><img src="../assets/image/home/icon_red.png">				</div>
			<div class="price">{{totalAmout}} {{currencyInfo.name}}</div>
		</div>
		<div class="btn">Check Out</div>
	</div>
	
	
	</div>
</template>
<script>
	import { getTemplete, getConfig } from '../api/common.js'
	import { login, register, loginOut, recover } from '../api/user.js'
	import { mapMutations, mapState } from 'vuex'
	import BScroll from "better-scroll";
	import { ptn } from '@/utils/common/validate'
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
				selectList: ['Discord', 'Skype', 'QQ', 'Wechat', 'Whats app', 'Line',
					'Instagram', 'Telegram', 'Snapchat', 'Facebook', 'Phone'
				],
				width: '100%',
				gamePop: false,
				totalPrice: 0,
				selectType: 'login',
				form: {
					social_type: 'facebook'
				},
				showCart: true,
				rules: {
					email: [{
						message: "Please fill in email",
						required: true,
						trigger: 'blur'
					}, {
						message: "Please fill in correct email",
						pattern: ptn.email(0, 40),
						trigger: 'blur'
					}],
					password: [{
						message: "Please fill in password",
						required: true,
						trigger: 'blur'
					}],
					repassword: [{
						message: "Please fill in repassword",
						required: true,
						trigger: 'blur'
					}],
				},
				menuPop: false
			}
		},
		computed: { ...mapState(["game", "userInfo", "login", 'currencyInfo',
				'cartList', 'countryInfo', 'showLogin', 'clientSize'
			]),
			totalNum() {
				var totalNum = 0;
				this.cartLis&&this.cartList.map((item) => {
					totalNum = totalNum + item.productNum;
				})
				return totalNum
			},
		},
		methods: { ...mapMutations(['CHOOSE_GAME', 'RECORD_USERINFO',
				'LOGINOUT_USERINFO', 'CHOOSE_CURRENCY', 'CHOOSE_COUNTRY', 'SHOW_LOGIN', ,
				'CLEAR_CART'
			]),
			changeType(type) {
				this.selectType = type;
				this.form = {
					social_type: 'facebook'
				}
			},
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
			//忘记密码
			forgetPsw() {
				if (!this.form.email) {
					this.$message({
						type: 'Please fill in email',
						message: response.Msg
					});
					return
				}
				var re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
				if (!re.test(this.form.email)) {
					this.$message({
						type: 'warning',
						message: 'Please fill in correct email'
					});
					return
				}
				recover({
					email: this.form.email
				}).then(response => {
					if (response.retCode == 0) {
						this.$message({
							type: 'success',
							message: response.Msg
						});
					} else {
						this.$message({
							type: 'warning',
							message: response.Msg
						});
					}
				})
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
				this.$confirm('确认退出登录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					loginOut("").then(response => {
						if (response.retCode == 0) {
							this.LOGINOUT_USERINFO()
							this.$router.push('/')
						} else {
							that.$message({
								type: 'warning',
								message: response.message
							});
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				})
			},
			chooseGame(item) {
				localStorage.setItem('gameId', item.id);
				localStorage.setItem('gameName', item.name);
				if (this.$route.path == "/itemList" || this.$route.path == "/coinList") {
					window.location.reload()
				} else {
					this.$router.push('/itemList/' + localStorage.getItem('gameId'));
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
						that.$message.error("请正确填写表单！");
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
						that.$message.error("请正确填写表单！");
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
						this.gameList = response.data;
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
			var a = setInterval(() => {
				var deleteNode = document.getElementById("chat-widget-container");
				var deleteNode2 = document.getElementById("livechat-eye-catcher");
				if (deleteNode2) {
					clearInterval(a);
				}
				if (this.$route.fullPath !== '/Home') {
					deleteNode ? deleteNode.className = 'style-none' : ''
					deleteNode2 ? deleteNode2.className = 'style-none' : ''
				} else {
					deleteNode ? deleteNode.className = '' : ''
					deleteNode2 ? deleteNode2.className = '' : ''
				}
			}, 500)
			
		},
		watch: {
			'cartList' () {
				this.totalAmout = 0
				cartList.map((item) => {
					this.totalAmout = +item.totalPrice
				})
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
		z-index: 1000;
		background: #f1f1f1;
		width: 100%;
		display: flex;
		height: 0.44rem;
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
		border: 1px solid #ddd;
		display: block;
		padding: 1px 4px;
		width: auto;
		color: #333;
		margin-top: 0;
		padding-left: 0.1rem;
	}
	
	.home-container .top .menu .menu-cart {
		width: 0.44rem;
		height: 0.44rem;
		background: rgb(242, 165, 6);
		margin-left: 0;
	}
	
	.home-container .top .menu .menu-cart img {
		width: 0.3rem;
		height: 0.3rem;
		padding-top: 0.07rem;
		padding-left: 0.07rem;
	}
	
	.home-container .top .menu .menu-cart.user img {
		width: 0.2rem;
		height: 0.2rem;
		padding-top: 0.12rem;
		padding-left: 0.12rem;
	}
	
	.home-container .top .menu .menu-cart.user .num {
		position: absolute;
		right: 0;
		top: 0;
		position: absolute;
		right: 0.01rem;
		top: 0.01rem;
		width: 0.2rem;
		height: 0.2rem;
		text-align: center;
		line-height: 0.2rem;
		background-color: #e1251b;
		border-radius: 50%;
		color: #fff;
	}
	
	.home-container .select {
		width: 100%;
		overflow: hidden;
	}
	
	.select-ul {
		width: 5rem;
		flex-wrap: nowrap;
	}
	
	.select {
		position: relative;
		text-align: center;
		height: 0.44rem;
		background-color: #212121;
		line-height: 0.44rem;
		li {
			cursor: pointer;
			padding: 0 0.1rem;
			font-family: microsoft yahei;
			font-family: font, Arial, Helvetica Neue, Helvetica, sans-serif;
			font-size: 0.14rem;
			line-height: 0.44rem;
			letter-spacing: 0px;
			color: #ffffff;
			display: inline-block;
			height: 0.44rem;
			text-align: center;
			color: #fff;
			position: relative;
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
				top: 0.18rem;
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
				top: 0.18rem;
			}
			&.active {
				background-image: linear-gradient(90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient( #e1251b, #e1251b);
			}
		}
	}
	
	.el-carousel--horizontal, .menu-style {
		position: fixed;
		left: 0;
		top: 0.87rem;
		z-index: 20000;
		width: 100%;
		background: #363e43;
	}
	
	.menu-style {
		height: 0;
		transform-origin: 0 0;
		transition: all .5s;
		overflow-y: auto;
		&.active {
			height: 2.7rem;
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
				font-weight: bold;
				font-family: 'Barlow', Helvetica;
				text-decoration: none;
				outline: none;
				color: #fff;
			}
		}
	}
	
	.el-carousel__indicator.el-carousel__indicator--horizontal {
		display: none;
	}
	
	.game-ul {
		padding: 20px 25px;
		font-size: 0.15rem;
		height: 3.5rem;
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		span {
			text-align: left;
			width: 50%;
			flex-shrink: 0;
			line-height: 0.3rem;
			&.active {
				background: #29303a;
			}
		}
	}
	
	.footer {
		text-align: center;
		width: 100%;
		padding: 15px;
		background-color: #181818;
		height: auto;
		box-sizing: border-box;
		padding-bottom: 0.6rem;
		.tip {
			display: flex;
			flex-wrap: wrap;
			span {
				display: inline-block;
				color: rgba(245, 245, 245, 0.8);
				text-align: center;
				font-size: 0.13rem;
				padding: 0 0.1rem;
				width: auto;
				text-align: center;
				border-right: 1px solid rgba(245, 245, 245, 0.3);
				&:last-child {
					border-right: none;
				}
			}
		}
		.img{
			margin:0
		}
		img {
			width: 100%;
			margin: 0.12rem auto;
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
		height: 0.5rem;
		background: #fff;
		align-items: center;
		justify-content: space-between;
		.left {
			margin-left: 15px;
			display: flex;
			align-items: center;
			.user-name {
				margin-left: 0;
				position: relative;
				.num {
					position: absolute;
					right: -8px;
					top: -8px;
					color: #666;
					font-size: 0.13rem;
					position: absolute;
					width: 0.2rem;
					height: 0.2rem;
					text-align: center;
					line-height: 0.2rem;
					background-color: #e1251b;
					border-radius: 50%;
					color: #fff;
				}
				img {
					width: 0.26rem;
					height: 0.26rem;
				}
			}
			.price {
				color: #666;
				font-weight: bold;
				font-size: 0.16rem;
				margin-left: 0.4rem;
			}
		}
		.btn {
			width: 1rem;
			height: 0.5rem;
			color: #fff;
			font-size: 0.16rem;
			text-align: center;
			line-height: 0.5rem;
			background-image: linear-gradient(90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient( #e1251b, #e1251b);
		}
	}
</style>