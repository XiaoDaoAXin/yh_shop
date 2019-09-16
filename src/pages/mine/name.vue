<template>
    <div class="box">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'修改昵称'" :middle="'title'" />
     
          <div class="namexxxx">
              <label for="">昵称：</label>
              <input type="text" class="name_x"  placeholder="" v-model='str'/>
          </div>


      <button class="btn" @click="tj">确认修改</button>
    </div>
</template>
<script>
import Header from "../../components/header/header.vue";
import { Toast } from 'mint-ui';
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            str: '',
            getStr: null,
        }
      },
      components:{
        Header
      },
      mounted(){
        this.getAjax();
      },
      methods:{
        getAjax:function () {
        var token = localStorage.getItem("login");
         var successCallback =  (response) => {
            if(response.status==200){
              this.str=response.data;
            }
          }
          var errorCallback =  (response) => {
          }
          this.$http.post(URL+'/api/user/get_field',{
            "token":token,
            "type":'nickname'
          }).then(successCallback,errorCallback);
        },
        tj:function(){
            this.getStr = this.str.toUpperCase();
             var token = localStorage.getItem("login");
             var successCallback =  (response) => {
                if(response.status==200){
                    Toast({
                      message:'修改成功',
                      position: 'bottom',
                      duration: 1000
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
              this.$http.post(URL+'/api/user/set_userinfo',{
                "token":token,
                "nickname":this.str
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style type="text/css">
.box{
  background:#fff;
}
.name{
    width:100%;
    background:#fff;
}
 .namexxxx{
    width: 80%;
    margin-left: 10%;
    border-bottom: 1px solid #eee;
    line-height: 50px;
    padding-top:50px;
 }
 .name_x{
    width:70%;
    display:inline-block;
    border:none;
    outline: none;
    height:20px;
 }
 .btn{
    width:80%;
    height:40px;
    margin-left: 10%;
    border-radius: 30px;
    border:none;
    outline: none;
    margin-top: 20px;
    margin-bottom:20px;
    background:#e12c20;
    color:#fff;
 }
</style>
