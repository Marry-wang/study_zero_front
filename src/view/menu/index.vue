<template>
    <div>
        <el-table 
        v-loading="loading"
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
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <add-menu
            v-show="addShow"
            ref="addOrUpdate"
        >
        </add-menu>
    </div>
</template>
<script scoped>
import {getMenuList} from '@/api/login/menu';
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
        handleClick(row) {
            this.addShow = true,
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(row)
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
        }
    }
}
</script>