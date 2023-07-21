<template>
  <div>
    <el-form :inline="true">
        <el-form-item>
            <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleClick('添加角色','')"
            >
                添加
            </el-button>
        </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick('修改角色信息',scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delRole(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <role-form
    v-show="show"
    ref="addOrUpdate"
    @refreshDataList="getRoles"
    >
    </role-form>
  </div>
</template>

<script>
import roleForm from './role-form.vue'
import {getRoleList,delRole} from '@/api/login/system'
  export default {
    components:{roleForm},
    data() {
      return {
        tableData: [],
        show:false
      }
    },
    mounted(){
      this.getRoles()
    },
    methods: {
      handleClick(menuTitle,row) {
        this.show = true;
        this.$nextTick(() => {
            this.$refs.addOrUpdate.init(menuTitle,row)
        })
      },
      getRoles(){
        const that =this;
        getRoleList({})
        .then(response=>{
          that.tableData = response.data
        })
        .catch(error=>console.log(error))
      },
      delRole(row){
        const that =this;
        delRole({"id":row.roleId})
        .then(response=>{
          that.getRoles()
        })
        .catch(error=>console.log(error))
      }
    },
  }
</script>