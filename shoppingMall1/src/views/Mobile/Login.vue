<template>
	<div class="pop-login">
		<div class="tab"> <span @click="changeType('login');" :class="selectType=='login'?'active point':'point'">
						{{$t("language.user.login")}}
					</span> <span @click="changeType('register')" :class="selectType=='register'?'active point':'point'">
						{{$t("language.user.register")}}
					</span> </div>
		<div class="form-contain" v-if="selectType=='login'">
			<el-form ref="form" :model="form" :rules="rules" label-width="42%" label-position="right">
				<el-form-item :label='$t("language.user.email")' prop="email">
					<el-input Pleaseholder="" v-model="form.email"> </el-input>
				</el-form-item>
				<el-form-item :label='$t("language.user.pass")' prop="password">
					<el-input Pleaseholder="" type="password" v-model="form.password"> </el-input>
				</el-form-item>
			</el-form>
			<div class="forget-password point" @click="forgetPsw">{{$t("language.user.forget")}}</div>
			<div class="btn point" @click="submit">{{$t("language.user.login")}}</div>
		</div>
		<div class="form-contain" v-if="selectType=='register'">
			<el-form ref="form" :model="form" :rules="rules" label-width="42%" label-position="right">
				<el-form-item :label='$t("language.user.email")' prop="email">
					<el-input Pleaseholder="" v-model="form.email"> </el-input>
				</el-form-item>
				<el-form-item :label='$t("language.user.pass")' prop="password">
					<el-input Pleaseholder="" type="password" v-model="form.password"> </el-input>
				</el-form-item>
				<el-form-item :label='$t("language.user.repass")' prop="repassword">
					<el-input Pleaseholder="" type="password" v-model="form.repassword"> </el-input>
				</el-form-item>
				<el-form-item label='Instance Message:' prop="social_type">
					<el-select style="width:130px;margin-right: 10px;" :clearable="true" v-model="form.social_type">
						<el-option v-for="subItem in selectList" :key="subItem" :label="subItem" :value="subItem">
						</el-option>
					</el-select>
					<el-input Pleaseholder="" v-model="form.social_link"> </el-input>
				</el-form-item>
			</el-form>
			<!--	<div class="forget-password point" @click="forgetPsw">{{$t("language.user.forget")}}</div>-->
			<div class="btn point" @click="register">{{$t("language.user.register")}}</div>
		</div>
	</div>
</template>
<script>
	import { mapMutations, mapState } from 'vuex'
	import { login, register, loginOut, recover } from '../../api/user.js'
	import { ptn } from '@/utils/common/validate'
	export default {
		name: "app",
		data() {
			return {
				selectType: 'login',
				form: {},
				selectList: ['Discord', 'Skype', 'QQ', 'Wechat', 'Whats app', 'Line',
					'Instagram', 'Telegram', 'Snapchat', 'Facebook', 'Phone'
				],
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
				}
			}
		},
		computed: { ...mapState(["game", "userInfo", "login", 'currencyInfo',
				'cartList', 'countryInfo', 'showLogin', 'clientSize'
			]),
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
								if(this.$route.query.redirect){
									this.$router.push(this.$route.query.redirect)
								}else{
									this.$router.push('/Mobile/Home')
								}
								 //返回上一层
								//								window.location.reload();
							} else {
								this.$message({
									type: 'warning',
									message: response.Msg
								});
							}
						})
					} else {
						that.$message.error("Please fill in the form correctly！");
					}
				})
			},
			//忘记密码
			forgetPsw() {
				if (!this.form.email) {
						this.$message({
						type: 'warning',
						message: 'Please fill in email'
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
						that.$message.error("Please fill in the form correctly！");
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped="">
	.pop-login {
		margin-left: 0;
		padding-top: 15px;
		padding: 0.3rem 15px;
		.tab {
			border-bottom: 1px solid #ececec;
			width: 100%;
			margin: 0 auto -10px;
			overflow: hidden;
			& > span {
				display: inline-block;
				width: 50%;
				float: left;
				font-size: 2rem;
				line-height: 2;
				text-align: center;
				cursor: pointer;
				font-size: 0.18rem;
				&.active {
					border-bottom: 2px solid #494949;
					color: #333;
					font-weight: 600;
				}
			}
		}
		.form-contain {
			padding-top: 30px;
			.input-row {
				height: 40px;
				line-height: 36px;
				padding-top: 1px;
				position: relative;
				border-radius: 2px;
				border: 1px solid #ddd;
				margin-bottom: 20px;
				/* overflow: hidden; */
			}
		}
	}
	
	.forget-password {
		width: 100%;
		text-align: right;
		color: #de6262;
		text-decoration: underline;
	}
	
	.btn {
		background-color: #de6262;
		width: 100%;
		padding: 6px 0;
		text-align: center;
		color: #fff;
		text-transform: uppercase;
		border-radius: 4px;
		margin-top: 0.2rem;
		margin-bottom: 12px;
		opacity: 0.6;
		cursor: not-allowed;
		height: 0.34rem;
		line-height: 0.34rem;
	}
</style>