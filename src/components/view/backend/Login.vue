<template>
    <div id ="login" >
        <div>
            <!--flex弹性盒子模型，justify-content：主抽 -->
            <div style="display: flex;justify-content: center;margin-top: 150px">
                <el-card style="width: 400px">
                    <div slot="header" class="clearfix">
                        <span>登录</span>
                    </div>
                    <table>
                        <tr>
                            <td>用户名</td>
                            <td>
                                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>密码</td>
                            <td>
                                <el-input type="password" v-model="form.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
                            <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
                            </td>
                        </tr>
                        <tr >
                            <!-- 占两行-->
                            <td colspan="2" >
                            <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                            <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                            
                            <el-button style="width: 350px;margin-top: 20px" type="primary" @click="login">登录</el-button>
                            
                            <!-- <el-button @click="getName()">用户名:{{name}}</el-button> -->
                            </td>
                        </tr>
                    </table>
                </el-card>
            </div>
        </div>
        {{msg}}
    </div>
</template>
<script>
import {userName,loginT,loginform} from '@/api/login/login';
export default {
    name:"login",
    data(){
        return{
            msg:"",
            name:"",
            username:"",
            password:"",
            form: {
                username:"",
                password:"",
            }
        }
    },
    // mounted(){
    //     this.login();
    // },
    methods:{
        login(){
            // this.$axios({
            //     method:'get',
            //     url:'/demo/jwt/login?userName=""&passWord=""',
            // })
            // let params={
            //     username:'zhangsan',
            //     password:'1111'
            // }
            // this.$axios.post("/demo/jwt/login",params).then(res=>{
            //     console.log(res)
            // }).catch(res=>{
            //     console.log(res)
            // })
            // this.$axios({
            //     method: 'post',
            //     url: '/demo/login',
            //     data: this.form,
            //     // data: {
            //     // username: 'user',
            //     // password: '1111'
            //     // },
            //     transformRequest: [
            //         function (data) {
            //             let ret = ''
            //             for (let it in data) {
            //             ret +=
            //                 encodeURIComponent(it) +
            //                 '=' +
            //                 encodeURIComponent(data[it]) +
            //                 '&'
            //             }
            //             return ret
            //         }
            //     ],
            //     headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            loginform(this.form)
            .then((response) =>{     
                this.msg =  response.data
                sessionStorage.setItem('accessToken',this.msg);
                console.log(sessionStorage.getItem('accessToken'))
                loginT(this.form).then(res=>{
                    // sessionStorage.setItem('accessToken',this.msg);
                    console.log(sessionStorage.getItem('accessToken'))
                    this.$router.push('/home')
                }).catch(res=>{
                    console.log(res)
                })
                
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
#login{
    text-align: center;
}
</style>