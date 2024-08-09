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
          <el-button @click="selectMenuList(scope.row)" type="text" size="small">权限</el-button>
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

    <el-dialog
        title="权限列表"
        :visible.sync="dialogFormVisible"
        width="20%"
    >
      <el-tree
        :data="menuList"
        show-checkbox
        default-expand-all
        ref="tree"
        :check-strictly =true
        :default-checked-keys="defaultMenu"
        node-key="id"
        :props="defaultProps">
      </el-tree>
      <el-button @click="saveRoleMenus" type="text" size="small">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import roleForm from './role-form.vue'
import {getRoleList,delRole,getMenuList,getRoleMenuIdList,addOrUpdateRole} from '@/api/login/system'
  export default {
    components:{roleForm},
    data() {
      return {
        tableData: [],
        show:false,
        dialogFormVisible:false,
        menuList:[],
        defaultMenu:[],
        defaultProps:{
          id:'id',
          label:'menuName',
          children:'children'
        },
        selectRoleId:"",
        selectMenus:[]
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
        delRole({"roleId":row.roleId})
        .then(response=>{
          that.getRoles()
        })
        .catch(error=>console.log(error))
      },
      selectMenuList(row){
        this.selectRoleId = row.roleId;
        const that =this;
        that.defaultMenu =[]
        getMenuList({}).then(response=>{
          that.menuList = response.data;
          that.dialogFormVisible = true;
        }).catch(error=>console.log(error))

        getRoleMenuIdList({"roleId":this.selectRoleId}).then(response=>{
          that.defaultMenu = response.data
        }).catch(error=>console.log(error))
      },
      saveRoleMenus(){
        this.selectMenus =this.$refs.tree.getCheckedKeys();
        const that =this;
        addOrUpdateRole({"id":this.selectRoleId,"roleMenuIds":this.selectMenus}).then(function (response) {
              that.dialogFormVisible = false;
            })
            .catch(function (error) {
                console.log(error);
        });
      }
    },
  }
</script>
