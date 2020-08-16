<template>
	<div class="list">
		<el-card class="box-card" style="text-align: right;">
			<el-input @input="selfSearch" class="search-input" style="width:340px!important;margin-right: 50px;" prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容">
			</el-input>
			<el-button type="primary" class="common-btn" @click="search">Search</el-button>
			<el-button type="primary" style="float: right;background-color: #8a818a!important;border-color: #8a818a!important;" class="common-btn" @click="exportTable">Export</el-button>

		</el-card>
		<el-card>
			<el-row>
				<el-col :span="12" style="display: flex;"><label style="width:140px;">订单状态：</label>
					<el-checkbox-group style="display: inline-block;" v-model="checkedStatus" @change="handlecheckedStatusChange">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<el-checkbox style="margin-bottom:10px" v-for="item in statusList" :label="item.name" :key="item.name">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-col>
				<el-col :span="12" style="text-align: right;"><label>时间筛选：</label>
					<el-date-picker @change="search" v-model="timeRange" type="daterange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
					</el-date-picker>
				</el-col>
			</el-row>

		</el-card>
		<el-card class="box-card">
			<el-table :data="tableData" width="100%" :row-class-name="getRowStyle">
				<el-table-column header-align="left" sortable prop="id" label="id">
				</el-table-column>
				<el-table-column header-align="left" width="280px" prop="order_id" label="order_id">
				</el-table-column>

				<el-table-column prop="payer" label="payer" width="200px">
					<template slot-scope="scope">
						<el-popover v-if="scope.row['payer']" placement="right" width="400" trigger="hover">
							<div class="tool-tip">note</div>
							<el-tag :key="subIndex" v-for="(tag,subIndex) in scope.row['note']" closable :disable-transitions="false" @close="handleClose(scope.$index,subIndex)">
								{{tag}}
							</el-tag>

							<el-input class="input-new-tag" v-if="inputVisible[scope.$index]==1" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.$index)" @blur="handleInputBlur(scope.$index)">
							</el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">+Note</el-button>
							<div class="tool-tip" style="margin-top: 20px;" v-if="scope.row['comments']">comments</div>
							<div v-if="scope.row['comments']">{{scope.row['comments']}}</div>
							<div slot="reference" class="color">{{scope.row['payer']}}</div>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column header-align="left" width="160px" sortable prop="pay_time" label="pay_time">
				</el-table-column>
				<el-table-column header-align="left" prop="description" width="300px" label="description">
				<template slot-scope="scope">
						<div v-html="scope.row['description']"></div>
					</template>
				</el-table-column>

				<el-table-column prop="status" label="status" width="200px">
					<template slot-scope="scope">
						<el-select :clearable="true" @change="edit(scope.$index,scope.row['id'])" style="width:100px" v-model="scope.row['status']" placeholder="请选择 status">
							<el-option v-for="subItem in statusList" :key="subItem.name" :label="subItem.name" :value="subItem.name">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column header-align="left" sortable prop="total" label="total">
				</el-table-column>
				<el-table-column header-align="left" prop="currency" width="120px" label="currency">
				</el-table-column>
				<!-- <el-table-column prop="note" label="note" width="300px">
					<template slot-scope="scope">
						<el-tag :key="subIndex" v-for="(tag,subIndex) in scope.row['note']" closable :disable-transitions="false" @close="handleClose(scope.$index,subIndex)">
							{{tag}}
						</el-tag>

						<el-input class="input-new-tag" v-if="inputVisible[scope.$index]==1" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.$index)" @blur="handleInputBlur(scope.$index)">
						</el-input>
						<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">+Note</el-button>
					</template>
				</el-table-column> -->
				<el-table-column label="operation" width="120px" cell-class-name="center" header-align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.row)">Edit</el-button>
						<el-button type="text" class="clip" :data-clipboard-text="getFromData(scope.$index)" size="small" @click="copy(scope.row.id)">Copy</el-button>
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
				pageSize: 20,
				total: 0,
				statusList: [],
				notSearch: true,
				inputValue: '',
				inputVisible: [],
				checkAll: true,
				isIndeterminate: false,
				checkedStatus: [],
				statusOptions: [],
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				timeRange: [],

			}
		},
		methods: {

			handleEdit(item) {
				this.$router.push('/Order/Add?id=' + item.id)
			},
			getRowStyle({
				row,
				rowIndex
			}) {
				if(row.bad) {
					return('bad')
				} else if(row.note && row.note.length > 0) {
					return('note')
				} else if(row.comments && row.comments.length > 0) {
					return('comments')
				} else {
					return('')
				}

			},
			selfSearch() {
				if(!this.keyword && !this.isIndeterminate && this.timeRange.length == 0) {
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
			handleClose(index, subIndex) {
				this.tableData[index].note.splice(subIndex, 1);
				this.edit(index, this.tableData[index].id)

			}, //导出表格
			exportTable() {
				var tableLable = this.originTable;
				let addobj = {}
				// 2.1获取表头内容 以rowData形式重新赋值
				try {
					for(let item in tableLable[0]) {
						addobj[item] = item
					}
				} catch(error) {
					this.$message.error('请填写tableLable表头属性')
					return
				}
				if(this.originTable.length == 0) {
					this.$message.error('请填写tableData表格数据属性')
					return
				}
				// 2.2用JSON转义清理对象的内存地址关联  来获取表格数据
				let tableData = JSON.parse(JSON.stringify(this.originTable))
				// 2.3把表头添加到表格数据的最前面充当表头
				tableData.unshift(addobj)
				// 2.4列标题，逗号隔开，每一个逗号就是隔开一个单元格
				let str = ``;
				// 2.5增加\t为了不让表格显示科学计数法或者其他格式
				for(let i = 0; i < tableData.length; i++) {

					for(let item in addobj) {

						tableData[i][item] = tableData[i][item] + ''
						// 2.5.1 注意要将本身就有换行或者英文逗号的内容进行变换 否则表格内容会错乱
						tableData[i][item] = tableData[i][item].replace(/\n/g, ' ')
						tableData[i][item] = tableData[i][item].replace(/,/g, '，') // 英文替换为中文
						str += `${tableData[i][item] + '\t'},`;
					}
					str += '\n';
				}
				// 2.6encodeURIComponent解决中文乱码
				let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
				// 2.7通过创建a标签实现
				let link = document.createElement('a');
				link.href = uri;
				// 2.8对下载的文件命名
				link.download = "订单数据.csv";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
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

				         
				if(/(y+)/.test(format))  {
					format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

				}                     
				for(var k in o)             
					if(new RegExp('(' + k + ')').test(format)) {                 
						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));             
					}         
				return format;      
			},
			getFromData(index) {
				var data = JSON.parse(JSON.stringify(this.originTable[index]));
				delete data.notify_info
				delete data.order_detail
				var str = ""
				for(var key in data) {
					data[key] = data[key] + ''
					// 2.5.1 注意要将本身就有换行或者英文逗号的内容进行变换 否则表格内容会错乱
					data[key] = data[key].replace(/\n/g, ' ')
					data[key] = data[key].replace(/,/g, '，') // 英文替换为中文
					str += `${data[key]+ '\t'}`;

				}
				return str
			},
			handleCheckAllChange(val) {
				this.checkedStatus = val ? this.statusOptions : [];
				this.isIndeterminate = false;
				this.pageNum = 1;
				this.queryTable();
			},
			handlecheckedStatusChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.statusOptions.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.statusOptions.length;
				this.search();
			},
			showInput(index) {
				this.inputVisible[index] = 1;
				this.tableData[index].note.splice(index, 0);
				console.log(this.inputVisible)
				this.$forceUpdate();
				this.$nextTick(_ => {
					//					debugger
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputBlur(index) {
				this.inputVisible[index] = 0;
				this.tableData[index].note.splice(index, 0);
				this.$forceUpdate();
			},
			handleInputConfirm(index) {
				let inputValue = this.inputValue;
				var d = new Date(),
					str = '';
				str += d.getFullYear() + '-'; //获取当前年份 
				str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
				str += d.getDate() + ' ';
				str += d.getHours() + ':';
				str += d.getMinutes() + ':';
				str += d.getSeconds() + '';
				var email = JSON.parse(this.store.state.configData).admin_email
				if(inputValue) {
					this.tableData[index].note.push(' [' + str + ']' + ' [' + email + ']:' + inputValue);
					this.edit(index, this.tableData[index].id)
				}
				this.inputVisible[index] = 0;
				this.inputValue = '';
				this.$forceUpdate();
			},
			//删除
			handleStatus(item) {
				var url = ''
				if(item.online == "true") {
					url = '/admin/v1/content/reject'
				} else {
					url = '/admin/v1/content/approve'
				}
				this.$post(url + "?type=Order&id=" + item.id, {}).then(response => {
					if(response.retCode == 0) {
						this.$message({
							message: 'success!',
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

			edit(index, id) {
				var that = this;
				var data;
				data = this.originTable[index];
				this.originTable[index].note = this.tableData[index].note.join(',');
				this.originTable[index].status = this.tableData[index].status
				delete data.id
				that.$post("/admin/v1/content/update?type=Order&id=" + id, data).then(response => {
					if(response.retCode == 0) {
						that.$message({
							type: 'success',
							message: "success"
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
			copy(id) {
				var that = this;
				var clipboard1 = new this.clipboard('.clip')
				clipboard1.on('success', e => {
					this.$message({
						message: 'copy success!',
						type: 'success'
					})
					// 释放内存
					clipboard1.destroy()
				})
				clipboard1.on('error', e => {
					// 不支持复制
					console.log('该浏览器不支持自动复制')
					// 释放内存
					clipboard.destroy()
				})
			},
			queryTable() {
				this.$get('/admin/v1/contents?type=Order&offset=' + this.pageNum + "&count=" + this.pageSize, {

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
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
							item.note = item.note && item.note.split(',');

							item.pay_time = item.pay_time ? this.dateFormat(item.pay_time, 'yyyy-MM-dd HH:mm:ss') : ''
							item.request_time = item.request_time ? this.dateFormat(item.request_time, 'yyyy-MM-dd HH:mm:ss') : ''

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
			getDataSource() {
				var that = this;
				that.$get('/admin/v1/contents?type=Orderstatus', {

				}).then(response => {
					if(response.retCode == 0) {
						this.statusList = response.data || [];

						this.statusList.map((item) => {
							this.statusOptions.push(item.name)
						})
						this.$forceUpdate();
					} else {

						that.$message({
							type: 'warning',
							message: response.message
						});
					}

				})
			},
			search() {
				if(!this.keyword && !this.isIndeterminate && this.timeRange.length == 0) {
					this.pageNum = 1;
					this.queryTable();
					return
				}
				if(this.isIndeterminate) {
					var str = "";
					this.checkedStatus.map((item, index) => {
						if(index != this.checkedStatus.length - 1) {
							str = str + '(\"' + item + '\")|';
						} else {
							str = str + '(\"' + item + '\")';
						}

					})
				} else {
					var str = ''
				}
				var start = "";
				var end = ""
				if(this.timeRange.length > 0) {
					start = this.timeRange[0].getTime()
					end = this.timeRange[1].getTime()
				}

				this.notSearch = false;
				this.$get('/admin/v1/contents/search?type=Order&q=' + this.keyword + "&r=" + str + "&status=public&start=" + start + "&end=" + end, {

				}).then(response => {
					if(response.retCode == 0) {
						this.tableData = response.data || [];
						this.originTable = JSON.parse(JSON.stringify(this.tableData));
						this.originTable1 = JSON.parse(JSON.stringify(this.tableData));
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})

						this.tableData && this.tableData.map((item) => {
							item.updated = this.$util.formatTime(item.updated, 'YYYY-MM-DD HH:mm:ss');
							item.note = item.note && item.note.split(',');
							item.pay_time = item.pay_time ? this.dateFormat(item.pay_time, 'yyyy-MM-dd HH:mm:ss') : ''
							item.request_time = item.request_time ? this.dateFormat(item.request_time, 'yyyy-MM-dd HH:mm:ss') : ''

						})
						this.total = response.meta.total ? parseInt(response.meta.total) : 0;

						this.tableData1 = JSON.parse(JSON.stringify(this.tableData))
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
			this.getDataSource();

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
	
	.el-tabs__content {
		display: none;
	}
	
.el-table__row.note td:nth-child(3)  {
		background: #f73131;
		color: #fff;
	}
	
	.el-table__row.bad td:nth-child(3)  {
		background: #c00;
		color: #fff;
	}
	
	.el-table__row.comments td:nth-child(3)   {
		background: blue;
		color: #fff;
	}
	
	.el-tag {
		height: auto;
		white-space: initial;
	}
	
	.button-new-tag {
		margin-top: 10px;
		height: 22px;
		line-height: 22px;
		font-size: 14px;
		;
		padding-top: 0;
		padding-bottom: 0;
	}
	
	.input-new-tag {
		width: 240px!important;
		margin-left: 10px;
		vertical-align: bottom;
	}
	
	.el-table__row .el-input,
	.el-table__row .el-select {
		width: 120px!important;
	}
	
	.el-table--enable-row-hover .el-table__body tr:hover>td {
		color: #666;
	}
	
	.tool-tip {
		font-size: 16px;
		margin-bottom: 9px;
		font-weight: 700;
	}
</style>