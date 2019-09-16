<template>
    <div class="z">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'支付密码'" :middle="'title'" />
        <form @submit.prevent="showData">
        <div class="mims"  v-if="hidden">
            <div class="pass">
                <img src="../../img/mm.png" height="22" width="22" alt="" />
                <input type="text" placeholder="旧密码" class="password" v-model="one"/>
            </div>
            <div class="pass">
                <img src="../../img/mms.png" height="22" width="22" alt="" />
                <input type="password" placeholder="新密码" class="password" v-model="two"/>
            </div>

            <div class="pass bu">
                <img src="../../img/mms.png" height="22" width="22" alt="" />
                <input type="password" placeholder="确认新密码" class="password" v-model="san"/>
            </div>
        </div>
        <!-- 新用户 -->
        <div class="mims" v-if="hiddens">
            <div class="pass bu">
                <img src="../../img/mms.png" height="22" width="22" alt="" />
                <input type="password" placeholder="密码" class="password" v-model="sans"/>
            </div>
             <div class="pass bu">
                <img src="../../img/mms.png" height="22" width="22" alt="" />
                <input type="password" placeholder="确认密码" class="password" v-model="new_san"/>
            </div>
        </div>
        <button class="btn" type="submit">确认修改</button>
        </form>
    </div>
</template>
<script>
import Header from "../../components/header/header.vue";
import { Toast } from 'mint-ui' ;
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            one:'',
            two:'',
            san:'',
            sans:'',
            st_id:'',
            new_san:'',
            status:'',
            hidden:true,
            hiddens:false
        }
      },
      created(){
        this.status = localStorage.getItem("status");
        if(this.status==0){
          this.hidden = false
          this.hiddens = true
        }
      },
      components:{
        Header
      },
      methods:{
        showData:function(e){
             var token = localStorage.getItem("login");
             if(this.status==1){
                  if (this.one=='') {
                        Toast({
                          message:'请输入旧密码',
                          position: 'bottom',
                          duration: 2000
                        });
                        return
                      }
                    if (this.two=='') {
                          Toast({
                            message:'请输入新密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
                    if (this.san=='') {
                          Toast({
                            message:'请确认新密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }

                    if (this.one.length <6 || this.one.length >15) {
                          Toast({
                            message:'请输入6-15位密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
                   if (this.two.length <6 || this.two.length >15) {
                          Toast({
                            message:'请输入6-15位密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
                   if (this.two != this.san) {
                          Toast({
                            message:'输入密码不一致',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
              var successCallback =  (response) => {
                Toast({
                      message:response.msg,
                      position: 'bottom',
                      duration: 1200
                    });
                if(response.status==200){
                    
                    setTimeout(() =>{
                        this.$router.push({path:'/mine'})
                    },1500)

                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/paypwd',{
                "token":token,
                "old_password":this.one,
                "new_password":this.two,
                "confirm_password":this.san,
              }).then(successCallback,errorCallback);
            }else if(this.status==0){

                if (this.sans=='') {
                    Toast({
                      message:'请输入密码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
                  if (this.sans.length <6 || this.sans.length >15) {
                          Toast({
                            message:'请输入6-15位密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
                  if (this.new_san=='') {
                          Toast({
                            message:'请确认密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }

                   if (this.new_san.length <6 || this.new_san.length >15) {
                          Toast({
                            message:'请输入6-15位密码',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
                   if (this.new_san != this.sans) {
                          Toast({
                            message:'输入密码不一致',
                            position: 'bottom',
                            duration: 2000
                          });
                          return
                        }
               var successCallback =  (response) => {
                  if(response.status==200){
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 1200
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine'})
                    },1500)

                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
                }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/paypwd',{
                "token":token,
                "new_password":this.sans,
                "confirm_password":this.new_san,
              }).then(successCallback,errorCallback);   
            }         
        }
     }
    }
</script>
<style>
.mims{
    padding-top: 50px;
    background:#fff;
}
.pass{
    width:80%;
    margin-left: 10%;
    border-bottom:1px solid #eee;
}
.password{
    width:70%;
    padding-top: 15px;
    margin-bottom: 12px;
}
.btn{
    width:80%;
    height:40px;
    margin-left: 10%;
    border-radius: 30px;
    border:none;
    outline: none;
    margin-top: 20px;
    background:#e12c20;
    color:#fff;
 }
 .bu {
   border: none;
 }
</style>
