<template>
  <div>
    <el-form :inline="true">
        <el-form-item>
            <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleAddClick('添加类别','')"
            >
                添加
            </el-button>
        </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="bookTypeName"
        label="类别名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdateClick('修改类别',scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delType(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <bookType-add-form
    v-show="addShow"
    ref="add"
    @refreshDataList="getTypes"
    >
    </bookType-add-form>

    <bookType-update-form
    v-show="updateShow"
    ref="update"
    @refreshDataList="getTypes"
    >
    </bookType-update-form>
  </div>
</template>

<script>
import bookTypeAddForm from './bookType-add-form.vue'
import bookTypeUpdateForm from './bookType-update-form.vue'
import {delBookTypeSummary,selectBookTypeSummary} from '@/api/book/book'
  export default {
    components:{bookTypeAddForm,bookTypeUpdateForm},
    data() {
      return {
        tableData: [],
        addShow:false,
        updateShow:false,
        dialogFormVisible:false,
        defaultProps:{
          id:'id',
          label:'bookTypeName',
        },
      }
    },
    mounted(){
      this.getTypes();
    },
    methods: {
      handleAddClick(menuTitle,row) {
        this.addShow = true;
        this.$nextTick(() => {
            this.$refs.add.init(menuTitle,row)
        })
      },
      handleUpdateClick(menuTitle,row) {
        this.updateShow = true;
        this.$nextTick(() => {
            this.$refs.update.init(menuTitle,row)
        })
      },
      getTypes(){
        const that =this;
        selectBookTypeSummary({})
        .then(response=>{
          that.tableData = response.data
        })
        .catch(error=>console.log(error))
      },
      delType(row){
        const that =this;
        delBookTypeSummary({"id":row.id})
        .then(response=>{
          that.getTypes()
        })
        .catch(error=>console.log(error))
      }
    },
  }
</script>
