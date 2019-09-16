<template>
    <div>
        <Header :type="'back'" :title="'登录'" :right="'choice'"/>
        <div class="tp_b">
        </div>
        <div class="bbb">
             <div class="login">
                <div class="login_li">
                    <img src="../../img/gr.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请输入用户名"/>
                </div>
                <div class="login_li">
                    <img src="../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请输入密码"/>
                </div>
                <button class="login_d">登录</button>
                <div class="word">
                    <router-link to="/mine/reg">
                        <span class="word_l">快速注册</span>
                    </router-link>
                    <router-link to="/mine/new_word">
                        <span class="word_r">忘记密码?</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
export default {
    data:function() {
        return{
        }
      },
       components:{
        Header
      },
      methods:{

      }
    }
</script>
<style scoped>
    .bbb{
        background:#fff;
    }
    .tp_b{
        width:100%;
        padding-top: 50px;
        height: 185px;
        background: url(../../img/pic-logo-bg.png) no-repeat 50% 100%;
        background-size: cover;
    }
    .login{
        width:80%;
        margin-left: 10%;
    }
    .login_li{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
    }
    .login_in{
        width: 70%;
        padding-left:3%;
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
</style>
