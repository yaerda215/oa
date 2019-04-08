<template>
  <div>
    <el-table border fit :ref='tableRef' :data="formatData" @selection-change="handleSelectionChange" @current-change="handleCurrentChange" @on-drop-change="handleDrapChange" :max-height='maxHeight' :header-cell-style='headerCellStyle' highlight-current-row :size='size' :style="tableStyle">
     <!-- :default-sort="defaultSort" drag-drop row-key='id' :target='dropTable'  -->
    <!-- :row-style="showRow"  v-bind="$attrs" @expand-change="handleExpandChange" :cell-style='cellStyle' -->
      <!-- 是否多选 -->
      <el-table-column type="selection" width="55" v-if="ifHaveCheckBox" align='center'>
      </el-table-column>
      <!-- 是否显示序列 -->
      <el-table-column type="index" width="55" label="序号" v-if="ifHaveIndex" align='center'>
      </el-table-column>
      <!-- table数据 -->
      <el-table-column v-for='(item) in column' :key='item.key' v-bind="item"  :text-align='textAligh' :show-overflow-tooltip=true>
        <template slot-scope="scope">
          <span v-if="scope.row[item.key]===undefined||scope.row[item.key]===null||scope.row[item.key]===''||scope.row[item.key].toString().trim()==''">--</span>
          <!-- <el-popover placement="top" trigger="hover" v-else-if='scope.row[item.key].toString().trim().length>showLen&&showLen>0&&showLen!=0' :content="scope.row[item.key].toString()">
            <span slot="reference">{{ `${scope.row[item.key].toString().trim().slice(0,showLen)}...` }}</span>
          </el-popover> -->
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <!-- 指标状态数据 -->
      <!-- <el-table-column label='状态' align='center' v-if='isHaveState' width='80'>
        <template slot-scope="scope">
          <status :data="stateData(scope)"></status>
        </template>
      </el-table-column> -->
      <!-- 修改删除操作 -->
      <!-- <el-table-column label='操作' align='center' width='150' v-if='isHaveEdit||isHaveOpen||isHaveDelete||isHaveAdd||isHaveSon'>
        <template slot-scope="scope">
          <el-tooltip v-if="isHaveEdit(scope)" effect="dark" content="修改" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-edit" size='mini' @click="editHandle(scope)">
              <svg-icon iconClass="edit"></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip v-if="isHaveOpen(scope)" effect="dark" content="查看" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-edit" size='mini' @click="openHandle(scope)">
              <svg-icon iconClass="detail"></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="启用" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-start" v-show="isHaveRecovery(scope)" :disabled="startDisabled(scope)" @click="recoveryHandle(scope)" size='mini'>
              <svg-icon iconClass="start"></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="停用" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-pause" v-show="isHaveSuspend(scope)" @click="suspendHandle(scope)" size='mini'>
              <svg-icon iconClass="pause"></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip v-if="isHaveDelete" effect="dark" content="删除" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-del" size='mini' @click='deleteHandle(scope)' :disabled="deleteDisabled(scope)">
              <svg-icon iconClass="del"></svg-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip v-if="isHaveSon" effect="dark" content="所属维度成员" placement="top" :open-delay=2000 :enterable=false>
            <el-button class="icon-button-edit" size='mini' @click='changeSonHandle(scope)'>
              <svg-icon iconClass="dimMem"></svg-icon>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column> -->
      <!-- <slot></slot> -->
    </el-table>
    <el-pagination
    v-show="ifHavePagi&&tableLength > 0"
    layout="total, sizes,prev, pager, next, jumper"
    :page-sizes="[15, 20, 30, 50]"
    :total="pageTotal"
    :page-size='pageSize'
    :current-page='pageIndex'
    @current-change='pagiCurrentChange'
    @size-change="pagiSizeChange">
    </el-pagination>
  </div>
</template>

<script>
/**
 * 必填
 * @param {tableData} 表格数据
 * @param {column} 表格头数据{key:'',label:''} key代表唯一ID值,label代表名称
 */

