<template>
	<div class="main-page" style="text-align: center">
		<el-carousel v-if="bannerList" style="width:1200px;margin: 20px auto 0" :interval="3000" type="card"
		 height="400px">
			<el-carousel-item v-for="item in bannerList" :key="item.id" style="width: 50%; box-shadow: 0px 15px 20px -5px rgba(0, 0, 0, 0.3)">
				<div @click="item.link?goNewBank(item.link):goProduct(item, 1)" :style="
            'width:100%;height:400px;background: url(' +
            imgUrl +
            item.image +
            ');background-size:cover;'
          "></div>
			</el-carousel-item>
		</el-carousel>
		<div class="img-contain">
			<a href="https://www.mcafeesecure.com/verify?host=egpal.com"><img class="img-style" style="border-right: 1px solid #dcdcdc;"  src="../assets/image/home/img1.gif" /></a> <img class="img-style"
			 src="../assets/image/home/img2.gif" style="border-right: 1px solid #dcdcdc;" />
			<a href="https://transparencyreport.google.com/safe-browsing/search?url=www.egpal.com"><img class="img-style"  style="border-right: 1px solid #dcdcdc;"  src="../assets/image/home/img3.gif" /></a> <img class="img-style"
			 src="../assets/image/home/img5.gif"  /> </div>
		<div class="game-contain" v-if="gameList.length > 0">
			<div class="main-title"> {{ $t("language.mainPage.gameTitle") }} </div>
			<div class="contain">
				<div v-if="index<=9" class="li point" v-for="(item, index) in gameList" :key="item.id"
				 @click="goProduct(item)"> <img v-lazy="imgUrl + item.logo" />
					<div class="text hidden-style">{{ item.name }}</div>
				</div>
			</div>
			<!--<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="item-contain">
			<div class="main-title"> {{ $t("language.mainPage.itemTitle") }} </div>
			<div class="tab point"> <span class="user-name" @click="
            selectId = item.id;
            selectGame = item;
            getItem();
          " :class="selectId == item.id ? 'active' : ''" v-for="(item, index) in gameHotList">
          {{ item.name }}
        </span> </div>
			<div class="contain">
				<div class="li point" v-for="(item, index) in itemList" :key="item.id" v-if="item.type == 'item,item' || (item.hintText && item.hintImage)"
				 @click="goItem(item)">
					<div v-if="item.hintImage || item.hintText">
						<el-popover style="min-width: auto; text-align: center" placement="right" trigger="hover">
							<div class="pop-item" v-if="item.hintImage || item.hintText"> <img v-if="item.hintImage" :src="imgUrl + item.hintImage" />
								<div v-if="item.hintText">
									<div class="label">{{ item.hintText }}</div>
								</div>
							</div>
							<div slot="reference"> <img :src="imgUrl + item.logo" />
								<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../assets/image/home/img_buy.jpg" />--></div>
						</el-popover>
						<div class="text hidden-style">{{ item.name }}</div>
						<!--<div class="select-num">
								<span @click="down(index)" class="down">-</span>
								<input type="number" v-model="item.num" class="show">
								<span class="up" @click="up(index)">+</span></div>-->
						<div class="price"> {{ currencyInfo.symbol }}{{ (item.price && item.price * currencyInfo.rate).toFixed(2)
							}} </div>
					</div>
					<div v-else slot="reference"> <img :src="imgUrl + item.logo" />
						<div class="text hidden-style">{{ item.name }}</div>
						<!--<div class="select-num">
								<span @click="down(index)" class="down">-</span>
								<input type="number" v-model="item.num" class="show">
								<span class="up" @click="up(index)">+</span></div>-->
						<div class="price"> {{ currencyInfo.symbol }}{{ (item.price && item.price * currencyInfo.rate).toFixed(2)
							}} </div>
						<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../assets/image/home/img_buy.jpg" />--></div>
				</div>
			</div>
			<!--<div class="load" @click="itemPage=itemPage+1;getItem()" v-if="gameList.length>8&&gamePage<gameList.length/8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="choose-contain">
			<div class="main-title">{{ $t("language.mainPage.chooseTitle") }}</div>
			<div class="contain" style=";">
				<div class="li" style="
            border: none;
            margin: 15px;
            color: #fff;
          ">
					<div style="display: flex; align-items: flex-end; color: #fff"> <img style="width: 60px; height: 60px;margin-right:10px" src="../assets/image/icon/icon_choose1.png"
						/>
						<div class="text-title" style="font-size: 16px;text-align:left">
							<div>Secure </div>
							<div style="font-weight: 600">Payment</div>
						</div>
					</div>
					<div class="text" style="font-size: 14px; text-align: left; color: #fff"> 100% secure online payment system proved by numerous users </div>
				</div>
				<div class="li" style="
            background: none;
            border: none;
            margin: 15px;
          ">
					<div style="display: flex; align-items: flex-end; color: #fff"> <img style="width: 60px; height: 60px;margin-right:10px" src="../assets/image/icon/icon_choose2.png"
						/>
						<div class="text-title" style="font-size: 16px;text-align:left">
							<div>Fast </div>
							<div style="font-weight: 600">Delivery</div>
						</div>
					</div>
					<div class="text" style="font-size: 14px; text-align: left; color: #fff"> More than 95% of orders are processed successfully in less than 30 minutes.
						</div>
				</div>
				<div class="li" style="
            background: none;
            border: none;
            margin: 15px;
          ">
					<div style="display: flex; align-items: flex-end; color: #fff"> <img style="width: 60px; height: 60px;margin-right:10px" src="../assets/image/icon/icon_choose3.png"
						/>
						<div class="text-title" style="font-size: 16px;text-align:left">
							<div>Refund </div>
							<div style="font-weight: 600">Guaranteed</div>
						</div>
					</div>
					<div class="text" style="font-size: 14px; text-align: left; color: #fff"> EGPAL ensures that buyers receive the item they ordered or get their money back.
						</div>
				</div>
				<div class="li" style="
            background: none;
            border: none;
            margin: 15px;
          ">
					<div style="display: flex; align-items: flex-end; color: #fff"> <img style="width: 60px; height: 60px;margin-right:10px" src="../assets/image/icon/icon_choose4.png"
						/>
						<div class="text-title" style="font-size: 16px;text-align:left">
							<div>24/7</div>
							<div style="font-weight: 600">Live Chat</div>
						</div>
					</div>
					<div class="text" style="font-size: 14px; text-align: left; color: #fff"> Our service is ticking around the clock. Contact us anytime you need help. </div>
				</div>
			</div>
			<!--<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="new-contain" v-if="newsList.length > 0">
			<div class="main-title"> {{ $t("language.mainPage.News") }}<span class="point" @click="$router.push('/newsList')"
				 style="float: right; font-size: 16px">More<img
            style="margin-left: 10px"
            src="../assets/image/icon/icon_more.png"
        /></span> </div>
			<div class="contain">
				<div class="li point" @click="goDetail(item)" v-for="(item, index) in newsList"
				 v-if="index < 4" :key="item.id">
					<div class="title">{{ item.title }}</div>
					<div class="text" style="height: 100px; overflow: hidden"
					 v-html="item.text"></div>
					<div class="date">{{ item.updated }}</div>
				</div>
			</div>
		</div>
		<!--<div class="trustedsite-trustmark" data-type="202"></div>--></div>
