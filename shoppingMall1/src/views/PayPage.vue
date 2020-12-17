<template>
	<div>
		<div style="width: 1200px;margin:100px auto">
			<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > Shoppingcart</div>
			<div
			 class="total head"><span class="custom-quantity">{{$t("language.good.shoppingCart")}}</span></div>
		<div class="table">
			<div class="th" v-for="(item,index) in cartList">
				<!-- {{item.detail}} -->
				<div style="width: 50%;padding-left: 29px;">{{item.gameName}}-{{item.categoryName}}-{{item.serveName}}-{{item.productName}}<span v-if="item.detail.unit">{{item.detail.unit}}</span></div>
				<div style="width: 290px;">
					<div class="select-num"> <span @click="down(item,item.productId,item.productName)" class="down">-</span>						<input @change="changeNum(index)" type="number" onkeyup="this.value=this.value.replace(/\D/g,'')"
						 onafterpaste="this.value=this.value.replace(/\D/g,'')" :min="item.detail?item.detail.miniNumber:0"
						 v-model="item.productNum" class="show"> <span class="up" @click="up(item,item.productId,item.salePrice,item.productName,item.productImg,1)">+</span>						</div>
				</div>
				<div style="width: 220px;text-align: center;color: #f39800;"> {{currencyInfo.symbol}}{{(item.salePrice*currencyInfo.rate).toFixed(2)}} </div>
				<div class="price" style="width: 220px;">{{currencyInfo.symbol}}{{(item.salePrice&&item.salePrice*item.productNum*currencyInfo.rate).toFixed(2)}}</div>
				<!--					<div class="price" style="width: 247px;" v-else>{{currencyInfo.symbol}}{{item.totalPrice*currencyInfo.rate}}</div>-->
				<div class="delete point" @click="deletePro(item.productId,item.productName)"
				 style="width:80px;text-align: center;vertical-align: -8px;"><img style="width: 20px;height: 22px;" src="../assets/image/icon/icon_delete.png"
					/></div>
			</div>
		</div>
		<div style="display: flex;justify-content: space-between;">
			<div class="coupon">
				<el-input @clear="disPrice=0;couponPrice={}" style="dispaly:inline-block;width:200px"
				 placeholder="请输入优惠券码" v-model="couponCode" clearable> </el-input><span class="btn point" @click="apply">Apply</span> </div>
			<div class="count-price">
				<div>Product Price: <span class="price">{{currencyInfo.symbol}}{{totalPrice}}</span></div>
				<div>Coupon Discount: <span class="price">{{currencyInfo.symbol}}{{disPrice}}</span></div>
				<div>Payment Fee: <span class="price">{{currencyInfo.symbol}}{{payFee}}</span></div>
				<div>Total Amount: <span class="price">{{currencyInfo.symbol}}{{(totalPrice*1-disPrice*1+payFee*1).toFixed(2)}}</span></div>
			</div>
		</div>
		<div class="step"><span>1</span>{{$t("language.good.orderInformation")}}</div>
		<div class="step-line">
			<el-form style="padding-top:30px" ref="form" :model="form" :rules="rules" label-width="35%"
			 label-position="right">
				<el-row>
					<el-col :span="8">
						<el-form-item :label='$t("language.user.email")' prop="email">
							<el-input placeholder="" v-model="form.email"> </el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16" style="display: flex;">
						<el-form-item label='Instance Message:' prop="link" style="margin-left:30px;width:400px">
							<el-select :clearable="true" v-model="form.link1">
								<el-option v-for="subItem in selectList" :key="subItem" :label="subItem" :value="subItem">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="link" class="left">
							<el-input placeholder="" v-model="form.link"> </el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="step"><span>2</span>{{$t("language.good.playerInformation")}}</div>
		<div class="step-line ">
			<el-form style="padding-top:30px" ref="form" :model="form" :rules="rules" label-width="35%"
			 label-position="right">
				<el-row>
					<el-col :span="8">
						<el-form-item :label='productInfo.customerLabel' prop="payer">
							<el-input placeholder="" v-model="form.payer"> </el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="tip" v-if="productInfo.customerCaution"><img src="../assets/image/icon/icon_tip.png" />{{productInfo.customerCaution}}</div>
		</div>
		<div class="step"><span>3</span>{{$t("language.good.paymentMethod")}}</div>
		<div class="step-line serve-contain"
		 style="border-left: none;display: flex;flex-wrap: wrap;">
			<div v-for="(item,index) in payList" :key="index" @click="selectIndex=index"> <span :class="index==selectIndex?'active point':'point'">
							<img  :src="imgUrl+item.img_url"/> </span>
				<div style="text-align: center;">{{item.note}}</div>
			</div>
		</div>
		<div class="all"><span> Total Amount：<span class="price">{{currencyInfo.symbol}}{{(totalPrice*1-disPrice*1+payFee*1).toFixed(2)}}</span></span>
			<span class="btn point" @click="pay()">Pay  Now</span> </div>
		<div class="trustedsite-trustmark"
		 data-type="204"></div>
	</div>
	</div>
