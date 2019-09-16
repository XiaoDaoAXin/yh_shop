<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'重置密码'" :middle="'title'" />
        <div class="bbb">
             <div class="login">
                 <div class="login_li">
                    <img src="../../img/sj.png" height="22" width="22" alt="" />
                    <input type="number" class="login_in" placeholder="请输入手机号码"/>
                </div>
                <div class="login_li">
                    <img src="../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="新密码"/>
                </div>
                <div class="login_li">
                    <img src="../../img/mms.png" height="22" width="22" alt="" />
                    <input type="text" class="login_in" placeholder="确认密码"/>
                </div>
                <button class="login_d">确认修改</button>
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
        padding-top: 50px;
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
