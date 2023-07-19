<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleClick('添加菜单','')"
                >
                    添加
                </el-button>
            </el-form-item>
        </el-form>
        <el-table 
        v-loading="loading"
        border 
        :data="menuList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        :tree-props="{children: 'children' , hasChildren: 'hasChildren'}">
            <el-table-column
                prop="menuName"
                label="名称"
                sortable>
            </el-table-column>
            <el-table-column
                prop="icon"
                label="图标"
                sortable>
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                sortable>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick('编辑信息',scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delMenu(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <add-menu
            v-show="addShow"
            ref="addOrUpdate"
            @refreshDataList="getMenus"
        >
        </add-menu>
    </div>
</template>
<script scoped>
import {getMenuList,delMenu} from '@/api/login/menu';
import AddMenu from './add.vue'
export default {
    components:{AddMenu},
    data() {
        return {
            addShow: false,
            menuList:[],
            loading:false,
            
        }
    },
    mounted(){
        this.getMenus();
    },
    methods: {
        handleClick(menuTitle,row) {
            this.addShow = true,
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(menuTitle,row)
            })
        },
        getMenus(){
            const that = this;
            getMenuList({}).then(function (response) {
                    that.menuList = response.data;
                    this.loading=true;
                })
                .catch(function (error) {
                    console.log(error);
            });
        },
        delMenu(menuId){
            const that = this;
            delMenu({"menuId":menuId}).then(function (response) {
                that.getMenus();
                })
                .catch(function (error) {
                    console.log(error);
            });
        }
    }
}
</script>