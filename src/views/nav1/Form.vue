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
 			<el-button @click='restet()'>重置</el-button>
 		</el-form-item>
	</el-form>
</template>


<script>
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

		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			reset() {
				console.log('reset');
			}
		}
	}

</script>