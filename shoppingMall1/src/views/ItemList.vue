<template>
	<div>
		<div style="width: 1200px;margin:100px auto">
			<div class="step"><span>1</span>{{$t("language.good.chooseProducts")}}</div>
			<div class="step-line">
				<div :class="selectType=='coin'?'item active point':'item point'" @click="$router.push('/coinList')">
					<img src="../assets/image/icon/icon_coin.png" /> Silver
				</div>
				<div :class="selectType=='item'?'item active point':'item point'" @click="$router.push('/itemList')">
					<img src="../assets/image/icon/icon_item.png" /> Items
				</div>
			</div>
			<div class="step"><span>2</span>{{$t("language.good.selectServe")}}</div>
			<div class="step-line serve-contain">
				<span v-for="(item,index) in serveList" :key="item.id" @click="selectServe(item)" :class="item.id==serveId?'active point':'point'">{{item.name}}</span>
			</div>
			<div class="step"><span>3</span>Buy Items</div>
			<div class="step-line item-contain">
				<div class="flex-style">
					<div class="select-title">You Have Selected:<span style="color: #333;"> {{this.selectServeData.name}} </span>
						<el-select @change="setCurrency" style="width:140px" v-model="selectCurrency" placeholder="">
							<el-option v-for="(subItem,subIndex) in currencyData" :key="subItem.id" :label="subItem.showName" :value="subItem.id">
							</el-option>
						</el-select>
					</div>
					<div class="search">
						<el-input @input="changeInput" v-model="searchKey" placeholder="Search Item Name" style="width:400px"></el-input><img src="../assets/image/icon/icon_search.png" /></div>
				</div>
				<div class="li point" v-for="(item,index) in itemList" :key="item.id">
					<el-popover placement="right" width="400" trigger="hover">
						<div class="pop-item">
							<img style="margin-right: 17px;" :src="imgUrl+item.hintImage" />
							<div>
								<div class="title hidden-style">
									{{item.name}}
								</div>
								<div class="text">
									Price:<span>{{currencyInfo.symbol}}{{(item.price*1*currencyInfo.rate).toFixed(2)}}</span>
								</div>
								<div class="label">{{item.customerLabel}}</div>
							</div>

						</div>
						<div slot="reference"><img :src="imgUrl+item.hintImage" />
							<div class="text hidden-style">
								{{item.name}}
							</div>
							<div class="select-num">
								<span @click="down(index)" class="down">-</span>
								<input type="number" min="0" v-model="item.num" class="show">
								<span class="up" @click="up(index)">+</span></div>
							<div class="price">{{currencyInfo.symbol}}{{(item.price*1*currencyInfo.rate).toFixed(2)}}</div>
							<img class="point" @click="addCart(item.id,item.price,item.name,item.num,imgUrl+item.hintImage)" style="width: 162px;height: 32px;" src="../assets/image/home/img_buy.jpg" />
						</div>
					</el-popover>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="main-title">Introduction</div>
			<div class="contain">
				<img :src="imgUrl+gameList.logo" />
				<div style="display: inline-block;" class="text" v-html="gameList.description"></div>
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
				serveList: [],
				itemList: [],
				imgUrl: '',
				gameList: {},
				selectType: 'item',
				searchKey: '',
				itemOriginList: [],
				selectServeData: {},
				currencyData: [],
				selectCurrency: ''
			};
		},
		computed: {
			...mapState(['login', 'showMoveImg', 'currencyInfo','currencyInfo1'])
		},
		methods: {
			...mapMutations(['ADD_CART', 'CHOOSE_CURRENCY']),
			down(index) {
				if(this.itemList[index].num == 0) return
				this.itemList[index].num = this.itemList[index].num*1 - 1;
				this.$forceUpdate();
			},
			up(index) {
				this.itemList[index].num = this.itemList[index].num*1 + 1;
				this.$forceUpdate();
			},
			setCurrency(a) {
				var data = this.currencyData.filter(item => item.id == a);
				this.CHOOSE_CURRENCY({
					name: data[0].name,
					symbol: data[0].symbol,
					rate: data[0].rate,
					type: 1
				})
			},
			changeInput() {
				var data = JSON.parse(JSON.stringify(this.itemOriginList));

				this.itemList = data.filter(item => item.name.indexOf(this.searchKey) > -1)
			},
			addCart(id, price, name, productNum, img) {
				if(productNum<0){
					this.$message({
						type: 'error',
						message: 'Please fill in right Quantity'
					});
					return
				}
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
					productNum: productNum,
					type: 'item',
					serveId: this.selectServeData.id,
					serveName: this.selectServeData.name,
					gameId: localStorage.gameId,
					gameName: localStorage.gameName,
				})
				this.$message({
					type: 'success',
					message: 'Add Success'
				});

			},
			getServe() {
				//获取game
				getTemplete('?type=Server&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						response.data=response.data||[]
						this.serveList = response.data.filter((item) => {
							var id = item.game.split(',')[0]
							return id == localStorage.getItem('gameId')
						})
						this.imgUrl = window.imgUrl;

						if(this.serveList && this.serveList[0]) {
							this.selectServeData = this.serveList[0];
							this.serveId = this.serveList && this.serveList[0].id
							this.getItem();
						}

					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			selectServe(item) {
				this.selectServeData = item;
				this.serveId = item.id;
				this.getItem();
				this.$forceUpdate()
			},
			getItem() {
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.items && JSON.parse(this.selectServeData.items).map((subItem) => {
							response.data.map((item) => {
								if(item.id == subItem.split(',')[0] && item.type == "item,item") {
									this.itemList.push(item)
								}

							})
						})
						this.itemList.map((item) => {
							item.num = 0
						})
						this.itemOriginList = this.itemList
						this.selectId = this.itemList[0] && this.itemList[0].id;
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getGame() {
				//获取game
				getTemplete('?type=Game&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						var data = response.data.filter((item) => {

							return item.id == localStorage.getItem('gameId')
						})
						this.gameList = data[0]
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
		},
		created() {
			//获取game
			this.getServe();
			this.getGame();
			JSON.parse(localStorage.getItem('currencyData')).map((item) => {
				item = JSON.parse(item);
				item.showName = item.symbol + item.name;
				this.currencyData.push(item)
			})
			var name = this.currencyInfo.name || this.currencyInfo1.name
			var data = this.currencyData.filter(item => item.name == name);
			this.selectCurrency = data[0].id
		}

	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.step {
		font-family: ArialMT;
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 22px;
		letter-spacing: 0px;
		color: #333333;
		span {
			border-radius: 50%;
			text-align: center;
			display: inline-block;
			width: 30px;
			height: 30px;
			line-height: 30px;
			background-color: #fdf2f1;
			border: solid 3px rgba(234, 111, 105, 0.4);
			font-family: Arial-BoldMT;
			font-size: 16px;
			letter-spacing: 0px;
			color: #e7534b;
			margin-right: 16px;
		}
	}
	
	.step-line {
		margin-left: 15px;
		padding-left: 30px;
		border-left: 4px solid #fdf2f1;
		padding-bottom: 50px;
		.item {
			display: inline-block;
			text-align: center;
			width: 150px;
			padding: 17px 0;
			background-color: #ffcbc8;
			border-radius: 5px;
			font-family: ArialMT;
			font-size: 18px;
			margin-top: 10px;
			letter-spacing: 0px;
			color: #ffffff;
			margin-right: 30px;
			img {
				margin: 0 auto;
				display: block;
				width: 30px;
				height: 30px;
			}
			&.active {
				background-color: #e1251b;
			}
		}
	}
	
	.serve-contain {
		padding-top: 36px;
		span {
			padding: 14px 27px;
			font-family: ArialMT;
			font-size: 14px;
			border: 1px solid #efefef;
			margin-right: 23px;
			position: relative;
			&.active {
				border: 1px solid #e1251b;
				&::after {
					right: 0;
					bottom: 0;
					content: '';
					position: absolute;
					width: 20px;
					height: 20px;
					background: url(../assets/image/icon/icon_check.png);
				}
			}
		}
	}
	
	.item-contain {
		margin: 0 auto;
		text-align: left;
		margin-left: 15px;
		.flex-style {
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.search {
				input {
					padding-left: 20px;
					width: 380px;
					height: 36px;
					background-color: #ffffff;
					border: solid 1px #e5e5e5;
				}
				img {
					top: 24px;
					width: 18px;
					height: 18px;
					position: absolute;
					right: 8px;
				}
			}
			.select-title {
				color: #999;
				font-size: 14px;
				margin-top: 35px;
				margin-bottom: 14px;
				font-family: ArialMT;
			}
		}
		.li {
			text-align: center;
			margin-top: 0;
			box-sizing: border-box;
			display: inline-block;
			width: 245px;
			background-color: #ffffff;
			border: solid 1px #dcdcdc;
			padding: 16px;
			img {
				width: 56px;
				height: 56px;
			}
			.text {
				padding: 19px 0 8px;
				color: #222222;
				font-size: 20px;
				font-family: ArialMT;
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
				margin-bottom: 12px;
			}
		}
	}
	
	.pop-item {
		overflow: hidden;
		font-family: ArialMT;
		font-size: 14px;
		color: #333;
		img {
			width: 140px;
			height: 140px;
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
	
	.footer {
		background-color: #f7f7f7;
		padding: 96px 0 46px;
		.contain {
			display: flex;
			width: 1200px;
			margin: 0 auto;
			padding: 40px 0;
			background: #fff;
			border-radius: 30px;
		}
		.main-title {
			margin: 0 auto 27px;
			width: 1200px;
			text-align: left;
			font-family: Allstar4;
			font-size: 24px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 18px;
			letter-spacing: 0px;
			color: #333333;
		}
		.contain {
			text-align: left;
			img {
				margin-right: 20px;
				display: inline-block;
				width: 400px;
				height: 280px;
			}
		}
	}
</style>