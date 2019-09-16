<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'订单详情'" :middle="'title'" />
        <div style="height:50px;"></div>
        <div class="sj_cs">
          <div v-if="msg == '待付款'">
            <p class="sj_shi cc">{{countdown}}</p>
            <p class="sj_shi">待付款,超时订单自动取消</p>
          </div>
          <p  class="sj_shi">{{order_xq.msg}}</p>
        </div>
        <div class="box" v-for="(item,index) in goods">
            <div class="xq_img">
                <img :src="item.goods_thum_images" height="60" width="60" alt="" />
            </div>
            <div class="rr">
                <div class="xq_xq">
                    <span class="xq_s aia">{{item.goods_name}}</span>
                    <span class="xq_ss">￥{{item.member_goods_price}}</span>
                </div>
                <div class="xq_shu" style="margin-top: 17px;">
                    数量：{{item.goods_num}}
                </div>
            </div>
        </div>
        <div class="bai">
          <router-link :to="'/mine/offorder_plan/'+order_id">
            <button v-if="order_xq.cancel == 1" class="over">取消进度</button>
          </router-link>
        </div>
        <div class="jbxx">
            <div class="tit">基本信息</div>
            <div class="jbxx_li">
                <span class="li_l">订单编号</span>
                <span class="li_r">{{order_xq.order_sn}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">下单时间</span>
                <span class="li_r">{{order_xq.add_time}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">收货地址</span>
                <span class="li_r">{{order_xq.address}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">收货人</span>
                <span class="li_r">{{order_xq.consignee}}</span>
            </div>
            <div class="jbxx_li">
                <span class="li_l">联系方式</span>
                <span class="li_r">{{order_xq.mobile}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">支付方式</span>
                <span class="li_r" v-if="order_xq.pay_name == ''">在线支付</span>
                <span class="li_r" v-else>{{order_xq.pay_name}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">配送方式</span>
                <span class="li_r">快递配送</span>
            </div>
            <div class="jbxx_li">
                <span class="li_l">物流公司</span>
                <span class="li_r">{{order_xq.shipping_name}}</span>
            </div>
            <div class="jbxx_li">
                <span class="li_l">快递单号</span>
                <span class="li_r">{{order_xq.invoice_no}}</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">买家留言</span>
                <span class="li_r">{{order_xq.user_note}}</span>
            </div>
            <div class="jbxx_li">
                <span class="li_l">卖家备注</span>
                <span class="li_r">{{order_xq.admin_note}}</span>
            </div>
        </div>
         <div class="jbxx">
            <div class="tit">价格信息</div>
            <div class="jbxx_li">
                <span class="li_l">商品总价</span>
                <span class="li_r">￥{{order_xq.goods_price}}元</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">运费</span>
                <span class="li_r">￥{{order_xq.shipping_price}}元</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">优惠券</span>
                <span class="li_r">-￥{{order_xq.coupon_price}}元</span>
            </div>
      <!--        <div class="jbxx_li">
                <span class="li_l">活动优惠</span>
                <span class="li_r">-￥{{order_xq.order_prom_amount}}元</span>
            </div>
             <div class="jbxx_li">
                <span class="li_l">积分</span>
                <span class="li_r">-￥{{order_xq.integral_money}}元</span>
            </div> -->
             <div class="jbxx_li">
                <span class="li_l">支付金额</span>
                <span class="li_r" v-if="order_xq.pay_status == 0">-￥0.00元</span>
                <span class="li_r" v-else>-￥{{order_xq.order_amount}}元</span>
            </div>
           <div class="jbxx_li">
             <span class="li_l">订单优惠</span>
             <span class="li_r">-￥{{order_xq.discount}}元</span>
           </div>
            <div class="jbxx_li">
                <span class="li_l">订单总额</span>
                <span class="li_r h">￥{{order_xq.total_amount}}元</span>
            </div>
        </div>
         <div class="bais">
             <button class="over" v-if="order_xq.msg == '待收货'" @click="over">确认收货</button>
             <button class="over" v-if="order_xq.msg == '立即付款'" @click="paywx">立即付款</button>
             <router-link :to="'/mine/call_order/'+order_id">
                <button class="over" v-if="order_xq.msg == '待发货'">取消订单</button>
             </router-link>
         </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    data:function() {
        return{
            order_id:'',
            order_xq:'',
            goods:[],
            endDate2:'',
            countdown:'',
            msg:''
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
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
            var str=0
              for(var j=0;j<response.order.goods.length;j++){
                var arr = response.order.goods[j].goods_num*response.order.goods[j].member_goods_price
                  str +=arr
                  response.order["pic"]=str;
              }
                if(response.status==200){
                    this.order_xq=response.order;
                    this.msg=response.order.msg
                    this.endDate2=response.order.time_stamp
                    this.goods=response.order.goods;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/order_detail',{
                "token":token,
                "id":this.order_id
              }).then(successCallback,errorCallback);

        },
          countTime:function(){
                var that=this
                var date = new Date();
                var now = date.getTime();
                var end = this.endDate2*1000
                var leftTime = end - now; //时间差
                var d, h, m, s, ms;
                if (leftTime >= 0) {
                  h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                  m = Math.floor(leftTime / 1000 / 60 % 60);
                  s = Math.floor(leftTime / 1000 % 60);
                  s = s < 10 ? "0" + s : s
                  m = m < 10 ? "0" + m : m
                  h = h < 10 ? "0" + h : h
                  this.countdown=m +":"+ s,
                  //递归每秒调用countTime方法，显示动态时间效果
                  setTimeout(this.countTime,1000)
                } else if(leftTime <= 0){
                  var token = localStorage.getItem("login");
                  var successCallback =  (response) => {
                         if(response.status=='t') {
                            this.msg='已取消'
                            this.countdown=''
                         }
                    }
                    var errorCallback =  (response) => {
                    }
                    this.$http.post(URL+'/api/cart/update_order',{
                      "openid":token,
                      "order_id":this.order_id
                    }).then(successCallback,errorCallback);
                }
          },
        over:function(){
          MessageBox({
              title: '提示',
              message: '是否确认收货',
              showCancelButton: true
            }).then(action => { 
                 if (action == 'confirm') {    
                  var token = localStorage.getItem("login");
                  var successCallback =  (response) => {
                      if(response.status==200){
                          this.$router.push({ path:'/mine/order'})
                      }else{
                        Toast({
                          message: response.msg ,
                          position: 'bottom',
                          duration: 2000
                        });
                      }
                    }
                    var errorCallback =  (response) => {
                      Toast({
                          message: "服务器异常，请重新加载！" ,
                          position: 'bottom',
                          duration: 2000
                        });
                    }
                    this.$http.post(URL+'/api/user/order_confirm',{
                      "token":token,
                      "id":this.order_id
                    }).then(successCallback,errorCallback);
                 }
                 }).catch(err => { 
                 if (err == 'cancel') {    
                  Toast({
                    message: "取消" ,
                    position: 'bottom',
                    duration: 2000
                  });
                 } 
            })

        },
         paywx(){
            // '4ff92b14f5b4a3926cb4178f25e94402';
            var token= localStorage.getItem("login");
            var url = window.location.href
            var success =  (date) => {
              this.callpay(date.data);
            }
            var error =  (data) => {
              this.$message.error('哎呀，服务器失踪了！');
            }
            this.$http.post(this.url+'/api/pay/weixinpay',{
              // 'money':this.money,'order_id':this.order_id,'order_sn':this.order_sn,'token':token,'url':url
            }).then(success,error);
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
                  self.$message({
                    message: '支付已取消',
                    type: 'warning'
                  });
                }else{
                  self.$message({
                    message: res.err_desc,
                    type: 'warning'
                  });
                }
              }
            );
          }
      },
      updated(){
        this.countTime()
      }
    }
