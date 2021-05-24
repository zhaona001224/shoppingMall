<template>
	<div>
		<div>
			<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > {{ gameName }} > {{
				gameList.coinName }} </div>
			<div class="purchase-note" v-if="gameList.buyNotes">
				<div class="bg">
					<div class="tip">Purchase Notes:</div>
					<div v-html="gameList.buyNotes"></div>
				</div> <img style="    width: 100%;margin-top: -1rem;z-index: -1;position: relative;"
				 src="../../assets/image/mobile/noticeBG.png" /> </div>
			<div class="step-line"
			 style="display: flex; justify-content: space-between">
				<div v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'coin,coin'
          " :class="selectType == 'coin' ? 'item active point' : 'item point'" @click="$router.push('/coinList/' + $route.params.id)">
				<img src="../../assets/image/icon/icon_coin.png" /> <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"> {{ gameList.coinName || "Silver" }}</span>					</div>
				<div v-if="
            gameList.productSell == 'both,both' ||
            gameList.productSell == 'item,item'
          " :class="selectType == 'item' ? 'item active point' : 'item point'" @click="$router.push('/itemList/' + $route.params.id)">
				<img src="../../assets/image/icon/icon_item.png" /> <span style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ gameList.itemName || "Items" }}</span>					</div>
			</div>
				<van-popup v-model="showPicker" round position="bottom">
 <van-picker
   confirm-button-text="confirm"  cancel-button-text="cancel"
    show-toolbar value-key="name"
    :columns="categoryList"
    @cancel="showPicker = false"
    @confirm="selectCategory"
  />
  </van-popup>
  	<van-popup v-model="showPicker1" round position="bottom">
   <van-picker
   confirm-button-text="confirm"  cancel-button-text="cancel"
    show-toolbar value-key="name"
    :columns="serveList"
    @cancel="showPicker1 = false"
    @confirm="selectServe"
  />
  </van-popup>
   	<van-popup v-model="showPicker2" round position="bottom">
   <van-picker
   confirm-button-text="confirm"  cancel-button-text="cancel"
    show-toolbar value-key="name"
    :columns="itemList"
    @cancel="showPicker2 = false"
    @confirm="onConfirm"
  />
