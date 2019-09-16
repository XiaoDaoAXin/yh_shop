<template>
    <div>
        <header>
            <div class="header">
              <!--返回按钮-->
              <div class="header_box">
                <a @click="tui">
                  <span class="iconfont icon-fanhui"></span>
                </a>
                <!--文本标题-->
                <span class="position_title">取消订单详情</span>
              </div>
            <div class="h_search_right">
                <el-col :span="12" class="el-col">
                    <el-dropdown trigger="click">
                      <span class="iconfont icon-fenlei1" style="font-size:25px;"></span>
                      <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                        <el-dropdown-item :icon="el.icon" class="el-dropdown-item"  v-for="(el , index) in elComponent" :key="index">
                          <router-link :to="el.href">{{el.title}}</router-link>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
              </div>
              </div>
          </header>
          <div class="box">
          <!-- 1 -->
              <div class="cancel-order-record" id="cancel-order-record" style="margin-top:50px;">
                <ul class="no-service-m">
                    <li>
                        <span class="item-title-s">订单单号：</span>
                        <span class="item-cont-s">{{order_xq.order_sn}}</span>
                    </li>
                    <li>
                        <span class="item-title-s">取消进度：</span>
                        <span class="item-cont-s show-record">{{order_xqs}}</span>
                    </li>
                    <li>
                        <span class="item-title-s">订单总额：</span>
                        <span class="item-cont-s">￥{{order_xq.total_amount}}</span>
                    </li>
                    <li style="border-bottom:none;">
                        <span class="item-title-s">取消进度：</span>
                        <span class="item-cont-s"> {{order_xqss}}</span>
                    </li>
                </ul>
                <van-steps :active="active">
                  <van-step>提交申请</van-step>
                  <van-step>取消处理</van-step>
                  <van-step>退款处理</van-step>
                  <van-step>完成</van-step>
                </van-steps>
            </div>
            <div class="hui"></div>
            <!-- 2 -->
            <div class="cancel-order-record">
                <div class="cancel-order-title">申请单详细信息</div>
                <ul class="no-service-m">
                    <li>
                        <span class="item-title-s">订单编号</span>
                        <span class="item-cont-s">{{order_xq.order_sn}}</span>
                    </li>       
                    <li>
                        <span class="item-title-s">取消原因</span>
                        <span class="item-cont-s">{{order_xq.user_note}}</span>
                    </li>
                    <li>
                        <span class="item-title-s">联系方式</span>
                        <span class="item-cont-s">{{order_xq.mobile}}</span>
                    </li>
                    <li style="border-bottom:none;">
                        <span class="item-title-s">支付明细</span>
                        <span class="item-cont-s" style="padding:5px 3%;">
                            <p class="cont-des">支付总金额 : <span class="co-red">￥{{order_xq.total_amount}}</span></p>
                            <p class="cont-des">余额支付 : <span class="co-red">￥{{order_xq.user_money}}</span></p>
                            <!-- <p class="cont-des">积分抵扣 : <span class="co-red">￥0.00</span></p>
                            <p class="cont-des">优惠券 : <span>￥0.00</span></p> -->
                            <p class="cont-des">其他支付 : <span>￥{{order_xq.order_amount}}</span></p>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="hui"></div>
            <!-- 3 -->
            <div class="cancel-order-title des-title2 he">退款明细状态详解</div>
            <div class="cancel-order-record bo">
                <p class="refund-detail">1、已退：商城已完成退款处理，实际退款时间以到账时间为准。</p>
                <p class="refund-detail">2、待退：订单含有未退款项，待系统处理，请您耐心等待。</p>
                <p class="refund-detail">3、未退：商城劵发生拆分是不予返还、商城劵、手机红包请您联系客服处理。</p>
            </div>
          </div>
    </div>
</template>
<script type="text/javascript">
    import Header from "../../components/header/header.vue";
    import { Step, Steps } from 'vant';
    import {URL} from "../../API/url.js";
    export default {
        data:function() { 
            return{
                order_id:'',
                active:'',
                order_xq:'',
                order_xqs:'',
                order_xqss:'',
                elComponent: [
                  {icon: "el-icon-house",href: "/home",title: "首页"},
                  {icon: "el-icon-finished",href: "/classs",title: "分类"},
                  {icon: "el-icon-shopping-cart-2",href: "/cart",title: "购物车"},
                  {icon: "el-icon-user",href: "/mine",title: "我的"},
                ]
            }
        },
        created(){
            this.order_id = this.$route.params.id;
            this.getAjax()
        },
       components:{
        Header
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                    console.log(response)
                    if(response.order.pay_status==1){
                        this.order_xqs='取消处理'
                    }else if(response.order.pay_status==2){
                        this.order_xqs='退款处理'
                    }else{
                        this.order_xqs='完成'
                    }
                    if(response.order.pay_status<3){
                        this.order_xqss='亲爱的客户，我们正在为您处理中，请耐心等待'
                    }else {
                        if(response.order.pay_status<=3){
                            this.order_xqss='亲爱的客户，您的退款订单已完成'
                        }else{
                            this.order_xqss='亲爱的客户，您的退款订单审核失败，原因'+response.order.orderadmin_note
                        }
                    }

                    
                   this.active= response.order.pay_status
                   this.order_xq=response.order;
                }else{
                    
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/cancel_order_info',{
                "token":token,
                "order_id":this.order_id 
              }).then(successCallback,errorCallback);
        },
         tui:function(){
           this.$router.push({ path:'/mine/order'})
        }
      }
    }
</script>
<style scoped>
    .box{
        background-color: #fff;
        width:100%;
    }
    .cancel-order-record{
        width:94%;
        margin-left:3%;
        padding-top: 15px;
        padding-bottom: 15px;
        font-size:13px;
    }
    .no-service-m{
        border: 1px solid #ddd;
    }
    .no-service-m>li {
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .no-service-m .item-title-s {
        float: left;
        width: 30%;
        color: #333;
        line-height: 35px;
        text-align: center;
    }
    .no-service-m .item-cont-s {
        float: left;
        padding-left:3%;
        color: #666;
        line-height: 35px;
        border-left: 1px solid #ddd;
        width: 70%;
    }
    .cancel-order-title {
        font-size: 15px;
        color: #333;
        line-height: 45px;
        text-align: center;
        height: 45px;
    }
    .co-red{
        color:red;
    }
    .refund-detail {
        font-size: 13px;
       /* height:30px;
        line-height:30px;*/
        color: #666;
    }
    .he{
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
    }
    .bo{
        padding-bottom:20px;
    }
    .hui{
        width:100%;
        height:15px;
        background:#f3f5f7;
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
    /**/
</style>