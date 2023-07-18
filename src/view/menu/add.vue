<template>
    <el-dialog 
        title="添加菜单" 
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="form.menuName" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="图标" prop="icon">
                    <el-input v-model="form.icon" placeholder=""></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
                <el-form-item label="路径" prop="path">
                    <el-input v-model="form.path" placeholder=""></el-input>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>  
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button @click="addOrUpdateMenu" v-show="confirmStatus">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {addMenu,updateMenu} from '@/api/login/menu';
export default{
    name:"AddMenu",
    data(){
        return{
            dialogFormVisible:false,
            form:{
                id:"",
                menuName:"",
                icon:"",
                path:""
            },
            confirmStatus:true
        }
    },
    methods:{
        init(status,row){
            this.dialogFormVisible = true;
            this.form.id = row.id;
            this.form.menuName = row.menuName;
            this.form.icon = row.icon;
            this.form.path = row.path;
            this.confirmStatus =status;
        },
        addOrUpdateMenu(){
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                updateMenu(this.form).then(function (response) {
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