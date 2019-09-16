<template>
    <div style="background:#fff;">
        <Header :type="'routers'" :title="'登录'" :right="'choice'" :middle="'title'"/>
        <div class="tp_b">
        </div>
        <div class="bbb">
             <div class="login">
                <div class="login_li">
                    <img src="../../../img/gr.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请输入用户名" v-model="name"/>
                </div>
                <div class="login_li">
                    <img src="../../../img/mms.png" height="22" width="22" alt="" />
                    <input type="password" class="login_in" placeholder="请输入密码" v-model="word"/>
                </div>
            </div>
        </div>
        <div class="loginss">
            <button class="login_d" @click="btns">登录</button>
            <div class="word">
                <router-link to="/login/reg">
                    <div class="word_l">快速注册</div>
                </router-link>
 <!--                <router-link to="/login/new_word">
                    <span class="word_r">忘记密码?</span>
                </router-link> -->
            </div>
        </div>

    </div>
</template>
<script>
import $ from 'jquery'
import Header from "../../../components/header/header.vue";
import {URL} from "../../../API/url.js";
import { Toast } from 'mint-ui';
export default {
    data:function() {
        return{
            name:'',
            word:'',
            token:''
        }
      },
       components:{
        Header
      },
      mounted(){
        // this.getAjax();
      },
      methods:{
        btns:function(){
            var username = this.name;
            var password= this.word;
            if(this.name==''){
                Toast({
                  message: '请输入用户名',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
            if(this.word==''){
                Toast({
                  message: '请输入密码',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
               var successCallback =  (response) => {
                if(response.status==200){
                    this.token = response.token;
                    localStorage.setItem('login',this.token)
                    this.$router.push({path: '/mine'}) 
                    // const session = JSON.parse(sessionStorage.getItem("path"));
                    // if(session){
                    //     const len = session.length-1;
                    //     this.$router.push({path:session[len].fullPath})
                    // }else{
                       
                    // }
                    }else{
                        Toast({
                          message: response.msg,
                          position: 'bottom',
                          duration: 3000
                        });
                    }
                }
                var errorCallback =  (response) => {
                    console.log('请求失败')
                }
                this.$http.post(URL+'/api/login/dologin',{
                    "username":username,
                    "password":password
                }).then(successCallback,errorCallback);
        }
    }
}
</script>
<style scoped>
    .bbb{
        background:#fff;
    }
    .tp_b{
        width:100%;
        margin-top: 50px;
        height: 185px;
        background: url(../../../img/pic-logo-bg.png) no-repeat 50% 100%;
        background-size: cover;
    }
    .login{
        width:80%;
        margin-left: 10%;
    }
    .login_li{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        overflow: hidden;
    }
    .login_in{
        width: 70%;
        padding-left:3%;
        height: 100%;
    }
    .login_d{
        width:100%;
        height:50px;
        background:#e12c20;
        border-radius:30px;
        color:#fff;
        margin-top: 20px;
    }
    .word{
        margin-top: 20px;
    }
    .word_r{
        float:right;
    }
    .loginss{
        width:80%;
        margin-left: 10%;
    }
    .word_l{
        width:25%;
        padding-bottom:20px;
    }
</style>
