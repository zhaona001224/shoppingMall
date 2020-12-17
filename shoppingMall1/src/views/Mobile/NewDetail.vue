<template>
	<div style="padding: 0 15px;">
		<div class="common-breadcrumb">
			<a href="javascript:void(0)" @click="$router.push('/Mobile/Home')">Home</a> / <span @click="$router.push('/Mobile/NewsList')">
							NewsList / {{ data.title }}
					</span> </div>
		<div>
			<div class="content">
				<div class="title">{{ data.title }}</div>
				<div class="" v-html="data.text"></div>
			</div>
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
	.content {
		background-color: #fff;
		padding: 0.3rem 0.2rem;
		border-radius: 2px;
		margin-bottom: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		.title {
			font-size: 0.2rem;
			font-weight: bold;
			line-height: 0.24rem;
			padding-bottom: 8px;
		}
		/deep/ img{
			width: 100%!important;
		}
	}
</style>