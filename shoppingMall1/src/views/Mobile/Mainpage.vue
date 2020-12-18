<template>
	<div class="main-page" style="text-align: center">
		<el-carousel v-if="bannerList" :interval="3000" height="200px">
			<el-carousel-item v-for="item in bannerList" :key="item.id">
				<div @click="item.link ? goNewBank(item.link) : goProduct(item, 1)" :style="
            'width:100%;height:200px;background: url(' +
            imgUrl +
            item.image +
            ');background-size:cover;'
          "></div>
			</el-carousel-item>
		</el-carousel>
		<div class="img-contain">
			<a class="img-style" href="https://www.mcafeesecure.com/verify?host=egpal.com"><img src="../../assets/image/home/img1.gif" /></a> <img class="img-style" src="../../assets/image/home/img2.gif"
			/>
			<a class="img-style" href="https://transparencyreport.google.com/safe-browsing/search?url=www.egpal.com"><img src="../../assets/image/home/img3.gif" /></a> <img class="img-style" src="../../assets/image/home/img5.gif"
			/> </div>
		<div class="game-contain" v-if="gameList.length > 0">
			<div class="main-title">{{ $t("language.mainPage.gameTitle") }}</div>
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
		<div class="item-contain">
			<div class="main-title hidden-style"> {{ $t("language.mainPage.itemTitle") }} </div>
			<div class="tabs-wrapper" ref="tabsWrapper1">
				<div class="tab point" :style="'width:' + gameHotList.length * 160 + 'px'"> <span class="user-name" @click="
              selectId = item.id;
              selectGame = item;
              getItem();
            " :class="selectId == item.id ? 'active' : ''" v-for="(item, index) in gameHotList">
            {{ item.name }}
          </span> </div>
			</div>
			<div class="tabs-wrapper" ref="tabsWrapper2">
				<div class="contain" :style="'width:' + itemList.length * 133 + 'px'">
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
									<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../../assets/image/home/img_buy.jpg" />--></div>
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
							<!--<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../../assets/image/home/img_buy.jpg" />--></div>
					</div>
				</div>
			</div>
			<!--<div class="load" @click="itemPage=itemPage+1;getItem()" v-if="gameList.length>8&&gamePage<gameList.length/8"><img style="width:16px;vertical-align: -3px;margin-right: 14px;" src="../../assets/image/icon/icon_load.png"
				/>{{$t("language.mainPage.load")}}</div>--></div>
		<div class="choose-contain">
			<div class="main-title">{{ $t("language.mainPage.chooseTitle") }}</div>
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
		computed: { ...mapState(["login", "showMoveImg", "currencyInfo", "clientSize"]),
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
					this.$router.push("/Mobile/itemList/" + localStorage.getItem("gameId"));
				} else {
					this.$router.push("/Mobile/coinList/" + localStorage.getItem("gameId"));
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
						this.$nextTick(() => {
							setTimeout(() => {
								if (!this.scroll1) {
									this.scroll1 = new BScroll(this.$refs.tabsWrapper1, {
										scrollX: true,
										eventPassthrough: "vertical",
									});
								} else {
									this.scroll1.refresh();
								}
							}, 2000)
						});
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
						this.$nextTick(() => {
							setTimeout(() => {
								if (!this.scroll2) {
									this.scroll12 = new BScroll(this.$refs.tabsWrapper2, {
										scrollX: true,
										eventPassthrough: "vertical",
									});
								} else {
									this.scroll2.refresh();
								}
							}, 1000)
						})
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
						this.$nextTick(() => {
							if (!this.scroll) {
								this.scroll = new BScroll(this.$refs.tabsWrapper, {
									scrollX: true,
									eventPassthrough: "vertical",
								});
							} else {
								this.scroll.refresh();
							}
						});
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
	.img-contain {
		width: 100%;
		margin: 1px auto 1px;
		border-radius: 2px;
		box-shadow: 0px 2px 2px -1px rgba(0, 0, 0, 0.2);
		display: flex;
		.img-style {
			position: relative;
			height: 0.26rem;
			margin: 0.1rem 0.06rem;
			box-sizing: border-box;
			width: 25%;
			img {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}
			&:last-child {
				border-right: none;
			}
		}
	}
	
	.choose-contain {
		width: 100%;
		background: #f1f1f1;
		.contain {
			width: 100%;
			margin: 0 auto;
			.li {
				display: flex;
				padding: 15px;
				align-items: center;
				text-align: left;
				img {
					width: 0.5rem;
					height: 0.5rem;
					margin-right: 15px;
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
		background-color: #f1f1f1;
		.contain {
			width: 13rem;
			display: flex;
			margin: 0 auto;
			text-align: center;
			.li {
				text-align: center;
				margin: 10px;
				margin-top: 0;
				box-sizing: border-box;
				display: inline-block;
				width: 1.6rem;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 0.08rem;
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
					width: 1.4rem;
					height: 0.9rem;
				}
				.text {
					padding: 4px 0 0px;
					color: #222222;
					font-size: 0.14rem;
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
		padding: 15px;
		font-size: 0.23rem;
		height: 0.4rem;
		line-height: 0.4rem;
		white-space: nowrap;
		font-weight: bold;
		color: #434d53;
		text-align: left;
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
		background: #f1f1f1;
		.tab {
			text-align: left;
			width: 1200px;
			padding: 0 15px;
			border-bottom: 2px solid #fe852d;
			padding-bottom: 13px;
			margin-bottom: 13px;
			span {
				padding: 0.1rem 0.1rem;
				font-size: 0.13rem;
				font-weight: 900;
				color: #333333;
				border-radius: 2px;
				display: inline-block;
				&.active {
					background-image: linear-gradient( 90deg, #e1251b 0%, #ea5f0e 53%, #f39800 100%), linear-gradient(#e1251b, #e1251b);
					background-blend-mode: normal, normal;
					color: #fff;
				}
			}
		}
		.contain {
			display: flex;
			margin: 0 15px;
			text-align: left;
			.text {
				font-size: 14px;
				margin-top: 0.1rem;
			}
			.li {
				text-align: center;
				margin-top: 0.2rem;
				box-sizing: border-box;
				display: inline-block;
				width: 1.2rem;
				background-color: #ffffff;
				border: solid 1px #dcdcdc;
				padding: 0.1rem;
				vertical-align: top;
				border-right: 0;
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
					margin-bottom: 12px;
				}
			}
		}
	}
	
	.hidden-style {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
</style>