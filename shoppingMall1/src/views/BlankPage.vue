<template>
	<div style="width: 1200px;margin:0 auto">
		<div class="nav">
      <img src="../assets/image/icon/icon_home.png" />Home >{{data.display_name}}
    </div>
    <div class="title">{{data.display_name}}</div>
    <div style="min-height: 300px;" v-html="data.desc"></div>
	</div>
</template>
<script>
	import { getTemplete } from '../api/common.js'

	export default {
		data() {
			return {
				data:{}
			};
		},
		methods: {
			
		},
		created() {
			//获取banner
			getTemplete("?type=Site&id="+this.$route.params.id).then((response) => {
				this.data=response.data[0]
			});
		}
	}
</script>
<style lang="less" scoped="">
.title {
  margin: 30px 0 30px;
  font-size: 22px;
  font-weight: 600;
}
.sub-title {
  margin: 20px 0 20px;
  font-size: 18px;
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