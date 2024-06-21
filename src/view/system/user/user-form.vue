<template>
    <el-dialog 
        :title="menuTitle"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="用户名称" prop="userName">
                        <el-input v-model="form.userName" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="addOrUpdate">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {addOrUpdateUser} from '@/api/login/system';
export default{

    name:"UserForm",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                userId:"",
                userName:""
            },
            menuTitle:""
        }
    },
    mounted(){

    },
    methods:{
        init(menuTitle,row){
            this.dialogFormVisible = true;
            this.menuTitle = menuTitle;
            if(row === null|| row===""){
                this.form.userName = ""
            }else{
                this.form.userName = row.userName;
                this.form.userId = row.userId
            }
        },
        addOrUpdate(){
            console.log(this.form)
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                addOrUpdateUser(this.form).then(function (response) {
                        that.form.userName = null;
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