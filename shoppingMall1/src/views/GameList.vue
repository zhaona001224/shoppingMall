<template>
	<div style="text-align: center;min-height: 1000px;background: #f7f7f8;" >
		<div class="game-contain" v-if="gameList.length>0">
			<div class="main-title">{{$t("language.mainPage.gameTitle")}}</div>
			<div class="contain">
				<div class="li point" v-for="(item,index) in gameList" :key="item.id" @click="goProduct(item)">
					<img v-lazy="imgUrl+item.logo" />
					<div class="text">
						{{item.name}}
					</div>
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
				gameList: [],
			};
		},
		methods: {
			goProduct(item) {
				localStorage.setItem('gameId', item.id);
				localStorage.setItem('gameName', item.name);
				if(item.productSell=='item,item'){
					this.$router.push('/itemList/'+localStorage.getItem('gameName'));
				}else{
					this.$router.push('/coinList/'+localStorage.getItem('gameName'));
				}
				
			},
		},
		computed: {
			...mapState(['login', 'showMoveImg', 'showCart', 'currencyInfo'])
		},
		created() {

			//获取game
			getTemplete('?type=Game&offset=-1&count=-1').then(response => {
					this.imgUrl = window.imgUrl;
				if(response.retCode == 0) {
					this.gameList = response.data.filter((item) => {
						return item.hot
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
	.game-contain {
		background-color: #f7f7f8;
		.main-title {
			margin: 0 auto;
			width: 1234px;
			text-align: left;
			font-family: Allstar4;
			font-size: 24px;
			padding: 33px 0;
			color: #142a43;
		}
		.contain {
			display: inline-block;
			margin-left: -36px;
			width: 1268px;
			text-align: left;
			.li {yield
				text-align: center;
				margin: 36px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 245px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 16px;
				img {
					width: 100%;
					height: 200px;
				}
				&:hover {
					transform: translateY(-3px);
					box-shadow: 1px 1px 10px #999;
					.good-price p {
						display: none;
					}
					.ds {
						display: flex;
					}
				}
				.text {
					padding: 19px 0 8px;
					color: #222222;
					font-size: 20px;
					
				}
			}
		}
	}
</style>