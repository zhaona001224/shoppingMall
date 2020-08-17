<template>
	<div style="text-align: center;">
		<div class="form-contain">
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
				<el-form-item :label='$t("language.user.key")' prop="social">
					<el-input placeholder="" v-model="form.key">
					</el-input>
				</el-form-item>

			</el-form>
			<div class="btn" @click="submit">{{$t("language.user.confirm")}}</div>
		</div>
	</div>
</template>

<script>
	import { ptn } from '@/utils/common/validate'
	export default {
		data() {
			return {
				form:{},
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
					}],
					key: [{
						message: "place fill in key",
						required: true,
						trigger: 'blur'
					}]

				},
			};
		},
		methods: {
			//提交
			submit() {
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
						forget({
							email: this.form.email,
							password: this.form.password,
							key: this.form.key
						}).then(response => {
							if(response.retCode == 0) {
								this.$message({
									type: 'success',
									message: 'success'
								});
								this.$router.push("/")
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
			}

		},
		created() {

		}

	}
</script>
<style lang="less" scoped="">
	.btn{
		display: inline-block;
		margin-left: 0;
		margin-bottom: 100px;
	}
</style>