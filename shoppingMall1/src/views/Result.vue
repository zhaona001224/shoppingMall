<template>
	<div style="width: 1200px;margin:0 auto">
		<div class="nav"><img src="../assets/image/icon/icon_home.png" />Home > Shoppingcart</div>
		<div class="content">
			<img style="margin-top: 28px;" src="../assets/image/icon/icon_success.png" />
			<div class="tip">Congratulations, Payment successful !</div>
			<div class="order">Odd Numbers:<span>21212121</span></div>
			<div class="email">You can check your email<span>Tom86@gmail.com</span> to view the order details</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {

		},

		created() {

		}

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
			font-family: ArialMT;
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