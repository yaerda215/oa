<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chartColumn" style="width:100%; height:500px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chartLine" style="width:100%; height:500px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>
	import echarts from 'echarts'

	export default {
		data() {
			return {
				chartColumn: null,
				chartBar: null,
				chartLine: null,
				chartPie: null,
				team: '一大队',
				//柱状图加分数据
				addArr: [],
				//柱状图扣分数据
				cutArr: [],
				//柱状图通报数据
				tbArr: [],
				//折线图加分数据
				addArr2: [],
				//折线图扣分数据
				cutArr2: [],
				//折线图通报数据
				tbArr2: []
			}
		},
		methods: {
			drawColumnChart() {
				let that = this
				this.chartColumn = echarts.init(document.getElementById('chartColumn'));
				var myChart = echarts.init(document.getElementById('chartColumn'))
				myChart.on('click',function(prams) {
					that.team = prams.name
					that.drawLineChart()
				})
				this.chartColumn.setOption({
					title: { text: '2019年区队奖惩情况' },
					tooltip: {},
					xAxis: {
						data: ["一大队", "二大队", "三大队", "四大队"]
					},
					yAxis: {
						name: '单位: 次'
					},
					series: [{
						name: '加分总次数',
						type: 'bar',
						data: [5, 20, 36, 10]},
						// data: this.addArr,
					{
						name: '扣分总次数',
						type: 'bar',
						data: [5, 20, 36, 10]},
						// data: this.cutArr
					{
						name: '通报总次数',
						type: 'bar',
						data: [5, 20, 36, 10]}
						// data: this.tbArr
					]
				});
			},
			drawLineChart() {
				this.chartLine = echarts.init(document.getElementById('chartLine'));
				this.chartLine.setOption({
					title: {
						text: this.team + '奖惩趋势'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: ['加分次数', '扣分次数', '通报次数']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['1月', '2月', '3月', '4月', '5月', '6月']
					},
					yAxis: {
						name: '单位: 次',
						type: 'value'
					},
					series: [
						{
							name: '加分次数',
							type: 'line',
							stack: '总量',
							data: [120, 132, 101, 134, 90, 230]
							// data: this.addArr2
						},
						{
							name: '扣分次数',
							type: 'line',
							stack: '总量',
							data: [220, 182, 191, 234, 290, 330]
							// data: this.cutArr2
						},
						{
							name: '通报次数',
							type: 'line',
							stack: '总量',
							data: [820, 932, 901, 934, 1290, 1330]
							// data: this.tbArr2
						}
					]
				});
			},
		},

		mounted: function () {
			this.drawColumnChart(),
			this.drawLineChart()
		},
	}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