</van-popup>
			<div class="el-dropdown"  v-if="categoryList.length > 0"> <span @click="showPicker=true" class="el-dropdown-link">
          {{ selectCategoryData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
				<!-- <el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="selectCategory(item)" v-for="(item, index) in categoryList"
					 v-if="categoryList.length > 0" :key="item.id" @click="selectCategory(item)"
					 :class="item.id == categoryId ? 'active point' : 'point'">{{ item.name }}</el-dropdown-item>
				</el-dropdown-menu> -->
			</div>
			<div class="el-dropdown"  v-if="serveList.length > 0"> <span @click="showPicker1=true" class="el-dropdown-link">
          {{ selectServeData.name
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
				<!-- <el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="selectServe(item)" v-for="(item, index) in serveList"
					 v-if="serveList.length > 0" :key="item.id" :class="item.id == serveId ? 'active point' : 'point'">{{ item.name }}</el-dropdown-item>
				</el-dropdown-menu> -->
			</div>
			<div class="el-dropdown"  v-if="itemList.length > 0"> <span @click="showPicker2=true" class="el-dropdown-link">
          {{ selectName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
				<!-- <el-dropdown-menu class="menu-li" slot="dropdown">
					<el-dropdown-item @click.native="
              selectId = item.id;
              selectName = item.name;
              totalPrice = 0;
              coinNum = 0;
              filterId();
            " v-for="(item, index) in itemList" v-if="itemList.length > 0" :key="item.id"
					 :class="item.id == selectId ? 'active point' : 'point'">{{ item.name }}</el-dropdown-item>
				</el-dropdown-menu> -->
			</div>
			<div class="step-line item-contain">
				<!-- <div class="flex-style">
          <div class="select-title">
            You Have Selected:<span style="color: #333"
              >{{ selectCategoryData.name }}
              <span v-if="selectCategoryData.name">-</span>
              {{ selectServeData.name }}
            </span>
          </div>
        </div> -->
				<!-- <div class="tab point">
        
        </div> -->
				<div class="main-title"> <span> custom-quantity: </span>
					<el-select @change="setCurrency" style="width: 1rem; height: 0.32rem"
					 v-model="currencyInfo.name" placeholder="">
						<el-option v-for="(subItem, subIndex) in currencyData" :key="subItem.id" :label="subItem.showName"
						 :value="subItem.id"> </el-option>
					</el-select>
				</div>
				<div class="total"> 
					<div>
						<input onafterpaste="this.value=this.value.replace(/\D/g,'')" @change="changeNum(coinNum)"
					 :placeholder="selectData[0] ? selectData[0].miniNumber : ''" type="number" :min="selectData[0] && selectData[0].miniNumber"
					 class="input-style" v-model="coinNum" /> <span class="custom-quantity">
            {{ selectData[0] && selectData[0].Unit }}</span
          >
          
					</div>
					<span class="price" 
            >{{ currencyInfo.symbol
            }}{{ (totalPrice * 1 * currencyInfo.rate).toFixed(2) }}</span
          >
          <span class="option"
            ><span
              class="buy point"
              style="margin-right: 0.1rem"
              @click="
                addCart(
                  selectData[0],
                  selectId,
                  totalPrice,
                  selectData[0] && selectData[0].name + '*' + coinNum,
                  '',
                  1,
                  1
                )
              "
              >Buy Now</span
            ></span
          >
        </div>
        <div class="li" v-for="(item, index) in discountList" :key="item.id">
          <div class="left" style="width: 80%">
            <div class="custom-quantity ">
              {{ item.qty || 1 }}{{ selectData[0] && selectData[0].Unit }}-{{ selectServeData.name }}
              
            </div> <div class="serve-name " v-html="item.selltext"></div> </div>
				<div class="right">
					<div class="price"> {{ currencyInfo.symbol }}{{ ( (item.totalPrice || item.price) * 1 * currencyInfo.rate
						).toFixed(2) }} </div>
					<div class="option"> <span class="img-contain">
              	<img
                src="../../assets/image/mobile/car1.png"
                class="go"
                 @click="
                  addCart(
                    item,
                    selectId,
                    item.totalPrice || item.price,
                    item.name + '*' + item.qty,
                    '',
                    1
                  )
                "
              />
              </span> <span class="buy point" @click="
                  addCart(
                    item,
                    selectId,
                    item.totalPrice || item.price,
                    item.name + '*' + item.qty,
                    '',
                    1,
                    1
                  )
                ">Buy Now</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="split"></div>
    <div class="footer1" v-if="gameList.description">
      <div class="main-title">
        <span class="border-style"></span>Introduction </div>
					<div class="contain">
						<div v-html="gameList.description"></div>
					</div>
				</div>
			</div>
</template>
<script>
	import { getTemplete } from "../../api/common.js";
	import { mapMutations, mapState } from "vuex";
	export default {
		data() {
			return {
				serveList: [],
				itemList: [],
				imgUrl: "",
				gameList: {},
				gameName: localStorage.getItem("gameName"),
				discountList: [],
				selectType: "coin",
				selectId: "",
				coinNum: "",
				newArray: [],
				selectData: [],
				currencyData: [],
				selectCurrency: "",
				lowPrice: "",
				plane: [],
				selectServeData: {},
				discountListAll: [],
				categoryList: [],
				selectCategoryData: [],
				categoryId: "",
				totalPrice: 0,
				selectName: "",
				showPicker:false,
				showPicker1:false,
				showPicker2:false
				
			};
		},
		computed: { ...mapState(["login", "showMoveImg", "showCart", "currencyInfo",
				"currencyInfo",
			]),
		},
		methods: { ...mapMutations(["ADD_CART", "SHOW_LOGIN", "CHOOSE_CURRENCY"]),
			mapCount(data) {
				var num = this.coinNum;
				if (num == 0 || data.length == 0) return;
				data = data.reverse();
				data.map((item, index) => {
					if (num == 0) return;
					if (index == data.length - 1) {
						if (num * 1 <= item.qty * this.selectData[0].miniNumber) {
							item.buyNum = 1;
							num = 0;
							return;
						} else {
							item.buyNum = Math.ceil(
								(num * 1) / (item.qty * this.selectData[0].miniNumber));
							num = 0;
							return;
						}
					}
					if ((num * 1) % (item.qty * this.selectData[0].miniNumber) == 0) {
						item.buyNum = parseInt(
							(num * 1) / (item.qty * this.selectData[0].miniNumber));
						num = 0;
					} else if (
						(num * 1) % (data[index + 1].qty * this.selectData[0].miniNumber) == 0) {
						data[index + 1].buyNum = parseInt(
							(num * 1) / (data[index + 1].qty * this.selectData[0].miniNumber));
						num = 0;
					} else {
						item.buyNum = parseInt(
							(num * 1) / (item.qty * this.selectData[0].miniNumber));
						num = (num * 1) % (item.qty * this.selectData[0].miniNumber);
					}
				});
				this.totalPrice2(data);
			},
			changeNum() {
				this.coinNum=this.coinNum.replace(/\D/g,'')*1
				var that = this;
				this.newArray = JSON.parse(JSON.stringify(this.discountList));
				this.lowPrice = '';
				this.plane = [];
				var totalPrice = 0;
				if (this.coinNum*1 <this.selectData[0].miniNumber*1) {
					this.$message({
						type: 'error',
												message: "The minimum quantity is "+this.selectData[0].miniNumber
					});
					this.coinNum=this.selectData[0].miniNumber*1
					return
				}
				if (this.coinNum*1 > this.newArray[this.newArray.length - 1].qty*1) {
					this.totalPrice = this.coinNum * this.newArray[this.newArray.length - 1].price;
					return
				}
				this.newArray.map((item, index) => {
					if (this.coinNum*1 >= item.qty*1 && (this.coinNum*1 < (this.newArray[index + 1] &&
						
						this.newArray[index + 1].qty*1))) {
							
						this.totalPrice = item.price * this.coinNum
					}
				})
			},
			onConfirm(item){
				this.showPicker2=false
				this.selectId = item.id;
              this.selectName = item.name;
              this.totalPrice = 0;
              this.coinNum = 0;
              this.filterId();
			},
			totalPrice2(data) {
				var price = 0;
				data.map((item) => {
					if (item.buyNum) {
						price = price + item.qty * item.buyNum * 1 * item.price;
					}
				});
				if (this.lowPrice == 0 || price < this.lowPrice) {
					this.lowPrice = price;
					this.plane = data;
				}
			},
			setCurrency(a) {
				var data = this.currencyData.filter((item) => item.id == a);
				this.CHOOSE_CURRENCY({
					name: data[0].name,
					symbol: data[0].symbol,
					rate: data[0].rate,
					type: 1,
				});
			},
			addCart(item, id, price, name, img, productNum, addType, minNum) {
				if (price == 0 || productNum == 0) {
					return;
				}
				item.unit = this.selectData[0]&&this.selectData[0].Unit
				this.ADD_CART({
					detail: item,
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum,
					type: "coin",
					serveId: this.selectServeData.id,
					serveName: this.selectServeData.name,
					gameId: localStorage.gameId,
					gameName: localStorage.gameName,
					categoryName: this.selectCategoryData.name,
					categoryId: this.selectCategoryData.id,
				});
				if (addType == 1) {
					this.$router.push("/payPage");
				} else if (addType == 2) {} else {
					this.$message({
						type: "success",
						message: "Add Success",
					});
				}
			},
			getCategory() {
				//获取game
				getTemplete("?type=Category&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						response.data = response.data || [];
						this.categoryList = response.data.filter((item) => {
							var id = item.game.split(",")[0];
							return (id == localStorage.getItem("gameId") && item.online && item.class ==
								"coin,coin");
						});
						this.imgUrl = window.imgUrl;
						if (this.categoryList.length > 0) {
							this.selectCategoryData = this.categoryList[0];
							this.categoryId = this.categoryList && this.categoryList[0].id;
							this.getServe();
						} else {
							this.getServe();
						}
						var resultArray = this.categoryList.sort(function compareFunction(
							param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						});
						console.log(resultArray);
						this.categoryList = resultArray;
					} else {
						this.$message({
							type: "warning",
							message: response.message,
						});
					}
				});
			},
			getServe() {
				//获取game
				getTemplete("?type=Server&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						response.data = response.data || [];
						this.serveList = response.data.filter((item) => {
							if (!item.category) {
								var id = item.game.split(",")[0];
								return (id == localStorage.getItem("gameId") && item.online && item
									.coins.length > 2);
							}
							if (this.categoryId) {
								var id = item.category.split(",")[0];
								return (id == this.categoryId && item.online && item.coins.length >
									2);
							} else {
								var id = item.game.split(",")[0];
								return (id == localStorage.getItem("gameId") && item.online && item
									.coins.length > 2);
							}
						});
						var array1 = this.serveList.filter((item) => item.order);
						array1 = array1.sort((a, b) => a.order - b.order);
						var array2 = this.serveList.filter((item) => !item.order);
						array2 = array2.sort(function compareFunction(param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						});
						this.serveList = array1.concat(array2);
						this.imgUrl = window.imgUrl;
						if (this.serveList.length > 0) {
							this.selectServeData = this.serveList[0];
							this.serveId = this.serveList && this.serveList[0].id;
							this.getItem();
						}
					} else {
						this.$message({
							type: "warning",
							message: response.message,
						});
					}
				});
			},
			selectServe(item) {
				this.showPicker1=false
				this.selectServeData = item;
				this.serveId = item.id;
				this.getItem();
				this.$forceUpdate();
			},
			selectCategory(item) {
				this.showPicker=false
				this.selectCategoryData = item;
				this.categoryId = item.id;
				this.getServe();
				this.$forceUpdate();
			},
			getItem() {
				//获取item
				getTemplete("?type=Product&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.coins && JSON.parse(this.selectServeData.coins).map(
							(subItem) => {
								response.data.map((item) => {
									if (item.id == subItem.split(",")[0] && item.type == "coin,coin") {
										item.price = this.selectServeData.price;
										this.itemList.push(item);
									}
								});
							});
							this.itemList=this.itemList.filter(item => !!item.online)
						if (this.itemList[0]) {
							this.selectId = this.itemList[0].id;
							this.selectName = this.itemList[0].name;
							this.filterId();
						} else {
							this.discountList = [];
						}
					} else {
						this.$message({
							type: "warning",
							message: response.message,
						});
					}
				});
			},
			getGame() {
				//获取game
				getTemplete("?type=Game&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						var data = response.data.filter((item) => {
							return item.id == localStorage.getItem("gameId");
						});
						 this.gameName=data[0].name
		localStorage.setItem('gameName',data[0].name)
						JSON.parse(localStorage.getItem("currencyData")).map((item) => {
							item = JSON.parse(item);
							item.showName = item.name;
							this.currencyData.push(item);
						});
						var name = this.currencyInfo.name || this.currencyInfo.name;
						var currencyData = this.currencyData.filter(
							(item) => item.name == name);
						this.selectCurrency = currencyData[0].id;
						this.gameList = data[0];
						if (this.gameList.productSell == "item,item") {
							this.$router.replace("/itemList/" + this.$route.params.id);
						}
					} else {
						this.$message({
							type: "warning",
							message: response.message,
						});
					}
				});
			},
			filterId() {
				this.selectData = this.itemList.filter((item) => {
					return item.id == this.selectId;
				});
				this.selectData.map((item) => {
					item.price = this.selectServeData.price;
				});
				if (!this.selectData[0].discount) {
					this.selectData[0].qty = 1;
					this.discountList = this.selectData;
					return;
				}
				var discountId = this.selectData[0].discount && this.selectData[0].discount
					.split(",")[0];
				if (this.discountListAll.length > 0) {
					this.filtData(discountId);
				} else {
					this.getDiscount(discountId);
				}
			},
			filtData(discountId) {
				var data = this.discountListAll.filter((item) => {
					return item.id == discountId;
				});
				this.discountList = JSON.parse(data[0].list);
				this.discountList.filter((item) => {
					var startTime = new Date(item.starttime + ":00");
					var endTime = new Date(item.endtime + ":00");
					return new Date() >= startTime && new Date() <= endTime;
				});
				this.discountList.map((item) => {
					item.name = this.selectData[0].name;
					if (this.selectData[0].price * 1 - item.discount > 0) {
						console.log(this.selectData[0].price);
						item.price = this.selectData[0].price * 1 - item.discount;
					} else {
						item.price = this.selectData[0].price * 1;
					}
					item.totalPrice = (item.price * 1 * (item.qty * 1)).toFixed(2);
				});
				this.coinNum = this.discountList[0].qty * 1;
				this.totalPrice = this.discountList[0].totalPrice;
			},
			getDiscount(discountId) {
				//获取discount
				getTemplete("?type=Discount&offset=-1&count=-1").then((response) => {
					if (response.retCode == 0) {
						this.discountListAll = response.data;
						this.filtData(discountId);
					} else {
						this.$message({
							type: "warning",
							message: response.message,
						});
					}
				});
			},
		},
		created() {
			var ua = navigator.userAgent;
			var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			var isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
			var isAndroid = ua.match(/(Android)\s+([\d.]+)/);
			this.isMobile = isIphone || isAndroid;
			 localStorage.setItem("gameId", this.$route.params.id);
			//获取gameSilver
			this.getCategory();
			this.getGame();
		},
		//		watch: {
		//			coinNum() {
		//				this.changeNum();
		//			}
		//		}
	};
