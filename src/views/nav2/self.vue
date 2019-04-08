<template>
	<section>
	<el-table :data='addFormData' style="width:100%">
		<el-table-column type="index" label="序号" width="70">
		</el-table-column>
		<el-table-column prop="add" label="加分情况" width="280">
		</el-table-column>
		<el-table-column prop="reason" label="加分原因">
		</el-table-column>
		<el-table-column prop="time" label="时间" width="120">
		</el-table-column>
	</el-table>
	<el-table :data='cutFormData' style="width:100%">
		<el-table-column type="index" label="序号" width="70">
		</el-table-column>
		<el-table-column prop="cut" label="扣分情况" width="280">
		</el-table-column>
		<el-table-column prop="reason" label="扣分原因">
		</el-table-column>
		<el-table-column prop="time" label="时间" width="120">
		</el-table-column>
	</el-table>
	<el-table :data='bulletiFormData' style="width:100%">
		<el-table-column type="index" label="序号" width="70">
		</el-table-column>
		<el-table-column prop="bulleti" label="个人通报">
		</el-table-column>
		<el-table-column prop="time" label="时间" width="120">
		</el-table-column>
	</el-table>
	</section>
</template>

<script>
export default {
	data() {
		return {
			addFormData: [],
			cutFormData: [],
			bulletiFormData: []
		}
	},
	created() {
		//调取数据接口
	},
	methods: {
		
	},
}
</script>
