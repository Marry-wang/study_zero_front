<template>
  <div>
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

    <my-table
      :columnArr.sync="tableColumn"
      :myTableData="tableData"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :pageTotal="pageTotal"
      :tableUpdateMsg="tableUpdateMsg"
      :tableDelMsg="tableDelMsg"
      :changeMsg="changeMsg"
      :changeShow="changeShow"
      :tableDelShow="true"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @tableUpdate="handleClick"
      @tableAdd="handleClick"
      @tableDel="delRole"
      @change="selectMenuList"
    />
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
        selectMenus:[],
        tableColumn:[
            {
                "prop":"roleName",
                "label":"角色"
            },
        ],
        pageTotal:1000,
        pageSize:10,
        currentPage:1,
        tableUpdateMsg:'编辑',
        tableDelMsg:'删除',
        changeMsg:'权限',
        changeShow:true
      }
    },
    mounted(){
      this.getRoles()
    },
    methods: {
      handleClick(row) {
        this.show = true;
        this.$nextTick(() => {
            this.$refs.addOrUpdate.init(row)
        })
      },
      getRoles(){
        const that =this;
        getRoleList({pageNum:this.currentPage,pageSize:this.pageSize})
        .then(response=>{
          that.tableData = response.data.records;
          that.pageTotal = response.data.total;
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
      },
      handleSizeChange(val){
        this.pageSize =val;
        this.currentPage =1;
        this.getRoles();
      },
      handleCurrentChange(val){
          this.currentPage =val;
          this.getRoles();
      }
    },
  }
</script>
