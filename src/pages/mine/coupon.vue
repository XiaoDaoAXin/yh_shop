<template>
    <div>
       <Header type="routers" :title="'我的优惠券'"  :right="'choice'" :middle="'title'"/>
         <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="tabFn(0)" :class="{active:cur==0}">未使用</li>
                    <li @click="tabFn(1)" :class="{active:cur==1}">已使用</li>
                    <li @click="tabFn(2)" :class="{active:cur==2}">已过期</li>
                </ul>
            </div>
            <div class="tab-content">
              <ul class="discount">
                <li class="discount_youhui" v-for="(coupon,index) in coupons" :key="index">
                  <div class="discount_youhui_back">
                    <div class="discount_youhui_back_left">
                      <img class="youhui_back_left_img" src="/static/img/5.jpg" width="85" height="85">
                      <div class="back_left_img_box">
                        <p class="left_img_box_title">{{coupon.name}}</p>
                        <p class="left_img_box_huodong">限量抢购</p>
                        <!--<p class="left_img_box_price">原价：<span class="left_img_box_price_text">￥1022</span></p>-->
                        <!--<p class="left_img_box_hou">领卷后：￥<span class="left_img_box_hou_text">102</span></p>-->
                        <p class="left_img_box_hou">开始：{{coupon.use_start_time}}<br>结束：{{coupon.use_end_time}}</p>
                      </div>
                      <!--<el-progress :percentage="100" color="red"></el-progress>-->
                    </div>
                    <div class="discount_youhui_back_right">
                      <div class="youhui_back_right_box">
                        ￥<span class="back_right_box_price">{{coupon.money}}</span><br>
                        <span class="back_right_box_chong">满{{coupon.condition}}可用</span>
                        <!--<span class="back_right_box_state">立即使用</span>-->
                        <div class="back_right_box_state" v-if="cur == 2" style="background: #dadada;">已过期</div>
                        <div class="back_right_box_state" v-if="cur == 1" style="background: #dadada;">已使用</div>
                        <div class="back_right_box_state"  @click="couponReceiveFn(coupon.id,index)" v-if="cur == 0">去使用</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import {reqCouponReceive} from "../../API/index.js";
import {Toast} from "mint-ui";
import {mapState} from "vuex"
export default {
    data:function() {
        return{
             cur:0,
             isShow:'',
             a:1,
             userId: '',
             coupons: [],
        }
      },
      components:{
        Header
      },
      mounted(){
        this.userId = localStorage.getItem("login");
        this.$store.dispatch("getCouponMin",{token: this.userId});
        if(this.a==1){
            this.isShow = true;
        }else{
            this.isShow = false;
        }
      },
      methods:{
        tabFn(index){
          this.cur = index;
          if(this.userId){
            this.$store.dispatch("getCouponMin",{token: this.userId,type: index});
          }
        },
        async couponReceiveFn(){
          this.$router.replace("/home")
        },
      },
      computed:{
        ...mapState(['couponmine'])
      },
      watch:{
        couponmine(val){
          this.coupons = val.coupon_list;
        }
      }
    }
</script>
<style type="text/css" scoped>
 /**/
 .app {
    width: 100%;
    margin: 0 auto;
    padding-top: 50px;
}
.ne{
    width: 100%;
    height:37px;
    background: #fff;
}
.tab-tilte{
     width: 90%;
     margin-left: 5%;
}
.tab-tilte li{
    float: left;
    width: 33.3%;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active{
    color: #f23030;
    border-bottom:1px solid #f23030;
}
/****/
.coupon{
    height:30px;
    line-height: 30px;
    text-align: center;
    margin-top: 50px;
}
 .discount{
   margin-top: 10px;
   width: 100%;
   height: 100%;
 }
 .discount_youhui{
   margin-bottom: 10px;
 }
 .discount_youhui_back{
   width: 92%;
   background: url('/static/img/youhui_1.png') no-repeat;
   background-size: 100% 100%;
   margin: 0 auto;
   height: 150px;
   position: relative;
 }
 .discount_youhui_back_left{
   float: left;
   width: 73%;
   margin-top: 10%;
   padding-left: 10px;
   font-size: 12px;
 }
 .youhui_back_left_img{
   float: left;
 }
 .back_left_img_box{
   float: left;
   margin-left: 10px;
   width: 50%;
 }
 .back_left_img_box p{
   margin-bottom: 5px;
   font-size: 12px;
 }
 .left_img_box_title{
   overflow: hidden;
   text-overflow:ellipsis;
   white-space: nowrap;
   font-size: 14px !important;
 }
 .left_img_box_huodong{
   background: #ffdaba;
   color: #ef2020;
   display: inline-block;
   padding: 0 5px;
   border-radius: 4px;
 }
 .left_img_box_price{
   color: #9e9e9e;
 }
 .left_img_box_price_text{
   text-decoration: line-through;
 }
 .left_img_box_hou{
   color: #b7afaf;
   font-size: 14px;
 }
 .left_img_box_hou_text{
   font-size: 16px;
   font-weight: 800;
 }
 .discount_youhui_back_right{
   float: right;
   width: 25%;
   position: relative;
   height: 100%;
 }
 .youhui_back_right_box{
   position: absolute;
   width: 80%;
   height: 80%;
   top: 50%;
   left: 50%;
   margin: -60% 0 0 -40%;
   text-align: center;
   color: #ff1f1f;
 }
 .back_right_box_price{
   font-size: 20px;
   font-weight: 800;
 }
 .back_right_box_chong{
   padding: 10px 0;
   display: block;
   font-size: 12px;
 }
 .back_right_box_state{
   display: block;
   padding: 7px;
   background: red;
   color: #fff;
   border-radius: 5px;
   font-size: 12px;
 }
</style>
