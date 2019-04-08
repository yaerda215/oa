<template>
	<section>
		<!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" size="small" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.area" size="small" placeholder="区队"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item v-if="ifAdmin">
					<el-button type="primary" size="small" @click="handleEdit">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" max-height="350" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" label="序号" width="70">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="team" label="所在区队" width="180" sortable>
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="100" :formatter="formatgender">
			</el-table-column>
			<el-table-column prop="rewardOrPunishment" :show-overflow-tooltip="true" label="奖惩情况" width="150">
			</el-table-column>
			<el-table-column prop="reason" :show-overflow-tooltip="true" label="奖惩原因">
			</el-table-column>
			<el-table-column label="操作" width="160" v-if="ifAdmin">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--翻页工具条-->
		<el-col :span="24" class="toolbar" v-if="users.length>0">
			<el-button type="danger" @click="batchRemove" size="small" v-if="ifAdmin" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!-- 区队信息form表 -->
		<el-form :model="teamInfo">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form-item label='本周重点检查项目'>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&!isEdit1" @click="editClick1()">编辑</el-button>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&isEdit1" @click="editSave1()">保存</el-button>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&isEdit1" @click="editCancel1()">取消</el-button>
						<el-input type="textarea" v-model="teamInfo.censor" :disabled="!ifAdmin"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label='大队严重违纪通报'>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&!isEdit2" @click="editClick2()">编辑</el-button>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&isEdit2" @click="editSave2()">保存</el-button>
						<el-button tyep="primary" size="small" v-if="ifAdmin&&isEdit2" @click="editCancel2()">取消</el-button>
						<el-input type="textarea" v-model="teamInfo.bulletin" :disabled="!ifAdmin"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			
		</el-form>

		<!--编辑/新增界面（需管理员权限）-->
		<el-dialog :title="dialogTitle" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.gender">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="奖惩情况">
					<el-input v-model="editForm.rewardOrPunishment" :min="0" :max="200"></el-input>
				</el-form-item>
				<el-form-item label="奖惩原因">
					<el-input type="textarea" v-model="editForm.reason"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交审核</el-button>
				<el-button @click.native="editFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

 //获取登录人信息
 //this.$store.getters.appInfo.userId
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				teamInfo: {
					censor: '',
					bulletin: '',
				},
				//text框编辑状态
				isEdit1: false,
				isEdit2: false,
				//判断是否为管理员
				ifAdmin: true,
				//对话框标题
				dialogTitle: '',
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					gender: -1,
					rewardOrPunishment: '',
					reason: '',
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},

			}
		},
		computed: {
			dialogTitle() {
				if(this.sels.name) {
					return "编辑"
				}else{
					return "新增"
				}
			}
		},
		methods: {
			//性别显示转换
			formatgender: function (row, column) {
				return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,
					team: this.filters.area
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			editClick1() {
				this.isEdit1 = true
			},
			editSave1() {
				this.isEdit1 = false
			},
			editCancel1() {
				this.isEdit1 = false
			},
			editClick2() {
				this.isEdit2 = true
			},
			editSave2() {
				this.isEdit2 = false
			},
			editCancel2() {
				this.isEdit2 = false
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>