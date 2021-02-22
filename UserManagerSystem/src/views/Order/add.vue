<template>
	<div class="add" style="width: 850px;overflow-y: scroll;">
		<el-form ref="form" style="background: #efefef;padding:20px;">
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="Orderid :">
						<div style="margin-right: 40px;">{{extraData.vendor==='paypal'?transaction_info.invoice_id:JSON.parse(extraData.notify_info).order_id}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="User :">
						<div style="margin-right: 40px;">{{extraData.user}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="Comments :">
						<div style="margin-right: 40px;">{{extraData.notify_info&&JSON.parse(extraData.notify_info).request_info}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="contactInfo :">
						<div style="margin-right: 40px;">{{extraData.notify_info&&JSON.parse(extraData.notify_info).contact_info}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="First Name:">
						<div style="margin-right: 40px;">{{payer_info.payer_name&&payer_info.payer_name.given_name}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Last Name:">
						<div style="margin-right: 40px;">{{payer_info.payer_name&&payer_info.payer_name.surname}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="Business Name:">
						<div style="margin-right: 40px;"></div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Address Name:">
						<div style="margin-right: 40px;">{{shipping_info.name}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="Address Street:">
						<div style="margin-right: 40px;">{{shipping_info.address&&shipping_info.address.line1}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Address City:">
						<div style="margin-right: 40px;">{{shipping_info.address&&shipping_info.address.city}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="Address postCode:">
						<div style="margin-right: 40px;">{{shipping_info.address&&shipping_info.address.postal_code}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Address Country:">
						<div style="margin-right: 40px;">{{shipping_info.address&&shipping_info.address.country_code}}</div>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-form ref="form" v-if="extraData.vendor==='paypal'" style="background: #efefef;padding:20px;margin-top: 20px;">
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="PayerId">
						<div style="margin-right: 40px;">{{transaction_info.paypal_account_id}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Payer Email:">
						<div style="margin-right: 40px;">{{payer_info.email_address}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="Payer Status:">
						<div style="margin-right: 40px;">{{payer_info.payer_status==="Y"?'verified ':'unverified'}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Address Status:">
						<div style="margin-right: 40px;">{{payer_info.address_status==="Y"?'confirmed ':'unconfirmed'}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row style="height:40px" v-if="extraData.vendor==='paypal'">
				<el-col :span="12">
					<el-form-item label="Trans. ID:">
						<div style="margin-right: 40px;">{{transaction_info.transaction_id}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Parent Trans. ID:">
						<div style="margin-right: 40px;">{{transaction_info.transaction_subject}}</div>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-form ref="form" v-if="extraData.vendor==='paypal'" style="background: #efefef;padding:20px;margin-top: 20px;">
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="Payment Status:">
						<div style="margin-right: 40px;">{{transaction_info.transaction_status}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Payment Date:">
					<div style="margin-right: 40px;">{{transaction_info.transaction_updated_date&&dateFormat(transaction_info.transaction_updated_date, 'yyyy-MM-dd HH:mm:ss')}}</div>
				</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-form ref="form" style="background: #efefef;padding:20px;margin-top: 20px;">
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="Currency:">
						<div style="margin-right: 40px;">{{extraData.vendor==='paypal'?transaction_info.transaction_amount&&transaction_info.transaction_amount.currency_code:extraData.notify_info&&JSON.parse(extraData.notify_info).currency}}</div>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="Gross Amount:">
						<div style="margin-right: 40px;">{{extraData.vendor==='paypal'?transaction_info.transaction_amount&&transaction_info.transaction_amount.value:extraData.notify_info&&JSON.parse(extraData.notify_info).amount}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			
			<el-row style="height:40px">
				<el-col :span="12">
					<el-form-item label="Payment Fee:">
						<div style="margin-right: 40px;">{{extraData.vendor==='paypal'?transaction_info.fee_amount&&transaction_info.fee_amount.value:extraData.notify_info&&JSON.parse(extraData.notify_info).payment_fee}}</div>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-table :data="JSON.parse(extraData.description)" v-if="extraData.description"
				 width="100%">
					<el-table-column header-align="left" prop="game" label="game"> </el-table-column>
					<el-table-column header-align="left" prop="category" label="category">
					</el-table-column>
					<el-table-column header-align="left" prop="server" label="server">
					</el-table-column>
					<el-table-column header-align="left" prop="product" label="product">
					</el-table-column>
					<el-table-column header-align="left" prop="unit_price" label="unit_price">
					</el-table-column>
					<el-table-column header-align="left" prop="quantity" width="80" label="quantity">
					</el-table-column>
				</el-table>
			</el-row>
			<div style="width: 100%;height: 300px;"></div>
		</el-form>
	</div>
</template>
<script>
	import { ptn } from '@/utils/common/validate'
	import E from "wangeditor";
	export default {
		name: 'Add',
		data() {
			return {
				data: {},
				extraData: {},
				shipping_info: {},
				payer_info: {},
				transaction_info: {},
				loading: false
			}
		},
		methods: {
			//			dateFormat(item.request_time, 'yyyy-MM-dd HH:mm:ss')
			dateFormat(date, format) {         
				date = new Date(date);         
				date.setHours(date.getHours() - 14);         
				var o = {             
					'M+': date.getMonth() + 1, //month
					             'd+': date.getDate(), //day
					             'H+': date.getHours(), //hour
					             'm+': date.getMinutes(), //minute
					             's+': date.getSeconds(), //second
					             'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
					             'S': date.getMilliseconds() //millisecond
					         
				};         
				if (/(y+)/.test(format))              format = format.replace(RegExp.$1, (
					date.getFullYear() + '').substr(4 - RegExp.$1.length));         
				for (var k in o)             
					if (new RegExp('(' + k + ')').test(format)) {                 
						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' +
							o[k]).substr(('' + o[k]).length));             
					}         
				return format;      
			},
			getTransactionData(id) {
				this.$get("/payment/paypal/info/" + id, {}).then(response => {
					this.loloading = false
					if (response.retCode == 0) {
						this.shipping_info = response.data.shipping_info;
						this.payer_info = response.data.payer_info;
						this.transaction_info = response.data.transaction_info;
						this.data = response.data;
					} else {
						this.$message({
							message: response.msg,
							type: 'warning'
						})
					}
				})
			},
		},
		created() {
			this.extraData = JSON.parse(localStorage.getItem('selectData'))
			if(this.extraData.vendor==='paypal'){
				this.getTransactionData(this.$route.query.id)
			}
			
		}
	}
</script>
<style scoped="">
	/deep/ .el-form-item {
		margin-bottom: 0;
	}
	
	/deep/ .el-form-item__content > div {
		text-align: right;
	}
</style>