</template>
<script>
	import { getTemplete } from "../api/common.js";
	import { mapMutations, mapState } from "vuex";
	import { getStore } from "../utils/storage";
	import "../utils/common/chart";
	export default {
		data() {
			return {
				bannerList: [],
				imgUrl: "",
				gameList: [],
				itemList: [],
				gameHotList: [],
				newsList: [],
				selectId: "",
				gamePage: 0,
				newPage: 0,
				itemPage: 1,
				selectGame: {},
			};
		},
		computed: { ...mapState(["login", "showMoveImg", "currencyInfo", 'clientSize'])
		},
		methods: { ...mapMutations(["ADD_CART"]),
			down(index) {
				if (this.itemList[index].num == 0) return;
				this.itemList[index].num = this.itemList[index].num - 1;
				this.$forceUpdate();
			},
			up(index) {
				this.itemList[index].num = this.itemList[index].num + 1;
				this.$forceUpdate();
			},
			goDetail(item) {
				localStorage.setItem("newData", JSON.stringify(item));
				this.$router.push("/newDetail");
			},
			goNewBank(link) {
				window.open(link);
			},
			goProduct(item, type) {
				if (type == 1) {
					item.id = item.game.split(",")[0];
					item.name = item.game.split(",")[1];
				}
				localStorage.setItem("gameId", item.id);
				localStorage.setItem("gameName", item.name);
				if (item.productSell == "item,item") {
					this.$router.push("/ItemList/" + localStorage.getItem("gameId"));
				} else {
					this.$router.push("/CoinList/" + localStorage.getItem("gameId"));
				}
			},
			goItem(item, type) {
				item.id = item.game.split(",")[0];
				item.name = item.game.split(",")[1];
				localStorage.setItem("gameId", item.id);
				localStorage.setItem("gameName", item.name);
				this.$router.push("/ItemList/" + this.selectId);
			},
			getGame() {
				//获取game
				getTemplete("?type=Game&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
							response.data.sort((a,b) => {
							
							 let fa = a.name.trim().toLowerCase(),
								fb = b.name.trim().toLowerCase();

							if (fa < fb) {
								return -1;
							}
							if (fa > fb) {
								return 1;
							}
							return 0;
							}); 
						this.gameList = response.data.filter((item) => {
							return item.hot && item.online;
						});
						
					} else {
						this.$message({
							type: "warning",
							message: response.msg,
						});
					}
				});
			},
			getNews() {
				//获取news
				getTemplete("?type=News&offset=" + this.newPage + "&count=8").then(
					(response) => {
						if (response.retCode == 0) {
							this.newsList = response.data;
							this.newsList && this.newsList.map((item) => {
								item.updated = this.$util.formatTime(item.updated,
									"YYYY-MM-DD HH:mm:ss");
							});
						} else {
							this.$message({
								type: "warning",
								message: response.msg,
							});
						}
					});
			},
			getItem() {
				//获取item
				getTemplete("?type=Product&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						this.itemList = response.data.filter((item) => {
							var gameId = item.game.split(",")[0];
							return (gameId == this.selectId && item.hotItem && item.online &&
								item.type == "item,item");
						});
					} else {
						this.$message({
							type: "warning",
							message: response.msg,
						});
					}
				});
			},
			getHotGame() {
				//获取game
				getTemplete("?type=Game&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {

						this.gameHotList = response.data.filter((item) => {
							return item.hotitem && item.online;
						});
						console.log(this.gameHotList)
						
						this.selectId = this.gameHotList[0].id;
						this.selectGame = this.gameHotList[0];
						this.getItem();
					} else {
						this.$message({
							type: "warning",
							message: response.msg,
						});
					}
				});
			},
			addCart(id, price, name, productNum, img) {
				if (productNum == 0) {
					this.$message({
						type: "warning",
						message: "Please Select",
					});
					return;
				}
				this.ADD_CART({
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum,
				});
				this.$message({
					type: "success",
					message: "Add Success",
				});
			},
		},
		mounted() {},
		created() {
			this.getGame();
			this.getItem();
			this.getHotGame();
			this.getNews();
			//获取banner
			getTemplete('?type=Carousel&offset=0&count=5').then(response => {
				if (response.retCode == 0) {
					this.bannerList = response.data;
					this.imgUrl = window.imgUrl;
				} else {
					this.$message({
						type: 'warning',
						message: response.msg
					});
				}
			})
		},
	};
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.img-contain {
		width: 1200px;
		display: inline-block;
		margin: 1px auto 1px;
		border-radius: 2px;

		.img-style {
			display: inline-block;
			height: 48px;
			margin: 20px 0;
			padding: 0 61.5px;
			
		}
	}
	
	.choose-contain {
		width: 100%;
		margin-bottom: 40px;
		.contain {
			width: 1200px;
			margin: 0 auto;
			text-align: left;
			align-items: center;
			display: flex;
			background: rgba(242, 165, 6);
			width: 1200px;
			justify-content: space-around;
			.text {
				margin-top: 20px;
			}
		}
	}
	
	.game-contain {
		width: 100%;
		background-color: #f7f7f8;
		.contain {
			width: 1200px;
			margin: 0 auto;
			text-align: center;
			display: flex;
			flex-wrap: wrap;
			.li {
				text-align: center;
				margin: 26px 0;
				margin-right: 12px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 230px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding-bottom: 12px;
				&:nth-child(5n) {
					margin-right: 0;
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
				img {
					width: 230px;
					height: 160px;
				}
				.text {
					padding: 10px 0 0px;
					color: #222222;
					font-size: 20px;
				}
			}
		}
	}
	
	.new-contain {
		background-color: #f7f7f8;
		.contain {
			width: 1200px;
			margin: 0 auto;
			text-align: left;
			display: flex;
			flex-wrap: wrap;
			.li {
				position: relative;
				text-align: center;
				margin: 36px 0;
				margin-right: 20px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 285px;
				height: 310px;
				overflow: hidden;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 16px;
				&:nth-child(4n) {
					margin-right: 0;
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
				.title {
					font-family: MicrosoftYaHei;
					font-size: 20px;
					height: auto;
					color: #333333;
				}
				.text {
					font-family: 'Avenir', Helvetica, Arial, sans-serif;
					font-size: 14px;
					font-weight: normal;
					font-stretch: normal;
					line-height: 24px;
					letter-spacing: 0px;
					color: #666666;
				}
				.date {
					position: absolute;
					bottom: 20px;
					right: 20px;
					font-family: 'Avenir', Helvetica, Arial, sans-serif;
					font-size: 17px;
					font-weight: normal;
					font-style: italic;
					text-align: right;
					margin-top: 66px;
				}
				.line {
					width: 40px;
					height: 1px;
					margin: 15px 0 40px;
					background-color: rgba(160, 160, 160, 0.3);
					float: right;
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
		font-size: 14px;
		line-height: 43px;
		margin-bottom: 36px;
	}
	
	.main-title {
		margin: 0 auto;
		width: 1200px;
		text-align: left;
		font-family: Helvetica;
		font-weight: bold;
		font-size: 24px;
		padding: 20px 0;
		color: #142a43;
	}
	
	.pop-item {
		overflow: hidden;
		font-size: 14px;
		color: #333;
		text-align: center;
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
			padding-bottom: 20px;
			span {
				padding: 15px 23px;
				font-size: 16px;
				font-weight: 900;
				color: #333333;
				border-radius: 4px;
				display: inline-block;
				&.active {
					background-image: linear-gradient( 90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient(#e1251b, #e1251b);
					background-blend-mode: normal, normal;
					color: #fff;
				}
			}
		}
		.contain {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			flex-wrap: wrap;
			text-align: left;
			.text {
				font-size: 14px;
				margin-top: 20px;
			}
			.li {
				text-align: center;
				margin-top: 20px;
				box-sizing: border-box;
				display: inline-block;
				width: 240px;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 16px;
				vertical-align: top;
				border-right: 0;
				&:nth-child(5n) {
					margin-right: 0;
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
				&:last-child {
					border-right: solid 1px #dcdcdc;
				}
				&:nth-child(5n) {
					border-right: solid 1px #dcdcdc;
				}
				img {
					width: 56px;
					height: 56px;
					border-radius: 5px;
				}
				.text {
					padding: 10px 0 8px;
					font-size: 14px;
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
					margin-bottom: 12px;
				}
			}
		}
	}
	
	.hidden-style {
	overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 26px;
		margin-bottom: 8px;
		word-wrap: break-word;
		
	}
</style>