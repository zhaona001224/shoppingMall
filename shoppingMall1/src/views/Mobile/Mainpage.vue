<template>
	<div class="main-page mobile" style="text-align: center">
		<van-swipe v-if="bannerList" class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="item in bannerList" :key="item.id">
				<div @click="item.link ? goNewBank(item.link) : goProduct(item, 1)" :style="
            'width:100%;height:195px;background: url(' +
            imgUrl +
            item.image +
            ');background-size:cover;'
          "></div>
			</van-swipe-item>
		</van-swipe>
		<div class="img-contain">
			<a class="img-style" href="https://www.mcafeesecure.com/verify?host=egpal.com">
			<img style="width: 0.75rem;" src="../../assets/image/mobile/home1.png" /></a>
			<a class="img-style" href="javascript:void(0)"> <img style="margin-top:4px;width: 0.79rem;" src="../../assets/image/mobile/home2.png" /></a>
			<a class="img-style" href="https://transparencyreport.google.com/safe-browsing/search?url=www.egpal.com"><img style="width: 0.51rem;" src="../../assets/image/mobile/home3.png" /></a>
			<a class="img-style" href="javascript:void(0)"> <img style="width: 0.6rem;" src="../../assets/image/mobile/home4.png" /></a>
		</div>
		<div class="split"></div>
		<div class="game-contain" v-if="gameList.length > 0">
			<div class="main-title"><span class="border-style"></span>{{ $t("language.mainPage.gameTitle") }}</div>
			<div class="tabs-wrapper" ref="tabsWrapper">
				<div class="contain">
					<div v-if="index <= 7" class="li point" v-for="(item, index) in gameList" :key="item.id"
					 @click="goProduct(item)"> <img v-lazy="imgUrl + item.logo" />
						<div class="text hidden-style">{{ item.name }}</div>
					</div>
				</div>
			</div>
			<!--<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="split"></div>
		<div class="item-contain">
			<div class="main-title hidden-style"><span class="border-style"></span>{{ $t("language.mainPage.itemTitle") }} </div>
			<el-dropdown v-if="gameHotList.length>0"> <span class="el-dropdown-link">
					     {{selectGame.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
				<el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="
              selectId = item.id;
              selectGame = item;
              getItem();
            " v-for="(item, index) in gameHotList" :key="index">{{item.name}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<van-swipe ref="swiper" v-if="itemList.length>0" :interval="10000" height="260px">
				<van-swipe-item v-for="(item,index) in itemArray" :key="index"> <img class="left" @click="$refs.swiper.prev()" src="../../assets/image/mobile/left.png"
					/> <img class="right" @click="$refs.swiper.next()" src="../../assets/image/mobile/right.png"
					/>
					<div class="li point" v-for="(subItem,subIndex) in itemList" :key="subItem.id"
					 v-if="subIndex>=6*index&&subIndex<6*(index+1)&&(subItem.type == 'item,item' || (subItem.hintText && subItem.hintImage))"
					 @click="goItem(subItem)">
						<div v-if="subItem.hintImage || subItem.hintText">
							<el-popover style="min-width: auto; text-align: center" placement="right" trigger="hover">
								<div class="pop-item" v-if="subItem.hintImage || subItem.hintText"> <img v-if="subItem.hintImage" :src="imgUrl + subItem.hintImage" />
									<div v-if="subItem.hintText">
										<div class="label">{{ subItem.hintText }}</div>
									</div>
								</div>
								<div slot="reference"> <img :src="imgUrl + subItem.logo" />
									<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../../assets/image/home/img_buy.jpg" />--></div>
							</el-popover>
							<div class="text hidden-style">{{ subItem.name }}</div>
							<!--<div class="select-num">
								<span @click="down(index)" class="down">-</span>
								<input type="number" v-model="item.num" class="show">
								<span class="up" @click="up(index)">+</span></div>-->
							<div class="price"> {{ currencyInfo.symbol }}{{ (subItem.price && subItem.price * currencyInfo.rate).toFixed(2)
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
							<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../../assets/image/home/img_buy.jpg" />--></div>
					</div>
				</van-swipe-item>
			</van-swipe>
			<!--<div class="load" @click="itemPage=itemPage+1;getItem()" v-if="gameList.length>8&&gamePage<gameList.length/8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="split"></div>
		<div class="choose-contain">
			<div class="main-title"><span class="border-style"></span>{{ $t("language.mainPage.chooseTitle") }}</div>
			<div class="contain">
				<div class="li"> <img src="../../assets/image/icon/icon_choose1.png" />
					<div class="text-title">
						<div style="font-size:0.16rem; text-align: left;color:#0291cd">Secure Payment</div>
						<div class="text"> 100% secure online payment system proved by numerous users </div>
					</div>
				</div>
				<div class="li"> <img src="../../assets/image/icon/icon_choose2.png" />
					<div class="text-title">
						<div style="font-size: 0.16rem; text-align: left;color:#0291cd">Fast Delivery</div>
						<div class="text"> More than 95% of orders are processed successfully in less than 30 minutes.
							</div>
					</div>
				</div>
				<div class="li"> <img src="../../assets/image/icon/icon_choose3.png" />
					<div class="text-title">
						<div style="font-size: 0.16rem; text-align: left;color:#0291cd">Refund Guaranteed</div>
						<div class="text"> EGPAL ensures that buyers receive the item they ordered or get their money
							back. </div>
					</div>
				</div>
				<div class="li"> <img src="../../assets/image/icon/icon_choose4.png" />
					<div class="text-title">
						<div style="font-size: 0.16rem; text-align: left;color:#0291cd">24/7 Live Chat</div>
						<div class="text"> Our service is ticking around the clock. Contact us anytime you need help.
							</div>
					</div>
				</div>
			</div>
			<!--<div class="load" @click="gamePage=gamePage+1;getGame()" v-if="gameList.length>8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<!-- <div class="new-contain" v-if="newsList.length > 0">
      <div class="main-title">
        {{ $t("language.mainPage.News")
        }}<span
          class="point"
          @click="$router.push('/newsList')"
          style="float: right; font-size: 16px"
          >More<img
            style="margin-left: 10px"
            src="../../assets/image/icon/icon_more.png"
        /></span>
      </div>
      <div class="contain">
        <div
          class="li point"
          @click="goDetail(item)"
          v-for="(item, index) in newsList"
          v-if="index < 4"
          :key="item.id"
        >
          <div class="title">{{ item.title }}</div>
          <div
            class="text"
            style="height: 100px; overflow: hidden"
            v-html="item.text"
          ></div>
          <div class="date">{{ item.updated }}</div>
        </div>
      </div>
    </div> -->
		<!--<div class="trustedsite-trustmark" data-type="202"></div>--></div>
</template>
<script>
	import { getTemplete } from "../../api/common.js";
	import { mapMutations, mapState } from "vuex";
	import { getStore } from "../../utils/storage";
	import BScroll from "better-scroll";
	import "../../utils/common/chart";
	import { Swipe, SwipeItem } from 'vant';
	export default {
		components: {
			Swipe,
			SwipeItem
		},
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
				itemArray: []
			};
		},
		computed: { ...mapState(["login", "showMoveImg", "currencyInfo", "clientSize"]),
		},
		methods: { ...mapMutations(["ADD_CART"]),
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
					this.$router.push("/Mobile/ItemList/" + localStorage.getItem("gameId"));
				} else {
					this.$router.push("/Mobile/CoinList/" + localStorage.getItem("gameId"));
				}
			},
			goItem(item, type) {
				item.id = item.game.split(",")[0];
				item.name = item.game.split(",")[1];
				localStorage.setItem("gameId", item.id);
				localStorage.setItem("gameName", item.name);
				this.$router.push("/Mobile/itemList/" + this.selectId);
			},
			getGame() {
				//获取game
				getTemplete("?type=Game&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						this.gameList = response.data.filter((item) => {
							return item.hot && item.online;
						});
						//						this.$nextTick(() => {
						//							setTimeout(() => {
						//								if (!this.scroll1) {
						//									this.scroll1 = new BScroll(this.$refs.tabsWrapper1, {
						//										scrollX: true,
						//										eventPassthrough: "vertical",
						//									});
						//								} else {
						//									this.scroll1.refresh();
						//								}
						//							}, 2000)
						//						});
					} else {
						this.$message({
							type: "warning",
							message: response.message,
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
								message: response.message,
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
						var length = Math.ceil(this.itemList.length / 6)
						this.itemArray = []
						this.itemArray.length = length
					} else {
						this.$message({
							type: "warning",
							message: response.message,
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
						this.selectId = this.gameHotList[0].id;
						this.selectGame = this.gameHotList[0];
						this.getItem();
						setTimeout(()=>{
if (!this.scroll) {
								this.scroll = new BScroll(this.$refs.tabsWrapper, {
									scrollX: true,
									eventPassthrough: "vertical",
								});
							} else {
								this.scroll.refresh();
							}
						},2000)
						
					} else {
						this.$message({
							type: "warning",
							message: response.message,
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
			getTemplete("?type=Carousel&offset=0&count=5").then((response) => {
				if (response.retCode == 0) {
					this.bannerList = response.data;
					this.imgUrl = window.imgUrl;
				} else {
					this.$message({
						type: "warning",
						message: response.message,
					});
				}
			});
		},
	};
</script>
<style lang="less" scoped="">
	@import "../../assets/css/public.css";
	.mobile {
	
		.img-contain {
			width: 100%;
			border-radius: 2px;
			align-items: center;
			display: flex;
			justify-content: space-between;
			border: solid 1px #dcdcdc;
			box-sizing: border-box;
			.img-style {
				position: relative;
				height: 0.19rem;
				margin: 0.1rem 0;
				padding: 0 0.12rem;
				box-sizing: border-box;
				border-right: solid 1px #dcdcdc;
				display: block;
				&:last-child {
					border-right: none;
				}
			}
		}
		.split {
			width: 100%;
			height: 0.125rem;
			background-color: #f5f5f5;
		}
		/deep/ .van-swipe__indicator {
			width: 0.15rem;
			height: 3px;
			background-color: #e6e6e6;
			border-radius: 1px;
			margin: 0;
			opacity: 1;
		}
		/deep/ .van-swipe__indicator.van-swipe__indicator--active {
			background-color: #e10e0d!important;
		}
		.choose-contain {
			width: 100%;
			background: #ebebeb;
			.contain {
				width: 100%;
				margin: 0 auto;
				.li {
					display: flex;
					padding:0.1rem 0.25rem 0.15rem;
					align-items: center;
					text-align: left;
					img {
						width: 0.5rem;
						height: 0.5rem;
						margin-right: 0.25rem;
					}
				}
				.text {
					margin-top: 0.2rem;
				}
			}
		}
		.tabs-wrapper {
			width: 100%;
			overflow: hidden;
		}
		.game-contain {
			width: 100%;
			background-color: #fff;
			.contain {
				width: 13rem;
				display: flex;
				margin-left: 0.25rem;
				margin-bottom: 0.31rem;
				text-align: center;
				.li {
					text-align: center;
					margin-top: 0;
					box-sizing: border-box;
					display: inline-block;
					width: 1.43rem;
					margin-right: 0.15rem;
					box-shadow: 0px 3px 9px 0px rgba(56, 58, 60, 0.1);
					border: solid 1px #dcdcdc;
					img {
						width: 1.41rem;
						height: 1.2rem;
					}
					.text {
						height: 0.45rem;
						line-height: 0.45rem;
						font-family: PingFang-SC-Regular;
						font-size: 0.15rem;
						color: #222222;
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
			padding: 0.15rem 0.25rem;
			font-size: 0.18rem;
			font-family: Allstar4;
			white-space: nowrap;
			font-weight: bold;
			color: #142a43;
			text-align: left;
			display: flex;
			align-items: center;
			.border-style {
				width: 3px;
				height: 9px;
				background-color: #e10e0d;
				border-radius: 1px;
				margin-right: 9px;
			}
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
			background: #fff;
			padding-bottom: 0.1rem;
			.left, .right {
				position: absolute;
				top: 50%;
				margin-top: -0.225rem;
				width: 0.21rem;
				height: 0.45rem;
			}
			.left {
				left: 0px;
			}
			.right {
				right: 0px;
			}
			.el-dropdown {
				display: block;
				margin: 0 0.25rem auto;
				padding: 0 0.1rem;
				box-sizing: border-box;
				height: 0.31rem;
				line-height: 0.3rem;
				background-color: #e10e0d;
				border: solid 1px #c9c9c9;
				font-family: PingFang-SC-Bold;
				font-size: 0.14rem;
				font-weight: bold;
				color: #ffffff;
				text-align: left;
				.el-dropdown-link {
					border: none;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
			.van-swipe {
				padding-bottom: 0.3rem;
				margin-top: 0.09rem;
			}
			.van-swipe-item {
				position: relative;
				padding: 0 0.25rem;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
			}
			.li {
				text-align: center;
				box-sizing: border-box;
				display: inline-block;
				width: 33.33%;
				background-color: #ffffff;
				border-bottom: solid 1px #dcdcdc;
				border-left: solid 1px #dcdcdc;
				border-right: none;
				border-top: none;
				padding: 0.1rem;
				vertical-align: top;
				border-right: 0;
				&.li:nth-child(3) {
					border-top: solid 1px #dcdcdc;
				}
				&.li:nth-child(4) {
					border-top: solid 1px #dcdcdc;
				}
				&.li:nth-child(5) {
					border-top: solid 1px #dcdcdc;
					border-right: solid 1px #dcdcdc;
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
				img {
					width: 0.56rem;
					height: 0.56rem;
					border-radius: 2px;
				}
				.text {
					padding: 5px 0 4px;
					font-size: 14px;
				}
				.price {
					text-align: center;
					font-family: Arial-BoldMT;
					font-size: 0.2rem;
					font-weight: normal;
					font-stretch: normal;
					line-height: 18px;
					letter-spacing: 0px;
					color: #f39800;
				}
			}
		}
		/deep/ .el-carousel__indicator--horizontal {
			padding: 0;
			&.is-active .el-carousel__button {
				background-color: #e10e0d;
			}
		}
		/deep/ .el-carousel__button {
			opacity: 100%;
			width: 29px;
			height: 5px;
			margin: 0;
			border-radius: 2px;
		}
	}
	
	.hidden-style {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
</style>