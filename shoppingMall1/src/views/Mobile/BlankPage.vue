<template>
	<div class="common-page">
		<div class="common-breadcrumb">
			<a href="javascript:void(0)" @click="$router.push('/Mobile/Home')">Home</a> / <span>
				{{data.display_name}}
				</span> </div>
		<div class="title">{{data.display_name}}</div>
		<div  v-html="data.desc"></div>
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