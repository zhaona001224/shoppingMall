<template>

	<div class="home-container">
		<div class="top">
			<div class="menu">
				<el-dropdown class="point" style="margin-right: 19px;" v-if="currencyInfo1">
					<span class="el-dropdown-link">
					     {{currencyInfo1.symbol}}{{currencyInfo1.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="(item,index) in currencyData" :key="index" @click.native="setCurrency(JSON.parse(item).symbol,JSON.parse(item).name,JSON.parse(item).rate)">{{JSON.parse(item).symbol}}{{JSON.parse(item).name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-dropdown class="point">
					<span class="el-dropdown-link">
					    {{countryInfo&&countryInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="(item,index) in countryData" :key="index" @click='setCountry(item)'>{{JSON.parse(item).name}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div class="menu-cart point user" @click="goPayPage()"><span class="num">{{totalNum}}</span><img src="../assets/image/icon/icon_cart.png"></img>{{$t("language.common.cart")}}
					<div class="nav-user-wrapper pa active">
						<div class="nav-user-list">
							<div class="full" v-show="totalNum">
								<!--购物列表-->
								<div class="nav-cart-items">
									<ul>
										<li class="clearfix" v-for="(item,i) in cartList" :key="i">
											<div class="cart-item">
												<div class="cart-item-inner">
													<div class="item-thumb">
														<img :src="item.productImg">
													</div>
													<div class="item-desc">
														<div class="cart-cell">
															{{item.productName}}
															<<span class="price-icon">¥</span><span class="price-num">{{item.salePrice}}</span><span class="item-num">x {{item.productNum}}</span></div>
													</div>
													<div class="del-btn del point" @click="">删除</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
								<!--总件数-->
								<div class="nav-cart-total">
									<p>共 <strong>{{totalNum}}</strong> 件商品</p>
									<h5>合计：<span
                        class="price-icon">¥</span><span
                        class="price-num">{{totalPrice}}</span></h5>
									<h6>
                          <div classStyle="main-btn"
                                    style="height: 40px;width: 100%;margin: 0;color: #fff;font-size: 14px;line-height: 38px"
                                    text="去购物车" @btnClick=""></div>
                        </h6>
								</div>
							</div>
							<div v-show="!totalNum" style="height: 313px;text-align: center" class="cart-con">
								<p>您的购物车竟然是空的!</p>
							</div>
						</div>
					</div>
				</div>
				<!--购物车显示块-->

				<el-dropdown class="point" v-if="login" trigger="hover" style="border:none;width:auto;">
					<span class="el-dropdown-link userinfo-inner">
             	<div class="menu-cart" style="padding-right: 20px;"><img src="../assets/image/icon/icon_my.png"></img>{{userInfo.email}}</div>

								<i class="el-icon-caret-bottom"></i>
								</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="doLoginOut">
							<i class="el-icon-circle-close-outline"></i> 退出登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div v-else @click="SHOW_LOGIN(true);changeType('login')" class="menu-cart point" style="padding-right: 20px;"><img src="../assets/image/icon/icon_my.png"></img>{{$t("language.common.login")}}</div>
				<div v-if="!login" @click="SHOW_LOGIN(true);changeType('register')" style="border-left: 1px solid #f5f5f5;" class="menu-register point">{{$t("language.common.reister")}}</div>
			</div>
		</div>
		<div class="img" style="font-size: 0;position: relative;"><img style="width: 100%;height: 195px;" src="../assets/image/home/img_top.jpg"><img src="../assets/image/home/logo.png" style="position: absolute;left:17.56%;top: 65px;" /></div>
		<div class="select">
			<div>
				<span :class="gamePop?'active tri_top point':'active tri_bottom point'" @click="getGame();gamePop=!gamePop">{{$t("language.common.tab1")}}</span>
				<span @click="$router.push('/')">Home</span>
				<span>About US</span>
			</div>
		</div>
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
		<div class="footer">
			<div class="tip">
				<span>Home</span>
				<span>About US</span>
				<span>FAQ</span>
				<span>Sell to Us</span>
			</div>
			<div class="img"><img src="../assets/image/home/icon_footer.png" /></div>
			<div class="icon">
				<img src="../assets/image/icon/icon_footer1.png" />
				<img src="../assets/image/icon/icon_footer2.png" />
				<img src="../assets/image/icon/icon_footer3.png" />
				<img src="../assets/image/icon/icon_footer4.png" />
				<img src="../assets/image/icon/icon_footer5.png" />
			</div>
			<div style="margin:0 auto;width:930px;font-family: ArialMT;font-size: 12px;color: rgba(245, 245, 245, 0.3);">{{$t("language.common.footerTip")}}</div>
		</div>
		<div class="choose-game" v-if="gamePop">
			<img @click="gamePop=false" class="close" src="../assets/image/icon/icon_close.png" />
			<span v-for="(item,index) in gameList" @click="chooseGame(item)">
				<img :src="imgUrl+item.logo+''" />{{item.name}}
			</span>
		</div>
		<div class="pop-login" v-if="showLogin">
			<img @click="SHOW_LOGIN(false)" class="close point" src="../assets/image/icon/icon_close.png" />
			<div class="tab">
				<span @click="changeType('login');" :class="selectType=='login'?'active point':'point'">
					{{$t("language.user.login")}}
				</span>
				<span @click="changeType('register')" :class="selectType=='register'?'active point':'point'">
					{{$t("language.user.register")}}
				</span>

			</div>
			<div class="form-contain" v-if="selectType=='login'">
				<el-form ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
					<el-form-item :label='$t("language.user.email")' prop="email">
						<el-input placeholder="" v-model="form.email">
						</el-input>
					</el-form-item>
					<el-form-item :label='$t("language.user.pass")' prop="password">
						<el-input placeholder="" type="password" v-model="form.password">
						</el-input>
					</el-form-item>

				</el-form>
				<div class="forget-password point" @click="forgetPsw">{{$t("language.user.forget")}}</div>
				<div class="btn point" @click="submit">{{$t("language.user.login")}}</div>
			</div>
			<div class="form-contain" v-if="selectType=='register'">
				<el-form ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
					<el-form-item :label='$t("language.user.email")' prop="email">
						<el-input placeholder="" v-model="form.email">
						</el-input>
					</el-form-item>
					<el-form-item :label='$t("language.user.pass")' prop="password">
						<el-input placeholder="" type="password" v-model="form.password">
						</el-input>
					</el-form-item>
					<el-form-item :label='$t("language.user.repass")' prop="repassword">
						<el-input placeholder="" type="password" v-model="form.repassword">
						</el-input>
					</el-form-item>
					<el-form-item :label='$t("language.user.facebook")' prop="social">
						<el-input placeholder="" v-model="form.social">
						</el-input>
					</el-form-item>

				</el-form>
				<!--	<div class="forget-password point" @click="forgetPsw">{{$t("language.user.forget")}}</div>-->
				<div class="btn point" @click="register">{{$t("language.user.register")}}</div>
			</div>
		</div>

	</div>

</template>

<script>
	import { getTemplete, getConfig } from '../api/common.js'
	import { login, register, loginOut, recover } from '../api/user.js'
	import { mapMutations, mapState } from 'vuex'
	import { ptn } from '@/utils/common/validate'
	export default {
		name: "app",
		data() {
			return {
				gameList: [],
				imgUrl: '',
				countryData: [],
				currencyData: [],
				selectCurrency: '',
				gamePop: false,
				totalPrice: 0,
				selectType: 'login',
				form: {},
				showCart: true,
				rules: {
					email: [{
							message: "place fill in email",
							required: true,
							trigger: 'blur'
						},
						{
							message: "place fill in correct email",
							pattern: ptn.email(0, 40),
							trigger: 'blur'
						}
					],
					password: [{
						message: "place fill in password",
						required: true,
						trigger: 'blur'
					}],
					repassword: [{
						message: "place fill in repassword",
						required: true,
						trigger: 'blur'
					}]

				},
			}
		},

		computed: {
			...mapState(["game", "userInfo", "login", 'currencyInfo1', 'cartList', 'countryInfo', 'showLogin']),
			totalNum() {
				var totalNum = 0;
				this.cartList.map((item) => {
					totalNum = totalNum + item.productNum;
				})
				return totalNum
			},
		},
		methods: {
			...mapMutations(['CHOOSE_GAME', 'RECORD_USERINFO', 'LOGINOUT_USERINFO', 'CHOOSE_CURRENCY', 'CHOOSE_COUNTRY', 'SHOW_LOGIN']),
			changeType(type) {
				this.selectType = type;
				this.form = {}
			},
			setCurrency(symbol, name, rate) {
				this.CHOOSE_CURRENCY({
					name: name,
					symbol: symbol,
					rate: rate
				})
			},
			setCountry(item) {
				this.CHOOSE_COUNTRY(JSON.parse(item));
			},

			//忘记密码
			forgetPsw() {
				if(!this.form.email) {
					this.$message({
						type: 'place fill in email',
						message: response.Msg
					});
					return
				}
				var re = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
				if(!re.test(this.form.email)) {
					this.$message({
						type: 'warning',
						message: 'place fill in correct email'
					});
					return
				}
				recover({
					email: this.form.email
				}).then(response => {
					if(response.retCode == 0) {
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
				if(this.login) {
					this.$router.push('/payPage');
				} else {
					this.SHOW_LOGIN(true);
				}

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
						if(response.retCode == 0) {
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
				if(this.$route.path == "/itemList" || this.$route.path == "/coinList") {
					window.location.reload()
				} else {
					this.$router.push('/itemList');
				}

			},
			//登录方法
			submit() {
				var that = this;
				this.$refs.form.validate((valid) => {
					if(valid) {
						login({
							email: this.form.email,
							password: this.form.password
						}).then(response => {
							if(response.retCode == 0) {
								this.$message({
									type: 'success',
									message: 'success'
								});
								var user = {
									token: response.data,
									email: this.form.email
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
				if(!this.form.email) {
					this.$message({
						type: 'warning',
						message: 'Place fill in email'
					});
					return
				}
				forget({
					email: this.form.email
				}).then(response => {
					if(response.retCode == 0) {
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
				if(this.form.password != this.form.repassword) {
					this.$message({
						type: 'warning',
						message: 'The two passwords do not match'
					});
					return
				}
				this.$refs.form.validate((valid) => {
					if(valid) {
						register({
							email: this.form.email,
							password: this.form.password,
							social: this.form.social
						}).then(response => {
							if(response.retCode == 0) {
								this.$message({
									type: 'success',
									message: 'success'
								});
								this.selelceType = "login"
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
				//获取游戏列表
				getTemplete('?type=Game&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.gameList = response.data;

					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			}

		},

		created() {

			if(!localStorage.getItem('currencyInfo1')) {
				getConfig().then(response => {
					this.imgUrl = window.imgUrl;
					if(response.retCode == 0) {
						this.countryData = response.country;

						this.currencyData = response.currency;
						this.CHOOSE_CURRENCY({
							name: JSON.parse(this.currencyData[0]).name,
							symbol: JSON.parse(this.currencyData[0]).symbol,
							rate: JSON.parse(this.currencyData[0]).rate
						})
						this.CHOOSE_COUNTRY(JSON.parse(this.countryData[0]));
						localStorage.setItem("countryData", JSON.stringify(response.country));
						localStorage.setItem("currencyData", JSON.stringify(response.currency));
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			} else {
				this.countryData = JSON.parse(localStorage.getItem("countryData"))
				this.currencyData = JSON.parse(localStorage.getItem("currencyData"))
			}

		},
		mounted() {

		}
	}
</script>

<style lang="less">
	body,
	html {
		padding: 0;
		margin: 0;
	}
	
	.top {
		width: 100%;
		height: 52px;
		background-color: #181818;
		color: #fff;
		font-size: 14px;
		.menu {
			text-align: right;
			margin-right: 18%;
			.menu-cart {
				display: inline-block;
				margin-left: 50px;
				position: relative;
				img {
					width: 20px;
					height: 20px;
					vertical-align: -3px;
					margin-right: 11px;
				}
				.num {
					position: absolute;
					right: -20px;
					top: -10px;
					width: 20px;
					height: 20px;
					text-align: center;
					line-height: 20px;
					background-color: #e1251b;
					border-radius: 50%;
				}
			}
			.menu-register {
				padding-left: 20px;
				display: inline-block;
				border-left: 1px solid #f5f5f5;
			}
		}
	}
	
	.select {
		text-align: center;
		height: 50px;
		background-color: #212121;
		line-height: 50px;
		span {
			cursor: pointer;
			font-family: Allstar4;
			font-size: 16px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 48px;
			letter-spacing: 0px;
			color: #ffffff;
			display: inline-block;
			height: 50px;
			text-align: center;
			width: 230px;
			color: #fff;
			position: relative;
			&.tri_bottom:before {
				right: 19px;
				content: "";
				width: 0px;
				height: 0px;
				border-top: 6px solid #fff;
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				position: absolute;
				top: 23px;
			}
			&.tri_top:before {
				right: 19px;
				content: "";
				width: 0px;
				height: 0px;
				border-bottom: 6px solid #fff;
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				position: absolute;
				top: 23px;
			}
			&.active {
				background-color: #29303a;
			}
		}
	}
	
	.footer {
		text-align: center;
		width: 100%;
		padding: 50px 0 60px;
		background-color: #181818;
		.tip {
			margin-top: 50px;
			span {
				display: inline-block;
				color: rgba(245, 245, 245, 0.8);
				text-align: center;
				font-family: ArialMT;
				font-size: 16px;
				width: 170px;
				text-align: center;
				border-right: 1px solid rgba(245, 245, 245, 0.3);
				&:last-child {
					border-right: none;
				}
			}
		}
		.img {
			width: 515px;
			height: 53px;
			background: #000;
			margin: 32px auto;
			img {
				width: 500px;
				height: 50px;
			}
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
	
	.choose-game {
		position: fixed;
		top: 30%;
		left: 50%;
		z-index: 200;
		margin-left: -637px;
		width: 1274px;
		background: #282e38;
		padding: 36px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.close {
			position: absolute;
			top: 8px;
			right: 8px;
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
		span {
			cursor: pointer;
			display: flex;
			align-items: center;
			font-family: ArialMT;
			font-size: 14px;
			height: 40px;
			text-align: left;
			padding-left: 20px;
			box-sizing: border-box;
			color: #fdfdfd;
			width: 228px;
			background-color: rgba(0, 0, 0, 0.1);
			border: solid 1px rgba(220, 220, 220, 0.1);
			margin: 0 5px;
			margin-bottom: 10px;
			img {
				margin-right: 10px;
				width: 23px;
				height: 23px;
			}
			&.active {
				background-color: rgba(220, 220, 220, 0.1);
			}
		}
	}
	
	.pop-login {
		position: fixed;
		z-index: 100;
		top: 10%;
		left: 50%;
		margin-left: -395px;
		width: 789px;
		padding-bottom: 77px;
		background-color: #ffffff;
		box-shadow: 0px 0px 24px 0px rgba(4, 0, 0, 0.5);
		border-radius: 10px;
		text-align: left;
		.close {
			position: absolute;
			top: 8px;
			right: 8px;
			width: 20px;
			height: 20px;
			pointer-events: cursor;
			cursor: pointer;
		}
		.tab {
			padding-top: 20px;
			padding-left: 67px;
			height: 59px;
			font-family: Arial-BoldMT;
			font-size: 24px;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0px;
			border-bottom: 1px solid #eee;
			color: rgba(51, 51, 51, 0.3);
			span {
				margin-right: 52px;
				padding: 25px 0;
				&.active {
					color: #333333;
					border-bottom: 3px solid #e1251b;
				}
			}
		}
	}
	
	.form-contain {
		margin-top: 45px;
		input {
			width: 280px;
			height: 40px;
			background-color: #f5f5f5;
			border: solid 1px #e5e5e5;
		}
		.forget-password {
			font-family: ArialMT;
			text-decoration: underline;
			font-size: 13px;
			font-weight: normal;
			font-stretch: normal;
			width: 327px;
			text-align: right;
			margin: 0 auto;
			letter-spacing: 0px;
			color: #1974fd;
		}
		.btn {
			margin: 0 auto;
			margin-left: 276px;
			display: block;
			width: 280px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background-color: #e1251b;
			border-radius: 4px;
			font-family: ArialMT;
			font-size: 14px;
			letter-spacing: 0px;
			color: #ffffff;
			margin-top: 25px;
		}
	}
	
	// 用户
	.user {
		margin-left: 41px;
		&:hover {
			a:before {
				background-position: -5px 0;
			}
			.nav-user-wrapper {
				top: 18px;
				/*visibility: visible;*/
				opacity: 1;
				-webkit-transition: opacity .15s ease-out;
				transition: opacity .15s ease-out;
				width: 360px;
			}
		}
		.clearfix {
			*zoom: 1;
		}
		>a {
			position: relative;
			@include wh(36px, 20px);
			display: block;
			text-indent: -9999px;
			&:before {
				content: " ";
				position: absolute;
				left: 8px;
				top: 0;
				@include wh(20px);
				background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) -155px 0;
				background-size: 240px 107px;
				transition: none;
			}
		}
		li+li {
			text-align: center;
			position: relative;
			border-top: 1px solid #f5f5f5;
			line-height: 44px;
			height: 44px;
			color: #616161;
			font-size: 12px;
			&:hover {
				background: #fafafa;
			}
			a {
				display: block;
				color: #616161;
			}
		}
		.nav-user-avatar {
			>div {
				position: relative;
				margin: 0 auto 8px;
				@include wh(46px);
				text-align: center;
				&:before {
					content: "";
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					border-radius: 50%;
					box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
				}
				.avatar {
					border-radius: 50%;
					display: block;
					@include wh(100%);
					background-repeat: no-repeat;
					background-size: contain;
				}
			}
			.name {
				margin-bottom: 16px;
				font-size: 12px;
				line-height: 1.5;
				text-align: center;
				color: #757575;
			}
		}
		.nav-user-wrapper {
			width: 168px;
			transform: translate(-50%);
			left: 50%;
		}
		.nav-user-list {
			width: 168px;
			&:before {
				left: 50%;
			}
		}
	}
	
	.shop {
		position: relative;
		float: left;
		margin-left: 21px;
		width: 61px;
		z-index: 99;
		&:hover {
			a:before {
				content: " ";
				background-position: 0 -22px;
			}
		}
		.nav-user-wrapper.active {
			top: 18px;
			visibility: visible;
			opacity: 1;
			-webkit-transition: opacity .15s ease-out;
			transition: opacity .15s ease-out;
		}
		>a {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			display: block;
			right: 0;
			z-index: 1;
			&:before {
				display: block;
				@include wh(30px, 100%);
				content: " ";
				background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) 0 -22px;
				background-size: 240px 107px;
				background-position: -150px -22px;
			}
		}
		.cart-num {
			position: relative;
			display: block;
			margin-left: 31px;
			margin-top: -1px;
			min-width: 30px;
			text-indent: 0;
			line-height: 20px;
			>i {
				background: #eb746b;
				background-image: -webkit-linear-gradient(#eb746b, #e25147);
				background-image: linear-gradient(#eb746b, #e25147);
				box-shadow: inset 0 0 1px hsla(0, 0%, 100%, .15), 0 1px 2px hsla(0, 0%, 100%, .15);
				text-align: center;
				font-style: normal;
				display: inline-block;
				@include wh(20px);
				line-height: 20px;
				border-radius: 10px;
				color: #fff;
				font-size: 12px;
				&.no {
					background: #969696;
					background-image: -webkit-linear-gradient(#A4A4A4, #909090);
					background-image: linear-gradient(#A4A4A4, #909090);
					box-shadow: inset 0 0 1px #838383, 0 1px 2px #838383;
				}
			}
		}
		.nav-user-wrapper {
			right: 0;
			width: 360px;
			.nav-user-list {
				&:before {
					right: 34px;
				}
			}
		}
	}
	
	// 用户信息弹出
	.nav-user-wrapper {
		position: absolute;
		z-index: 30;
		padding-top: 18px;
		opacity: 0;
		visibility: hidden;
		top: -3000px;
		.nav-user-list {
			position: relative;
			padding-top: 20px;
			background: #fff;
			border: 1px solid #d6d6d6;
			border-color: rgba(0, 0, 0, .08);
			border-radius: 8px;
			box-shadow: 0 20px 40px rgba(0, 0, 0, .15);
			z-index: 10;
			&:before {
				position: absolute;
				content: " ";
				background: url(/static/images/account-icon@2x.32d87deb02b3d1c3cc5bcff0c26314ac.png) no-repeat -49px -43px;
				background-size: 240px 107px;
				@include wh(20px, 8px);
				top: -8px;
				margin-left: -10px;
			}
		}
	}
	
	.nav-sub {
		position: relative;
		z-index: 20;
		height: 90px;
		background: #f7f7f7;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .04);
		&.fixed {
			position: fixed;
			z-index: 21;
			height: 60px;
			top: 0;
			left: 0;
			right: 0;
			border-bottom: 1px solid #dadada;
			background-image: -webkit-linear-gradient(#fff, #f1f1f1);
			background-image: linear-gradient(#fff, #f1f1f1);
		}
		.nav-sub-wrapper {
			padding: 31px 0;
			height: 90px;
			position: relative;
			&.fixed {
				padding: 0;
				height: 100%;
				display: flex;
				align-items: center;
			}
			&:after {
				content: " ";
				position: absolute;
				top: 89px;
				left: 50%;
				margin-left: -610px;
				width: 1220px;
				background: #000;
				height: 1px;
				display: none;
				opacity: 0;
				-webkit-transition: opacity .3s ease-in;
				transition: opacity .3s ease-in;
			}
		}
		.w {
			display: flex;
			justify-content: space-between;
		}
		.nav-list2 {
			height: 28px;
			line-height: 28px;
			display: flex;
			align-items: center;
			height: 100%;
			li:first-child {
				padding-left: 0;
				a {
					padding-left: 10px;
				}
			}
			li {
				position: relative;
				float: left;
				padding-left: 2px;
				a {
					display: block;
					padding: 0 10px;
					color: #666;
					&.active {
						font-weight: bold;
					}
				}
				a:hover {
					color: #5683EA;
				}
			}
			li:before {
				content: ' ';
				position: absolute;
				left: 0;
				top: 13px;
				width: 2px;
				height: 2px;
				background: #bdbdbd;
			}
		}
	}
	
	@media (min-width: 1px) {
		.nav-sub .nav-sub-wrapper:after {
			display: block;
		}
	}
	
	.cart-con {
		/*display: flex;*/
		text-align: center;
		position: relative;
		p {
			padding-top: 185px;
			color: #333333;
			font-size: 16px;
		}
	}
	
	.cart-con:before {
		position: absolute;
		content: ' ';
		left: 50%;
		transform: translate(-50%, -70%);
		top: 50%;
		width: 76px;
		height: 62px;
		background: url("/static/images/cart-empty-new.png") no-repeat;
		background-size: cover;
	}
	
	.nav-user-list {
		padding: 0;
		width: 100%;
		.full {
			border-radius: 8px;
			overflow: hidden;
		}
		.nav-cart-items {
			max-height: 363px;
			overflow-x: hidden;
			overflow-y: auto;
		}
		.cart-item {
			height: 120px;
			width: 100%;
			overflow: hidden;
			border-top: 1px solid #f0f0f0;
			&:hover {
				background: #fcfcfc;
				.del {
					display: block;
				}
			}
		}
		li:first-child .cart-item:first-child {
			border-top: none;
			border-radius: 8px 8px 0 0;
			overflow: hidden;
		}
		.cart-item-inner {
			padding: 20px;
			position: relative;
			display: flex;
		}
		.item-thumb {
			position: relative;
			float: left;
			width: 80px;
			height: 80px;
			border-radius: 3px;
			&:before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				z-index: 2;
				border: 1px solid #f0f0f0;
				border: 0 solid transparent;
				box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
				border-radius: 3px;
			}
			img {
				display: block;
				width: 80px;
				border-radius: 3px;
				overflow: hidden;
			}
		}
		.item-desc {
			margin-left: 98px;
			display: table;
			width: 205px;
			h4 {
				color: #000;
				width: 185px;
				overflow: hidden;
				word-break: keep-all;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 14px;
				line-height: 16px;
				margin-bottom: 10px;
			}
			.attrs span {
				position: relative;
				display: inline-block;
				margin-right: 20px;
				font-size: 14px;
				line-height: 14px;
				color: #999;
			}
			.attrs span:last-child {
				margin-right: 0;
			}
			h6 {
				color: #cacaca;
				font-size: 12px;
				line-height: 14px;
				margin-top: 20px;
				span {
					display: inline-block;
					font-weight: 700;
					color: #cacaca;
				}
				.price-icon,
				.price-num {
					color: #d44d44;
				}
				.price-num {
					margin-left: 5px;
					font-size: 14px;
				}
				.item-num {
					margin-left: 10px;
				}
			}
		}
		.cart-cell {
			display: table-cell;
			vertical-align: middle;
		}
		.del {
			display: none;
			overflow: hidden;
			position: absolute;
			right: 20px;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>