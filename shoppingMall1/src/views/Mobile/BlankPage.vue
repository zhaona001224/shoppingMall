<template>
	<div>
		<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home >{{data.display_name}}</div>
		<div class="common-page">
			
		<div class="title">{{data.display_name}}</div>
		<div  v-html="data.desc"></div>
	</div>
	</div>
	
</template>
<script>
	import { getTemplete } from '../../api/common.js'
	export default {
		data() {
			return {
				data: {}
			};
		},
		methods: {},
		created() {
			//获取banner
			getTemplete("?type=Site").then((response) => {
				this.data = response.data[this.$route.params.id * 1 - 1]
			});
		}
	}
</script>
<style lang="less" scoped="">
	.title {
		margin: 0.1rem 0 0.1rem;
		font-size: 22px;
		font-weight: 600;
	}
	
	.sub-title {
		margin: 20px 0 20px;
		font-size: 18px;
		font-weight: 600;
	}
	
	
</style>