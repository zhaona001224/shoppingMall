<template>
	<div>
		<div class="nav"> <img src="../../assets/image/icon/icon_home.png" />Home > NewsList></div>
		<div
		 style="padding:0 15px;background: #f5f5f5;">
			<div class="section-title upper-center"> <img src="../../assets/image/icon/icon-news.png" alt="news"> <span class="line-red">News</span>				</div>
			<div class="new-contain" v-if="newsList.length > 0">
				<div class="contain">
					<div class="li point" @click="goDetail(item)" v-for="(item, index) in newsList"
					 :key="item.id">
						<div class="title"> {{ item.title }} </div>
						<div class="text" v-html="item.content"></div>
						<div class="date"> {{ item.updated }} </div>
					</div>
				</div>
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
				newsList: [],
			};
		},
		methods: {
			goDetail(item) {
				localStorage.setItem("newData", JSON.stringify(item));
				this.$router.push("/Mobile/newDetail")
			},
		},
		computed: { ...mapState(["login", "showMoveImg", "showCart", "currencyInfo"]),
		},
		created() {
			//获取news
			getTemplete("?type=News&offset=-1&count=-1").then((response) => {
				if (response.retCode == 0) {
					this.newsList = response.data;
					this.newsList && this.newsList.map((item) => {
						item.content = item.text.substr(0, 400) + '...'
						item.updated = this.$util.formatTime(item.updated,
							"YYYY-MM-DD HH:mm:ss");
					});
				} else {
					this.$message({
						type: "warning",
						message: response.message,
					});
				}
			});
		},
	};
</script>
<style lang="less" scoped="">
	.section-title.upper-center {
		text-transform: uppercase;
		text-align: center;
	}
	
	.index-section .section-title img {
		max-width: 66px;
	}
	
	.section-title.upper-center span {
		display: block;
		position: relative;
		text-align: center;
		padding-bottom: 10px;
		color: #434d53;
		font-size: 0.3rem;
	}
	
	.new-contain {
		padding-top: 35px;
		.li {
			.title {
				font-size: 0.16rem;
				color: #34495e;
				font-weight: bold;
				padding-bottom: 0.05rem;
			}
			padding-bottom:0.45rem;
			.date {
				text-align: right;
				margin-top: 0.1rem;
			}
		}
	}
</style>