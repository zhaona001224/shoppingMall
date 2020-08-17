<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view :key="$route.fullPath"></router-view>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	@import "/assets/css/public.css" body,
	html {
		padding: 0;
		margin: 0;
		overflow-y: auto;
	}
	
	.el-dropdown {
		margin-top: 12px;
		width: 97px;
		height: 27px;
		border: solid 1px rgba(255, 255, 255, 0.3);
		color: #fff;
		line-height: 27px;
		text-align: center;
	}
	
	.point {
		cursor: pointer;
	}
	
	.el-dropdown-menu.el-popper .el-dropdown-menu__item:focus,
	.el-dropdown-menu.el-popper .el-dropdown-menu__item:not(.is-disabled):hover {
		background-color: #fff;
		color: #000;
	}
	
	.el-dropdown-menu.el-popper,
	.el-popper .el-dropdown-menu__item {
		background-color: #000;
		color: #fff;
		padding-top: 0;
		padding-bottom: 0;;
		/*padding: 0 20px;*/
	}
	
	.el-dropdown-menu.el-popper[x-placement^=bottom] .popper__arrow::after {
		top: 1px;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #000;
	}
	/*.el-popper[x-placement^=bottom] .popper__arrow{
	    border-bottom-color: #000;
}*/
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
</style>