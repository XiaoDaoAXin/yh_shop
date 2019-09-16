<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'添加银行卡'" :middle="'title'" />
        <div class="box">
            <div class="addcard_li">
                <span class="card_name">银行卡：</span>
                <select name="public-choice" v-model="couponSelected"  class="se">
                    <option :value="coupon.name" v-for="coupon in couponList">{{coupon.name}}</option>
                </select>
            </div>
            <div class="addcard_li">
                <span class="card_name">银行卡号：</span>
                <input type="number" class="card_in" name="number" v-model="cardh"/>
            </div>
            <div class="addcard_li">
                <span class="card_name">持卡人：</span>
                <input type="text" class="card_in" name="names" v-model="names"/>
            </div>
            <div class="addcard_li">
                <span class="card_name">手机号：</span>
                <input type="number" class="card_in" name="names" v-model="phone"/>
            </div>
        </div>
         <button class="btns" @click="btns">提交</button>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import { Toast } from 'mint-ui';
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
           couponList:[
                {
                    id: 0,
                    name: '中国银行'
                },
                {
                    id: 1,
                    name: '中国农业银行'
                },
                {
                    id: 2,
                    name: '中国工商银行'
                },
                {
                    id: 3,
                    name: '中国建设银行'
                },
                {
                    id: 4,
                    name: '中国邮政储蓄银行'
                }
            ],
            couponSelected: '',
            cardh:'',
            names:'',
            phone:''
        }
      },
      components:{
        Header
      },
      created(){
　　　　　　//如果没有这句代码，select中初始化会是空白的，默认选中就无法实现 (id)
            this.couponSelected = this.couponList[0].id;
        },
      methods:{
        btns:function(){
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                  if (response.status==200) {
                    Toast({
                      message: response.msg,
                      position: 'bottom',
                      duration: 1000
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine/my_card'})
                    },1500)
                  }else{
                    Toast({
                      message: response.msg,
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/addbank',{
                "token":token,
                "bank_name":this.couponSelected,
                "bank_num":this.cardh,
                "bank_username":this.names,
                "bank_phone":this.phone
              }).then(successCallback,errorCallback);
        },
        tui:function(){
           this.$router.push({ path:'/mine/my_card'})
        }
      }
    }
</script>
<style scoped>
    .box{
        padding-top: 50px;
        background:#fff;
    }
    select::-ms-expand{display:none;}
    select{
      border:none;
      appearance:none;
     -moz-appearance:none;
     -webkit-appearance:none;
    }
    .se{
        border: none;
        padding: 5px 0 5px 3%;
        width: 70%;
        background: #fff;
    }
    .addcard_li{
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .card_name{
        margin-left: 3%;
    }
    .card_in{
        height: 30px;
        width: 70%;
    }
    .btns{
        width: 90%;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        margin-left: 5%;
        background: #ff594a;
        margin-top: 50px;
    }
</style>