</script>
<style lang="less" scoped="">
	@import "../../assets/css/public.css";
	.purchase-note {
		box-sizing: border-box;
		margin: 0 0.25rem;
		
		.tip {
			font-size: 0.12rem;
			color: #e1251b;
		
			font-weight: bold;
			margin-bottom: 0.1rem;
		}
		.bg {
			padding: 0.1rem;
			background-color: #ebebeb;
				/deep/ img{
			width: 0.5rem;
		}
		}
	}
	
	.tab {
		text-align: left;
		width: 1162px;
		margin: 0 auto;
		border-bottom: 2px solid #fe852d;
		padding-top: 0.2rem;
		padding-bottom: 0.2rem;
		margin-bottom: 0.2rem;
		overflow: hidden;
		span {
			padding: 0.15rem 0.2rem;
			font-size: 0.14rem;
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
		font-size: 0.18rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.22rem;
		letter-spacing: 0px;
		color: #333333;
		span {
			border-radius: 50%;
			text-align: center;
			display: inline-block;
			width: 0.3rem;
			height: 0.3rem;
			line-height: 0.3rem;
			background-color: #fdf2f1;
			border: solid 3px rgba(234, 111, 105, 0.4);
			font-family: Arial-BoldMT;
			font-size: 0.16rem;
			letter-spacing: 0px;
			color: #e7534b;
			margin-right: 0.16rem;
		}
	}
	
	.el-dropdown {
		display: block;
		margin: 0.15rem 0.25rem auto;
		padding: 0 0.1rem;
		box-sizing: border-box;
		height: 0.34rem;
		line-height: 0.32rem;
		background-color: #ffffff;
		border: solid 1px #c9c9c9;
		
		font-size: 0.14rem;
		color: #666666;
		text-align: left;
		.el-dropdown-link {
			border: none;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	
	.step-line {
		padding: 0 0.26rem;
		.select-title {
			color: #999;
			font-size: 0.14rem;
			padding-top: 0.2rem;
			margin-bottom: 0.14rem;
		}
		.item {
			display: flex;
			justify-content: center;
			align-content: center;
			width: 1.53rem;
			padding: 0.1rem 0;
			background-color: #ffcbc8;
			border-radius: 2px;
			font-size: 0.15rem;
		
			font-weight: bold;
			margin-top: 0.1rem;
			letter-spacing: 0px;
			color: #ffffff;
			
			img {
				width: 0.21rem;
				height: 0.21rem;
				margin-right: 0.12rem;
			}
			&.active {
				background-color: #e1251b;
			}
		}
		.main-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
			
				margin: 0.2rem 0;
				font-size: 0.13rem;
				font-weight: bold;
				color: #333333;
			}
			/deep/ .el-input__inner {
				height: 0.32rem;
				line-height: 0.32rem;
			}
		}
	}
	
	.serve-contain {
		display: flex;
		flex-wrap: wrap;
		padding-top: 0.2rem;
		span {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
			width: 140px;
			text-align: center;
			padding: 0.14rem 0.1rem;
			font-size: 0.14rem;
			border: 1px solid #efefef;
			margin-right: 0.2rem;
			position: relative;
			margin-bottom: 0.2rem;
			&:hover {
				border: 1px solid #e1251b;
			}
			&.active {
				border: 1px solid #e1251b;
				&::after {
					right: 0;
					bottom: 0;
					content: "";
					position: absolute;
					width: 0.2rem;
					height: 0.2rem;
					background: url(../../assets/image/icon/icon_check.png);
				}
			}
		}
	}
	
	.total {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 0.4rem;
		background-color: #feba00;
		align-items: center;
		.custom-quantity {
			font-size: 0.14rem;
			color: #333333;
				}
		.price {
		
			font-size: 0.15rem;
			font-weight: bold;
			font-stretch: normal;
			letter-spacing: 0px;
			color: #e1251b;
		}
		input {
			margin-left: 0.1rem;
			width: 0.92rem;
			height: 0.28rem;
			font-weight: bold;
			background-color: #ffffff;
			border: solid 1px #e5e5e5;
			margin-right: 5px;
		box-shadow: none;
			border-radius: 0;
		}
		.option {
			span {
				text-align: center;
				color: #fff;
				display: inline-block;
				width: 0.75rem;
				height: 0.3rem;
				background-color: #4c9adb;
				border-radius: 2px;
				font-size: 0.12rem;
				line-height: 0.3rem;
				
			}
			
			.buy {
				margin-left: 0.13rem;
				background-color: #e1251b;
			}
		}
	}
	
	.hidden-style {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
	
	.li {
		width: 100%;
		padding: 0.1rem 0;
		background-color: #f5f5f5;
		border: solid 1px #dcdcdc;
		display: flex;
		justify-content: space-between;
		margin-top: 0.1rem;
		box-sizing: border-box;
		&:last-child {
			margin-bottom: 0.2rem;
		}
		.left {
			
			font-size: 0.12rem;
			color: #333;
			padding-left: 0.1rem;
			.custom-quantity {
				font-family: font, Arial, Helvetica Neue, Helvetica, sans-serif;
	
				font-size: 0.13rem;
				margin: 0.15rem 0 0.06rem;
			}
		}
		.right {
			padding-right: 0.1rem;
		}
		.price {
			text-align: right;
			margin-top: 0.1rem;
			margin-bottom: 0.12rem;
		
			font-weight: bold;
			font-size: 0.15rem;
			color: #f3940e;
		}
		.option {
			display: flex;
			
			.img-contain {
				position: relative;
				width: 0.3rem;
				height: 0.3rem;
				background-color: #4c9adb;
				margin-right:5px;
				img {
					position: absolute;
					top: 0.06rem;
					width: 0.18rem;
					height: 0.18rem;
					right: 0.06rem;
				}
			}
			.buy {
				text-align: center;
				color: #fff;
				display: inline-block;
				width: 0.75rem;
				height: 0.3rem;
				border-radius: 2px;
				font-size: 0.12rem;
				line-height: 0.3rem;
				
				margin-left: 2px;
				background-color: #e1251b;
			}
		}
	}
	
	.split {
		width: 100%;
		height: 0.125rem;
		background-color: #f5f5f5;
	}
	
	.footer1 {
		background-color: #ebebeb;
		padding-bottom: 0.25rem;
		/deep/ img{
			width: 0.5rem;
		}
		.contain {
			display: flex;
			box-sizing: border-box;
			margin: 0 auto;
			margin: 0.25rem;
			margin-top: 0;
			padding: 0.2rem;
			background: #fff;
			border-radius: 8px;
			margin-bottom: 0;
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
				height: 0.09rem;
				background-color: #e10e0d;
				border-radius: 1px;
				margin-right: 0.09rem;
			}
		}
		.contain {
			text-align: left;
		}
	}
</style>