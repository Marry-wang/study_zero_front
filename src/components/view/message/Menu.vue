<template>
    <div>
        <el-table
        :data="menuList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
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
    </div>
</template>
<script scoped>
    import {getMenuList} from '@/api/login/menu';
    export default {
        data() {
            return {
                menuList:[],
            }
        },
        mounted(){
            this.getMenus();
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            getMenus(){
                const that = this;
                getMenuList({}).then(function (response) {
                        that.menuList = response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            }
        }
    }
</script>