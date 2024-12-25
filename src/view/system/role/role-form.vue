<template>
    <el-dialog 
        :title="menuTitle"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName" placeholder=""></el-input>
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
import {addOrUpdateRole} from '@/api/login/system';
export default{
    name:"RoleForm",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                id:"",
                roleName:""
            },
            menuTitle:""
        }
    },
    mounted(){

    },
    methods:{
        init(row){
            this.dialogFormVisible = true;
            if(row === ""|| row===null){
                this.form.roleName = "";
                this.form.id ="";
                this.menuTitle = '添加角色';
            }else{
                this.form.roleName = row.roleName;
                this.form.id = row.roleId;
                this.menuTitle = '修改角色';
            }
        },
        addOrUpdate(){
            console.log(this.form)
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                addOrUpdateRole(this.form).then(function (response) {
                        that.form.roleName = null;
                        that.form.roleId = null;
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