<template>
  <section>
    <!--头部-->
    <Header type="routers" right="choice" title="领取优惠劵" middle="title" />
    <!--领取优惠券-->
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
              <div class="back_right_box_state" v-if="coupon.isuse == 2">已过期</div>
              <div class="back_right_box_state" v-if="coupon.isuse == 1">已使用</div>
              <div class="back_right_box_state"  @click="couponReceiveFn(coupon.id,index)" v-else="coupon.isuse == 0">{{coupon.isget?'去使用':'领取'}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </section>
</template>

<script>
  import Header from "../../../components/header/header.vue";
  import {reqCouponReceive} from "../../../API/index.js";
  import {Toast} from "mint-ui";
  import {mapState} from "vuex"
  export default {
    data(){
      return {
        userId: '',
        coupons: [],
      }
    },
    components:{
      Header
    },
    computed:{
      ...mapState(["couponhome"])
    },
    created(){
      this.userId = localStorage.getItem("login");
      this.$store.dispatch("getCouponHome",this.userId);
    },
    methods:{
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },
      async couponReceiveFn(coupon_id,index){
        const result = await reqCouponReceive(this.userId,coupon_id);
        if(result.status == 200 || result.status == 500){
          if(result.status == 200){
            this.coupons[index].isget = 1;
            Toast(result.msg);
          }else if(result.status == 500){
            this.$router.replace("/home")
          }
        }else if(result.status == 666){
          this.judegLogin(result.msg,2500);
        }
      },
    },
    watch:{
      couponhome(val){
        this.coupons = val.coupon_list;
      }
    }
  }
</script>

<style scoped lang="scss">
  .discount{
    margin-top: 60px;
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
