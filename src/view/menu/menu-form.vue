<template>
    <el-dialog 
        :title="menuTitle"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
        <el-form ref="dataForm" :model="form" label-width="80px">
            <el-row>
                <el-col :span="24" >
                    <el-form-item label="上级菜单">
                        <treeselect
                            v-model="form.parentId"
                            :options="menuList"
                            :prop="{id:'id',label:'menuName',children:'chiildren'}"
                            :normalizer="normalizer"
                            :show-count="true"
                            placeholder="选择上级菜单"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
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
            <el-button @click="addOrUpdateMenu">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {addOrUpdateMenu,getMenuList} from '@/api/login/system';
import Treeselect from '@riophae/vue-treeselect'
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default{
    name:"MenuForm",
    components: { Treeselect },
    data(){
        return{
            dialogFormVisible:false,
            menuList:[],
            form:{
                id:"",
                menuName:"",
                icon:"",
                path:""
            },
            menuTitle:"",
        }
    },
    mounted(){
        this.getMenus();
    },
    methods:{
        init(menuTitle,row){
            this.dialogFormVisible = true;
            if(row === null || row===""){
                this.form.id = "";
                this.form.menuName = "";
                this.form.icon = "";
                this.form.path = "";
            }else{
                this.form.id = row.id;
                this.form.menuName = row.menuName;
                this.form.icon = row.icon;
                this.form.path = row.path;
            }
            this.menuTitle = menuTitle;
        },
        addOrUpdateMenu(){
            this.$refs['dataForm'].validate((valid) => {
                const that = this;
                addOrUpdateMenu(this.form).then(function (response) {
                        that.form.parentId = null;
                        that.dialogFormVisible = false;
                        that.$emit('refreshDataList')
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            })
        },
        getMenus(){
            const that = this;
            getMenuList({}).then(function (response) {
                    that.menuList = response.data
                })
                .catch(function (error) {
                    console.log(error);
            });
        },
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.id,
                label: node.menuName,
                children: node.children
            };
        },
    }
    
}
</script>