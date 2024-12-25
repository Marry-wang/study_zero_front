<template>
  <div>
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
