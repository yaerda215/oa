<template>
	<section>
		<el-table border :data="users" highlight-current-row @selection-change="selsChange" align='center' style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<el-table-column type="index" label='序号' width="65">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="gender" label="性别" width="100" :formatter="formatgender" sortable>
			</el-table-column>
			<el-table-column prop="area" label="所属区队" width="150" :formatter="formatgender" sortable>
			</el-table-column>
			<el-table-column prop="rewardOrPunishment" label="奖惩情况" :show-overflow-tooltip="true" width="200" sortable>
			</el-table-column>
			<el-table-column prop="creator" label="创建人" min-width="120" sortable>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">审批通过</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">驳回</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--翻页工具条-->
		<el-col :span="24" class="toolbar" v-if="users.length>0">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
export default {
	created() {
		
	},
	data() {
		return {
			users: [
				{name:"aaa",gender:"男",area:"001",rewardOrPunishment:"这是假数据",creator:"admin"}
			],
			// users: [],
			total: 1,
		}
	},
	methods: {
		handleCurrentChange() {

		}
	},
}
</script>
