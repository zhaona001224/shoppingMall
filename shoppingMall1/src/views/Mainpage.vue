<template>
	<div style="text-align: center;">
		<el-carousel v-if="bannerList" style="margin: 40px 8.125% 0;" :interval="3000" type="card" height="477px">
			<el-carousel-item v-for="item in bannerList" :key="item.id" style="width:50%;box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.3);">
				<div :style="'width:100%;height:472px;background: url('+imgUrl+item.image+');background-size:cover;'"></div>
			</el-carousel-item>
		</el-carousel>
		<div class="img-contain">
			<img class="img-style" src="../assets/image/home/img1.gif" />
			<img class="img-style" src="../assets/image/home/img2.gif" />
			<img class="img-style" src="../assets/image/home/img3.gif" />
			<img class="img-style" src="../assets/image/home/img4.gif" />
			<img class="img-style" src="../assets/image/home/img5.gif" />
		</div>
		<div class="game-contain" v-if="gameList.length>0">
			<div class="main-title">{{$t("language.mainPage.gameTitle")}}<span class="point" @click="$router.push('/gameList')" style="float: right;font-size: 16px;">More<img src="../assets/image/icon/icon_more.png"/></span></div>
			<div class="contain">

				<div class="li point" v-for="(item,index) in gameList" v-if="index<8" :key="item.id" @click="goProduct(item)">
					<img v-lazy="imgUrl+item.logo" />
					<div class="text">
						{{item.name}}
					</div>
				</div>

			</div>
			<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png" />{{$t("language.mainPage.load")}}</div>
		</div>
		<div class="item-contain">
			<div class="main-title hidden-style">{{$t("language.mainPage.itemTitle")}}</div>
			<div class="tab point">
				<span @click="selectId=item.id;selectGame=item;getItem()" :class="selectId==item.id?'active':''" v-for="(item,index) in gameHotList">
					{{item.name}}
				</span>
			</div>
			<div class="contain">

				<div class="li point" v-for="(item,index) in itemList" :key="item.id" v-if="index<(itemPage*8-1)&&item.type=='item,item'" @click="goProduct(selectGame)">
					<el-popover placement="right" width="400" trigger="hover">
						<div class="pop-item">
							<img style="margin-right: 17px;" :src="imgUrl+item.hintImage" />
							<div>
								<div class="title hidden-style">
									{{item.name}}
								</div>
								<div class="text">
									Price:<span>{{currencyInfo.symbol}}{{item.price*1*currencyInfo.rate.toFixed(2)}}</span>
								</div>
								<div class="label">{{item.customerLabel}}</div>
							</div>

						</div>
						<div slot="reference"><img :src="imgUrl+item.hintImage" />
							<div class="text hidden-style">
								{{item.name}}
							</div>
							<!--<div class="select-num">
								<span @click="down(index)" class="down">-</span>
								<input type="number" v-model="item.num" class="show">
								<span class="up" @click="up(index)">+</span></div>-->
							<div class="price">{{currencyInfo.symbol}}{{item.price&&item.price*currencyInfo.rate}}</div>
							<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../assets/image/home/img_buy.jpg" />-->
						</div>
					</el-popover>

				</div>

			</div>
			<div class="load" @click="itemPage=itemPage+1;getItem()" v-if="gameList.length>8&&gamePage<gameList.length/8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png" />{{$t("language.mainPage.load")}}</div>
		</div>
		<div class="game-contain">
			<div class="main-title">{{$t("language.mainPage.chooseTitle")}}</div>
			<div class="contain">

				<div class="li" style="background: none;border: none;margin:35px">
					<img src="../assets/image/icon/icon_choose1.png" />
					<div class="text-title" style="color: #142a43;font-size: 17px;">
						Security Guarantee
					</div>
					<div class="text" style="font-family: ArialMT;font-size: 14px;">
						Provide 100% secure online payment system. The most professional game service provider guarantee the security of products.
					</div>
				</div>
				<div class="li" style="background: none;border: none;margin:35px">
					<img src="../assets/image/icon/icon_choose2.png" />
					<div class="text-title" style="color: #142a43;font-size: 17px;">
						Fast Delivery
					</div>
					<div class="text" style="font-family: ArialMT;font-size: 14px;">
						95% orders completed in 15 minutes, professional online service, reply to the customer's questions within 20 second.
					</div>
				</div>
				<div class="li" style="background: none;border: none;margin:35px">
					<img src="../assets/image/icon/icon_choose3.png" />
					<div class="text-title" style="color: #142a43;font-size: 17px;">
						Cheap Prices
					</div>
					<div class="text" style="font-family: ArialMT;font-size: 14px;">
						More than 90% of products have cheaper prices than the market, Enjoy VIP member get up to 10% discount plus.Enjoy now.
					</div>
				</div>
				<div class="li" style="background: none;border: none;margin:35px">
					<img src="../assets/image/icon/icon_choose4.png" />
					<div class="text-title" style="color: #142a43;font-size: 17px;">
						100% Refund
					</div>
					<div class="text" style="font-family: ArialMT;font-size: 14px;">
						Received what you purchased or the refund. Once your order is delayed or undeliverable, we are 100% guaranteed to refund your money.
					</div>
				</div>

			</div>
			<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png" />{{$t("language.mainPage.load")}}</div>
		</div>
		<div class="new-contain" v-if="newsList.length>0">
			<div class="main-title">{{$t("language.mainPage.News")}}<span class="point" @click="$router.push('/newsList')" style="float: right;font-size: 16px;">More<img src="../assets/image/icon/icon_more.png"/></span></div>
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
	import { getStore } from '../utils/storage'
	export default {
		data() {
			return {
				bannerList: [],
				imgUrl: '',
				gameList: [],
				itemList: [],
				gameHotList: [],
				newsList: [],
				selectId: '',
				gamePage: 0,
				newPage: 0,
				itemPage: 1,
				selectGame: {}
			};
		},
		computed: {
			...mapState(['login', 'showMoveImg', 'currencyInfo'])
		},
		methods: {
			...mapMutations(['ADD_CART']),
			down(index) {
				if(this.itemList[index].num == 0) return
				this.itemList[index].num = this.itemList[index].num - 1;
				this.$forceUpdate();
			},
			up(index) {
				this.itemList[index].num = this.itemList[index].num + 1;
				this.$forceUpdate();
			},
			goProduct(item) {
				localStorage.setItem('gameId', item.id);
				localStorage.setItem('gameName', item.name);
				this.$router.push('/itemList');
			},
			getGame() {
				//获取game
				getTemplete('?type=Game&offset=' + this.gamePage + '&count=8').then(response => {
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
			},
			getNews() {
				//获取news
				getTemplete('?type=News&offset=' + this.newPage + '&count=8').then(response => {
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
			},
			getItem() {
				//获取item
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.itemList = response.data.filter((item) => {
							var gameId = item.game.split(',')[0];

							return gameId == this.selectId
						})

					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getHotGame() {
				//获取game
				getTemplete('?type=Game&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.gameHotList = response.data.filter((item) => {
							return item.hotitem
						})
						this.selectId = this.gameHotList[0].id;
						this.selectGame = this.gameHotList[0];
						this.getItem()
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			addCart(id, price, name, productNum, img) {
				if(productNum == 0) {
					this.$message({
						type: 'warning',
						message: "Please Select"
					});
					return
				}
				this.ADD_CART({
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum
				})
				this.$message({
					type: 'success',
					message: 'Add Success'
				});

			}
		},
		created() {
			this.getGame();
			this.getItem();
			this.getHotGame();
			this.getNews();
			//获取banner
			getTemplete('?type=Carousel&offset=0&count=5').then(response => {
				if(response.retCode == 0) {
					this.bannerList = response.data;
					this.imgUrl = window.imgUrl;
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
	.img-contain {
		display: inline-block;
		margin: 30px auto;
		border-radius: 2px;
		border: solid 1px #dcdcdc;
		box-shadow: 0px 10px 15px -5px rgba(0, 0, 0, 0.2);
		.img-style {
			display: inline-block;
			height: 38px;
			margin: 20px 0;
			padding: 0 61.5px;
			border-right: 1px solid #dcdcdc;
			&:last-child {
				border-right: none;
			}
		}
	}
	
	.game-contain {
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
				width: 239px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 16px;
				img {
					width: 100%;
					height: 200px;
				}
				.text {
					padding: 19px 0 8px;
					color: #222222;
					font-size: 20px;
					font-family: ArialMT;
				}
			}
		}
	}
	
	.new-contain {
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
	
	.load {
		text-align: center;
		display: inline-block;
		line-height: 43px;
		width: 165px;
		height: 43px;
		background-color: #4c9adb;
		border-radius: 21px;
		color: #ffffff;
		font-family: ArialMT;
		font-size: 14px;
		line-height: 43px;
		margin-bottom: 36px;
	}
	
	.main-title {
		margin: 0 auto;
		width: 1200px;
		text-align: left;
		font-family: Allstar4;
		font-weight: 600;
		font-size: 24px;
		padding: 33px 0;
		color: #142a43;
	}
	
	.pop-item {
		overflow: hidden;
		font-family: ArialMT;
		font-size: 14px;
		color: #333;
		img {
			width: 200px;
			height: 150px;
			float: left;
		}
		.title {
			font-family: Arial-BoldMT;
			font-size: 14px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 24px;
			letter-spacing: 0px;
			color: #333333;
		}
		.text {
			margin-top: 18px;
			margin-bottom: 23px;
			font-family: ArialMT;
			font-size: 14px;
			color: #666;
			span {
				font-size: 16px;
				color: #e1251b;
			}
		}
	}
	
	.item-contain {
		.tab {
			text-align: left;
			width: 1200px;
			margin: 0 auto;
			border-bottom: 2px solid #fe852d;
			padding-bottom: 13px;
			margin-bottom: 13px;
			span {
				padding: 15px 23px;
				font-size: 14px;
				color: #333333;
				border-radius: 4px;
				&.active {
					background-image: linear-gradient(90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient( #e1251b, #e1251b);
					background-blend-mode: normal, normal;
					color: #fff;
				}
			}
		}
		.contain {
			width: 1274px;
			margin: 0 auto;
			text-align: left;
			margin-left: 62px;
			.text{
				font-size:24px;
				margin-top:20px;
			}
			.li {
				text-align: center;
				margin: 12px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 221px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 15px 30px;
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
				img {
					width: 100%;
					height: 98px;
				}
				.select-num {
					margin: 18px auto 12px;
					display: flex;
					align-items: center;
					border-radius: 3px;
					border: solid 1px #dcdcdc;
					color: #808080;
					width: 136px;
					input {
						text-align: center;
						width: 90px;
						height: 24px;
						background-color: #fff;
						line-height: 18px;
						font-size: 14px;
						padding: 0;
						color: #666;
						position: relative;
						border: none;
					}
				}
				.down,
				.up {
					display: inline-block;
					width: 24px;
					height: 24px;
					line-height: 24px;
					background-color: #e7e7e7;
					cursor: pointer;
				}
				.price {
					text-align: center;
					font-family: Arial-BoldMT;
					font-size: 20px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 18px;
					letter-spacing: 0px;
					color: #f39800;
					margin: 12px 0;
				}
			}
		}
	}
</style>