<template>
	<el-form ref="form" :model="form" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="姓名">
			<el-input v-model="form.name" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="学号">
			<el-input v-model="form.studentId" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="性别">
			<el-input v-model="form.gender" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="寝室">
			<el-input v-model="form.bedroom" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="所在大队">
			<el-input v-model="form.team" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="所在区队">
			<el-input v-model="form.area" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="班级">
			<el-input v-model="form.class" :disabled='canEdit'></el-input>
		</el-form-item>
		<el-form-item label="联系方式">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item label="邮箱">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click='onSubmit()'>保存</el-button>
 			<el-button @click='reset()'>重置</el-button>
 		</el-form-item>
	</el-form>
</template>


<script>
	import { getUserList,submitChange } from '../api/api';
	export default {
		data() {
			return {
				form: {
					name: '',
					studentId: '',
					gender: '',
					bedroom: '',
					team: '',
					area: '',
					class: '',
					phone: '',
					email: '',
				},
				//控制能否编辑，true为不能编辑
				canEdit: true,
			}
		},
		created() {
			//调取用户信息接口
			this.getUserInfo()
		},
		methods: {
			onSubmit() {
				var mobileReg = new RegExp("^(13+\d{9})|(159+\d{8})|(153+\d{8})$");
				var emailReg = new RegExp("^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$");
				if(!mobileReg.test(this.form.phone)){ 
					//手机验证
					alert("手机号码输入有误!");
					return false;
				} else if (!emailReg.test(this.form.email)) {
					//邮箱验证
					alert("邮箱地址输入有误!");
					return false;
				} else {
					const obj = {
						phone: this.form.phone,
						email: this.form.email
					}
					submitChange(obj).then(data => {
					if(data.success) {
						this.$message({
							message: '修改成功！',
          		type: 'success'
						})
					} else {
						this.$message({
							message: '修改失败！',
          		type: 'error'
						})
					}
				})
				}
			},
			getUserInfo() {
				getUserList(this.$store.getters.getuname).then((res) => {
					this.form = res.data
				})
			},
			reset() {
				//重新调取用户信息接口
				this.getUserInfo()
			}
		}
	}

</script>