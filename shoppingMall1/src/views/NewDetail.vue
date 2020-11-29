<template>
  <div style="width: 1200px; margin: 100px auto">
    <div class="nav">
      <img src="../assets/image/icon/icon_home.png" />Home > New>{{
        data.title
      }}
    </div>
    <div>
      <div class="title">{{ data.title }}</div>
      <div v-html="data.text"></div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {},
  created() {
    this.data = JSON.parse(localStorage.getItem("newData"));
  },
};
</script>
<style lang="less" scoped="">
.title{
	margin: 80px 0 30px;
	text-align: center;
	font-size: 22px;
	font-weight: 600;
}
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
</style>