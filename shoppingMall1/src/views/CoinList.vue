<template>
	<div>
		<div style="width: 1200px;margin:60px auto">
			<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > {{gameName}} > {{gameList.coinName}}</div>
			<div class="step"><span>1</span>{{$t("language.good.chooseProducts")}}</div>
			<div class="step-line" style="padding-bottom: 20px;">
				<div v-if="gameList.productSell=='both,both'||gameList.productSell=='coin,coin'"
				 :class="selectType=='coin'?'item active point':'item point'" @click="$router.push('/coinList/'+$route.params.id)">
				<img src="../assets/image/icon/icon_coin.png" /> {{gameList.coinName||'Silver'}}
					</div>
				<div v-if="gameList.productSell=='both,both'||gameList.productSell=='item,item'"
				 :class="selectType=='item'?'item active point':'item point'" @click="$router.push('/itemList/'+$route.params.id)">
				<img src="../assets/image/icon/icon_item.png" /> {{gameList.itemName||'Items'}}
					</div>
			</div>
			<div class="step" v-if="categoryList.length>0"><span>2</span>Please Select Your {{gameList.categoryHint||'Category'}}</div>
			<div class="step-line serve-contain"
			 v-if="categoryList.length>0"> <span v-for="(item,index) in categoryList" v-if="categoryList.length>0" :key="item.id"
				 @click="selectCategory(item)" :class="item.id==categoryId?'active point':'point'">{{item.name}}</span>				<span v-if="categoryList.length==0" class="active">none</span> </div>
			<div class="step"><span>{{categoryList.length>0?'3':'2'}}</span>Please Select Your {{gameList.serverHint||'Server'}}</div>
			<div class="step-line serve-contain"> <span v-for="(item,index) in serveList" :key="item.id" @click="selectServe(item)"
				 :class="item.id==serveId?'active point':'point'">{{item.name}}</span> </div>
			<div class="step"><span>{{categoryList.length>0?'4':'3'}}</span>Buy {{selectCategoryData.name}}
				{{selectData[0]&&selectData[0].name}} </div>
			<div class="step-line item-contain"
			 :style="isMobile?'min-height: 1000px;':''">
				<div class="flex-style">
					<div class="select-title">You Have Selected:<span style="color: #333;">{{selectCategoryData.name}} <span v-if="selectCategoryData.name">-</span>						{{selectServeData.name}} </span>
					</div>
				</div>
				<div class="tab point"> <span @click="selectId=item.id;totalPrice=0;coinNum=0;filterId()" :class="selectId==item.id?'active':''"
					 v-for="(item,index) in itemList">
					{{item.name}}
				</span>
					<el-select @change="setCurrency" style="width:140px;float:right;margin-top: -9px;margin-right: 186px;"
					 v-model="selectCurrency" placeholder="">
						<el-option v-for="(subItem,subIndex) in currencyData" :key="subItem.id" :label="subItem.showName"
						 :value="subItem.id"> </el-option>
					</el-select>
				</div>
				<div class="total"> <span class="custom-quantity" style="width:400px;font-weight: bold;">Custom Quantity:<input  onafterpaste="this.value=this.value.replace(/\D/g,'')"
					 @change="changeNum(coinNum)" :placeholder="selectData[0]?selectData[0].miniNumber:''" type="number" :min='selectData[0]&&selectData[0].miniNumber' class="input-style" v-model="coinNum" /> {{selectData[0]&&selectData[0].Unit}}</span>					<span class="price" style="width: 516px;text-align:right">{{currencyInfo.symbol}}{{(totalPrice*1*currencyInfo.rate).toFixed(2)}}</span>					<span class="option"><span class="buy point" style="margin-right:62px" @click="addCart(selectData[0],selectId,totalPrice,selectData[0]&&selectData[0].name+'*'+coinNum,'',1,1);">Buy Now</span></span>
				</div>
				<div class="total head"><span class="custom-quantity">Product</span><span class="price" style="width: 400px;"></span>					<span class="price">Price</span><span class="option" style="text-align: center;">Action</span></div>
				<div class="li" v-for="(item,index) in discountList" :key="item.id">
					<div class="total head"><span class="custom-quantity  hidden-style" style="width:530px">{{item.qty||1}} {{selectData[0]&&selectData[0].Unit}} - {{item.name}} - {{selectServeData.name}}</span>						<span class="price" v-html="item.selltext" style="width:320px"></span>
						<span
						 class="price">{{currencyInfo.symbol}}{{((item.totalPrice||item.price)*1*currencyInfo.rate).toFixed(2)}}</span>
							<span class="option"><span class="point" @click="addCart(item,selectId,item.totalPrice||item.price,item.name+'*'+item.qty,'',1)">Add Cart</span>							<span class="buy point" @click="addCart(item,selectId,item.totalPrice||item.price,item.name+'*'+item.qty,'',1,1);">Buy Now</span>							</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer1" v-if="gameList.description">
			<div class="main-title">Introduction</div>
			<div class="contain">
				<div v-html="gameList.description"></div>
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
				gameName: localStorage.getItem('gameName'),
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
				selectServeData: {},
				discountListAll: [],
				categoryList: [],
				selectCategoryData: [],
				categoryId: '',
				totalPrice: 0
			};
		},
		computed: { ...mapState(['login', 'showMoveImg', 'showCart', 'currencyInfo',
				'currencyInfo'
			]),
		},
		methods: { ...mapMutations(['ADD_CART', 'SHOW_LOGIN', 'CHOOSE_CURRENCY']),
			mapCount(data) {
				var num = this.coinNum;
				if (num == 0 || data.length == 0) return
				data = data.reverse();
				data.map((item, index) => {
					if (num == 0) return
					if (index == data.length - 1) {
						if (num * 1 <= (item.qty * this.selectData[0].miniNumber)) {
							item.buyNum = 1;
							num = 0
							return
						} else {
							item.buyNum = Math.ceil(num * 1 / (item.qty * this.selectData[0].miniNumber));
							num = 0
							return
						}
					}
					if (num * 1 % (item.qty * this.selectData[0].miniNumber) == 0) {
						item.buyNum = parseInt(num * 1 / (item.qty * this.selectData[0].miniNumber));
						num = 0
					} else if (num * 1 % (data[index + 1].qty * this.selectData[0].miniNumber) ==
						0) {
						data[index + 1].buyNum = parseInt(num * 1 / (data[index + 1].qty * this
							.selectData[0].miniNumber));
						num = 0
					} else {
						item.buyNum = parseInt(num * 1 / (item.qty * this.selectData[0].miniNumber));
						num = num * 1 % (item.qty * this.selectData[0].miniNumber)
					}
				})
				this.totalPrice2(data)
			},
			changeNum() {
				this.coinNum=this.coinNum.replace(/\D/g,'')
				var that = this;
				this.newArray = JSON.parse(JSON.stringify(this.discountList));
				this.lowPrice = '';
				this.plane = [];
				var totalPrice = 0;
				if (this.coinNum <this.selectData[0].miniNumber) {
					this.$message({
						type: 'error',
												message: "The minimum quantity is "+this.selectData[0].miniNumber
					});
					this.coinNum=this.selectData[0].miniNumber
					return
				}
				if (this.coinNum > this.newArray[this.newArray.length - 1].qty) {
					this.totalPrice = this.coinNum * this.newArray[this.newArray.length - 1].price;
					return
				}
				this.newArray.map((item, index) => {
					if (this.coinNum >= item.qty && this.coinNum < this.newArray[index + 1] &&
						this.newArray[index + 1].qty) {
						this.totalPrice = item.price * this.coinNum
					}
				})
			},
			totalPrice2(data) {
				var price = 0;
				data.map((item) => {
					if (item.buyNum) {
						price = price + item.qty * item.buyNum * 1 * item.price
					}
				})
				if (this.lowPrice == 0 || price < this.lowPrice) {
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
			addCart(item, id, price, name, img, productNum, addType, minNum) {
				if (price == 0 || productNum == 0) {
					return
				}
				item.unit = item.Unit
				this.ADD_CART({
					detail: item,
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum,
					type: 'coin',
					serveId: this.selectServeData.id,
					serveName: this.selectServeData.name,
					gameId: localStorage.gameId,
					gameName: localStorage.gameName,
					categoryName: this.selectCategoryData.name,
					categoryId: this.selectCategoryData.id
				})
				if (addType == 1) {
					this.$router.push('/payPage');
				} else if (addType == 2) {} else {
					this.$message({
						type: 'success',
						message: 'Add Success'
					});
				}
			},
			getCategory() {
				//获取game
				getTemplete('?type=Category&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						response.data = response.data || []
						this.categoryList = response.data.filter((item) => {
							var id = item.game.split(',')[0]
							return id == localStorage.getItem('gameId') && item.online && item.class ==
								'coin,coin'
						})
						this.imgUrl = window.imgUrl;
						if (this.categoryList.length > 0) {
							this.selectCategoryData = this.categoryList[0];
							this.categoryId = this.categoryList && this.categoryList[0].id
							this.getServe();
						} else {
							this.getServe();
						}
						var resultArray = this.categoryList.sort(function compareFunction(
							param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						console.log(resultArray)
						this.categoryList = resultArray;
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getServe() {
				//获取game
				getTemplete('?type=Server&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						response.data = response.data || []
						this.serveList = response.data.filter((item) => {
							if (!item.category) {
								var id = item.game.split(',')[0]
								return id == localStorage.getItem('gameId') && item.online && item.coins
									.length > 2
							}
							if (this.categoryId) {
								var id = item.category.split(',')[0]
								return id == this.categoryId && item.online && item.coins.length >
									2
							} else {
								var id = item.game.split(',')[0]
								return id == localStorage.getItem('gameId') && item.online && item.coins
									.length > 2
							}
						})
						var array1 = this.serveList.filter((item) => item.order)
						array1 = array1.sort((a, b) => a.order - b.order)
						var array2 = this.serveList.filter((item) => !item.order)
						array2 = array2.sort(function compareFunction(param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						this.serveList = array1.concat(array2)
						this.imgUrl = window.imgUrl;
						if (this.serveList.length > 0) {
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
			selectCategory(item) {
				this.selectCategoryData = item;
				this.categoryId = item.id;
				this.getServe();
				this.$forceUpdate()
			},
			getItem() { //获取item
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.coins && JSON.parse(this.selectServeData.coins).map(
							(subItem) => {
								response.data.map((item) => {
									if (item.id == subItem.split(',')[0] && item.type == "coin,coin") {
										item.price = this.selectServeData.price
										this.itemList.push(item)
									}
								})
							})
						if (this.itemList[0]) {
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
					if (response.retCode == 0) {
						var data = response.data.filter((item) => {
							return item.id == localStorage.getItem('gameId')
						})
						JSON.parse(localStorage.getItem('currencyData')).map((item) => {
							item = JSON.parse(item);
							item.showName = item.name;
							this.currencyData.push(item)
						})
						var name = this.currencyInfo.name || this.currencyInfo.name
						var currencyData = this.currencyData.filter(item => item.name == name);
						this.selectCurrency = currencyData[0].id
						this.gameList = data[0]
						if (this.gameList.productSell == 'item,item') {
							this.$router.replace('/itemList/' + this.$route.params.id)
						}
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
				this.selectData.map((item) => {
					item.price = this.selectServeData.price
				})
				if (!this.selectData[0].discount) {
					this.selectData[0].qty = 1;
					this.discountList = this.selectData;
					return
				}
				var discountId = this.selectData[0].discount && this.selectData[0].discount
					.split(',')[0];
				if (this.discountListAll.length > 0) {
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
				this.discountList.filter((item) => {
					var startTime = new Date(item.starttime + ':00');
					var endTime = new Date(item.endtime + ':00');
					return new Date() >= startTime && new Date() <= endTime
				})
				this.discountList.map((item) => {
					item.name = this.selectData[0].name;
					if (this.selectData[0].price * 1 - item.discount > 0) {
						console.log(this.selectData[0].price)
						item.price = this.selectData[0].price * 1 - item.discount;
					} else {
						item.price = this.selectData[0].price * 1
					}
					item.totalPrice = (item.price * 1 * (item.qty * 1)).toFixed(2)
				})
				this.coinNum = this.discountList[0].qty * 1;
				this.totalPrice = this.discountList[0].totalPrice;
			},
			getDiscount(discountId) {
				//获取discount
				getTemplete('?type=Discount&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
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
			var ua = navigator.userAgent;
			var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
			var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
			this.isMobile = isIphone || isAndroid;
			//获取gameSilver
			this.getCategory();
			this.getGame();
		},
//		watch: {
//			coinNum() {
//				this.changeNum();
//			}
//		}
	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
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
	
	.tab {
		text-align: left;
		width: 1162px;
		margin: 0 auto;
		border-bottom: 2px solid #fe852d;
		padding-top: 20px;
		padding-bottom: 20px;
		margin-bottom: 20px;
		overflow: hidden;
		span {
			padding: 15px 20px;
			font-size: 14px;
			color: #333333;
			border-radius: 4px;
			&.active {
				background: #e1251b;
				background-blend-mode: normal, normal;
				color: #fff;
			}
		}
	}
	
	.step {
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
		padding-left: 20px;
		border-left: 4px solid #fdf2f1;
		.select-title {
			color: #999;
			font-size: 14px;
			padding-top: 20px;
			margin-bottom: 14px;
		}
		.item {
			display: inline-block;
			text-align: center;
			width: 120px;
			padding: 17px 0;
			background-color: #ffcbc8;
			border-radius: 5px;
			font-size: 18px;
			margin-top: 10px;
			letter-spacing: 0px;
			color: #ffffff;
			margin-right: 20px;
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
		display: flex;
		flex-wrap: wrap;
		padding-top: 20px;
		span {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
			width: 140px;
			text-align: center;
			padding: 14px 10px;
			font-size: 14px;
			border: 1px solid #efefef;
			margin-right: 20px;
			position: relative;
			margin-bottom: 20px;
			&:hover {
				border: 1px solid #e1251b;
			}
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
		width: 1162px;
		min-height: 52px;
		background-color: #feba00;
		align-items: center;
		.custom-quantity {
			width: 440px;
			padding-left: 20px;
			font-size: 14px;
			color: #333333;
		}
		.price {
			font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
			font-weight: bold;
			background-color: #ffffff;
			border: solid 1px #e5e5e5;
		}
		.option {
			text-align: right;
			width: 220px;
			span {
				text-align: center;
				color: #fff;
				display: inline-block;
				width: 97px;
				height: 32px;
				background-color: #4c9adb;
				border-radius: 4px;
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
		.custom-quantity, .price {
			font-size: 17px;hidden-style
			letter-spacing: 0px;
			color: #333333;
		}
	}
	
	.hidden-style {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
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
		padding: 20px 0 46px;
		.contain {
			display: flex;
			width: 1200px;
			margin: 0 auto;
			padding: 40px 0;
			background: #fff;
			border-radius: 30px;
		}
		.main-title {
			margin: 0 auto 20px;
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
	
	.footer1 {
		background-color: #f7f7f7;
		padding: 20px 0 46px;
		.contain {
			display: flex;
			width: 1200px;
			box-sizing: border-box;
			margin: 0 auto;
			padding: 20px;
			background: #fff;
			border-radius: 30px;
		}
		.main-title {
			margin: 0 auto 20px;
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