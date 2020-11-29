<template>
  <div style="width: 1200px; margin: 100px auto;">
    <div class="nav">
      <img src="../assets/image/icon/icon_home.png" />Home >DMCA Notice
    </div>
    <el-form
      style="width: 800px; margin: 40px auto 0"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="200px"
    >
      <el-form-item :label="$t('language.user.email')" prop="email">
        <el-input Pleaseholder="" disabled v-model="form.email"> </el-input>
      </el-form-item>
      <el-form-item :label="$t('language.user.pass')" prop="password">
        <el-input Pleaseholder="" type="password" v-model="form.password">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('language.user.repass')" prop="repassword">
        <el-input Pleaseholder="" type="password" v-model="form.repassword">
        </el-input>
      </el-form-item>
      <el-form-item label="Instance Message:" prop="social_type">
        <el-select
          style="width: 130px; margin-right: 10px"
          :clearable="true"
          v-model="form.social_type"
        >
          <el-option
            v-for="subItem in selectList"
            :key="subItem"
            :label="subItem"
            :value="subItem"
          >
          </el-option>
        </el-select>
        <el-input Pleaseholder="" v-model="form.social_link"> </el-input>
      </el-form-item>
    </el-form>
	<div style="text-align:center"> <span class="btn point" @click="pay()">Pay Now</span></div>
   
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      status: 1,
      orderno: 0,
      msg: "",
      selectList: [
        "Discord",
        "Skype",
        "QQ",
        "Wechat",
        "Whats app",
        "Line",
        "Instagram",
        "Telegram",
        "Snapchat",
        "Facebook",
        "Phone",
      ],
      form: {
        social_type: "facebook",
      },
      showCart: true,
      rules: {
        password: [
          {
            message: "Please fill in password",
            required: true,
            trigger: "blur",
          },
        ],
        repassword: [
          {
            message: "Please fill in repassword",
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {},
  mounted() {
			this.form.email = this.userInfo && this.userInfo.email;
			this.form.link1 = this.userInfo && this.userInfo.social_type;
			this.form.link = this.userInfo && this.userInfo.social_link;
			console.log(this.userInfo)
		},
		watch: {
			'userInfo.email' () {
				this.form.email = this.userInfo.email;
				this.form.link1 = this.userInfo.social_type;
				this.form.link = this.userInfo.social_link
			}
		},
  computed: { ...mapState(["userInfo"]) },
};
</script>
<style lang="less" scoped="">
.nav {
  font-size: 16px;
  letter-spacing: 0px;
  color: #666666;
  margin: 20px 0;
  img {
    width: 18px;
    height: 18px;
  }
}
/deep/ .el-form-item__content {
  display: flex;
}
.btn {
  position: relative;
  margin: 100px auto 0;
  display: inline-block;
  width: 200px;
  height: 58px;
  background-image: linear-gradient(0deg, #db170d 0%, #ff6860 100%),
    linear-gradient(#e1251b, #e1251b);
  background-blend-mode: normal, normal;
  border-radius: 6px;
  font-family: Arial-BoldMT;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 22px;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  line-height: 58px;
  &:before {
    content: "";
    display: block;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.4) 50%
    );
    background-size: 210% 100%;
    background-position: right bottom;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    transition: all 1s;
    -webkit-transition: all 1s;
  }
  &:hover:before {
    background-position: left bottom;
  }
}
</style>