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
                username:'zhangsan',
                password:'1111'
            }
            // this.$axios.post("/demo/jwt/login",params).then(res=>{
            //     console.log(res)
            // }).catch(res=>{
            //     console.log(res)
            // })
            this.$axios({
                method: 'post',
                url: '/demo/login',
                data: {
                username: 'user',
                password: '1111'
                },
                transformRequest: [
                function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret +=
                        encodeURIComponent(it) +
                        '=' +
                        encodeURIComponent(data[it]) +
                        '&'
                    }
                    return ret
                }
                ],
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) =>{     
                this.msg =  response.data.data
                sessionStorage.setItem('accessToken',this.msg);
                console.log(sessionStorage.getItem('accessToken'))
                // window.console.log(response);   
            }).catch((error) =>
                window.console.log(error)       
            
            )
            // loginT(params).then((response) =>{     
            //     this.msg =  response.data
            //     sessionStorage.setItem('token',this.msg);
            //     // window.console.log(response);   
            // }).catch((error) =>
            //     window.console.log(error)       
            
            // )
        },
        getName(){
            userName()
            .then((response) =>{     
                this.name =  response.data
                // window.console.log(response);   
            }).catch((error) =>
                window.console.log(error)       
            
            )
        }
    }
}
</script>
<style scope>

</style>