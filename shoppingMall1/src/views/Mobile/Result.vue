<template>
	<div>
		<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > 	Result</div>
		
	<div style="padding:0 15px;background: #f5f5f5;">
		 class="content"> <img v-if="status==1" style="margin-top: 0.1rem;" src="../../assets/image/icon/icon_success.png"
			/> <img v-else style="margin-top:0.1rem;" src="../../assets/image/icon/icon_fail.png"
			/>
			<div class="tip">{{msg}}</div>
			<div class="order">Order No:<span>{{orderno}}</span></div>
			<div class="email">You can check your email:<span>{{userInfo.email}}</span> to view the order details</div>
	</div>
	</div>
	
	</div>
</template>
<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				status: 1,
				orderno: 0,
				msg: '',
				userInfo: {}
			};
		},
		methods: {},
		computed: { ...mapState(["userInfo"])
		},
		created() {
			this.status = this.$route.query.status;
			this.orderno = this.$route.query.orderno;
			this.msg = this.$route.query.msg;
		},
		mounted() {
			//			var deleteNode =document.querySelector(".trustedsite-track-conversion");
			//			deleteNode['orderid']=22
			//			deleteNode['type']="purchase"
			//			 data-type="purchase"
			// data-orderid="[order id]"
			// data-email="[customer@example.com]"
			// data-firstname="[Customer First Name]"
			// data-lastname="[Customer Last Name]"
			// data-country="[US]"
			// data-state="[CA]
		}
	}
</script>
<style lang="less" scoped="">
	.content {
		text-align: center;
		background-color: #ffffff;
		padding: 15px;
		margin-bottom: 15px;
		img{
			width: 2rem;
		}
		.tip {
			font-family: Arial-BoldMT;
			font-size: 0.2rem;
			margin-bottom: 0.3rem;
			letter-spacing: 0px;
			color: #666666;
		}
		.order {
			font-family: Odd Numbers;
			font-size: 0.2rem;
			margin-bottom:0.2;
			letter-spacing: 0px;
			color: #999999;
			span {
				color: #feba00;
			}
		}
		.email {
			font-size: 0.2rem;
			line-height: 30px;
			letter-spacing: 0px;
			color: #666666;
			span {
				color: #0d08f4;
			}
		}
	}
</style>