<template>
	<div style="width: 1200px; margin: 100px auto">
		<div class="nav"> <img src="../assets/image/icon/icon_home.png" />Home >My Order </div>
		<el-table v-if="tableData.length>0"
		  :summary-method="getSummaries" show-summary :data="tableData" width="100%">
			<el-table-column header-align="left" width="240px" sortable prop="updated" label="pay_time">
			</el-table-column>
			<el-table-column header-align="left" width="240px" prop="order_id" label="order id">
			</el-table-column>
			<el-table-column header-align="left" width="200px" label="Game">
				<template slot-scope="scope">
					<div :key="subIndex" v-if="subIndex===0" v-for="(subItem,subIndex) in JSON.parse(scope.row['description'])">
					{{subItem.game}} </div>
				</template>
			</el-table-column>
			<el-table-column header-align="left" width="400px" label="Product">
				<template slot-scope="scope">
					<div :key="subIndex" v-for="(subItem,subIndex) in JSON.parse(scope.row['description'])">
					{{subItem.cateogry?subItem.cateogry+' - ':''}}{{subItem.server?subItem.server+' - ':''}}{{subItem.product }} </div>
				</template>
			</el-table-column>
			<el-table-column header-align="left" width="130px" label="Total" prop="total">
				
			</el-table-column>
			<el-table-column header-align="left" width="230px" prop="status" label="status">
			</el-table-column>
			</el-table>
			<div style="line-height: 100px;color: #999;text-align: center;" v-else>{{$t('language.common.noData')}}</div>

	</div>
</template>
<script>
	import { getOrder } from '../api/common.js'
	import { mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				tableData: [],
			};
		},
		computed: { ...mapState(['userInfo'])
		},
		methods: {
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
				if (/(y+)/.test(format))  {
					format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 -
						RegExp.$1.length));
				}                     
				for (var k in o)             
					if (new RegExp('(' + k + ')').test(format)) {                 
						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' +
							o[k]).substr(('' + o[k]).length));             
					}         
				return format;      
			},
			getOrder() {
				// + this.userInfo.email
				getOrder("?type=Order&count=-1&q="+this.userInfo.email, {}).then(response => {
					
					if (response.retCode == 0) {
						this.notSearch = true;
						this.tableData = response.data || [];
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})
						this.tableData && this.tableData.map((item) => {
							item.updated = this.$util.formatTime(item.updated,
								'YYYY-MM-DD HH:mm:ss');
							item.note = item.note && item.note.split(',');
							item.total = parseFloat(item.total)
							//							item.pay_time = item.pay_time ? this.dateFormat(item.pay_time, 'yyyy-MM-dd HH:mm:ss') : ''
							item.request_time = item.request_time ? this.dateFormat(item.request_time,
								'yyyy-MM-dd HH:mm:ss') : ''
						})
						this.total = response.meta.total ? parseInt(response.meta.total) : 0;
					} else {
						this.$message({
							type: 'warning',
							message: response.msg
						})
					}
				})
			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = 'Total';
						return;
					}
					if (index === 4) {
						const values = data.map(item => Number(item[column.property]));
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr);
								if (!isNaN(value)) {
									return prev + curr;
								} else {
									return prev;
								}
							}, 0);
							sums[index]=sums[index].toFixed(2);
						}
					}else{
						sums[index] = '';
					}
				});
				return sums;
				}
		},
		created() {
			this.getOrder()
		},
		watch: {
			'userInfo.email' () {
				this.getOrder()
			}
		},
	};
</script>
<style lang="less" scoped="">
	.title {
		margin: 30px 0 30px;
		font-size: 22px;
		font-weight: 600;
	}
	
	.sub-title {
		margin: 20px 0 20px;
		font-size: 18px;
		font-weight: 600;
	}
	
	.nav {
		font-size: 16px;
		letter-spacing: 0px;
		color: #666666;
		margin: 20px 0;
		img {
			width: 18px;
			height: 18px;
		}
	}
	
	.content {
		color: #333;
		margin-bottom: 30px;
	}
</style>