<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="图书名称" prop="bookName">
                        <el-input v-model="form.bookName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="图书类别" prop="bookTypeId">
                        <el-select v-model="form.bookTypeId" placeholder="请选择">
                            <el-option
                            v-for="item in bookTypes"
                            :key="item.id"
                            :label="item.bookTypeName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model="form.press" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="form.price" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="图书编码" prop="bookCode">
                        <el-input v-model="form.bookCode" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="add">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {addBook,selectBookTypeSummary} from '@/api/book/book'
export default{
    name:"BookAddForm",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                id:"",
                bookName:"",
                press:"",
                price:"",
                bookCode:""
            },
            bookTypes:[],
            title:""
        }
    },
    mounted(){
        
    },
    methods:{
        init(title,row){
            this.dialogFormVisible = true;
            this.title = title;
            if(row === null|| row===""){
                this.form.bookName = ""
            }else{
                this.form.bookName = row.bookName;
                this.form.id = row.id
            }
            this.selectBookType()
        },
        add(){
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                addBook(this.form).then(function (response) {
                        that.form.bookName = null;
                        that.form.id = null;
                        that.dialogFormVisible = false;
                        that.$emit('refreshDataList')
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            })
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
    }

}

</script>
