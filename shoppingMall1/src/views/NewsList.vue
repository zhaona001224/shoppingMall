<template>
	<div style="text-align: center;">
		<div class="new-contain" v-if="newsList.length>0">
		<div class="contain">

				<div class="li" v-for="(item,index) in newsList" v-if="index<8" :key="item.id">
					<div class="title">
						{{item.title}}
					</div>
					<div class="text" style="height: 140px;overflow: hidden;" v-html="item.text">

					</div>
					<div class="date">
						{{item.updated}}
					</div>
					<div class="line"></div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import { getTemplete } from '../api/common.js'
	import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				newsList: [],
			};
		},
		methods: {
		
		},
		computed: {
			...mapState(['login', 'showMoveImg', 'showCart', 'currencyInfo'])
		},
		created() {
			//获取news
			getTemplete('?type=News&offset=-1&count=-1').then(response => {
				if(response.retCode == 0) {
					this.newsList = response.data;
					this.newsList && this.newsList.map((item) => {
						item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
					})
				} else {
					this.$message({
						type: 'warning',
						message: response.message
					});
				}
			})
		}

	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.new-contain {
		padding-top:100px;
		background-color: #f7f7f8;
		.contain {
			width: 1274px;
			margin: 0 auto;
			text-align: left;
			margin-left: 40px;
			.li {
				text-align: center;
				margin: 36px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 245px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 16px;
				.title {
					font-family: MicrosoftYaHei;
					font-size: 20px;
					color: #333333;
				}
				.text {
					font-family: MicrosoftYaHeiLight;
					font-size: 16px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 24px;
					letter-spacing: 0px;
					color: #666666;
				}
				.date {
					font-family: MicrosoftYaHeiLight;
					font-size: 17px;
					font-weight: normal;
					font-style: italic;
					text-align: left;
					margin-top: 66px;
				}
				.line {
					width: 40px;
					height: 1px;
					margin:15px 0 40px;
					background-color: rgba(160, 160, 160, 0.3);
				}
			}
		}
	}
	
</style>