<template>
	<div>
		<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > DMCA Notice</div>
		<div
		 class="common-page">
			<el-form ref="form" :model="form" :rules="rules"
			class="form" label-position="top">
				<el-form-item :label="$t('language.user.email')" prop="email">
					<el-input disabled v-model="form.email"> </el-input>
				</el-form-item>
				<el-form-item :label="$t('language.user.pass')" prop="password">
					<el-input Pleaseholder="" type="password" v-model="form.password"> </el-input>
				</el-form-item>
				<el-form-item :label="$t('language.user.repass')" prop="new_password">
					<el-input Pleaseholder="" type="password" v-model="form.new_password"> </el-input>
				</el-form-item>
				<el-form-item label="IM:" prop="social_type">
					<el-select style="width: 130px; margin-right: 10px" :clearable="true" v-model="form.social_type">
						<el-option v-for="subItem in selectList" :key="subItem" :label="subItem" :value="subItem">
						</el-option>
					</el-select>
					<el-input Pleaseholder="" v-model="userInfo.social_link"> </el-input>
				</el-form-item>
			</el-form>
			<div class="btn" @click="submit()">Confirm</div>
	</div>
	</div>
</template>
<script>
	import { mapMutations, mapState } from "vuex";
	import { update } from '../../api/user.js'
	export default {
		data() {
			return {
				status: 1,
				orderno: 0,
				msg: "",
				selectList:  ['Discord', 'Skype','Phone',  'Whatsapp','Facebook-Message','Instagram','Telegram',
        'ICQ','Line', 'Snapchat','QQ', 'Wechat'],
				form: {
					social_type: "facebook",
				},
				showCart: true,
				rules: {
					password: [{
						message: "Please fill in password",
						required: true,
						trigger: "blur",
					}, ],
					repassword: [{
						message: "Please fill in repassword",
						required: true,
						trigger: "blur",
					}, ],
				},
			};
		},
		computed: { ...mapState(['userInfo'])
		},
		methods: { ...mapMutations(['CHOOSE_GAME', 'RECORD_USERINFO',
				'LOGINOUT_USERINFO', 'CHOOSE_CURRENCY', 'CHOOSE_COUNTRY', 'SHOW_LOGIN',
				'CHANGE_SIZE'
			]),
			submit() {
				if (this.form.password && (this.form.password != this.form.new_password)) {
					this.$message({
						type: 'warning',
						message: 'The two passwords do not match'
					});
					return
				}
				var that = this;
				update({
					email: this.form.email,
					new_password: this.form.new_password,
					social_link: this.userInfo.social_link,
					social_type: this.form.social_type
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
						//								window.location.reload();
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
						});
					}
				})
			}
		},
		mounted() {
			this.form.email = this.userInfo && this.userInfo.email;
			this.form.social_type = this.userInfo && this.userInfo.social_type;
		},
		watch: {
			'userInfo.email' () {
				this.form.email = this.userInfo.email;
				this.form.social_type = this.userInfo && this.userInfo.social_type;
				this.form.social_link = this.userInfo && this.userInfo.social_link;
			}
		},
		computed: { ...mapState(["userInfo"])
		},
	};
</script>
<style lang="less" scoped="">

	.common-page{
		padding: 0.25rem;
	}
	/deep/ .el-form-item__content {
		display: flex;
	}
			.form {
			/deep/ .el-input__inner {
				height: 0.34rem;
				background-color: #f5f5f5;
				border: solid 1px #c9c9c9;
				line-height: 0.34rem;
			}
			/deep/ .el-form-item__label {
				line-height: 10px;
			}
			.el-form-item {
				margin-bottom: 15px;
			}
		}
	
	.btn {
		margin: 0.25rem 0.25rem 0.37rem;
		height: 0.5rem;
		background-color: #e1251b;
		border-radius: 5px;
		color: #ffffff;
		text-align: center;
		line-height: 0.5rem;
		color: #fff;
	
		font-size: 0.18rem;
		font-weight: bold;
	}
</style>