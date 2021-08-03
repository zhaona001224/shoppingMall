<template>
	<div>
		<div style="width: 1200px;margin:40px auto">
			<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > {{gameName}} > {{gameList.itemName||'Items'}}</div>
			<div class="step"><span>1</span>{{$t("language.good.chooseProducts")}}</div>
			<div class="step-line"
			 style="padding-bottom: 20px;">
				<div v-if="gameList.productSell=='both,both'||gameList.productSell=='coin,coin'"
				 :class="selectType=='coin'?'item active point':'item point'" @click="$router.push('/coinList/'+$route.params.id)">
				<img src="../assets/image/icon/icon_coin.png" />
					<div style="width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{gameList.coinName||'Silver'}}</div>
				</div>
				<div v-if="gameList.productSell=='both,both'||gameList.productSell=='item,item'"
				 :class="selectType=='item'?'item active point':'item point'" @click="$router.push('/itemList/'+$route.params.id)">
				<img src="../assets/image/icon/icon_item.png" />
					<div style="width:150px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{gameList.itemName||'Items'}}</div>
				</div>
			</div>
			<div class="step" v-if="categoryList.length>0"><span>2</span>Please Select  {{gameList.categoryHint||'Category'}}</div>
			<div
			 class="step-line serve-contain" v-if="categoryList.length>0"> <span v-for="(item,index) in categoryList" v-if="categoryList.length>0" :key="item.id"
				 @click="selectCategory(item)" :class="item.id==categoryId?'active point':'point'">{{item.name}}</span>				<span v-if="categoryList.length==0" class="active">none</span> </div>
		<div class="step"><span>{{categoryList.length>0?'3':'2'}}</span>Please Select  {{gameList.serverHint||'Server'}}</div>
		<div class="step-line serve-contain"> <span v-for="(item,index) in serveList" :key="item.id" @click="selectServe(item)"
			 :class="item.id==serveId?'active point':'point'">{{item.name}}</span> </div>
		<div
		 class="step"><span>{{categoryList.length>0?'4':'3'}}</span>Buy Items</div>
	<div class="step-line item-contain"
	 :style="isMobile?'min-height: 1000px;':''">
		<div class="flex-style">
			<div class="select-title">You Have Selected:<span style="color: #333;">{{selectCategoryData.name}} <span v-if="selectCategoryData.name">-</span>				{{selectServeData.name}} - </span>
				<el-select @change="setCurrency" style="width:140px"
				 v-model="currencyInfo.name" placeholder="">
					<el-option v-for="(subItem,subIndex) in currencyData" :key="subItem.showName"
					 :label="subItem.showName" :value="subItem.showName"> </el-option>
				</el-select>
			</div>
			<div class="search">
				<el-input @input="changeInput" v-model="searchKey" placeholder="Search Item Name"
				 style="width:400px"></el-input><img src="../assets/image/icon/icon_search.png" /></div>
		</div>
		<div class="li point" v-for="(item,index) in itemList" :key="item.id" v-if="item.online">
			<div v-if="item.hintImage||item.hintText">
				<el-popover style="min-width:auto;text-align: center;" placement="right" trigger="hover">
					<div class="pop-item"> <img v-if="item.hintImage" :src="imgUrl+item.hintImage" />
						<div>
							<div class="title hidden-style" style="height: auto;"> {{item.name}} </div>
							<div class="label">{{item.hintText}}</div>
						</div>
					</div>
					<div slot="reference"><img :src="imgUrl+item.logo" /> </div>
				</el-popover>
				<div class="text hidden-style">{{item.name}} </div>
				<div class="select-num"> <span @click="down(index)" class="down">-</span> <input type="number" :min="item.miniNumber"
					 v-model="item.num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
					 class="show" @change="up(index,item.num)"> <span class="up" @click="up(index,1)">+</span></div>
				<div class="price">{{currencyInfo.symbol}}{{getPrice(item.price*item.num*currencyInfo.rate)}}</div>
				<div style="position: relative;display: flex;justify-content: space-between;padding: 10px 20px; ">
				<span class="add" @click="addCart(item,item.id,item.price,item.name, item.num,imgUrl+item.hintImage,1)">Buy Now</span>					<img style="width: 43px;height: 32px;" src="../assets/image/home/img_buy2.jpg"
					 class="go" @click="addCart(item,item.id,item.price,item.name,item.num,imgUrl+item.hintImage)"
					/> </div>
			</div>
			<div v-else><img :src="imgUrl+item.logo" />
				<div class="text hidden-style"> {{item.name}} </div>
				<div class="select-num"> <span @click="down(index)" class="down">-</span> <input type="number" :min="item.miniNumber"
					 v-model="item.num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
					 class="show" @change="up(index,item.num)"> <span class="up" @click="up(index,1)">+</span></div>
				<div class="price">{{currencyInfo.symbol}}{{getPrice(item.price*item.num*currencyInfo.rate)}}</div>
				<div style="position: relative;display: flex;justify-content: space-between;padding: 10px 20px; ">
				<span class="add" @click="addCart(item,item.id,item.price,item.name,item.num,imgUrl+item.hintImage,1)">Buy Now</span>					<img style="width: 43px;height: 32px;" src="../assets/image/home/img_buy2.jpg"
					 class="go" @click="addCart(item,item.id,item.price,item.name,item.num,imgUrl+item.hintImage)"
					/> </div>
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
				gameName: localStorage.getItem('gameName'),
				gameList: {},
				selectType: 'item',
				searchKey: '',
				itemOriginList: [],
				selectServeData: {},
				currencyData: [],
				selectCurrency: '',
				categoryList: [],
				selectCategoryData: [],
				categoryId: ''
			};
		},
		computed: { ...mapState(['login', 'showMoveImg', 'currencyInfo',
				'currencyInfo', 'userInfo'
			]),
		},
		methods: { ...mapMutations(['ADD_CART', 'CHOOSE_CURRENCY']),
			down(index) {
				if (this.itemList[index].num == 0) return
				if (this.itemList[index].num <= this.itemList[index].miniNumber) {
					this.$message({
						type: 'error',
						message: "The minimum quantity is " + this.itemList[index].miniNumber
					});
					return
				}
				this.itemList[index].num = this.itemList[index].num * 1 - 1;
				this.$forceUpdate();
			},
			getPrice(price) {
				price = price + ''
				var priceStr1 = price.split('.')[0]
				var priceStr = price.split('.')[1]
				if (priceStr) {
					if (priceStr.length === 1) {
						return ((price * 1).toFixed(2))
					} else if (priceStr.length === 2) {
						return price
					} else {
						return ((price * 1).toFixed(3))
					}
				} else {
					return ((price * 1).toFixed(2))
				}
			},
			up(index, num) {
				if (num === 1) {
					this.itemList[index].num = this.itemList[index].num * 1 + 1;
				} else {
					if (num < this.itemList[index].miniNumber) {
						this.$message({
							type: 'error',
							message: "The minimum quantity is " + this.itemList[index].miniNumber
						});
						this.itemList[index].num = this.itemList[index].miniNumber * 1;
						this.$forceUpdate();
						return
					}
					this.itemList[index].num = this.itemList[index].num * 1;
				}
				this.$forceUpdate();
			},
			setCurrency(a) {
				var data = this.currencyData.filter(item => item.showName == a);
				this.CHOOSE_CURRENCY({
					name: data[0].name,
					symbol: data[0].symbol,
					rate: data[0].rate,
					type: 1
				})
			},
			changeInput() {
				var data = JSON.parse(JSON.stringify(this.itemOriginList));
				this.itemList = data.filter(item => item.name.toLowerCase().indexOf(this.searchKey
					.toLowerCase()) > -1)
			},
			addCart(item, id, price, name, productNum, img, addType) {
				if (addType == 1) {
					this.ADD_CART({
						detail: item,
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
						categoryName: this.selectCategoryData.name,
						categoryId: this.selectCategoryData.id
					})
					this.$router.push('/payPage');
				} else {
					if (productNum < 0) {
						this.$message({
							type: 'error',
							message: 'Please fill in right Quantity'
						});
						return
					}
					if (productNum == 0) {
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
						categoryName: this.selectCategoryData.name,
						categoryId: this.selectCategoryData.id
					})
					this.$message({
						type: 'success',
						message: 'Add Success'
					});
				}
			},
			getCategory() { //获取game
				getTemplete('?type=Category&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						response.data = response.data || []
						this.categoryList = response.data.filter((item) => {
							var id = item.game.split(',')[0]
							return id == localStorage.getItem('gameId') && item.online
						})
						this.imgUrl = window.imgUrl;
						var resultArray = this.categoryList.sort(function compareFunction(
							param1, param2) {
							if (param1.order) {
								return
							}
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						this.categoryList = resultArray;
						var array1 = this.categoryList.filter((item) => item.order)
						array1 = array1.sort((a, b) => a.order - b.order)
						var array2 = this.categoryList.filter((item) => !item.order)
						array2 = array2.sort(function compareFunction(param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						this.categoryList = array1.concat(array2)
						if (this.categoryList.length > 0) {
							this.selectCategoryData = this.categoryList[0];
							this.categoryId = this.categoryList && this.categoryList[0].id
							this.getServe();
						} else {
							this.getServe();
						}
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
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
								return id == localStorage.getItem('gameId') && item.online && item.items
									.length > 2
							}
							if (this.categoryId) {
								var id = item.category.split(',')[0]
								return id == this.categoryId && item.online && item.items.length >
									2
							} else {
								var id = item.game.split(',')[0]
								return id == localStorage.getItem('gameId') && item.online && item.class ==
									'item,item' && item.items.length > 2
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
							message: response.msg
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
			getItem() {
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.items && JSON.parse(this.selectServeData.items).map(
							(subItem) => {
								response.data.map((item) => {
									if (item.id == subItem.split(',')[0] && item.type == "item,item") {
										this.itemList.push(item)
										item.num = item.miniNumber
									}
								})
							})
						var array1 = this.itemList.filter((item) => item.order)
						array1 = array1.sort((a, b) => a.order - b.order)
						var array2 = this.itemList.filter((item) => !item.order)
						array2 = array2.sort(function compareFunction(param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						this.itemList = array1.concat(array2)
						this.itemOriginList = this.itemList
						this.selectId = this.itemList[0] && this.itemList[0].id;
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
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
						this.gameName=data[0].name
						localStorage.setItem('gameName',data[0].name)
						JSON.parse(localStorage.getItem('currencyData')).map((item) => {
							item = JSON.parse(item);
							item.showName = item.name;
							this.currencyData.push(item)
						})
						//						var name = this.currencyInfo.name
						//						var currencyData = this.currencyData.filter(item => item.name == name);
						//						this.selectCurrency = currencyData[0].id
						this.gameList = data[0];
						if (this.gameList.productSell == 'coin,coin') {
							this.$router.replace('/coinList/' + this.$route.params.id)
						}
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
						});
					}
				})
			},
		},
		created() {
			var ua = navigator.userAgent;
			var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
			var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
			this.isMobile = isIphone || isAndroid;
			this.gameName = localStorage.getItem('gameName')
			localStorage.setItem('gameId', this.$route.params.id)
			//获取game
			this.getCategory();
			this.getGame();
		}
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
	
	.add {
		border-radius: 2px;
		;
		display: inline-block;
		width: 106px;
		height: 32px;
		font-size: 14px;
		text-align: center;
		line-height: 32px;
		color: #fff;
		background: #e1251b;
	}
	
	.step-line {
		margin-left: 15px;
		padding-left: 20px;
		border-left: 4px solid #fdf2f1;
		.item {
			display: inline-block;
			text-align: center;
			width: 150px;
			padding: 17px 0;
			background-color: #ffcbc8;
			border-radius: 5px;
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
		display: flex;
		flex-wrap: wrap;
		padding-top: 20px;
		span {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
			width: 150px;
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
					top: 28px;
					width: 18px;
					height: 18px;
					position: absolute;
					right: 8px;
				}
			}
			.select-title {
				color: #999;
				font-size: 14px;
				margin-top: 20px;
				margin-bottom: 14px;
			}
		}
		.li {
			text-align: center;
			margin-top: 20px;
			box-sizing: border-box;
			display: inline-block;
			width: 232px;
			background-color: #ffffff;
			border: solid 1px #dcdcdc;
			padding: 16px;
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
			&:nth-child(5n+1) {
				border-right: solid 1px #dcdcdc;
			}
			img {
				width: 56px;
				height: 56px;
				border-radius: 5px;
			}
			.text {
				padding: 19px 0 8px;
				font-size: 14px;
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
					font-size: 20px;
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
			.down, .up {
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
	
	.hidden-style {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		height: 26px;
		word-wrap: break-word;
		font-size: 10px;
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
			max-height: 40px;
		}
		.text {
			margin-top: 0;
			margin-bottom: 17px;
			font-size: 14px;
			color: #666;
			span {
				font-size: 16px;
				color: #e1251b;
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
			font-size: 20px;
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