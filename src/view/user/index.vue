<template>
  <div>
    <el-form :inline="true">
        <el-form-item>
            <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleClick('添加用户','')"
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
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick('修改用户信息',scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="changeUserRole(scope.row)" type="text" size="small">授权</el-button>
          <el-button @click="delUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <user-form
    v-show="show"
    ref="addOrUpdate"
    @refreshDataList="getUsers"
    >
    </user-form>

    <el-dialog 
        title="权限列表"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
    <el-select v-model="userRoles" multiple placeholder="请选择">
      <el-option
        v-for="item in roles"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId">
      </el-option>
    </el-select>
    <el-button @click="saveUserRoles" type="text" size="small">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import userForm from './user-form.vue'
import {getUserList,delUser,getRoleList,selectUserRole,addOrUpdateUser} from '@/api/login/system'
  export default {
    components:{userForm},
    data() {
      return {
        tableData: [],
        show:false,
        dialogFormVisible:false,
        userRoles:[],
        roles:[],
        selectUserId:""
      }
    },
    mounted(){
      this.getUsers()
    },
    methods: {
      handleClick(menuTitle,row) {
        this.show = true;
        this.$nextTick(() => {
            this.$refs.addOrUpdate.init(menuTitle,row)
        })
      },
      getUsers(){
        const that =this;
        getUserList({})
        .then(response=>{
          that.tableData = response.data
        })
        .catch(error=>console.log(error))
      },
      delUser(row){
        const that =this;
        delUser(row)
        .then(response=>{
          that.getUsers()
        })
        .catch(error=>console.log(error))
      },
      changeUserRole(row){
        const that =this;
        this.selectUserId =row.userId;
        getRoleList({})
        .then(response=>{
          that.roles = response.data
        })
        .catch(error=>console.log(error))
        

        selectUserRole({"userId":row.userId}).then(response=>{
          that.userRoles = response.data
        }).catch(error=>console.log(error))

        this.dialogFormVisible = true;
      },
      saveUserRoles(){
        addOrUpdateUser({"userId":this.selectUserId,"roleIdList":this.userRoles})
        .then(response=>{this.dialogFormVisible = false;})
        .catch(error=>console.log(error))
      }
    },
  }
</script>