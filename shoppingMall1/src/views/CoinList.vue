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
			<div class="step"><span>3</span>Buy {{selectData[0]&&selectData[0].name}} Silver</div>

			<div class="step-line item-contain">
				<div class="flex-style">
					<div class="select-title">You Have Selected:<span style="color: #333;"> {{this.selectServeData.name}} - {{selectData[0]&&selectData[0].name}}</span>
						<el-select @change="setCurrency" style="width:140px" v-model="selectCurrency" placeholder="">
							<el-option v-for="(subItem,subIndex) in currencyData" :key="subItem.id" :label="subItem.showName" :value="subItem.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<div class="tab point">
					<span @click="selectId=item.id;totalPrice=0;coinNum=0;filterId()" :class="selectId==item.id?'active':''" v-for="(item,index) in itemList">
					{{item.name}}
				</span>
				</div>
				<div class="total">
					<span class="custom-quantity">Custom Quantity:<input type="number" min='0' class="input-style" v-model="coinNum" /></span><span class="price">{{currencyInfo.symbol}}{{(totalPrice*1*currencyInfo.rate).toFixed(2)}}</span>
					<span class="option"><span class="buy point" @click="batchAdd">Buy Now</span></span>
				</div>
				<div class="total head"><span class="custom-quantity">Product</span><span class="price">Price</span><span class="option" style="text-align: center;">Action</span></div>
				<div class="li" v-for="(item,index) in discountList" :key="item.id">
					<div class="total head"><span class="custom-quantity">{{item.name}}*{{item.qty||1}}</span><span class="price">{{currencyInfo.symbol}}{{((item.totalPrice||item.price)*1*currencyInfo.rate).toFixed(2)}}</span><span class="option"><span class="point" @click="addCart(selectId,item.totalPrice||item.price,item.name,'',item.qty)">Add Cart</span><span class="buy point" @click="addCart(selectId,item.totalPrice||item.price,item.name+'*'+item.qty,'',item.qty,1);">Buy Now</span></span>
					</div>

				</div>
			</div>
		</div>
		<div class="footer">

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
				discountList: [],
				selectType: 'coin',
				selectId: '',
				coinNum: '',
				newArray: [],
				selectData: [],
				currencyData: [],
				selectCurrency: '',
				lowPrice: '',
				plane: [],
				totalPrice: 0,
				selectServeData: {},
				discountListAll: []
			};
		},
		computed: {
			...mapState(['login', 'showMoveImg', 'showCart', 'currencyInfo', 'currencyInfo1'])
		},
		methods: {
			...mapMutations(['ADD_CART', 'SHOW_LOGIN', 'CHOOSE_CURRENCY']),
			countNum() {
				var that = this;
				this.newArray = JSON.parse(JSON.stringify(this.discountList));
				this.lowPrice = '';
				this.plane = [];
				if(this.coinNum<0){
					this.$message({
						type: 'error',
						message: 'Please fill in right Custom Quantity'
					});
					return
				}
				if(this.coinNum == 0) return
				this.newArray.map((item, index) => {
					item.buyNum = 0;
					if(index == 0) {
						this.mapCount(JSON.parse(JSON.stringify(this.newArray)));
					} else {
						for(var i = 0; i <= this.newArray.length; i++) {
							var data = JSON.parse(JSON.stringify(this.newArray)).splice(i, index);
							that.mapCount(data);
						}
					}

				})
				setTimeout(() => {
					this.totalPrice = this.lowPrice
				}, 1000)

			},
			mapCount(data) {
				var num = this.coinNum;
				if(num == 0 || data.length == 0) return
				data = data.reverse();
				console.log(data)
				data.map((item, index) => {
					if(num == 0) return
					if(index == data.length - 1) {
						if(num * 1 <= item.qty) {
							item.buyNum = 1;
							num = 0
							return
						} else {
							item.buyNum = Math.ceil(num * 1 / item.qty);
							num = 0
							return
						}

					}
					if(num * 1 % item.qty == 0) {
						item.buyNum = parseInt(num * 1 / item.qty);
						num = 0

					} else if(num * 1 % data[index + 1].qty == 0) {
						data[index + 1].buyNum = parseInt(num * 1 / data[index + 1].qty);
						num = 0
					} else {
						item.buyNum = parseInt(num * 1 / item.qty);
						num = num * 1 % item.qty
					}

				})
				this.totalPrice2(data)
			},
			totalPrice2(data) {
				var price = 0;

				data.map((item) => {

					if(item.buyNum) {
						price = price + item.qty * item.buyNum * 1 * item.price
					}

				})
				if(this.lowPrice == 0 || price < this.lowPrice) {
					this.lowPrice = price;
					this.plane = data;
				}

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
			batchAdd() {

				if(!this.login) {
					this.SHOW_LOGIN(true);

					return
				}
				if(this.discountList.length == 1) {
					this.addCart(this.selectId, this.totalPrice, this.discountList[0].name, '', this.coinNum, 2)

				} else {
					this.plane.map((item) => {
						if(item.buyNum && item.buyNum > 0) {
							this.addCart(this.selectId, item.totalPrice * 1 * item.buyNum, item.name, '', item.qty * item.buyNum,2)
						}
					})
				}

				setTimeout(() => {
					if(this.login) {
						this.$router.push('/payPage');
					}
				}, 1000)

			},
			addCart(id, price, name, img, productNum,addType) {
				if(addType == 1) {
					if(!this.login) {
						this.SHOW_LOGIN(true);
					}
				}
				this.ADD_CART({
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum,
					type: 'coin',
					serveId: this.selectServeData.id,
					serveName: this.selectServeData.name,
					gameId: localStorage.gameId,
					gameName: localStorage.gameName
				})
				if(addType == 1) {
					this.$router.push('/payPage');
				} else if(addType == 2) {

				} else {
					this.$message({
						type: 'success',
						message: 'Add Success'
					});
				}

			},
			getServe() {
				//获取game
				getTemplete('?type=Server&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						response.data = response.data || []
						this.serveList = response.data.filter((item) => {
							var id = item.game.split(',')[0]
							return id == localStorage.getItem('gameId')
						})
						this.imgUrl = window.imgUrl;
						if(this.serveList) {
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
			getItem() { //获取item
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.coins && JSON.parse(this.selectServeData.coins).map((subItem) => {
							response.data.map((item) => {
								if(item.id == subItem.split(',')[0] && item.type == "coin,coin") {
									this.itemList.push(item)
								}

							})
						})
						if(this.itemList[0]) {
							this.selectId = this.itemList[0].id;
							this.filterId();

						} else {
							this.discountList = [];
						}

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
			filterId() {
				this.selectData = this.itemList.filter((item) => {
					return item.id == this.selectId
				})
				if(!this.selectData[0].discount) {
					this.selectData[0].qty = 1;
					this.discountList = this.selectData;
					return
				}
				var discountId = this.selectData[0].discount && this.selectData[0].discount.split(',')[0];
				if(this.discountListAll.length > 0) {
					this.filtData(discountId);
				} else {
					this.getDiscount(discountId);
				}

			},
			filtData(discountId) {
				var data = this.discountListAll.filter((item) => {
					return item.id == discountId
				})
				this.discountList = JSON.parse(data[0].list);
				this.discountList.filter((itrm) => {
					var startTime = new Date(itrm.starttime + ':00');
					var endTime = new Date(itrm.endtime + ':00');
					return new Date() >= startTime && new Date() <= endTime
				})

				this.discountList.map((item) => {
					item.name = this.selectData[0].name;
					if(this.selectData[0].price * 1 - item.discount > 0) {
						item.price = this.selectData[0].price * 1 - item.discount;
					} else {
						item.price = this.selectData[0].price * 1
					}

					item.totalPrice = (item.price * 1 * (item.qty * 1)).toFixed(2)
				})
			},
			getDiscount(discountId) {
				//获取discount
				getTemplete('?type=Discount&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.discountListAll = response.data;
						this.filtData(discountId);
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			}
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
		},
		watch: {
			coinNum() {
				if(this.discountList.length == 1) {
					this.totalPrice = (this.discountList[0].price * this.coinNum).toFixed(2)
				} else {
					this.countNum();
				}

			}
		}
	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.tab {
		text-align: left;
		width: 1200px;
		margin: 0 auto;
		border-bottom: 2px solid #fe852d;
		padding-top: 40px;
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
		.select-title {
			color: #999;
			font-size: 14px;
			margin-top: 35px;
			margin-bottom: 14px;
			font-family: ArialMT;
		}
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
	
	.total {
		display: flex;
		justify-content: space-between;
		width: 1200px;
		height: 52px;
		background-color: #feba00;
		line-height: 52px;
		.custom-quantity {
			width: 460px;
			padding-left: 24px;
			font-family: ArialMT;
			font-size: 14px;
			color: #333333;
		}
		.price {
			height: 16px;
			font-family: Arial-BoldMT;
			font-size: 18px;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0px;
			color: #e1251b;
		}
		input {
			margin-left: 10px;
			width: 178px;
			height: 32px;
			background-color: #ffffff;
			border: solid 1px #e5e5e5;
		}
		.option {
			text-align: right;
			width: 220px;
			margin-right: 92px;
			span {
				text-align: center;
				color: #fff;
				display: inline-block;
				width: 97px;
				height: 32px;
				background-color: #4c9adb;
				border-radius: 4px;
				font-family: ArialMT;
				font-size: 14px;
				line-height: 32px;
			}
			.buy {
				margin-left: 13px;
				background-color: #e1251b;
			}
		}
	}
	
	.head {
		background-color: #e7e7e7;
		.custom-quantity,
		.price {
			font-size: 18px;
			letter-spacing: 0px;
			color: #333333;
		}
	}
	
	.li {
		&:nth-child(odd) {
			.head {
				background: #fff;
			}
		}
		&:nth-child(even) {
			.head {
				background-color: #f7f7f7;
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