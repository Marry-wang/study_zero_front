<template>
    <el-dialog 
        title="添加菜单" 
        :visible.sync="dialogFormVisible"
        width="40%"
    >
        <el-form :model="form" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.menuName" placeholder=""></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
          
          <el-form-item label="图标">
            <el-input v-model="form.icon" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="form.path" placeholder=""></el-input>
          </el-form-item>
        
        </el-form>  
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default{
    name:"AddMenu",
    data(){
        return{
            dialogFormVisible:false,
            form:"",
        }
    },
    methods:{
        init(row){
            this.dialogFormVisible = true;
            this.form = row
        },
    }
    
}
</script>