</script>
<style type="text/css" scoped>
    .box{
        overflow: hidden;
        background: #fff;
    }
    .sj_cs{
      background:red;
      font-size: 12px;
      color:#fff;
      padding:15px 0;
      text-align: center;
    }
    .sj_shi{
      height:30px;
      line-height: 30px;
    }
    .cc{
      font-weight: bold;
      font-size:18px;
    }
    .xq_img{
        float:left;
        margin-top: 14px;
        margin-left: 3%;
        margin-bottom: 13px;
    }
    .rr{
        float: left;
        width: 71%;
        margin-left: 3%;
        margin-top: 15px;
        margin-right: 3%;
    }
    .aia{
        width: 65%;
    }
    .xq_s{
        display: inline-block;
    }
    .xq_ss{
        float:right;
    }
    .bai{
        width:100%;
        height:50px;
        border-top:1px solid #eee;
        background:#fff;
        clear:both;
    }
    .bais{
        width:100%;
        height:53px;
        background:#fff;
        clear:both;
        margin-top: 15px;
    }
    .jbxx{
        background: #fff;
        margin-top: 15px;
    }
    .tit{
        width:94%;
        height:40px;
        margin-left: 3%;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }
    .jbxx_li{
        height:30px;
        line-height: 30px;
        color:#666;
    }
    .li_l{
        margin-left: 3%;
    }
    .li_r{
        float:right;
        margin-right: 3%;
    }
    .h{
        color:#f23030;
    }
    .over{
        color:#e23435;
        background: #fff;
        border:1px solid #e23435;
        padding: 3px 2%;
        float: right;
        margin-right: 3%;
        margin-top: 14px;
        border-radius: 5px;
    }
        /**/
     header{
        background: #f8f8f8;
        height: 50px;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        font-size: 12px;
      }
      .header_box{
        display: inline-block;
      }
      .header{
        width: 92%;
        margin: 0 auto;
        padding-top: 10px;
      }

      .icon-fanhui{
        font-size: 26px;
      }
      .position_title{
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -75px;
        display: block;
        width: 150px;
        text-align: center;
        font-size: 15px;
      }
      .h_search_right{
        float: right;
        text-align: center;
      }
</style>
