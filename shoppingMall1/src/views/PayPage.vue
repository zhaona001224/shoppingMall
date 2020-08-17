<template>
	<div>
		<div style="width: 1200px;margin:100px auto">
			<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > Shoppingcart</div>

			<div class="total head"><span class="custom-quantity">{{$t("language.good.shoppingCart")}}</span></div>
			<div class="table">
				<div class="th" v-for="(item,index) in cartList">
					<div style="width: 500px;padding-left: 29px;">{{item.gameName}}-{{item.serveName}}-{{item.productName}}</div>
					<div style="width: 290px;">
						<div class="select-num">
							<span v-if="item.type!='coin'" @click="down(item.productId,item.productName)" class="down">-</span>
							<input disabled="item.type=='coin'" type="number"  :style="item.type=='coin'?'border: solid 1px #dcdcdc;width:154px':''" min="0" v-model="item.productNum" class="show">
							<span v-if="item.type!='coin'" class="up" @click="up(item.productId,item.salePrice,item.productName,item.productImg,1)">+</span>
						</div>
					</div>
					<div style="width: 290px;text-align: center;color: #f39800;">
						{{currencyInfo.symbol}}{{item.salePrice*currencyInfo.rate}}
					</div>
					<div class="price" style="width: 247px;">{{currencyInfo.symbol}}{{(item.salePrice&&item.salePrice*item.productNum*currencyInfo.rate).toFixed(2)}}</div>
					<!--					<div class="price" style="width: 247px;" v-else>{{currencyInfo.symbol}}{{item.totalPrice*currencyInfo.rate}}</div>-->

					<div class="delete point" @click="deletePro(item.productId,item.productName)" style="width: 137px;text-align: center;vertical-align: -8px;"><img style="width: 20px;height: 22px;" src="../assets/image/icon/icon_delete.png" /></div>
				</div>
			</div>
			<div style="display: flex;justify-content: space-between;">
				<div class="coupon">
					<el-input @clear="disPrice=0;couponPrice={}" style="dispaly:inline-block;width:200px" placeholder="请输入优惠券码" v-model="couponCode" clearable>
					</el-input><span class="btn point" @click="apply">Apply</span>
				</div>
				<div class="count-price">
					<div>Product Price: <span class="price">{{currencyInfo.symbol}}{{(totalPice*currencyInfo.rate).toFixed(2)}}</span></div>
					<div>Coupon Discount: <span class="price">{{currencyInfo.symbol}}{{(disPrice*currencyInfo.rate).toFixed(2)}}</span></div>
					<div>Total Amount：<span class="price">{{currencyInfo.symbol}}{{((totalPice*1-disPrice*1)*currencyInfo.rate).toFixed(2)}}</span></div>
				</div>
			</div>
			<div class="step"><span>1</span>{{$t("language.good.orderInformation")}}</div>
			<div class="step-line">
				<el-form style="padding-top:30px" ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
					<el-row>
						<el-col :span="8">
							<el-form-item :label='$t("language.user.email")' prop="email">
								<el-input placeholder="" v-model="form.email">
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="16" style="display: flex;">
							<el-form-item label='Social Link:' prop="link" style="width:344px">
								<el-select :clearable="true" v-model="form.link1">
									<el-option v-for="subItem in selectList" :key="subItem" :label="subItem" :value="subItem">
									</el-option>
								</el-select>

							</el-form-item>
							<el-form-item prop="link" class="left">
								<el-input placeholder="" v-model="form.link">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>

				</el-form>
			</div>
			<div class="step"><span>2</span>{{$t("language.good.playerInformation")}}</div>
			<div class="step-line ">
				<el-form style="padding-top:30px" ref="form" :model="form" :rules="rules" label-width="35%" label-position="right">
					<el-row>
						<el-col :span="8">
							<el-form-item label='Character Name' prop="payer">
								<el-input placeholder="" v-model="form.payer">
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="tip"><img src="../assets/image/icon/icon_tip.png" />Caution: Content content content.</div>
			</div>
			<div class="step"><span>3</span>{{$t("language.good.paymentMethod")}}</div>

			<div class="step-line serve-contain" style="border-left: none;">
				<span v-if="item.icon" v-for="(item,index) in payList" :key="index" @click="selectIndex=index" :class="index==selectIndex?'active point':'point'">
							<img  :src="item.icon.indexOf('http')>-1?item.icon:require('@/assets/image/payPage/'+item.icon+'.jpg')"/>
					</span>
			</div>
			<div class="all">
				<span>Total Item: <span class="price" style="margin-right: 100px;">{{totalNum}}</span></span><span> Total Amount：<span class="price">{{currencyInfo.symbol}}{{(totalPice*currencyInfo.rate).toFixed(2)}}</span></span>
				<span class="btn point" @click="pay()">Pay  Now</span>
			</div>
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
				payList: [{
					icon: "https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_credit_logo_h_200x51.png",
					func: '1',
					str: 'BILLING'
				}, {
					icon: "https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png",
					func: '1',
					str: ''
				}, {
					icon: "icon_pay2",
					func: '2',
					str: 'paysafecard'
				}, {
					icon: "icon_pay3",
					func: '2',
					str: 'ebanking_my'
				}, {
					icon: "icon_pay4",
					func: '2',
					str: 'dotpay_pl'
				}, {
					icon: "https://www.skrill.com/fileadmin/content/images/brand_centre/Payment_Options_by_Skrill/skrill-powered-visa_120x60.png",
					func: '3',
					str: 'ACC,VSA,MSC,VSE,MAE'
				}, {
					icon: "icon_pay6",
					func: '3',
					str: 'ACC'
				}, {
					icon: "",
					func: '3',
					str: 'ACC'
				}],
				selectIndex: 0,
				totalNum: 0,
				couponList: [],
				couponCode: '',
				disPrice: 0,
				selectList: ['facebook', 'whatsapp', 'twitter'],
				couponPrice: {

				},
				rules: {
					email: [{
							message: "Please fill in email",
							required: true,
							trigger: 'blur'
						},
						{
							message: "Please fill in correct email",
							pattern: ptn.email(0, 40),
							trigger: 'blur'
						}
					],
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
				}

			};
		},

		computed: {
			...mapState(['cartList', 'currencyInfo']),
			totalPice() {
				this.totalNum = 0;
				var price = 0;
				this.cartList.map((item) => {
					//					if(item.type == "coin") {
					//						price = price + item.totalPrice
					//					} else {
					//						price = price + item.productNum * item.salePrice
					//					}
					price = price + item.productNum * item.salePrice
					this.totalNum = this.totalNum + item.productNum;

				})
				if(this.couponPrice.price && this.cartList.length > 0) {
					if(this.couponPrice.type == 1) {
						this.disPrice = price * 1 * this.couponPrice.price * 1 / 100
					} else {
						this.disPrice = this.couponPrice.price * 1
					}
				}
				return price
			},
		},
		methods: {
			...mapMutations(['ADD_CART', 'REDUCE_CART', 'EDIT_CART']),
			deletePro(id, productName) {
				this.EDIT_CART({
					productId: id,
					productName: productName
				})

			},
			down(id, productName) {
				this.REDUCE_CART({
					productId: id,
					productName: productName
				})

			},
			up(id, price, name, img, productNum) {
				this.ADD_CART({
					productId: id,
					salePrice: price,
					productName: name,
					productImg: img,
					productNum: productNum
				})

			},
			pay() {
				var that = this;
				if(!this.form.email) {
					that.$message.error("Please fill in form！");
					return
				}
				if(!this.form.link) {
					that.$message.error("Please fill in form！");
					return
				}
				this.$refs.form.validate((valid) => {

					if(valid) {
						if(this.payList[this.selectIndex].func == 1) {
							this.pay1(this.payList[this.selectIndex].str);
						} else if(this.payList[this.selectIndex].func == 2) {
							this.pay2(this.payList[this.selectIndex].str);
						} else {
							this.pay3(this.payList[this.selectIndex].str);
						}
					} else {
						that.$message.error("Please fill in form！");
					}
				})
			},
			pay1(str) {

				var that = this;
				var itemList = []
				this.cartList.map((item) => {
					itemList.push({
						"name": item.productName,
						"quantity": item.productNum + '',
						method: str,
						"unit_amount": {
							"currency_code": this.currencyInfo.name,
							"value": (item.salePrice*this.currencyInfo.rate).toFixed(2) + ''
						},
						"description": ''

					})
				})

				var params = {
					email: this.form.email,
					payer: "paypal",
					comments: this.form.payer,
					method: "BILLING",
					item_list: [{
						"reference_id": "",
						"amount": {
							"currency_code": this.currencyInfo.name,
							"value": (this.totalPice*this.currencyInfo.rate) + '',
							"breakdown": {
								"item_total": {
									"currency_code": this.currencyInfo.name,
									"value": (this.totalPice*this.currencyInfo.rate).toFixed(2) + '',
								}
							},
							"items": itemList,
							"customer_id": "",
							"description": this.form.link + this.form.link1,
							"shipping": {

							}
						}

					}]
				}
				getPay(params).then(response => {
					if(response.retCode == 0) {
						window.open(response.data.redirect_url)
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			pay2(type) {
				var that = this;
				var params = {
					"pm_id": type,
					amount: (this.totalPice*this.currencyInfo.rate).toFixed(2) + '',
					currency: this.currencyInfo.name,
					"description": this.form.link + this.form.link1,
					payer_email: this.form.email,
					payer_name: this.form.payer

				}
				getPay2(params).then(response => {
					if(response.retCode == 0) {
						window.open(response.data.redirect_url)
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})

			},
			pay3(type) {
				var that = this;

				var params = {
					"amount": (this.totalPice*this.currencyInfo.rate).toFixed(2) + '',
					"currency": this.currencyInfo.name,
					"description": this.form.link + this.form.link1,
					"payer_email": this.form.email,
					"address": "",
					"city": "",
					"country": "",
					"phone_number": "",
					"payment_methods": "ACC",
					"firstname": "",
					"lastname": "",
					"logo_url": "http://193.22.152.235:8080/admin/v1/file?id=17",
					"language": "US",
				}
				getPay3(params).then(response => {
					if(response.retCode == 0) {
						window.open(response.data.redirect_url)
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})

			},

			apply() {
				if(!this.couponCode){
					return
				}
				var data = this.couponList.filter((item) => {

					return item.code == this.couponCode
				})
				
				if(data.length == 0) {
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid'
					});
					this.couponPrice = 0;
					this.disPrice=0;
					return
				}
				var cart = this.cartList.filter((item) => {
					var id = data[0].game.split(',')[0];
					return id == item.gameId
				})
				if(cart.length > 0) {
					var startTime = new Date(data[0].starttime + ':00');
					var endTime = new Date(data[0].endtime + ':00');
					if(new Date() >= startTime && new Date() <= endTime) {
						this.couponPrice = data[0]
					} else {
						this.couponPrice = 0;
							this.disPrice=0;
						this.$message({
							type: 'warning',
							message: 'Coupon is not valid'
						});
					}
				} else {
					this.couponPrice = 0;
						this.disPrice=0;
					this.$message({
						type: 'warning',
						message: 'Coupon is not valid'
					});
				}

			},
			countNum(num) {
				this.newArray = JSON.parse(JSON.stringify(this.discountList)).reverse()
				this.newArray.map((item, index) => {
					if(num == 0) return
					if(index == this.newArray.length - 1) {
						num * 1 < item.qty;
						item.buyNum = 1;
						num = 0
						return
					}
					if(num * 1 / item.qty > 1) {
						item.buyNum = parseInt(num * 1 / item.qty);
						num = num * 1 % item.qty
					}

				})
			},
			getServe() {
				//获取game
				getTemplete('?type=Server&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						response.data = response.data || []
						this.serveList = response.data.filter((item) => {
							var id = item.game.split(',')[0]
							return id = localStorage.getItem('gameId')
						})
						this.imgUrl = window.imgUrl;
						this.selectServeData = this.serveList[0];
						this.serveId = this.serveList && this.serveList[0].id
						this.getItem();
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},

			getItem() { //获取item
				getTemplete('?type=Product&offset=-1&count=-1').then(response => {
					if(response.retCode == 0) {
						this.itemList = [];
						this.selectServeData.coins && JSON.parse(this.selectServeData.items).map((subItem) => {
							response.data.map((item) => {
								if(item.id == subItem.split(',')[0] && item.type == "coin,coin") {
									this.itemList.push(item)
								}

							})
						})

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
					if(response.retCode == 0) {
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
			this.getCoupn();
		},
		watch: {
			cartList(a, b) {
				this.couponCode = ''
				this.apply();
			}
		},

	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.nav {
		font-family: ArialMT;
		font-size: 14px;
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
	
	.down,
	.up {
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
		font-family: ArialMT;
		font-size: 14px;
		color: #666;
		&>div {
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
		&>div {
			padding-left: 30px;
			span {
				color: #e1251b;
			}
		}
	}
	
	.tip {
		padding-left: 20px;
		font-family: ArialMT;
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
			width: 210px;
			height: 66px;
			display: inline-block;
			img {
				width: 210px;
				height: 66px;
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
		}
	}
	
	/deep/ .left .el-form-item__content {
		margin-left: 0!important;
	}
</style>