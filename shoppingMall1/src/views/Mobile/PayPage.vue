<template>
	<div>
		<div>
			<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > Shoppingcart</div>
			<div
			 class="main-title"><span class="border-style"></span>{{$t("language.good.shoppingCart")}}</div>
		<div
		 class="table">
			<div class="th" v-for="(item,index) in cartList">
				<!-- {{item.detail}} -->
				<div class="left">
					<div class="text">{{item.gameName}}-{{item.categoryName}}-{{item.serveName}}-{{item.productName}}
						<span v-if="item.detail&&item.detail.unit">{{item.detail.unit}}</span> </div>
					<div style="display: flex;align-items: center;margin-top: 0.12rem;"> <span class="select-num"> <span @click="down(item,item.productId,item.productName)" class="down">-</span>						<input @change="changeNum(index)" type="number" onkeyup="this.value=this.value.replace(/\D/g,'')"
						 onafterpaste="this.value=this.value.replace(/\D/g,'')" :min="item.detail?item.detail.miniNumber:0"
						 v-model="item.productNum" class="show"> <span class="up" @click="up(item,item.productId,item.salePrice,item.productName,item.productImg,1)">+</span>						</span> <span class="price"> {{currencyInfo.symbol}}{{(item.salePrice*currencyInfo.rate).toFixed(2)}} </span>						</div>
				</div>
				<div class="right">
					<div class="price">{{currencyInfo.symbol}}{{(item.salePrice&&item.salePrice*item.productNum*currencyInfo.rate).toFixed(2)}}</div>
					<!--					<div class="price" style="width: 247px;" v-else>{{currencyInfo.symbol}}{{item.totalPrice*currencyInfo.rate}}</div>-->
					<div class="delete point" @click="deletePro(item.productId,item.productName)"><img src="../../assets/image/mobile/delete.png" /></div>
				</div>
			</div>
	</div>
	<div class="coupon">
		<el-input @clear="disPrice=0;couponPrice={}" style="dispaly:inline-block;width:400px"
		 :placeholder="$t('language.user.codeHolder')" v-model="couponCode" clearable> </el-input><span class="btn point" @click="apply">Apply</span> </div>
	<div class="price-contain">
		<div>Product Price: <span class="price">{{currencyInfo.symbol}}{{totalPrice}}</span></div>
		<div>Coupon Discount: <span class="price">{{currencyInfo.symbol}}{{disPrice}}</span></div>
		<div>Payment Fee: <span class="price">{{currencyInfo.symbol}}{{payFee}}</span></div>
	</div>
	<div class="total-price">Total Amount: <span class="price">{{currencyInfo.symbol}}{{(totalPrice*1-disPrice*1+payFee*1).toFixed(2)}}</span></div>
	<div class="split"></div>
	<div class="main-title"><span class="border-style"></span>{{$t("language.good.orderInformation")}}</div>
	<div class="step-line">
		<el-form class="form" ref="form" :model="form" :rules="rules" label-width="100%"
		 label-position="top">
			<el-row>
				<el-form-item :label='$t("language.user.email")' prop="email">
					<el-input placeholder="" v-model="form.email"> </el-input>
				</el-form-item>
			</el-row>
			<el-row style="position: relative;">
				<el-form-item label='IM:' prop="link">
					<el-select  placeholder="Please Select" style="width:1.26rem" :clearable="true" v-model="form.link1">
						<el-option v-for="subItem in selectList" :key="subItem" :label="subItem" :value="subItem">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="link" class="left position-style">
					<el-input style="width:1.9rem;" placeholder="" v-model="form.link"> </el-input>
				</el-form-item>
			</el-row>
		</el-form>
	</div>
	<div class="split"></div>
	<div class="main-title"><span class="border-style"></span>{{$t("language.good.playerInformation")}}</div>
	<div class="step-line ">
		<el-form class="form" ref="form" :model="form" :rules="rules" label-position="top">
			<el-row>
				<el-form-item :label='productInfo.customerLabel' prop="payer">
					<el-input placeholder="" v-model="form.payer"> </el-input>
				</el-form-item>
			</el-row>
		</el-form>
		<div class="tip" v-if="productInfo.customerCaution"><img src="../../assets/image/icon/icon_tip.png" />{{productInfo.customerCaution}}</div>
	</div>
	<div class="split"></div>
	<div class="main-title"><span class="border-style"></span>{{$t("language.good.paymentMethod")}}</div>
	<div
	 class="step-line serve-contain">
		<div class="li" v-for="(item,index) in payList" :key="index" @click="selectIndex=index">
		<span :class="index==selectIndex?'active point':'point'">
							<img  :src="imgUrl+item.img_url"/> </span>
			<div style="text-align: center;">{{item.note}}</div>
		</div>
		</div>
		<div class="all"> <span> Total Amount：<span class="price">{{currencyInfo.symbol}}{{(totalPrice*1-disPrice*1+payFee*1).toFixed(2)}}</span></span>
		</div>
		<div class="btn-bottom point" @click="pay()">Pay Now</div>
		<div class="trustedsite-trustmark" data-type="204"></div>
		</div>
		</div>
