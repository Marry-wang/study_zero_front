<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="类别名称" prop="bookTypeName">
                        <el-input v-model="form.bookTypeName" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="update">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {editBookTypeSummary} from '@/api/book/book'
export default{
    name:"BookTypeUpdateForm",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                id:"",
                bookTypeName:""
            },
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
                this.form.bookTypeName = ""
            }else{
                this.form.bookTypeName = row.bookTypeName;
                this.form.id = row.id
            }
        },
        update(){
            console.log(this.form)
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                editBookTypeSummary(this.form).then(function (response) {
                        that.form.bookTypeName = null;
                        that.form.id = null;
                        that.dialogFormVisible = false;
                        that.$emit('refreshDataList')
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            })
        }

    }

}

</script>
