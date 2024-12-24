<template>
  <div>
    <!-- <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleAddClick"
            >
                添加
            </el-button>
    <el-form :inline="true">
        <el-form-item>
            <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleAddClick('添加图书','')"
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
        prop="bookName"
        label="图书名称">
      </el-table-column>
      <el-table-column
        prop="bookTypeName"
        label="图书类别">
      </el-table-column>
      <el-table-column
        prop="press"
        label="出版社">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="bookCode"
        label="图书编码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdateClick('修改图书',scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>-->

    <book-add-form
    v-show="addShow"
    ref="add"
    @refreshDataList="getBooks"
    >
    </book-add-form>

    <book-update-form
    v-show="updateShow"
    ref="update"
    @refreshDataList="getBooks"
    >
    </book-update-form> 
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
        @tableDel="delBook"
    />
  </div>
</template>

<script>
import bookAddForm from './book-add-form.vue'
import bookUpdateForm from './book-update-form.vue'
import {delBook,selectBook,selectBookTypeSummary} from '@/api/book/book'
  export default {
    components:{bookAddForm,bookUpdateForm},
    data() {
      return {
        tableData: [],
        addShow:false,
        updateShow:false,
        dialogFormVisible:false,
        bookTypes:[],
        tableColumn:[
            {
                "prop":"bookName",
                "label":"图书名称"
            },
            {
                "prop":"bookTypeName",
                "label":"图书类别"
            },
            {
                "prop":"press",
                "label":"出版社"
            },
            {
                "prop":"price",
                "label":"价格"
            },
            {
                "prop":"bookCode",
                "label":"图书编码"
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
      this.getBooks();
      this.selectBookType();
    },
    methods: {
      handleAddClick() {
        this.addShow = true;
        this.$nextTick(() => {
            this.$refs.add.init("添加图书","")
        })
      },
      handleUpdateClick(row) {
        this.updateShow = true;
        this.$nextTick(() => {
            this.$refs.update.init("修改图书",row)
        })
      },
      getBooks(){
        const that =this;
        selectBook({pageNum:this.currentPage,pageSize:this.pageSize})
        .then(response=>{
          that.tableData = response.data.records
          that.pageTotal = response.data.total;
        })
        .catch(error=>console.log(error))
      },
      delBook(row){
        const that =this;
        delBook({"bookId":row.bookId})
        .then(response=>{
          that.getBooks()
        })
        .catch(error=>console.log(error))
      },
      selectBookType(){
          const that = this;
          selectBookTypeSummary({}).then(function (response) {
              that.bookTypes = response.data;
          })
          .catch(function (error) {
              console.log(error);
          });
          
      },
      handleSizeChange(val){
        this.pageSize =val;
        this.currentPage =1;
        this.getBooks();
      },
      handleCurrentChange(val){
          this.currentPage =val;
          this.getBooks();
      }
    },
  }
</script>
