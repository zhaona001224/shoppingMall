<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view :key="$route.fullPath"></router-view>
		</transition>
	</div>
</template>
<script>
	import { mapMutations, mapState } from "vuex";
	export default {
		name: "App",
		methods: { ...mapMutations(["CHANGE_SIZE"])
		},
		beforeMount() {
			this.CHANGE_SIZE(document.body.clientWidth);
		},
		watch: {
			$route: function(to, from) {
				if (to.fullPath.indexOf("Mobile") > 0 && document.documentElement.clientWidth >
					750) {
					this.$router.replace(to.fullPath.split("/Mobile")[1]);
				} else if (to.fullPath.indexOf("Mobile") < 0 && document.documentElement.clientWidth <
					750) {
					this.$router.replace("/Mobile" + to.fullPath);
				}
			},
		},
		beforeCreate() {
			var that = this;
			var deviceWidth = document.documentElement.clientWidth;
			if (deviceWidth < 750) {
				if (that.$route.fullPath.indexOf("Mobile") < 0) {
					that.$router.replace("/Mobile" + that.$route.fullPath);
				}
				document.documentElement.style.fontSize = deviceWidth / 3.75 + "px";
			} else {
				if (that.$route.fullPath.indexOf("Mobile") > 0) {
					that.$router.replace(that.$route.fullPath.split("/Mobile")[1]);
				}
				document.documentElement.style.fontSize = "";
			}
			window.addEventListener("resize", function() {
				return (() => {
					var deviceWidth = document.documentElement.clientWidth;
					if (deviceWidth < 750) {
						if (that.$route.fullPath.indexOf("Mobile") < 0) {
							that.$router.replace("/Mobile" + that.$route.fullPath);
						}
						document.documentElement.style.fontSize = deviceWidth / 3.75 + "px";
					} else {
						if (that.$route.fullPath.indexOf("Mobile") > 0) {
							that.$router.replace(that.$route.fullPath.split("/Mobile")[1]);
						}
						document.documentElement.style.fontSize = "";
					}
				})();
			});
		},
	};
</script>
<style>
	@import "/assets/css/public.css";
	body, html {
		padding: 0;
		margin: 0;
		overflow-y: auto;
		min-height: 100%;
		font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
	}
	
	li, ul, p {
		padding: 0;
		margin: 0;
	}
	
	.user-name:hover {
		color: #f2a506;
	}
	
	.common-page {
		width: 100%;
		box-sizing: border-box;
		padding: 0 15px;
		padding-bottom: 30px;
	}
	 .common-page   table{
		width: 100%;
		overflow: hidden;
	}
	.common-page .title {
		margin: 30px 0 30px;
		font-size: 22px;
		font-weight: 600;
	}
	
	.common-page .sub-title {
		margin: 20px 0 20px;
		font-size: 18px;
		font-weight: 600;
	}
	
	.common-page .nav {
		font-size: 16px;
		letter-spacing: 0px;
		color: #666666;
		margin: 20px 0;
	}
	
	.common-page img {
		width: 18px;
		height: 18px;
	}
	
	.common-page .content {
		color: #333;
		margin-bottom: 30px;
	}
	
	.user-name:hover a {
		color: #f2a506 !important;
	}
	
	.point.el-dropdown {
		margin-top: 12px;
		width: 97px;
		height: 27px;
		border: solid 1px rgba(255, 255, 255, 0.3);
		color: #f2a506;
		line-height: 27px;
		text-align: center;
	}
	
	.point {
		cursor: pointer;
	}
	
	.el-popover {
		min-width: auto;
	}
	
	.el-dropdown-menu.el-popper .el-dropdown-menu__item:focus, .el-dropdown-menu.el-popper .el-dropdown-menu__item:not(.is-disabled):hover {
		background-color: #000;
		color: #f2a506;
	}
	
	.el-popper .popper__arrow {
		display: none;
	}
	
	.el-dropdown-menu.el-popper, .el-popper .el-dropdown-menu__item {
		background-color: #000;
		color: #fff;
		padding-top: 0;
		padding-bottom: 0;
		border: none !important;
		/*padding: 0 20px;*/
	}
	
	.el-dropdown-menu.el-popper[x-placement^="bottom"] .popper__arrow::after {
		top: 1px;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #000;
	}
	/*.el-popper[x-placement^=bottom] .popper__arrow{
	    border-bottom-color: #000;
}*/
	
	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	
	.el-loading-spinner i {
		font-size: 20px;
	}
	
	.common-breadcrumb {
		background: transparent;
		padding-left: 0;
		padding: 0.2rem 0.15rem 0.2rem 0;
		margin-bottom: 0;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-transform: capitalize;
		font-size: 0.14rem;
	}
	
	.common-breadcrumb a {
		color: #666;
		text-decoration: none;
		outline: none;
	}
	
	@media (max-width: 750px) {
		#app {
			font-family: 'Barlow', Helvetica;
		}
	}
</style>