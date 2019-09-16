<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'取消订单'" :middle="'title'" />
      <div>
        <div class="out_s">
            <div class="message">
                <p>温馨提示：</p>
                <p>1.限时特价、预约资格等购买优惠可能一并取消</p>
                <p>2.如遇订单拆分、使用优惠券无法返还</p>
                <p>3.支付金额，抵扣余额积分都按原路退款</p>
                <p>4.订单一旦取消，无法恢复</p>
            </div>
            <div class="out_ao">
                <div class="messages">
                    <span>退款原因：</span>
                    <input type="text" class="out_in" v-model="ko"/>
                </div>
                <div class="messages">
                    <span>联系人：</span>
                    <input type="text" class="out_in" v-model="kos"/>
                </div>
                <div class="messages" style="border:none;">
                    <span>手机号码：</span>
                    <input type="text" class="out_in" v-model="koss"/>
                </div>
            </div>
        </div>
        <div class="out">
            <button class="get_out" @click="refund">申请退款</button>
        </div>
      </div>
    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            order_id:'',
            order_xq:'',
            order_xqs:'',
            ko:'',
            kos:'',
            koss:''
        }
      },
      created(){
        this.order_id = this.$route.params.id;
        this.getAjax()
      },
       components:{
          Header
      },
      mounted(){
      },
      methods:{
        refund:function(){
          var token = localStorage.getItem("login");
            if(this.ko==""){
            Toast({
                message: "请填写退款原因",
                position: 'bottom',
                duration: 2000
              });
            return
          }
          if(this.kos==""){
            Toast({
                message: "请填写联系人",
                position: 'bottom',
                duration: 2000
              });
            return
          }
          if(this.koss==""){
            Toast({
                message: "请填写手机号码",
                position: 'bottom',
                duration: 2000
              });
            return
          }
          var successCallback =  (response) => {
                if(response.status==200){
                  Toast({
                      message:response.msg,
                      position: 'bottom',
                      duration: 1000
                    });
                    this.order_xq=response.order;
                    setTimeout(() =>{
                        this.$router.push({path:'/mine/order'})
                    },1500)
                    }else{

                  }
                }
                var errorCallback =  (response) => {
                }
                this.$http.post(URL+'/api/user/record_refund_order',{
                "token":token,
                "order_id":this.order_id ,
                "consignee":this.kos,
                "mobile":this.koss,
                "user_note":this.ko,
                }).then(successCallback,errorCallback);
            },
            getAjax:function () {
                var token = localStorage.getItem("login");
                var successCallback =  (response) => {
                    if(response.status==200){
                        this.kos=response.order.consignee;
                        this.koss=response.order.mobile;
                    }else{

                    }
                  }
                  var errorCallback =  (response) => {
                  }
                  this.$http.post(URL+'/api/user/refund_order',{
                    "token":token,
                    "order_id":this.order_id
                  }).then(successCallback,errorCallback);
            }
          }
        }



</script>
<style type="text/css" scoped>
   /**/
 p{
    margin:5px 0;
 }
.out_s{
    width:100%;
    background:#fff;
    padding-top: 50px;
}
.message{
    width:90%;
    margin-left: 5%;
    padding:16px 0;
}
.out_ao{
    width:90%;
    margin-left: 5%;
}
.out_in{
    width: 76%;
}
.messages{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
}
.get_out{
    width:40%;
    height:45px;
    color:#fff;
    background:#e23435;
    border-radius: 5px;
}
.out{
    width:100%;
    height:60px;
    text-align: center;
    margin-top: 25px;
}
</style>
