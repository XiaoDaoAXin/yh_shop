<template>
    <div class="box">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'修改手机号码'" :middle="'title'" />
        <div class="name">
            <div class="namex">
                <label for="">手机号码：</label>
                <input type="text" class="name_x"  placeholder="" v-model='str'/>
            </div>
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
            "type":'mobile'
          }).then(successCallback,errorCallback);
        },
        tj:function(){
            this.getStr = this.str.toUpperCase();
             var token = localStorage.getItem("login");
              if (this.str=='') {
                        Toast({
                          message:'请输入手机号码',
                          position: 'bottom',
                          duration: 2000
                        });
                        return
                      }
              if (this.str.length>11 || this.str.length<10) {
                    Toast({
                      message:'请输入11位手机号码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
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
                      duration: 3000
                    });
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/set_userinfo',{
                "token":token,
                "mobile":this.str
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
 .namex{
    width: 80%;
    margin-left: 10%;
    border-bottom: 1px solid #eee;
    padding-top: 50px;
    line-height: 50px;
 }
 .name_x{
    width:70%;
    display:inline-block;
    border:none;
    outline: none;
    height:100%;
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
</style>