</template>
<script>
	import { getTemplete } from '../../api/common.js'
	import { getPay, getPay2, getPay3 } from '../../api/product.js'
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
				selectList:  ['Discord', 'Skype','Phone',  'Whatsapp','Facebook-Message','Instagram','Telegram',
        'ICQ','Line', 'Snapchat','QQ', 'Wechat'],
				couponPrice: {},
				feeRate: [],
				productInfo: {},
				rules: {
					email: [{
						message: "Please fill in email",
						required: true,
						trigger: 'blur'
					}, {
						pattern: ptn.email(0,40),
						message: "Please fill in correct email",
						trigger: 'blur'
					}],
					payer: [{
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
						var price1 = (item.totalPrice * this.currencyInfo.rate).toFixed(2) * 1
					} else {
						var price1 = (item.productNum * item.salePrice * this.currencyInfo.rate)
							.toFixed(2) * 1
					}
					price = price + price1
					this.totalNum = this.totalNum * 1 + item.productNum
				})
				if (this.couponPrice.price && this.cartList.length > 0) {
					if (this.couponPrice.type == 1) {
						this.disPrice = ((price * 1 * this.couponPrice.price * 1 / 100) * 1 *
							this.currencyInfo.rate).toFixed(2) * 1
					} else {
						this.disPrice = ((this.couponPrice.price * 1) * this.currencyInfo.rate).toFixed(
							2) * 1
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
				return (price * 1).toFixed(2) * 1
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
				if (this.cartList[index].detail && this.cartList[index].productNum * 1 <
					this.cartList[index].detail.miniNumber* 1) {
					this.$message({
						type: 'error',
						message: "The minimum quantity is " + this.cartList[index].detail.miniNumber* 1
					});
					this.cartList[index].productNum = this.cartList[index].detail.miniNumber *
						1;
					return
				}
					this.EDIT_CART({
					productId: this.cartList[index].productId,
					productName: this.cartList[index].productName,
					productNum: this.cartList[index].productNum* 1
				})
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
					email: this.form.email.trim(),
					request_info: this.productInfo.customerLabel + ':' + this.form.payer,
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
							message: response.msg
						});
					}
				})
			},
			apply() {
				if (!this.couponCode) {
					return
				}
				var data = this.couponList.filter((item) => {
					console.log(item.code.toLowerCase())
					console.log(this.couponCode.toLowerCase())
					return item.code.toLowerCase() == this.couponCode.toLowerCase()
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
				if (this.totalPrice * 1 < data[0].initial_amount * this.currencyInfo.rate) {
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid right now，total amount >' + data[0].initial_amount *
							this.currencyInfo.rate
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
					var startTime = new Date(data[0].starttime.replace(/-/g,'/') + ':00');
					var endTime = new Date(data[0].endtime.replace(/-/g,'/') + ':00');
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
				} else {
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
							message: response.msg
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
						this.gameList = data[0]
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
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
							message: response.msg
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
	@import "../../assets/css/public.css";
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
	
	.table {
		padding: 0 0.25rem;
		.th {
			display: flex;
			font-size: 0.12rem;
			color: #333333;
			padding: 0.1rem;
			align-items: center;
			background: #f5f5f5;
			margin-bottom: 5px;
			.left {
				width: 60%;
				.select-num {
					text-align: center;
					display: flex;
					align-items: center;
					border-radius: 3px;
					color: #aaa;
					input {
						text-align: center;
						width: 0.4rem;
						height: 0.2rem;
						background-color: #fff;
						line-height: 0.2rem;
						font-size: 0.12rem;
						padding: 0;
						color: #666;
						position: relative;
						border: none;
						
						border-top: solid 1px #dcdcdc;
						border-bottom: solid 1px #dcdcdc;
						border-radius: 0;
					}
				}
				.down, .up {
					display: inline-block;
					width: 0.2rem;
					height: 0.2rem;
					line-height: 0.2rem;
					cursor: pointer;
					border: solid 1px #dcdcdc;
				}
				.price {
					color: #f39800;
					margin-left: 10px;
				}
			}
			.right {
				width: 40%;
				display: flex;
				justify-content: flex-end;
				.price {
					text-align: center;
					font-size: 0.14rem;
					font-weight: normal;
					font-stretch: normal;
					letter-spacing: 0px;
					color: #e1251b;
				
					font-weight: bold;
					margin-right: 0.2rem;
				}
				.delete {
					img {
						width: 0.17rem;
						height: 0.17rem;
					}
				}
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
	
	.position-style {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	.step-line {
		padding: 0 0.25rem;
		.form {
			/deep/ .el-input__inner {
				height: 0.34rem;
				background-color: #f5f5f5;
				border: solid 1px #c9c9c9;
				line-height: 0.34rem;
			}
			/deep/ .el-form-item__label {
				line-height: 10px;
			}
			.el-form-item {
				margin-bottom: 15px;
			}
		}
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
		margin: 0.21rem 0.25rem 0;
		display: flex;
		/deep/ input {
			height: 0.34rem;
			line-height: 0.34rem;
			background-color: #f5f5f5;
			border: solid 1px #c9c9c9;
			border-radius: 0;
			font-size: 0.13rem;
			color: #999;
		}
		.btn {
			flex-shrink: 0;
			font-family: MicrosoftYaHei;
			font-size: 0.13rem;
		
			font-weight: bold;
			text-align: center;
			color: #fff;
			display: inline-block;
			width: 0.75rem;
			height: 0.34rem;
			line-height: 0.34rem;
			background-color: #4c9adb;
			border-radius: 0px 3px 3px 0;
		}
	}
	
	.price-contain {
		margin: 0 0.25rem;
		padding: 0.15rem 0;
		font-size: 0.14rem;
		letter-spacing: 0px;
		color: #999999;
		border-bottom: 1px solid #dcdcdc;
		& > div {
			display: flex;
			justify-content: space-between;
			margin-bottom: 5px;
		}
		span {
			
			font-weight: 600;
			color: #666;
		}
	}
	
	.total-price {
		padding: 0.15rem 0.25rem;
		text-align: right;
		font-size: 0.18rem;
		color: #999;
		.price {
			color: #e1251b;
			margin-left: 8px;
			
			font-weight: 600;
		}
	}
	
	.tip {
		margin-bottom: 12px;
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
		display: flex;
		justify-content: space-between;
		flex-flow: wrap;
		.li {
			width: 1.35rem;
		}
		span {
			position: relative;
			border: 1px solid #e9e9e9;
			margin: 10px;
			width: 1.35rem;
			height: 0.5rem;
			display: inline-block;
			margin-bottom: 0.1rem;
			img {
				width: 1.35rem;
				height: 0.5rem;
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
					background: url(../../assets/image/icon/icon_check.png);
				}
			}
		}
	}
	
	.all {
		position: relative;
		padding: 0.75rem 0.25rem 0.25rem;
		text-align: center;
		font-size: 0.18rem;
	
		font-weight: bold;
		color: #666;
		.price {
			font-size: 24px;
			color: #e1251b;
		}
	}
	
	.btn-bottom {
		margin: 0.25rem 0.25rem 0.37rem;
		height: 0.5rem;
		background-color: #e1251b;
		border-radius: 5px;
		color: #ffffff;
		text-align: center;
		line-height: 0.5rem;
		color: #fff;
	
		font-size: 0.18rem;
		font-weight: bold;
	}
	
	/deep/ .left .el-form-item__content {
		margin-left: 0!important;
	}
</style>