/**
 * 选填
 * @param {showLen} 表格内容显示多长(超过改长度的显示...)
 * @param {isHaveEdit} 是否有修改
 * @function editHandle(scope) 修改事件,scope为修改行数据
 * @param {isHaveOpen} 是否有查看
 * @function openHandle(scope) 查看事件,scope为查看行数据
 * @param {isHaveDelete} 是否有删除
 * @function deleteHandle(scope) 删除事件,scope为删除行数据
 * @param {isHaveAdd} 是否有添加
 * @function addHandle(scope) 添加事件,scope为添加行数据
 * @param {isHaveSon} 是否有修改所属维度成员
 * @function changeSonHandle(scope) 修改所属维度成员事件,scope为添加行数据
 * @param {isHaveSuspend} 是否有暂停
 * @function suspendHandle(scope) 暂停事件,scope为暂停行数据
 * @param {isHaveRecovery} 是否有恢复
 * @function recoveryHandle(scope) 恢复事件,scope为恢复行数据
 * @param {ifHaveCheckBox} 是否显示多选
 * @function handleSelectionChange(val) 多选事件 val为选中项数据
 * @function handleCurrentChange(val) 行点击事件 val为选中行数据
 * @param {ifIsExpand} 是否展示tableTree
 * @function handleExpandChange(val) 展开事件 val为展开项数据
 * @param {ifHaveIndex} 是否显示序列号
 * @param {ifHavePagi} 是否显示分页
 */
//  import treeToArray from './eval'
// import status from '../status'
export default {
  name: 'hyTable',
  // components: {
  //   status
  // },
  props: {
    tableData: {
      type: Array,
      default:() => []
    },
    stateData: {
      type: Function,
      default:() => {}
    },
    column: {
      type: Array,
      default:() => []
    },
    tableRef: {
      type: String,
      default:()=> null
    },
    size: {
      type: String,
      default:()=>'medium '
    },
    tableStyle: {
      type: String,
      default:()=>'width: 100%'
    },
    startDisabled: {
      type: Function,
      default:() => {}
    },
    deleteDisabled: {
      type: Function,
      default:() => {}
    },
    expandCloumns: {
      type: Array,
      default: () => [{width: '100'}]
    },
    isHaveState: {
      type: Boolean,
      default:() => false
    },
    isHaveEdit: {
      type: Function,
      default:() => {}
    },
    isHaveOpen: {
      type: Function,
      default:() => {}
    },
    isHaveDelete: {
      type: Boolean,
      default:() => false
    },
    isHaveAdd: {
      type: Boolean,
      default:() => false
    },
    isHaveSon: {
      type: Boolean,
      default:() => false
    },
    isHaveSuspend: {
      type: Function,
      default:() => {}
    },
    isHaveRecovery: {
      type: Function,
      default:() => {}
    },
    ifHavePagi: {
      type: Boolean,
      default:() => false
    },
    tableLength: {
      type: Number,
      default:() => 0
    },
    defaultSort :{
      type: Object,
      default:() => {}
    },
    maxHeight: {
      type: Number,
      default:() => 680
    },
    dropTable: {
      type: String,
      default:()=> null
    },
    showLen: {
      type: Number,
      default:() => 0
    },
    ifHaveCheckBox: {
      type: Boolean,
      default:() => false
    },
    ifIsExpand: {
      type: Boolean,
      default:() => false
    },
    ifHaveIndex: {
      type: Boolean,
      default:() => false
    },
    pageTotal: {
      type: Number,
      default:() => 0
    },
    pageSize: {
      type: Number,
      default:() => 15
    },
    pageIndex: {
      type: Number,
      default:() => 1
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    // 格式化数据源
    formatData: function() {
        return this.tableData
    }
  },
  methods: {
    editHandle(scope) {
      this.$emit('editHandle', scope.row)
    },
    openHandle(scope) {
      this.$emit('openHandle', scope.row)
    },
    deleteHandle(scope) {
      this.$emit('deleteHandle', scope.row)
    },
    addHandle(scope){
      this.$emit('addHandle', scope.row)
    },
    changeSonHandle(scope) {
      this.$emit('changeSonHandle', scope.row)
    },
    suspendHandle(scope) {
      this.$emit('suspendHandle', scope.row)
    },
    recoveryHandle(scope) {
      this.$emit('recoveryHandle', scope.row)
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleDrapChange(val) {
      this.$emit('handleDrapChange', val)
    },
    pagiCurrentChange(val) {
      this.$emit('pagiCurrentChange', val)
    },
    pagiSizeChange(val) {
      this.$emit('pagiSizeChange', val)
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    // cellStyle(param) {
    //   if (param.columnIndex === 0) {
    //     return {
    //       'text-align': 'center'
    //     }
    //   }
    //   return {}
    // },
    headerCellStyle(param) {
      if (param.columnIndex !== 0) {
        return {
          'text-align': 'center',
          'font-size': '14px'
        }
      }
      return {
        'font-size': '14px'
      }
    },
    textAligh() {
      return {
        'text-align': 'left'
      }
    }
  }
}
</script>

<style scoped>
@import './index.css';
</style>
