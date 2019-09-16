<template>
    <div style="background:#fff;">
        <Header :type="'routers'" :title="'注册'" :right="'choice'" :middle="'title'"/>
        <div class="tp_b">

        </div>
        <div class="bbb">
             <div class="login">
                <div class="login_li">
                    <img src="../../../img/sj.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请输入昵称" v-model="nickname"/>
                </div>
                 <div class="login_li">
                    <img src="../../../img/sj.png" height="22" width="22" alt="" />
                    <input type="number" class="login_in" placeholder="请输入手机号码" v-model="phone"/>
                </div>
                <div class="login_li">
                    <img src="../../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请设置密码" v-model="word"/>
                </div>
                <div class="login_li">
                    <img src="../../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请确认密码" v-model="words"/>
                </div>
                <div class="login_li">
                    <img src="../../../img/mms.png" height="22" width="22" alt="" />
                    <input type="number" class="login_in" placeholder="推荐人手机号码" v-model="phones"/>
                </div>
            </div>
        </div>
        <div class="appreg"><span class="appsty" @click="appstys"><span v-if="appstysr" class="appstyshr">√</span></span>我已阅读并同意<span style="color: red;" @click="apphr">《易合商城用户协议》</span></div>
       <button class="login_d" @click="btns">注册</button>
    </div>
</template>
<script type="text/javascript">
import Header from "../../../components/header/header.vue";
import { Toast } from 'mint-ui';
import {URL} from "../../../API/url.js";
export default {
    data:function() {
        return{
            nickname:'',
            phone:'',
            word:'',
            words:'',
            phones:'',
            appstysr: true
        }
      },
       components:{
        Header
      },
      methods:{
        btns:function(){
            if(!this.appstysr){
                Toast({
                message: '请勾选协议',
                position: 'bottom',
                duration: 3000
                });
                return
            }
            if(this.nickname==''){
                Toast({
                  message: '请输入昵称',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
            if(this.phone==''){
                Toast({
                  message: '请输入手机号码',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
            if(this.word==''){
                Toast({
                  message: '请设置密码',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
             if (this.word.length <6 || this.word.length >15) {
                    Toast({
                      message:'请输入6-15位密码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
            if(this.words==''){
                Toast({
                  message: '请确认密码',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
            if (this.words.length <6 || this.words.length >15) {
                    Toast({
                      message:'请输入6-15位密码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
            

            if(this.words != this.word){
                Toast({
                  message: '2次密码不一致',
                  position: 'bottom',
                  duration: 3000
                });
                return
            }
        var successCallback =  (response) => {
          if(response.status==200){
             Toast({
                  message:response.msg,
                  position: 'bottom',
                  duration: 2000
                });
              setTimeout(() =>{
                  this.$router.push({path:'/login/login'})
              },2500)

          }else if(response.status==500){
            Toast({
                  message:response.msg,
                  position: 'bottom',
                  duration: 3000
                });
          }
        }
        this.$http.post(URL+'/api/login/reg',{
          "nickname":this.nickname,
          "username":this.phone,
          "password":this.word,
          "password2":this.words,
          "invite":this.phones,
        }).then(successCallback);
        },
        appstys(){
            this.appstysr = !this.appstysr;
        },
        apphr(){
            window.location.href="http://3.myfutrue.cn/privacy/index.html";
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
        width:80%;
        height:50px;
        margin-left: 10%;
        background:#e12c20;
        border-radius:30px;
        color:#fff;
        margin-top: 20px;
    }
    .appreg{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content:center;
        align-items:Center;
        margin: 17px 0 7px 0;
    }
    .appsty{
        margin: 0 7px;
        display: inline-block;
        width: 17px;
        height: 17px;
        border-radius: 3px;
        border: #ddd solid 1px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        justify-content:center;
        align-items:Center;
    }
    .appstyshr{
        color: red;
        font-weight: bold;
    }

</style>
