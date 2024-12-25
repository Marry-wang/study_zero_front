<template>
  <div>
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

    <my-table
        :columnArr.sync="tableColumn"
        :myTableData="tableData"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :pageTotal="pageTotal"
        :tableUpdateMsg="tableUpdateMsg"
        :tableDelMsg="tableDelMsg"
        :tableDelShow="true"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @tableUpdate="handleUpdateClick"
        @tableAdd="handleAddClick"
        @tableDel="delType"
    />
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
        tableColumn:[
            {
                "prop":"bookTypeName",
                "label":"图书类别"
            }
        ],
        pageTotal:1000,
        pageSize:10,
        currentPage:1,
        tableUpdateMsg:'编辑',
        tableDelMsg:'删除'
      }
    },
    mounted(){
      this.getTypes();
    },
    methods: {
      handleAddClick() {
        this.addShow = true;
        this.$nextTick(() => {
            this.$refs.add.init('添加类别','')
        })
      },
      handleUpdateClick(row) {
        this.updateShow = true;
        this.$nextTick(() => {
            this.$refs.update.init("更新类别",row)
        })
      },
      getTypes(){
        const that =this;
        selectBookTypeSummary({pageNum:this.currentPage,pageSize:this.pageSize})
        .then(response=>{
          that.tableData = response.data.records
          that.pageTotal = response.data.total;
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
      },
      handleSizeChange(val){
        this.pageSize =val;
        this.currentPage =1;
        this.getTypes();
      },
      handleCurrentChange(val){
          this.currentPage =val;
          this.getTypes();
      }
    },
  }
</script>
