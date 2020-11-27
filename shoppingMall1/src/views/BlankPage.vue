<template>
	<div style="width: 1200px;margin:0 auto">
	</div>
</template>
<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				status: 1,
				orderno: 0,
				msg: ''
			};
		},
		methods: {},
		computed: { ...mapState(["userInfo"])
		}
		
	}
</script>
<style lang="less" scoped="">

</style>