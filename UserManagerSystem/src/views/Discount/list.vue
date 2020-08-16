<template>
	<div class="list">
		<el-card class="box-card" >
			<el-button type="primary" class="common-btn" @click.native="$router.push('/Discount/Add')">Add</el-button>
			<el-button type="primary" style="float: right;" class="common-btn" @click="search">Search</el-button>
			<el-input @input="selfSearch" class="search-input" style="width:340px!important;margin-right: 50px;float: right;"prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容" >
			</el-input>
		
		</el-card>
		<el-card class="box-card">
			<el-table :data="tableData" width="100%">
				<!--<el-table-column header-align="left" label="选择" width="80px">
					<template slot-scope="scope">
						<el-radio :label="scope.row.yun_id" v-model="selectid">&nbsp;</el-radio>
					</template>
				</el-table-column>-->
				<el-table-column header-align="left" width="70px" prop="id" label="id">
				</el-table-column>
					<el-table-column width="140px" header-align="left" prop="name" label="name">
				</el-table-column>
				<el-table-column header-align="left" prop="online" label="online" width="100px">
				</el-table-column>
				<el-table-column header-align="left" prop="starttime" width="160px" label="starttime">
				<template slot-scope="scope">
				{{scope.row.starttime}}时
				</template>
				</el-table-column>
				<el-table-column header-align="left" prop="endtime" width="160px" label="endtime">
				<template slot-scope="scope">
				{{scope.row.endtime}}时
				</template>
				</el-table-column>
				
					<el-table-column label="list" width="500px" cell-class-name="center" header-align="center">
					<template slot-scope="scope" >
						<el-table :data="scope.row.list"  >
							<el-table-column cell-style="text-align:center" header-align="center" label="level" width="80px">
								<template slot-scope="scope1">
									{{scope1.row.level}}
								</template>
							</el-table-column>
							<el-table-column cell-style="text-align:center" header-align="center" label="qty" width="200px">
								<template slot-scope="scope1">
									{{scope1.row.qty}}
								</template>
							</el-table-column>
							<el-table-column cell-style="text-align:center" header-align="center" label="discount" width="200px">
								<template slot-scope="scope1">
									{{scope1.row.discount}}
								</template>
							</el-table-column>
							
							
						</el-table>

					</template>
				</el-table-column>
				<el-table-column header-align="left" prop="updated" width="160px" label="updateTime">
				</el-table-column>
				<el-table-column label="operation" width="180px" cell-class-name="center" header-align="center">
					<template slot-scope="scope">
						<!--<el-button type="text" size="small" v-if="scope.row.online" @click="handleStatus(scope.row)">{{scope.row.online?'outLine':'online'}}</el-button>-->
						<el-button type="text" size="small" @click="handleEdit(scope.row)">Edit</el-button>
						<el-button type="text" size="small" @click="handleDelete(scope.row)">Delete</el-button>
						<el-button type="text" class="clip" size="small"  @click="copy(scope.row.id)">Copy</el-button>
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
			checkSeleted() {
				if(!this.selectid) {
					this.$message({
						message: '请先选择用户!',
						type: 'warning'
					});
					return false;
				}
				return true;
			},
			
			handleEdit(item) {
				this.$router.push('/Discount/Add?id=' + item.id)
			},
			//删除
			handleStatus(item) {
				var url = ''
				if(item.online == "true") {
					url = '/admin/v1/content/reject'
				} else {
					url = '/admin/v1/content/approve'
				}
				this.$post(url + "?type=Discount&id=" + item.id, {}).then(response => {
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
				this.$delete("/admin/v1/content?type=Discount&id=" + item.id, {}).then(response => {
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
				data=data[0]
				data.name= data.name + "(复制)"
				delete data.id
				that.$post("/admin/v1/content?type=Discount", data).then(response => {
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
				this.$get('/admin/v1/contents?type=Discount&offset=' + this.pageNum + "&count=" + this.pageSize, {

				}).then(response => {

					if(response.retCode == 0) {
						this.notSearch = true;
						this.tableData = response.data || [];
						this.originTable = JSON.parse(JSON.stringify(this.tableData));
						this.originTable1 = JSON.parse(JSON.stringify(this.tableData));
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})
						
						this.tableData && this.tableData.map((item) => {
							item.online = item.online + '';
							item.list = JSON.parse(item.list)
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');

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
				this.$get('/admin/v1/contents/search?type=Discount&q=' + this.keyword + "&status=public", {

				}).then(response => {
					if(response.retCode == 0) {
						this.tableData = response.data || [];
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})
				
						this.tableData && this.tableData.map((item) => {
							item.online = item.online + '';
								item.list = JSON.parse(item.list)
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
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
	.el-table .el-table thead.has-gutter tr,.el-table .el-table th{
		background-color: #999!important;
	}
	.e-table .e-table{
		border:1px solid #EBEEF5;
	}

</style>