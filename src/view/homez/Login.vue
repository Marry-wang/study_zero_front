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
                                <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>密码</td>
                            <td>
                                <el-input type="password" v-model="form.userPass" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
                            <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
                            </td>
                        </tr>
                        <tr >
                            <!-- 占两行-->
                            <td colspan="2" >
                            <!-- 点击事件的两种不同的写法v-on:click和 @click-->
                            <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
                            
                            <el-button style="width: 350px;margin-top: 20px" type="primary" @click="login">登录</el-button>
                            </td>
                        </tr>
                    </table>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import {loginform} from '@/api/login/login';
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
    methods:{
        login(){
            loginform(this.form)
            .then((response) =>{     
                this.msg =  response.data
                sessionStorage.setItem('token',this.msg);
                console.log(sessionStorage.getItem('token'))
                this.$router.push('/home')
            }).catch((error) =>
                window.console.log(error)       
            
            )
            
        },
        
    }
}
</script>
<style scope>
#login{
    text-align: center;
}
</style>