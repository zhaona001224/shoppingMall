<template>
	<div class="add">
		<!--面包屑-->
		<el-card class="box-card">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/Discount/List'}">Coupon</el-breadcrumb-item>
				<el-breadcrumb-item>{{$route.query.id?'Edit':'Add'}}</el-breadcrumb-item>
			</el-breadcrumb>
		</el-card>

		<el-card class="box-card">
			<div class="align-center" style="width: 100%;">
				<el-form ref="form" :model="form" :rules="rules" label-width="20%" label-position="right">
					<el-form-item label="name" prop="name">
						<el-input style="width:800px" placeholder="请填写 name" maxlength="" v-model="form.name">
						</el-input>
					</el-form-item>
					<el-form-item label="online" prop="online">
						<el-radio-group v-model="form.online">
							<el-radio :label="true">{{true}}</el-radio>
							<el-radio :label="false">{{false}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="rangeTime" prop="rangeTime">

						<el-date-picker format="yyyy-MM-dd HH" value-format="yyyy-MM-dd HH" v-model="form.rangeTime" type="datetimerange" range-separator="To" start-placeholder="startTime" end-placeholder="endTime">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="discount List" width="700px">
						<el-table :data="form.discountList" width="700px" :rules="rules">
							<el-table-column cell-style="text-align:center" header-align="center" label="qty" width="120px">
								<template slot-scope="scope">
									<el-form-item :inline-message="true" :rules="tableRules.qty" :prop="'discountList.'+scope.$index+'.qty'">
										<el-input width="200px" v-model="scope.row.qty"></el-input>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column cell-style="text-align:center" header-align="center" label="discount" width="200px">
								<template slot-scope="scope">
									<el-form-item :inline-message="true" :rules="tableRules.discount" :prop="'discountList.'+scope.$index+'.discount'">
										<el-input width="200px" v-model="scope.row.discount"></el-input>
									</el-form-item>

								</template>
							</el-table-column>
							<el-table-column label="operation" width="120px" cell-class-name="center" header-align="center">
								<template slot-scope="scope">
									<el-button type="text" size="small" v-if="form.discountList.length!=1" @click="handleDelete(scope.$index)">Delete</el-button>
									<el-button type="text" size="small" @click="handleAdd(scope.$index)">Add</el-button>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>

					<el-form-item label="desc" prop="desc">

						<div ref="editorElem" style="z-index: 1000;">
							<div v-model="form.description" style="text-align:left;"></div>
						</div>
					</el-form-item>
					<div class="cls"></div>
					<div class="cls"></div>
					<div class="return-btn">
						<el-button @click.native="submit" type="info" class="button-purple">confirm</el-button>
						<el-button @click.native="$util.goBack" type="info" class="button-gray">cancel</el-button>
					</div>

				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import { ptn } from '@/utils/common/validate'
	import E from "wangeditor";
	export default {
		name: 'Add',
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('qty不能为空'));
				} else {

					var index = rule.field.split('.')[1] * 1;
					if(this.form.discountList[index - 1] && this.form.discountList[index - 1].qty * 1 > value * 1) {
						callback(new Error('qty不能小于前一条数据的qty'));
						return
					}
					if(this.form.discountList[index + 1] && (this.form.discountList[index + 1].qty * 1 < value * 1)) {

						callback(new Error('qty不能大于后一条数据的qty'));
						return
					}
					callback();
				}
			};
			return {

				form: {
					discountList: [{
						level: 1,
						qty: '',
						discount: ''
					}],
					online: false,
				},

				list: {

				},
				tableRules: {
					level: [{
						required: true,
						message: 'level不能为空',
						trigger: 'blur'
					}],
					qty: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					discount: [{
						required: true,
						message: 'discount不能为空',
						trigger: 'blur'
					}],
				},
				activeKey: '',
				rules: {
					name: [{
						message: "请填写name",
						required: true,
						trigger: 'blur'
					}],
					rangeTime: [{
						message: "请填写rangeTime",
						required: true,
						trigger: 'blur'
					}]

				},
			}
		},
		methods: {
			handleAdd(index) {
				this.$refs.form.validate((valid) => {
					if(valid) {
						this.form.discountList.splice(index + 1, 0, {
							qty: '',
							discount: ''
						})
						this.$forceUpdate();
					} else {

						return false;
					}
				});

			},
			creatEdit() {
				var that = this;
				setTimeout(() => {
					this.editor = new E(this.$refs['editorElem']);
					// 编辑器的事件，每次改变会获取其html内容
					this.editor.customConfig.onchange = html => {
						that.form['desc'] = html;
						that.$forceUpdate();
					};
					this.editor.create(); // 创建富文本实例
					this.editor.txt.html(that.form['desc'])
				}, 1000)

			},

			handleDelete(index) {
				this.form.discountList.splice(index, 1)
				this.$forceUpdate();
			},
			//新增方法
			submit() {
				var form = {};
				form = JSON.parse(JSON.stringify(this.form)); //this.templateData是父组件传递的对象  
				var that = this;
				form.starttime = form.rangeTime[0];
				form.endtime = form.rangeTime[1];
				form.discountList.map((item, index) => {
					item.level = index + 1
				})
				form.list = JSON.stringify(form.discountList)
				form.entime = form.rangeTime[1]
				this.$refs.form.validate((valid) => {
					if(valid) {

						if(this.$route.query.id) {
							that.$post("/admin/v1/content/update?type=Discount&id=" + this.$route.query.id, form).then(response => {
								if(response.retCode == 0) {
									that.$util.successAlert("Modify Success！", '/Discount/list', 'return list');
								} else {
									that.$message({
										type: 'warning',
										message: response.message
									});
								}

							})
						} else {
							that.$post("/admin/v1/content?type=Discount", form).then(response => {
								if(response.retCode == 0) {
									that.$util.successAlert("Add Success！", '/Discount/list', 'return list');
								} else {
									that.$message({
										type: 'warning',
										message: response.message
									});
								}

							})
						}

					} else {
						that.$message.error("请填写 the form correctly！");
					}
				})
			},
		},

		created() {
			this.creatEdit();
			if(this.$route.query.id) {
				this.$get("/admin/v1/content?type=Discount&id=" + this.$route.query.id, {}).then(response => {

					if(response.retCode == 0) {
						this.form = response.data;
						this.form.rangeTime = [response.data.starttime, response.data.endtime];
						this.form.discountList = this.form.list ? JSON.parse(this.form.list) : [{
							level: 1,
							qty: '',
							discount: ''
						}]
						this.$forceUpdate();

					} else {
						this.$message({
							message: response.msg,
							type: 'warning'
						})
					}
				})
			}

		}

	}
</script>

<style scoped="">
	@import "../../assets/css/add.css";
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 128px;
		height: 128px;
		line-height: 128px;
		text-align: center;
		background-color: #fbfdff;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
	}
	
	.avatar {
		width: 128px;
		height: 128px;
		display: block;
	}
	
	/deep/ .w-e-menu,
	/deep/ .w-e-text-container {
		z-index: 1000!important;
	}
</style>