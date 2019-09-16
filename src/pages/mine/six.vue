<template>
    <div class="box">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'选择性别'" :middle="'title'" />
        <div id="example-4">
          <input type="radio" name="radios" value="1" v-model="picked" @click="sixs(1)" class="six">
          <label for="">男</label>
          <input type="radio" name="radios" value="2" v-model="picked" @click="sixs(2)" class="six" style="margin-left:5%;">
          <label for="">女</label>
        </div>
        <button class="btn" @click="btns">保存</button>
    </div>
</template>
<script>
import Header from "../../components/header/header.vue";
import { Toast } from 'mint-ui';
import $ from 'jquery';
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            picked: '1',
        }
      },
       components:{
        Header
      },
      mounted(){
        this.getAjax();
      },
      methods:{
        sixs:function(six){
          this.picked=six

        },
        getAjax:function () {
        var token = localStorage.getItem("login");
         var successCallback =  (response) => {
            if(response.status==200){
              this.picked=response.data;
            }
          }
          var errorCallback =  (response) => {
          }
          this.$http.post(URL+'/api/user/get_field',{
            "token":token,
            "type":'sex'
          }).then(successCallback,errorCallback);
        },
        btns:function(){
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
                "sex":this.picked
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style scoped>
 #example-4{
    line-height: 40px;
    padding-left: 10%;
    background:#fff;
    padding-top: 50px;
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
