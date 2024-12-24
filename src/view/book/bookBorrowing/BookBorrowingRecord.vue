<template>
    <div id="bookBorrowing">
        <!-- <el-form :inline="true">
            <el-form-item>
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleUpdateClick('')"
                >
                    添加
                </el-button>
            </el-form-item>
        </el-form> -->

        <!-- <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="bookName"
                label="图书名称">
            </el-table-column>
            <el-table-column
                prop="borrowingTime"
                label="借阅时间">
            </el-table-column>
            <el-table-column
                prop="returnTime"
                label="归还时间">
            </el-table-column>
            <el-table-column
                prop="borrowingBy"
                :formatter="userFunction"
                label="借阅人">
            </el-table-column>
            <el-table-column
                prop="status"
                :formatter="statusFunction"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="managerBy"
                label="记录人员">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button  :disabled="scope.row.status==='1'" @click="returnBook(scope.row)" type="text" size="small">归还</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 50, 100]"
                :page-size=pageSize
                layout="sizes, prev, pager, next"
                :total=pageTotal>
            </el-pagination>
        </div>
-->

        <el-dialog
            title="借阅信息"
            :visible.sync="isShow"
            width="20%"
        >
            <el-form ref="dataForm" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图书id" prop="bookId">
                            <el-select v-model="form.bookId" filterable  placeholder="请选择">
                                <el-option
                                v-for="item in books"
                                :key="item.bookId"
                                :label="item.bookName"
                                :value="item.bookId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="借阅人" prop="borrowingBy">
                            <el-select v-model="form.borrowingBy" filterable  placeholder="请选择">
                                <el-option
                                v-for="item in users"
                                :key="item.userId"
                                :label="item.userName"
                                :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button @click="edit">确认</el-button>
            </div>
        </el-dialog> 
        <my-table
            :columnArr.sync="tableColumn"
            :myTableData="tableData"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :pageTotal="pageTotal"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            @tableUpdate="returnBook"
            @tableAdd="handleUpdateClick"
        />
    </div>
</template>
<script>
import {selectBook,selectBookBorrowingRecord,editBookBorrowingRecord} from '@/api/book/book'
export default {
    data(){
        return{
            tableData:[],
            users:[],
            books:[],
            isShow:false,
            form:{
                "bookId":"",
                "borrowingBy":"",
                "borrowingRecordId":""
            },
            tableColumn:[
                {
                    "prop":"bookName",
                    "label":"图书名称"
                },
                {
                    "prop":"borrowingTime",
                    "label":"借阅时间"
                },
                {
                    "prop":"returnTime",
                    "label":"归还时间"
                },
                {
                    "prop":"borrowingBy",
                    "label":"借阅人"
                },
                {
                    "prop":"status",
                    "label":"状态"
                }
            ],
            pageTotal:1000,
            pageSize:10,
            currentPage:1,
        }
    },
    mounted(){
        this.selectBookBorrowingRecords();
        this.getUsers();
        this.getBooks();
    },
    methods:{
        getUsers(){
            this.users = JSON.parse(sessionStorage.getItem('userList'));
            console.log(this.users);
        },
        getBooks(){
            const that =this;
            selectBook({})
            .then(response=>{
                that.books = response.data.records
            })
            .catch(error=>console.log(error))
        },
        statusFunction(row){
            for(var i=0;i<row.length;i++){
                if(row[i].status==="0"){
                    row[i].status = "未归还"
                }else if(row[i].status==="1"){
                    row[i].status = "已归还";
                }
            }
            this.tableData = row;

            // switch (row.status) {
            //     case "0":
            //        return  "未归还";
            //     case "1":
            //         return "已归还";
            //     default:
            //         break;
            // }
        },
        userFunction(row){
            const that =this;
            for(var z=0;z<row.length;z++){
                for(var i=0;i<that.users.length;i++){
                    if(row[z].borrowingBy===that.users[i].userId){
                        row[z].borrowingBy= that.users[i].userName;
                        break;
                    }
                }
            }
            this.tableData = row;
        },
        selectBookBorrowingRecords(){
            selectBookBorrowingRecord({pageNum:this.currentPage,pageSize:this.pageSize}).then(response=>{
                
                if(response.data.records.length != 0){
                    this.statusFunction(response.data.records);
                    this.userFunction(response.data.records);
                }else{
                    this.tableData = response.data.records;
                }
                this.pageTotal = response.data.total;
            })
        },
        handleUpdateClick(row){
            // if(row === null|| row===""){
                this.form.bookId = ""
                this.form.borrowingTime = ""
                this.form.returnTime = ""
                this.form.borrowingBy = ""
                this.form.status = ""
            // }else{
            //     this.form = row
            // }
            this.isShow = true;
        },
        returnBook(row){
            const that =this;
            this.form = row
            that.edit();
        },
        edit(){
            editBookBorrowingRecord(this.form).then(response=>{
                this.selectBookBorrowingRecords();
                this.form.borrowingRecordId ="",
                this.isShow = false
            }).catch(
                function (error) {
                    console.log(error);
                }
            )
        },
        handleSizeChange(val){
            this.pageSize =val;
            this.currentPage =1;
            this.selectBookBorrowingRecords();
        },
        handleCurrentChange(val){
            this.currentPage =val;
            this.selectBookBorrowingRecords();
        }
    }
}
</script>
<style>

</style>