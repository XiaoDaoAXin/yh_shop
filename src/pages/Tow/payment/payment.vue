<template>
  <section class="payment">
    <!--头部-->
    <Header :type="'back'" :title="'支付'" :right="'choice'" :middle="'title'" :alerts="true" backp="/mine/order" />
    <!--订单号信息-->
    <section class="order">
      <ul class="order_ul">
        <li class="order_ul_li">
          <span class="order_ul_li_ply">支付单号</span>
          <span class="order_ul_li_number">{{$route.query.order_sn}}</span>
        </li>
        <li class="order_ul_li">
          <span class="order_ul_li_ply">订单金额</span>
          <span class="order_ul_li_number">{{$route.query.order_amount}}元</span>
        </li>
      </ul>
    </section>
    <!--支付方式-->
    <section class="payment">
      <div class="payment_box">
        <div class="payment_box_title">支付方式</div>
        <div class="payment_box_check">
          <div class="delivery_ul_li_like">
            <img src="./images/z-chengs.png" width="15" />
          </div>
          <img src="./images/wx.png" class="payment_box_check_wx" width="28" />
          微信支付
        </div>
      </div>
    </section>
    <!--支付按钮-->
    <section class="btn">
      <div class="btn_b" @click="paywx">立即支付</div>
    </section>
  </section>
</template>

<script>
    import Header from '../../../components/header/header.vue';
    import {URL} from "../../../API/url.js";
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default {
        data(){
            return{
              money: null,
              url: URL,
              order_id: null,
              order_sn: null
            }
        },
        components:{
          Header
        },
        created() {
          this.money = this.$route.query.order_amount;
          this.order_id = this.$route.query.order_id;
          this.order_sn = this.$route.query.order_sn;
        },
        methods:{
          // wxpay
          paywx(){
            // '4ff92b14f5b4a3926cb4178f25e94402';
            var token= localStorage.getItem("login");
            var url = window.location.href
            var success =  (date) => {
             
              if(date.status==500){
                Toast({
                      message:date.msg,
                      position: 'bottom',
                      duration: 2000
                    });
                return;
              }
              if(date.pay_type=='weixinjsapi'){
                this.callpay(date.data);
              }else{
                setTimeout(()=>{
                    localStorage.setItem("wxpay","Success");
                },500)
                window.location.href = "http://3.myfutrue.cn/vue/wxpay.html?wxpay="+date.data.mweb_url;
              }
            }
            var error =  (data) => {
              Toast({
                  message:'哎呀，服务器失踪了！',
                  position: 'bottom',
                  duration: 2000
                });
            }
            this.$http.post(this.url+'/api/pay/weixinpay',{'money':this.money,'order_id':this.order_id,'order_sn':this.order_sn,'token':token,'url':url}).then(success,error);
          },
          callpay (params) {
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(params), false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall(params)); 
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall(params));
                }
            }else{
                 this.jsApiCall(params);
            }
          },
          jsApiCall (params){
            var self = this
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',{
                'appId': params.appId, // 公众号名称，由商户传入
                'timeStamp': params.timeStamp, // 时间戳，自1970年以来的秒数
                'nonceStr': params.nonceStr, // 随机串
                'package': params.package,
                'signType': params.signType, // 微信签名方式：
                'paySign': params.paySign, // 微信签名
              },
              function(res){
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  this.$router.push({path: '/mine'}) 
                }else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                  Toast({
                      message:'支付已取消',
                      position: 'bottom',
                      duration: 2000
                    });
                }else{
                  Toast({
                      message:res.err_desc,
                      position: 'bottom',
                      duration: 2000
                    });
                  
                }
              }
            );
          },
        }
    }
</script>

<style scoped lang="scss">
  .payment{
    overflow: hidden;
    background: #fff;
  }
  .order{
    margin-top: 50px;
  }
  .order_ul{
    width: 92%;
    margin: 0 auto;
  }
  .order_ul_li{
    padding: 20px 0 20px 0;
  }
  .order_ul_li_ply{
    float: left;
  }
  .order_ul_li_number{
    float: right;
    color: #f23030;
  }
  .payment{
    border-top: 10px solid #f8f8f8;
  }
  .payment_box{
    width: 92%;
    margin: 0 auto;
  }
  .payment_box_title{
    padding: 10px 0 10px 0;
  }
  .payment_box_check{
    padding: 20px 0 20px 0;
  }
  .order_ul_li,
  .payment_box_check,
  .payment_box_title{
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    height: auto;
    overflow: hidden;
  }
  .delivery_ul_li_like{
    background: red;
    padding: 1px 3px 1px 3px;
    border-radius: 50%;
    display: inline-block;
  }
  .btn_b{
    width: 92%;
    margin: 30px auto;
    text-align: center;
    height:40px;
    line-height: 40px;
    background: #f23030;
    color: #fff;
    border-radius: 10px
  }
</style>
