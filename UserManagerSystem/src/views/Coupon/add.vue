<template>
	<div class="add">
		<!--面包屑-->
		<el-card class="box-card">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/Coupon/List'}">Coupon</el-breadcrumb-item>
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

					<el-form-item label="game" prop="game">
						<el-select :clearable="true" @change="refreshData" style="width:800px" v-model="form.game" placeholder="请选择 game">
							<el-option v-for="subItem in gameList" :key="subItem.id" :label="subItem.name" :value="subItem.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="currency" prop="currency">
						<el-input style="width:800px" disabled placeholder="请填写 currency" maxlength="" v-model="form.currency">
						</el-input>
					</el-form-item>
					<el-form-item label="price" prop="price">
						<el-input style="width:800px" placeholder="请填写 price" maxlength="" oninput="value=value.replace(/[^\d.]/g,'')" v-model="form.price">
						</el-input>
					</el-form-item>
					<el-form-item label="type" prop="type">
						<el-radio-group v-model="form.type">
							<el-radio :label="1">百分比</el-radio>
							<el-radio :label="2">金额</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="initial_amount" prop="initial_amount">
						<el-input style="width:800px" placeholder="请填写 initial_amount" maxlength="" oninput="value=value.replace(/[^\d.]/g,'')" v-model="form.initial_amount">
						</el-input>
					</el-form-item>
					<el-form-item label="rangeTime" prop="rangeTime">
						<el-date-picker  format="yyyy-MM-dd HH" value-format="yyyy-MM-dd HH" v-model="form.rangeTime" type="datetimerange" range-separator="To" start-placeholder="startTime" end-placeholder="endTime">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="code" prop="code">
						<el-input style="width:800px" placeholder="请填写 code" maxlength="" v-model="form.code">
						</el-input>
					</el-form-item>
					<el-form-item label="desc" prop="desc">

						<div ref="editorElem" style="z-index: 1000;">
							<div v-model="form.desc" style="text-align:left;"></div>
						</div>
					</el-form-item>
					<el-form-item label="meta" prop="meta">
						<div ref="editorElem1" style="z-index: 1000;">
							<div v-model="form.meta" style="text-align:left;"></div>
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
		{{form}}
	</div>
</template>

<script>
	import { ptn } from '@/utils/common/validate'
	import E from "wangeditor";
	export default {
		name: 'Add',
		data() {
			var validatePass = (rule, value, callback) => {
				if(value) {
					value=value+''
					if(value.split('.')[1] && value.split('.')[1].length > 3) {
						callback(new Error('最多只能输入3位小数'));
						return
					}
					callback();
				} else {
					callback(new Error(rule.field + '不能为空'));

				}
			};
			return {

				form: {

					online: false,
					type: 1,
				},
				gameList: [],
				list: {

				},

				activeKey: '',
				rules: {
					name: [{
						message: "请填写name",
						required: true,
						trigger: 'blur'
					}],
					game: [{
						message: "请填写game",
						required: true,
						trigger: 'blur'
					}],
					price: [{
						required: true,
						trigger: 'blur',
						validator: validatePass,
					}],
					initial_amount: [{
						validator: validatePass,
						required: true,
						trigger: 'blur'
					}],
					rangeTime: [{
						message: "请填写rangeTime",
						required: true,
						trigger: 'blur'
					}],
					code: [{
						message: "请填写code",
						required: true,
						trigger: 'blur'
					}],

				},
			}
		},
		methods: {
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
					this.editor1 = new E(this.$refs['editorElem1']);
					// 编辑器的事件，每次改变会获取其html内容
					this.editor1.customConfig.onchange = html => {
						that.form['meta'] = html;
						that.$forceUpdate();
					};
					this.editor1.create(); // 创建富文本实例
					this.editor1.txt.html(that.form['meta'])
				}, 1000)

			},
			refreshData(e) {
				console.log(e)
				this.$forceUpdate();
			},
			getDataSource(url, key) {
				var that = this;
				that.$get('/admin/v1/contents?type=Game', {

				}).then(response => {
					if(response.retCode == 0) {
						this.gameList = response.data || [];

						if(this.gameList.length == 0) {
							this.$alert('请先创建Game', '提示', {
								confirmButtonText: '确定',
								callback: action => {
									this.$router.push('/template/Add/Game')
								}
							});
						}
						if(this.$route.query.id) {
							this.$get("/admin/v1/content?type=Coupon&id=" + this.$route.query.id, {}).then(response => {

								if(response.retCode == 0) {
									this.form = response.data;
									this.form.rangeTime = [response.data.starttime, response.data.endtime];
									this.form.game = parseInt(this.form.game.split(',')[0]);
									this.form.type = parseInt(this.form.type);
									this.form.currency = "$"
									this.$forceUpdate();

								} else {
									this.$message({
										message: response.msg,
										type: 'warning'
									})
								}
							})
						}
						this.$forceUpdate();
					} else {

						that.$message({
							type: 'warning',
							message: response.message
						});
					}

				})
			},
			//新增方法
			submit() {
				var form = {};
				form = JSON.parse(JSON.stringify(this.form)); //this.templateData是父组件传递的对象  
				var that = this;
				var data = this.gameList.filter((item, index) => {

					return item.id == this.form.game
				})
				form.game = this.form.game + "," + data[0].name
				form.starttime = form.rangeTime[0];
				form.endtime = form.rangeTime[1];
				form.entime = form.rangeTime[1]
				this.$refs.form.validate((valid) => {
					if(valid) {

						if(this.$route.query.id) {
							that.$post("/admin/v1/content/update?type=Coupon&id=" + this.$route.query.id, form).then(response => {
								if(response.retCode == 0) {
									that.$util.successAlert("Modify Success！", '/Coupon/list', 'return list');
								} else {
									that.$message({
										type: 'warning',
										message: response.message
									});
								}

							})
						} else {
							that.$post("/admin/v1/content?type=Coupon", form).then(response => {
								if(response.retCode == 0) {
									that.$util.successAlert("Add Success！", '/Coupon/list', 'return list');
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
			this.getDataSource();

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