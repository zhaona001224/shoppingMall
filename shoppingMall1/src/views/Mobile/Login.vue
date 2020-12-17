<template>
	<div class="pop-login" v-if="showLogin"> <img @click="SHOW_LOGIN(false)" class="close point" src="../assets/image/icon/icon_close.png"
		/>
		<div class="tab"> <span @click="changeType('login');" :class="selectType=='login'?'active point':'point'">
						{{$t("language.user.login")}}
					</span> <span @click="changeType('register')" :class="selectType=='register'?'active point':'point'">
						{{$t("language.user.register")}}
					</span> </div>
		<div class="form-contain" v-if="selectType=='login'">
			<el-form ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
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
			<el-form ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
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
</script>

<style>
</style>