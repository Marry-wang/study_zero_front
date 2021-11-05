<template>
    <div>
        {{msg}}
        <el-row>
            <el-button @click="getName()">用户名:{{name}}</el-button>
        </el-row>
    </div>
</template>
<script>
import {loginT,userName} from '@/api/login/login';
export default {
    data(){
        return{
            msg:"",
            name:""
        }
    },
    mounted(){
        this.login();
    },
    methods:{
        login(){
            // this.$axios({
            //     method:'get',
            //     url:'/demo/jwt/login?userName=""&passWord=""',
            // })
            let params={
                userName:'',
                passWord:''
            }
            loginT().then((response) =>{     
                this.msg =  response.data
                sessionStorage.setItem('token',this.msg);
                window.console.log(response);   
            }).catch((error) =>
                window.console.log(error)       
            
            )
        },
        getName(){
            this.$axios({
                method:'get',
                url:'/demo/jwt/getUserInfo',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            }).then((response) =>{     
                this.name =  response.data.data  
                window.console.log(response);   
            }).catch((error) =>
                window.console.log(error)       
            
            )
        }
    }
}
</script>
<style scope>

</style>