<template>
    <div>
        <Header :type="'routers'" :title="'重置密码'" :right="'choice'" :middle="'title'"/>
        <div class="bbb">
             <div class="login">
                 <div class="login_li">
                    <img src="../../../img/sj.png" height="22" width="22" alt="" />
                    <input type="number" class="login_in" placeholder="请输入手机号码" v-model="phone"/>
                </div>
                <div class="login_li">
                    <img src="../../../img/mms.png" height="22" width="22" alt=""/>
                    <input type="text" class="login_in" placeholder="新密码" v-model="password"/>
                </div>
                <div class="login_li" style="border:none;">
                    <img src="../../../img/mms.png" height="22" width="22" alt=""/>
                    <input type="text" class="login_in" placeholder="确认密码" v-model="passwords"/>
                </div>
            </div>
        </div>
       <button class="login_d" @click="btns">确认修改</button>
    </div>
</template>
<script type="text/javascript">
import Header from "../../../components/header/header.vue";
export default {
    data:function() {
        return{
            phone:'',
            password:'',
            passwords:''
        }
      },
       components:{
        Header
      },
      methods:{
        btns:function(){
            console.log(this.phone)
            console.log(this.password)
            console.log(this.passwords)
        }
      }
    }
</script>
<style scoped>
    .bbb{
        background:#fff;
        margin-top: 50px;
    }
    .login{
        width:80%;
        margin-left: 10%;
    }
    .login_li{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eee;
    }
    .login_in{
        width: 70%;
        padding-left:3%;
        z-index: 999;
    }
    .login_d{
        width:80%;
        margin-left: 10%;
        height:50px;
        background:#e12c20;
        border-radius:30px;
        color:#fff;
        margin-top: 20px;
    }

</style>