</template>
<script>
	import { getTemplete } from '../api/common.js'
	import { getPay, getPay2, getPay3 } from '../api/product.js'
	import { mapMutations, mapState } from 'vuex'
	import { ptn } from '@/utils/common/validate'
	export default {
		data() {
			return {
				productPrice: 0,
				couponDiscount: 0,
				paymentFee: 0,
				totalAmount: 0,
				form: {},
				statusList: [],
				payFee: 0,
				payList: [],
				imgUrl: '',
				selectIndex: 0,
				totalNum: 0,
				couponList: [],
				couponCode: '',
				disPrice: 0,
				selectList: ['Discord', 'Skype', 'QQ', 'Wechat', 'Whats app', 'Line',
					'Instagram', 'Telegram', 'Snapchat', 'Facebook', 'Phone'
				],
				couponPrice: {},
				feeRate: [],
				productInfo: {},
				rules: {
					email: [{
						message: "Please fill in email",
						required: true,
						trigger: 'blur'
					}, {
						message: "Please fill in correct email",
						pattern: ptn.email(0, 40),
						trigger: 'blur'
					}],
					payer: [{
						message: "Please fill in payer_name",
						required: true,
						trigger: 'blur'
					}],
					link: [{
						message: "Please fill in payer_name",
						required: true,
						trigger: 'blur'
					}]
				},
				form: {
					email: '',
					payer: '',
					link1: "",
					link: ""
				},
				payFeeValue: []
			};
		},
		computed: { ...mapState(['cartList', 'currencyInfo', 'login', 'userInfo']),
			totalPrice() {
				this.totalNum = 0;
				var price = 0;
				this.cartList.map((item) => {
					if (item.type == "coin") {
						var price1 = (item.totalPrice * this.currencyInfo.rate).toFixed(2)*1
					} else {
						var price1 = (item.productNum * item.salePrice * this.currencyInfo.rate).toFixed(
							2)*1
					}
					price = price + price1
					this.totalNum = this.totalNum * 1 + item.productNum
				})
				if (this.couponPrice.price && this.cartList.length > 0) {
					if (this.couponPrice.type == 1) {
						this.disPrice = ((price * 1 * this.couponPrice.price * 1 / 100) * 1 * this
							.currencyInfo.rate).toFixed(2)*1
					} else {
						this.disPrice = ((this.couponPrice.price * 1) * this.currencyInfo.rate).toFixed(
							2)*1
					}
				}
				if (this.payList.length > 0) {
					var payData = this.payList[this.selectIndex]
					if (this.payList[this.selectIndex].fee_type === 1) {
						this.payFee = (price * payData.payment_fee).toFixed(2)
					} else if (this.payList[this.selectIndex].fee_type === 2) {
						this.payFee = (payData.payment_fee * this.currencyInfo.rate).toFixed(2)
					} else {
						if (price >= payData.helper * this.currencyInfo.rate) {
							this.payFee = 0
						} else {
							this.payFee = (payData.payment_fee * this.currencyInfo.rate).toFixed(2)
						}
					}
				}
				
				return (price*1).toFixed(2)*1
			},
		},
		methods: { ...mapMutations(['ADD_CART', 'REDUCE_CART', 'EDIT_CART',
				'SHOW_LOGIN', 'CLEAR_CART'
			]),
			deletePro(id, productName) {
				this.EDIT_CART({
					productId: id,
					productName: productName
				})
			},
			changeNum(index, num) {
				if (this.cartList[index].detail && this.cartList[index].productNum*1 < this.cartList[
						index].detail.miniNumber) {
					this.$message({
						type: 'error',
						message: "The minimum quantity is "+this.cartList[
						index].detail.miniNumber
					});
					this.cartList[index].productNum = this.cartList[index].detail.miniNumber *
						1;
					return
				}
			},
			down(item, id, productName) {
				this.REDUCE_CART({
					productId: id,
					productName: productName
				})
			},
			up(item, id, price, name, img, productNum) {
				this.ADD_CART({
					detail: item,
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum * 1,
					type: 'coin',
					serveId: item.serveId,
					serveName: item.serveName,
					gameId: localStorage.gameId,
					gameName: localStorage.gameName,
					categoryName: item.categoryName,
					categoryId: item.categoryId,
					totalPrice: price * productNum
				})
			},
			pay() {
				var that = this;
				if (!this.login) {
					this.SHOW_LOGIN(true);
					return
				}
				if (this.totalNum <= 0) {
					that.$message.error("Please select product！");
					return
				}
				if (this.totalPrice <= 0) {
					that.$message.error("Please select product！");
					return
				}
				var that = this;
				if (!this.form.email) {
					that.$message.error("Please fill in form！");
					return
				}
				if (!this.form.link) {
					that.$message.error("Please fill in form！");
					return
				}
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.pay1();
					} else {
						that.$message.error("Please fill in form！");
					}
				})
			},
			pay1() {
				var that = this;
				var itemList = []
				var totalPrice = 0;
				this.cartList.map((item) => {
					itemList.push({
						game: item.gameName,
						server: item.serveName,
						unit_price: (item.salePrice * this.currencyInfo.rate).toFixed(2) * 1,
						"product": item.productName,
						"quantity": item.productNum * 1,
						"category": item.categoryName,
					})
				})
				var amount = this.totalPrice - this.disPrice * 1 + this.payFee * 1
				var params = {
					"payment": this.payList[this.selectIndex].payment,
					"payment_channel": this.payList[this.selectIndex].channel,
					amount: amount,
					"currency": this.currencyInfo.name,
					"language": "UK",
					email: this.form.email,
					request_info: this.form.payer,
					contact_info: this.form.link1 + this.form.link,
					item_list: itemList,
					sub_total: (this.totalPrice * 1).toFixed(2) * 1,
					"city": "",
					"country": "",
					"first_name": "",
					"last_name": "",
					"phone": "",
					"coupon_code": this.couponCode || '',
					"coupon_value": this.disPrice * 1,
					"payment_fee": this.payFee * 1,
					"logo_url": "",
					"address": "",
					"description": "",
					"status": "",
				}
				getPay(this.payList[this.selectIndex].payment, params).then(response => {
					if (response.retCode == 0) {
						window.location.href = response.data.redirect_url;
						this.CLEAR_CART();
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			apply() {
				if (!this.couponCode) {
					return
				}
				var data = this.couponList.filter((item) => {
					console.log(this.couponCode)
					return item.code === this.couponCode
				})
				if (data.length == 0) {
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid'
					});
					this.couponPrice = 0;
					this.disPrice = 0;
					return
				}
				if (data.length == 0) {
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid'
					});
					this.couponPrice = 0;
					this.disPrice = 0;
					return
				}
				if (this.totalPrice*1<data[0].initial_amount * this.currencyInfo.rate) {
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid right now，total amount >'+data[0].initial_amount * this.currencyInfo.rate
					});
					this.couponPrice = 0;
					this.disPrice = 0;
					return
				}
				var cart = this.cartList.filter((item) => {
					var id = data[0].game.split(',')[0];
					return id == item.gameId
				})
				if (cart.length > 0) {
					var startTime = new Date(data[0].starttime + ':00');
					var endTime = new Date(data[0].endtime + ':00');
					if (new Date() >= startTime && new Date() <= endTime) {
						this.couponPrice = data[0];
						this.$message({
							type: 'success',
							message: 'success'
						});
					} else {
						this.couponPrice = 0;
						this.disPrice = 0;
						this.$message({
							type: 'warning',
							message: 'Coupon is not valid'
						});
					}
				}else{
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid'
					});
				}
			},
			countNum(num) {
				this.newArray = JSON.parse(JSON.stringify(this.discountList)).reverse()
				this.newArray.map((item, index) => {
					if (num == 0) return
					if (index == this.newArray.length - 1) {
						num * 1 < item.qty;
						item.buyNum = 1;
						num = 0
						return
					}
					if (num * 1 / item.qty > 1) {
						item.buyNum = parseInt(num * 1 / item.qty);
						num = num * 1 % item.qty
					}
				})
			},
			getItem() { //获取item
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						var data = response.data && response.data.filter(item => item.id ==
							this.cartList[0].productId);
						this.productInfo = data[0]
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getCoupn() {
				//获取game
				getTemplete('?type=Coupon&offset=-1&count=-1').then(response => {
					if (response.retCode == 0) {
						this.couponList = response.data
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
						this.gameList = data[0]
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getPayFee() {
				//获取game
				getTemplete('?type=Paymentbutton&offset=-1&count=-1').then(response => {
					if (response.retCode === 0) {
						this.imgUrl = window.imgUrl
						this.payList = response.data
						var array1 = this.payList.filter((item) => item.order)
						array1 = array1.sort((a, b) => a.order - b.order)
						var array2 = this.payList.filter((item) => !item.order)
						array2 = array2.sort(function compareFunction(param1, param2) {
							return param1.name.trim().localeCompare(param2.name.trim(), "zh");
						})
						this.payList = array1.concat(array2)
						this.payList.map((item) => {
							item.payment = item.payment.split(',')[0]
						})
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
			this.getCoupn();
			this.getItem();
			this.getPayFee();
		},
		mounted() {
			this.form.email = this.userInfo && this.userInfo.email;
			this.form.link1 = this.userInfo && this.userInfo.social_type;
			this.form.link = this.userInfo && this.userInfo.social_link;
			console.log(this.userInfo)
		},
		watch: {
			cartList(a, b) {
				this.couponCode = ''
				this.apply();
			},
			'userInfo.email' () {
				this.form.email = this.userInfo.email;
				this.form.link1 = this.userInfo.social_type;
				this.form.link = this.userInfo.social_link
			}
		},
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
	
	.select-num {
		text-align: center;
		margin: 12px auto 12px;
		display: flex;
		align-items: center;
		border-radius: 3px;
		color: #808080;
		width: 156px;
		input {
			text-align: center;
			width: 90px;
			height: 34px;
			background-color: #fff;
			line-height: 34x;
			font-size: 14px;
			padding: 0;
			color: #666;
			position: relative;
			border: none;
			border-top: solid 1px #dcdcdc;
			border-bottom: solid 1px #dcdcdc;
		}
	}
	
	.down, .up {
		display: inline-block;
		width: 34px;
		height: 34px;
		line-height: 34px;
		cursor: pointer;
		border: solid 1px #dcdcdc;
	}
	
	.th {
		display: flex;
		height: 60px;
		line-height: 60px;
		font-size: 14px;
		color: #666;
		& > div {
			border-right: 1px solid #e5e5e5;
			border-bottom: 1px solid #e5e5e5;
		}
		.price {
			text-align: center;
			font-family: Arial-BoldMT;
			font-size: 20px;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0px;
			color: #f39800;
		}
	}
	
	.table {
		border: 1px solid #e5e5e5;
		border-bottom: 0;
		border-top: none;
		border-right: none;
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
		padding-left: 30px;
		border-left: 4px solid #fdf2f1;
		padding-bottom: 40px;
	}
	
	.head {
		width: 1200px;
		height: 44px;
		background-color: #f0f0f0;
		line-height: 44px;
		font-size: 16px;
		padding-left: 13px;
		line-height: 44px;
		box-sizing: border-box;
		color: #212121;
	}
	
	.coupon {
		margin-top: 20px;
		input {
			border-radius: 6px 0 0 6px;
			width: 220px;
			height: 37px;
			line-height: 37px;
			border: solid 1px #dcdcdc;
		}
		.btn {
			font-family: MicrosoftYaHei;
			font-size: 14px;
			text-align: center;
			color: #fff;
			display: inline-block;
			width: 86px;
			height: 40px;
			line-height: 40px;
			background-color: #4c9adb;
			border-radius: 0px 6px 6px 0;
		}
	}
	
	.count-price {
		text-align: right;
		margin-top: 20px;
		font-family: MicrosoftYaHei;
		font-size: 16px;
		color: #333;
		line-height: 36px;
		& > div {
			padding-left: 30px;
			span {
				color: #e1251b;
			}
		}
	}
	
	.tip {
		padding-left: 20px;
		font-size: 12px;
		color: #e7534b;
		img {
			width: 18px;
			height: 18px;
			vertical-align: middle;
			margin-right: 7px;
		}
	}
	
	.serve-contain {
		padding-top: 36px;
		span {
			position: relative;
			border: 1px solid #e9e9e9;
			margin: 20px 31px;
			width: 160px;
			height: 66px;
			display: inline-block;
			img {
				width: 160px;
				height: 66px;
			}
			&:hover {
				transform: translateY(-3px);
				box-shadow: 1px 1px 10px #999;
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
	
	.all {
		position: relative;
		margin-top: 65px;
		width: 1201px;
		padding: 0 57px;
		height: 68px;
		line-height: 68px;
		box-sizing: border-box;
		background-color: #f0f0f0;
		font-family: MicrosoftYaHei;
		font-size: 16px;
		.price {
			font-size: 24px;
			color: #e1251b;
		}
		.btn {
			position: absolute;
			right: 0;
			top: 0;
			width: 281px;
			height: 68px;
			background-image: linear-gradient(0deg, #db170d 0%, #ff6860 100%), linear-gradient( #e1251b, #e1251b);
			background-blend-mode: normal, normal;
			border-radius: 6px;
			font-family: Arial-BoldMT;
			font-size: 24px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 22px;
			letter-spacing: 0px;
			color: #ffffff;
			text-align: center;
			line-height: 68px;
			&:before {
				content: '';
				display: block;
				background: linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.4) 50%);
				background-size: 210% 100%;
				background-position: right bottom;
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				transition: all 1s;
				-webkit-transition: all 1s;
			}
			&:hover:before {
				background-position: left bottom;
			}
		}
	}
	
	/deep/ .left .el-form-item__content {
		margin-left: 0!important;
	}
</style>