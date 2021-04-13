<template>
	<div class="list">
		<el-card class="box-card" style="text-align: right;">
			<el-input @input="selfSearch" class="search-input" style="width:340px!important;margin-right: 50px;"
			 prefix-icon="el-icon-search" v-model="keyword" placeholder="请输入搜索内容"> </el-input>
			<el-button type="primary" class="common-btn" @click="search">Search</el-button>
			<el-button type="primary" style="float: right;background-color: #8a818a!important;border-color: #8a818a!important;"
			 class="common-btn" @click="exportTable">Export</el-button>
		</el-card>
		<el-card>
			<el-row>
				<el-col :span="12" style="display: flex;"><label style="width:140px;">订单状态：</label>
					<el-checkbox-group style="display: inline-block;"
					 v-model="checkedStatus" @change="handlecheckedStatusChange">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<el-checkbox style="margin-bottom:10px" v-for="item in statusList"
						 :label="item.name" :key="item.name">{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-col>
				<el-col :span="12" style="text-align: right;"><label>时间筛选：</label>
					<el-date-picker @change="search" v-model="timeRange" type="daterange"
					 :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" align="right"> </el-date-picker>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-table :data="tableData" width="100%" :row-class-name="getRowStyle" :default-sort="{prop:'airtime',order:'descending'}">
				<el-table-column header-align="left" width="160px" sortable prop="airtime" label="pay_time">
				</el-table-column>
				<el-table-column header-align="left" sortable width="120px"
				 prop="order_id" label="order_id"> </el-table-column>
				<el-table-column header-align="left" width="160px" label="Game">
					<template slot-scope="scope"> {{scope.row['description']&&JSON.parse(scope.row['description'])[0].game}} </template>
				</el-table-column>
				<el-table-column header-align="left" width="160px" prop="comments" label="request_info">
				</el-table-column>
				<el-table-column header-align="left" width="300px" label="payer_email">
					<template slot-scope="scope">
						<el-popover v-if="scope.row['payer']" placement="right" width="400" trigger="hover">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.payer }}</el-tag>
							</div>
							<div class="tool-tip">note</div>
							<el-tag :key="subIndex" v-for="(tag,subIndex) in scope.row['note']"
							 closable :disable-transitions="false" @close="handleClose(scope.$index,subIndex,scope.row)">
							{{tag}} </el-tag>
							<el-input class="input-new-tag" v-if="inputVisible[scope.$index]==1"
							 v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.$index,scope.row)"
							 @blur="handleInputBlur(scope.$index)"> </el-input>
							<el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">+Note</el-button>
						</el-popover>
						<el-tag size="medium">{{ scope.row.user }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column header-align="left" width="120px" prop="ip" label="ip"> </el-table-column>
				<el-table-column header-align="left" width="100px" sortable
				 prop="vendor" label="type"> </el-table-column>
				<el-table-column prop="status" label="status" width="160px">
					<template slot-scope="scope">
						<el-select :clearable="true" @change="edit(scope.row)" style="width:100px" v-model="scope.row['status']"
						 placeholder="请选择 status">
							<el-option v-for="subItem in statusList" :key="subItem.name" :label="subItem.name"
							 :value="subItem.name"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column header-align="left" sortable label="total">
					<template slot-scope="scope"> {{scope.row['total']}}{{scope.row['currency']}} </template>
				</el-table-column>
				<!--el-table-column  prop="bad" label="bad" width="200px">
					<template slot-scope="scope">
						<el-select :clearable="true" @change="edit(scope.$index,scope.row['id'])" style="width:100px"
						 v-model="scope.row['bad']" placeholder="请选择 status">
							<el-option v-for="subItem in badList" :key="subItem.value" :label="subItem.name"
							 :value="subItem.value"> </el-option>
						</el-select>
					</template>
				</!--el-table-column-->
				<el-table-column fixed="right" label="operation" width="120px" cell-class-name="center"
				 header-align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleEdit(scope.row)">view</el-button>
						<el-button type="text" class="clip" :data-clipboard-text="getFormData(scope.row.id)"
						 size="small" @click="copy(scope.row.id)">Copy</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination v-if="notSearch" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page.sync="pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="pageSize"
			 layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
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
				drawer: false,
				drawer1: false,
				statusList: [],
				badList: [{
					name: 'true',
					value: true
				}, {
					name: 'false',
					value: false
				}],
				notSearch: true,
				inputValue: '',
				inputVisible: [],
				checkAll: true,
				isIndeterminate: true,
				checkedStatus: ["Paid-已付款","Pending-等待付款","Processing-等待"],
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
				localStorage.setItem('selectData', JSON.stringify(item))
				var url = window.location.origin + '/#/Order/add?id=' + item.id
				if (window.showModelessDialog) { // Internet Explorer
					showModelessDialog(url, window, "dialogWidth:880px; dialogHeight:900px");
				} else {
					window.open(url, "newwindow" + item.id,
						"height=900, width=880, top=0, left=" + item.id * 5 +
						",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
					)
				}
			},
			getRowStyle({
				row,
				rowIndex
			}) {
				if (row.bad) {
					return ('bad')
				} else if (row.note && row.note.length > 0) {
					return ('note')
				} else if (row.comments && row.comments.length > 0) {
					return ('comments')
				} else {
					return ('')
				}
			},
			selfSearch() {
				if (!this.keyword && !this.isIndeterminate && this.timeRange.length == 0) {
					this.pageNum = 1;
					this.queryTable();
					return
				}
				this.notSearch = false;
				this.tableData = JSON.parse(JSON.stringify(this.tableData1)).filter((item,
					index) => {
					return JSON.stringify(item).indexOf(this.keyword) > -1
				})
				console.log(this.tableData)
				this.originTable = JSON.parse(JSON.stringify(this.originTable1)).filter((
					item, index) => {
					return JSON.stringify(item).indexOf(this.keyword) > -1
				})
				this.$forceUpdate();
			},
			handleClose(index, subIndex, item) {
				item = JSON.parse(JSON.stringify(item))
				item.note.splice(subIndex, 1);
				item.note = JSON.stringify(item.note)
				this.edit(item)
			}, //导出表格
			exportTable() {
				var tableLable = this.originTable;
				let addobj = {}
				// 2.1获取表头内容 以rowData形式重新赋值
				try {
					for (let item in tableLable[0]) {
						addobj[item] = item
					}
				} catch (error) {
					this.$message.error('请填写tableLable表头属性')
					return
				}
				if (this.originTable.length == 0) {
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
				for (let i = 0; i < tableData.length; i++) {
					for (let item in addobj) {
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
			getFormData(id) {
				var index = 0;
				this.tableData && this.tableData.map((item, subIndex) => {
					if (item.id == id) {
						index = subIndex
					}
				})
				var data = JSON.parse(JSON.stringify(this.tableData[index]));
				var str1 = ''
				var str = ''
				data.description && JSON.parse(data.description).map((item, index) => {
					//	console.log(data)
					var subtotal = 0;
					if (item.unit_price && item.quantity) {
						subtotal = item.unit_price * item.quantity
					}
					var category = item.category ? (item.category + '-') : ''
					var server = item.server ? (item.server + '-') : ''
					str1 = category + server + item.product
					//process data.commnets:remove : right side content
					var usereq = data.comments
					var npos
					if (usereq&&usereq.length>0){
						npos=usereq.indexOf(":")
						if (npos>0){
							usereq=usereq.substring(npos+1)
						}
					}else{
						usereq=""
					}
					//end of bug fix
					var data2 = {
						pay_time: '"' + data.updated.split(' ')[0] + '"',
						game: '"' + item.game + '"',
						products: '"' + str1 + '"',
						gameId: item.quantity,
						request_info: '"' + usereq + '"',
						order: '"' + data.order_id + '"',
						kong1: '""',
						kong2: '""',
						currency: '"' + data.currency + '"',
						total: subtotal
					}
					for (var key in data2) {
						data2[key] = data2[key]
						// 2.5.1 注意要将本身就有换行或者英文逗号的内容进行变换 否则表格内容会错乱
						//					data[key] = data[key].replace(/\n/g, ' ')
						//					data[key] = data[key].replace(/,/g, '，') // 英文替换为中文
						str += `${data2[key]+ '\t'}`;
					}
					str = str + '\n'
				})
				str += '""	""	""	0	""	""	""	""	""	0'; //for hack operation
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
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.statusOptions
					.length;
				this.search();
			},
			showInput(index) {
				this.inputVisible.splice(index, 1, 1);
				this.tableData[index].note = this.tableData[index].note || []
				this.$nextTick(() => {
					//					debugger
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputBlur(index) {
				this.inputVisible.splice(index, 1, 0);
				this.tableData[index].note.splice(index, 0);
				this.$forceUpdate();
			},
			handleInputConfirm(index, item) {
				item = JSON.parse(JSON.stringify(item))
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
				if (inputValue) {
					item.note = item.note || []
					item.note.push(' [' + str + ']' + ' [' + email + ']:' + inputValue);
					item.note = JSON.stringify(item.note)
					this.edit(item)
				}
				this.inputVisible[index] = 0;
				this.inputValue = '';
				this.$forceUpdate();
			},
			//删除
			handleStatus(item) {
				var url = ''
				if (item.online == "true") {
					url = '/admin/v1/content/reject'
				} else {
					url = '/admin/v1/content/approve'
				}
				this.$post(url + "?type=Order&id=" + item.id, {}).then(response => {
					if (response.retCode == 0) {
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
			getDataFromOriginTable(id) {
				var data;
				for (var i = 0; i < this.originTable.length; i++) {
					if (this.originTable[i].id == id) {
						data = this.originTable[i];
						return {
							data: data,
							i: i
						};
					}
				}
				return {
					data: "",
					i: -1
				};
			},
			getDataFromTableData(id) {
				var data;
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].id == id) {
						data = this.tableData[i];
						return {
							data: data,
							i: i
						};
					}
				}
				return {
					data: "",
					i: -1
				};
			},
			edit(item) {
				var id = item.id
				delete item.id
				this.$post("/admin/v1/content/update?type=Order&id=" + id, item).then(
					response => {
						if (response.retCode == 0) {
							this.$message({
								type: 'success',
								message: "success"
							});
							this.search();
						} else {
							this.$message({
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
				this.$get('/admin/v1/contents?type=Order&offset=' + this.pageNum +
					"&count=" + this.pageSize, {}).then(response => {
					if (response.retCode == 0) {
						this.notSearch = true;
						this.tableData = response.data || [];
						this.tableData.map((item) => {
							delete item.slug
						})
						try {
							this.tableData && this.tableData.map((item) => {
								console.log(item.note)
								item.updated = this.$util.formatTime(item.updated,
									'YYYY-MM-DD HH:mm:ss');
								//								item.note = item.note && item.note.split(',');
								item.note = item.note && JSON.parse(item.note);
								item.total = parseFloat(item.total)
								//							item.pay_time = item.pay_time ? this.dateFormat(item.pay_time, 'yyyy-MM-dd HH:mm:ss') : ''
								//item.request_time = item.request_time ? this.dateFormat(item.request_time,
								//	'yyyy-MM-dd HH:mm:ss') : ''
								//console.log(item.pay_time);
								item.airtime = this.$util.formatTime(this.getTimeFromString(item.pay_time),
									'YYYY-MM-DD HH:mm:ss');
							})
							this.originTable = JSON.parse(JSON.stringify(this.tableData));
							this.originTable1 = JSON.parse(JSON.stringify(this.tableData));
							this.tableData.sort((a, b) => {
								//排序基于的数据
								return b.updated - a.updated;
							})
							this.tableData1 = JSON.parse(JSON.stringify(this.tableData))
							this.total = response.meta.total ? parseInt(response.meta.total) : 0;
							if (this.keyword) {
								this.selfSearch();
							}
						} catch (e) {
							//TODO handle the exception
						}
					} else {
						this.$message({
							type: 'warning',
							message: response.message
						});
					}
				})
			},
			getTimeFromString(str) {
				if (str && str.indexOf(",") > 0 && str.indexOf("HKT") > 0) {
					var sep = str.split(",");
					// console.log(sep[1]);
					var spacearray = sep[1].split(" ");
					spacearray.pop();
					//console.log(spacearray);
					var target = spacearray.join(" ");
					//console.log(target);
					var tt = Date.parse(target);
					//	console.log(tt);
					return tt
				} else {
					return Date.parse(str)
				}
			},
			getDataSource() {
				var that = this;
				that.$get('/admin/v1/contents?type=Orderstatus', {}).then(response => {
					if (response.retCode == 0) {
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
				if (!this.keyword && !this.isIndeterminate && this.timeRange.length == 0) {
					this.pageNum = 1;
					this.queryTable();
					return
				}
				if (this.isIndeterminate) {
					var str = "";
					this.checkedStatus.map((item, index) => {
						if (index != this.checkedStatus.length - 1) {
							str = str + '(\"' + item + '\")|';
						} else {
							str = str + '(\"' + item + '\")';
						}
					})
				} else {
					var str = ''
				}
				var start = "";
				var end = "";
				if (this.timeRange.length > 0) {
					start = this.timeRange[0].getTime()
					end = this.timeRange[1].getTime()
				}
				this.notSearch = true;
				this.$get('/admin/v1/contents/ss?type=Order&q=' + this.keyword + "&r=" +
					str + "&status=public&start=" + start + "&end=" + end + "&offset=" + this
					.pageNum + "&count=" + this.pageSize, {}).then(response => {
					if (response.retCode == 0) {
						this.tableData = response.data || [];
						this.tableData.map((item) => {
							delete item.slug
						})
						this.tableData = JSON.parse(JSON.stringify(this.tableData)).filter((
							item, index) => {
							return JSON.stringify(item).indexOf(this.keyword) > -1
						})
						this.tableData.sort((a, b) => {
							//排序基于的数据
							return b.updated - a.updated;
						})
						this.tableData && this.tableData.map((item) => {
							item.updated = this.$util.formatTime(item.updated,
								'YYYY-MM-DD HH:mm:ss');
							item.note = item.note && JSON.parse(item.note);
							item.airtime = this.$util.formatTime(this.getTimeFromString(item.pay_time),
									'YYYY-MM-DD HH:mm:ss');
							//							item.pay_time = item.pay_time ? this.dateFormat(item.pay_time, 'yyyy-MM-dd HH:mm:ss') : ''
							//item.request_time = item.request_time ? this.dateFormat(item.request_time,
							//	'yyyy-MM-dd HH:mm:ss') : ''
						})
						this.originTable = JSON.parse(JSON.stringify(this.tableData));
						this.originTable1 = JSON.parse(JSON.stringify(this.tableData));
						this.total = response.meta.total ? parseInt(response.meta.total) : 0;
						this.tableData1 = JSON.parse(JSON.stringify(this.tableData));
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
			handleCurrentChange(val) {
				this.pageNum = val
				if (!this.keyword && !this.isIndeterminate && this.timeRange.length == 0) {
					this.queryTable();
				} else {
					this.search();
				}
			},
			//选择每页条数
			handleSizeChange(val) {
				this.pageSize = val;
				if (!this.keyword) {
					this.queryTable();
				} else {
					this.search();
				}
			},
		},
		created() {
			if (localStorage.getItem('keyword')) {
				this.keyword = localStorage.getItem('keyword');
				localStorage.setItem('keyword', '');
			}
			this.getDataSource();
			if (localStorage.getItem('checkedStatus') || localStorage.getItem(
					'timeRange')) {
				this.checkedStatus = localStorage.getItem('checkedStatus') ? JSON.parse(
					localStorage.getItem('checkedStatus')) : []
				this.timeRange = localStorage.getItem('timeRange') ? localStorage.getItem(
					'timeRange').split(',') : [];
				this.timeRange[0] = new Date(parseInt(this.timeRange[0]));
				this.timeRange[1] = new Date(parseInt(this.timeRange[1]));
				localStorage.setItem('checkedStatus', '');
				localStorage.setItem('timeRange', '');
				setTimeout(() => {
					this.handlecheckedStatusChange(this.checkedStatus)
				}, 1000)
				return
			}
			this.search();
		},
		mounted() {}
	}
</script>
<style>
	@import "../../assets/css/list.css";
	.center {
		text-align: center;
	}
	
	.el-table .el-table thead.has-gutter tr, .el-table .el-table th {
		background-color: #999!important;
	}
	
	.e-table .e-table {
		border: 1px solid #EBEEF5;
	}
	
	.el-tabs__content {
		display: none;
	}
	
	.el-table__row.note td:nth-child(5) {
		background: #f73131;
		color: #fff;
	}
	
	.el-table__row.bad td:nth-child(5) {
		background: #c00;
		color: #fff;
	}
	
	.el-table__row.comments td:nth-child(5) {
		background: #E3EDCD;
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
	
	.el-table__row .el-input, .el-table__row .el-select {
		width: 120px!important;
	}
	
	.el-table--enable-row-hover .el-table__body tr:hover > td {
		color: #666;
	}
	
	.tool-tip {
		font-size: 16px;
		margin-bottom: 9px;
		font-weight: 700;
	}
</style>