<template>
	<div class="list">
		<el-card class="box-card">
			<el-button type="primary" class="common-btn" @click.native="$router.push('/Coupon/Add')">Add</el-button>
			<el-button type="primary" style="float: right;" class="common-btn" @click="search">Search</el-button>
			<el-input @input="selfSearch" class="search-input" style="width:340px!important;margin-right: 50px;float: right;"prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容" >
			</el-input>
			
		</el-card>
		<el-card class="box-card">
			<el-table :data="tableData" width="100%" :row-class-name="getRowStyle">
				<el-table-column header-align="left" width="70px" sortable prop="id" label="id">
				</el-table-column>
				<el-table-column header-align="left" width="140px" prop="name" label="name">
				</el-table-column>
				<el-table-column header-align="left" width="160px" sortable prop="game" label="game">
				</el-table-column>
				<el-table-column header-align="left" prop="price" label="price">
				</el-table-column>
				<el-table-column header-align="left" width="180px" prop="initial_amount" label="initial_amount">
				</el-table-column>
				<el-table-column header-align="left" prop="type" label="type">
				</el-table-column>
				<el-table-column header-align="left" sortable prop="code" width="160px" label="code">
				</el-table-column>
				<el-table-column header-align="left" prop="meta" width="160px" label="meta">
				</el-table-column>
				<el-table-column header-align="left" sortable prop="starttime" width="160px" label="starttime">
					<template slot-scope="scope">
				{{scope.row.starttime}}时
				</template>
				</el-table-column>
				<el-table-column header-align="left" sortable prop="endtime" width="160px" label="endtime">
					<template slot-scope="scope">
				{{scope.row.endtime}}时
				</template>
				</el-table-column>
				<el-table-column header-align="left" prop="updated" width="160px" label="updateTime">
				</el-table-column>
				<el-table-column label="operation" width="180px" cell-class-name="center" header-align="center">
					<template slot-scope="scope">
						<!--<el-button type="text" size="small" v-if="scope.row.online" @click="handleStatus(scope.row)">{{scope.row.online?'outLine':'online'}}</el-button>-->
						<el-button type="text" size="small" @click="handleEdit(scope.row)">Edit</el-button>
						<el-button type="text" size="small" @click="handleDelete(scope.row)">Delete</el-button>
						<el-button type="text" class="clip" size="small" @click="copy(scope.row.id)">Copy</el-button>
					</template>
				</el-table-column>
			</el-table>

			<el-pagination v-if="notSearch" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>

		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'List',
		data() {
			return {
				type: "name",
				keyword: "",
				tableData: [],
				selectid: null,
				pageNum: 1,
				pageSize: 10,
				total: 0,
				notSearch: true

			}
		},
		methods: {

			handleEdit(item) {
				this.$router.push('/Coupon/Add?id=' + item.id)
			},
			getRowStyle({
				row,
				rowIndex
			}) {
				return row.isLate
			},
			//删除
			handleStatus(item) {
				var url = ''
				if(item.online == "true") {
					url = '/admin/v1/content/reject'
				} else {
					url = '/admin/v1/content/approve'
				}
				this.$post(url + "?type=Coupon&id=" + item.id, {}).then(response => {
					if(response.retCode == 0) {
						this.$message({
							message: '操作成功!',
							type: 'success'
						})
						this.queryTable();
					} else {
						this.$message({
							message: response.msg,
							type: 'warning'
						})
					}
				})

			},
			//删除
			handleDelete(item) {
				this.$delete("/admin/v1/content?type=Coupon&id=" + item.id, {}).then(response => {
					if(response.retCode == 0) {
						this.$message({
							message: '删除成功!',
							type: 'success'
						})
						this.queryTable();
					} else {
						this.$message({
							message: response.msg,
							type: 'warning'
						})
					}
				})

			},
			selfSearch() {
				if(!this.keyword) {
					this.pageNum = 1;
					this.queryTable();
					return
				}
				this.notSearch = false;
				this.tableData = JSON.parse(JSON.stringify(this.tableData1)).filter((item, index) => {

					return JSON.stringify(item).indexOf(this.keyword) > -1
				})
				console.log(this.tableData)

				this.originTable = JSON.parse(JSON.stringify(this.originTable1)).filter((item, index) => {

					return JSON.stringify(item).indexOf(this.keyword) > -1
				})
				this.$forceUpdate();
			},
			copy(id) {
				var that = this;
				var data = this.originTable.filter((item, index) => {
					return item.id == id
				})
				data = data[0]
				data.name = data.name + "(复制)"
				delete data.id
				that.$post("/admin/v1/content?type=Coupon", data).then(response => {
					if(response.retCode == 0) {
						that.$message({
							type: 'success',
							message: "Copy success"
						});
						that.search();
					} else {
						that.$message({
							type: 'warning',
							message: response.message
						});
					}

				})

			},
			queryTable() {
				this.$get('/admin/v1/contents?type=Coupon&offset=' + this.pageNum + "&count=" + this.pageSize, {

				}).then(response => {

					if(response.retCode == 0) {
						this.notSearch = true;
						this.tableData = response.data || [];
						this.originTable = JSON.parse(JSON.stringify(this.tableData))
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})

						this.tableData && this.tableData.map((item) => {
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
							item.game = item.game.split(',')[1];
							item.type = item.type == 1 ? '百分比' : '金额'
							var a = item.endtime + ":00:00";
							if(new Date().getTime() > new Date(a).getTime()) {
								item.isLate = 'late';
							}

						})
						this.tableData1 = JSON.parse(JSON.stringify(this.tableData))
						this.total = response.meta.total ? parseInt(response.meta.total) : 0;
					} else {

						this.$message({
							type: 'warning',
							message: response.message
						});
					}

				})

			},
			search() {
				if(!this.keyword) {
					this.pageNum = 1;
					this.queryTable();
					return
				}
				this.notSearch = false;
				this.$get('/admin/v1/contents/search?type=Coupon&q=' + this.keyword + "&status=public", {

				}).then(response => {
					if(response.retCode == 0) {
						this.tableData = response.data || [];
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})

						this.tableData && this.tableData.map((item) => {
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
							item.game = item.game.split(',')[1];
							item.type = item.type == 1 ? '百分比' : '金额'
							var a = item.ednTime + ":00:00"
							if(new Date().getTime() > new Date(a).getTime()) {
								item.isLate = 'late';
							}
						})
						this.tableData1 = JSON.parse(JSON.stringify(this.tableData))
						this.total = response.meta.total ? parseInt(response.meta.total) : 0;
						this.$forceUpdate();
					} else {

						this.$message({
							type: 'warning',
							message: response.message
						});
					}

				})

			},
			//选择页数
			handleCurrentChange() {
				this.queryTable();
			},

			//选择每页条数
			handleSizeChange(val) {
				this.pageSize = val;
				this.queryTable();
			},

		},
		created() {
			this.queryTable();

		},
		mounted() {

		}
	}
</script>

<style>
	@import "../../assets/css/list.css";
	.center {
		text-align: center;
	}
	
	.el-table .el-table thead.has-gutter tr,
	.el-table .el-table th {
		background-color: #999!important;
	}
	
	.e-table .e-table {
		border: 1px solid #EBEEF5;
	}
</style>