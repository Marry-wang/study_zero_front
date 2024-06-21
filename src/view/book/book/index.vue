<template>
  <div>
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
          <el-button @click="delType(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
        bookTypes:[]
      }
    },
    mounted(){
      this.getBooks();
      this.selectBookType();
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
      getBooks(){
        const that =this;
        selectBook({})
        .then(response=>{
          that.tableData = response.data
        })
        .catch(error=>console.log(error))
      },
      delBook(row){
        const that =this;
        delBook({"id":row.id})
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
            
        }
    },
  }
</script>
