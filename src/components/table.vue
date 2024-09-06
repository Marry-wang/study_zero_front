<template>
    <div>
        <div style="float: right;padding-right: 10px;">
            <el-button style="position: relative;top: 10px; "
                type="primary" 
                icon="el-icon-plus"
                @click="tableAdd()"
            >
                添加
            </el-button>
        </div>
        <div style="position: relative;top: 10px; ">
            <el-table :data="myTableData" style="width: 100%">
                <el-table-column v-for="(item,index) in columnArr" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button  :disabled="scope.row.status==='1'" @click="tableUpdate(scope.row)" type="text" size="small">更新</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div>
                <el-pagination
                    style="float: right;padding-right: 10px;"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 50, 100]"
                    :page-size=pageSize
                    layout="sizes, prev, pager, next"
                    :total=pageTotal>
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props:{
        myTableData:{
            type:Array,
            default:()=>[]
        },
        pageSize:{
            type:Number,
            default:()=>10
        },
        pageTotal:{
            type:Number,
            default:()=>100
        },
        currentPage:{
            type:Number,
            default:()=>1
        },
        columnArr:{
            type:Array,
            default:() => []
        }
    },
    // data:{
    //     tableData:{},
    //     pageSize:10,
    //     pageTotal:100,
    //     currentPage:1
    // },
    methods:{
        
        handleSizeChange(val){
            this.$emit('handleSizeChange',val)
        },
        handleCurrentChange(val){
            this.$emit('handleCurrentChange',val)
        },
        tableUpdate(row){
            this.$emit('tableUpdate',row)
        },
        tableAdd(){
            this.$emit('tableAdd')
        }
    }
}
</script>
<style>

</style>