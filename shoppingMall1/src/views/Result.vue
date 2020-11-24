<template>
	<div style="width: 1200px;margin:0 auto">
		<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > Shoppingcart</div>
		<div class="content">
			<img v-if="status==1" style="margin-top: 28px;" src="../assets/image/icon/icon_success.png" />
			<img v-else style="margin-top: 28px;" src="../assets/image/icon/icon_fail.png" />
			<div class="tip" >{{msg}}</div>
			<div class="order">Order No:<span>{{orderno}}</span></div>
			<div class="email">You can check your email:<span>{{userInfo.email}}</span> to view the order details</div>
		</div>
	</div>
</template>

<script>
		import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
					status:1,
					orderno:0,
					msg:''
			};
		},
		methods: {

		},
		computed: {
			...mapState(["userInfo"])
			
		},
		created() {
			this.status=this.$route.query.status;
			this.orderno=this.$route.query.orderno;
			this.msg=this.$route.query.msg;
		}

	}
</script>
<style lang="less" scoped="">
	@import "../assets/css/public.css";
	.nav {
		
		font-size: 14px;
		letter-spacing: 0px;
		color: #666666;
		margin: 20px 0;
		img {
			width: 18px;
			height: 18px;
		}
	}
	
	.content {
		text-align: center;
		width: 1200px;
		height: 625px;
		background-color: #ffffff;
		border: solid 1px #d2d2d2;
		.tip {
			font-family: Arial-BoldMT;
			font-size: 24px;
			margin-bottom: 30px;
			letter-spacing: 0px;
			color: #666666;
		}
		.order{
			font-family: Odd Numbers;
			font-size: 24px;
			margin-bottom: 30px;
			letter-spacing: 0px;
			color: #999999;
			span{
				color: #feba00;
			}
		}
		.email{
			
			font-size: 24px;
			line-height: 40px;
			letter-spacing: 0px;
			color: #666666;
			span{
				color:#0d08f4;
			}
		}
	}
</style>