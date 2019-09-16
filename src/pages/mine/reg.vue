<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'注册'" :middle="'title'" />
        <div class="tp_b">

        </div>
        <div class="bbb">
             <div class="login">
                 <div class="login_li">
                    <img src="../../img/sj.png" height="22" width="22" alt="" />
                    <input type="number" class="login_in" placeholder="请输入手机号码"/>
                </div>
                <div class="login_li">
                    <img src="../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请设置密码"/>
                </div>
                <div class="login_li">
                    <img src="../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="请确认密码"/>
                </div>
                <div>我已阅读并同意<span style="color: red;">《易合商城用户协议》</span></div>
                <button class="login_d">注册</button>
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

</style>
