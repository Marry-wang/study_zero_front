<template>
    <div id="bookBorrowing">
        <el-form :inline="true">
            <el-form-item>
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleUpdateClick('')"
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
                prop="borrowingTime"
                label="借阅时间">
            </el-table-column>
            <el-table-column
                prop="returnTime"
                label="归还时间">
            </el-table-column>
            <el-table-column
                prop="borrowingBy"
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


        <el-dialog
            title="借阅信息"
            :visible.sync="isShow"
            width="20%"
        >
            <el-form ref="dataForm" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="图书id" prop="bookId">
                            <el-input v-model="form.bookId" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="借阅人" prop="borrowingBy">
                            <el-input v-model="form.borrowingBy" placeholder="" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button @click="edit">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {selectBookBorrowingRecord,editBookBorrowingRecord} from '@/api/book/book'
export default {
    data(){
        return{
            tableData:[],
            isShow:false,
            form:{
                "bookId":"",
                "borrowingTime":"",
                "returnTime":"",
                "borrowingBy":"",
                "status":""
            }
        }
    },
    mounted(){
        this.selectBookBorrowingRecords();
    },
    methods:{
        statusFunction(row){
            switch (row.status) {
                case "0":
                   return  "未归还";
                case "1":
                    return "已归还";
                default:
                    break;
            }
        },
        selectBookBorrowingRecords(){
            selectBookBorrowingRecord({}).then(response=>{
                this.tableData = response.data
            })
        },
        handleUpdateClick(row){
            if(row === null|| row===""){
                this.form.bookId = ""
                this.form.borrowingTime = ""
                this.form.returnTime = ""
                this.form.borrowingBy = ""
                this.form.status = ""
            }else{
                this.form = row
            }
            this.isShow = true;
        },
        returnBook(row){
            const that =this;
            this.form = row
            that.edit();
        },
        edit(){
            editBookBorrowingRecord(this.form).then(response=>{
                this.form= {}
                this.isShow = false
                this.selectBookBorrowingRecords();
            }).catch(
                function (error) {
                        console.log(error);
                }
            )
        }
    }
}
</script>
<style>

</style>