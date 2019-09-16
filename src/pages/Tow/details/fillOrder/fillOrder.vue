<template>
  <section class="fillOrder">
    <!--头部-->
    <Header :type="'routers'" :title="'提交订单'" :right="'choice'" :middle="'title'" />
    <!--地址-->
    <section class="address">
      <div class="address_a" @click="$router.replace({path: '/mine/dizhi',query:{
        path: $route.query.path,
        token: $route.query.token,
        total_price: $route.query.total_price,      //总价格
        shop: shopsId,       //商品
        type: $route.query.type,       //提交类型
        cartId: $route.query.cartId,               //购物车id
        shopId: $route.query.shopId,               //商品id
      }})">
        <div class="address_a_left">
          <span class="iconfont icon-dizhiguanli"></span>
          <div class="address_a_left_add" v-if="addressId.consignee">
            <div class="address_a_left_box">
              <!--姓名-->
              <span class="left_box_name">{{addressId.consignee}}</span>
              <!--手机号-->
              <span class="left_box_phone">{{addressId.mobile}}</span>
            </div>
            <!--地址-->
            <span class="address_a_left_add_text">{{addressId.province_name+addressId.city_name+addressId.district_name+addressId.address}}</span>
          </div>
          <div v-else style="width: 150px;">收货地址(未填写)</div>
        </div>
        <div class="address_a_right">
          <span class="iconfont icon-iconfontjiantou4"></span>
        </div>
      </div>
      <div class="address_padd">
        <img src="./images/tt.png" class="address_padd_img" />
      </div>
    </section>
    <!--商品-->
    <section v-if="$route.query.type == 'details'">
      <div class="shops" v-for="(shop,index) in shops" :key="index">
        <div class="shops_left">
          <img :src="url+shop.original_img" class="shops_left_img" />
          <div class="shops_left_tit">
            <!--商品标题-->
            <span class="shops_left_tit_title">{{shop.goods_name}}</span>
            <!--商品规格-->
            <span class="shops_left_tit_spec">规格：{{sessionShop[0].spec_key_name||'默认'}}</span>
          </div>
        </div>
        <div class="shops_right">
          <!--商品价格-->
          <span class="shops_right_price">￥{{shop.shop_price}}</span>
          <!--数量-->
          <span class="shops_right_number">x{{shop.goods_num}}</span>
        </div>
      </div>
    </section>
    <section v-else>
      <div class="shops" v-for="(shop,index) in shops" :key="index">
        <div class="shops_left">
          <img :src="url+shop.original_img" class="shops_left_img" />
          <div class="shops_left_tit">
            <!--商品标题-->
            <span class="shops_left_tit_title">{{shop.goods_name}}</span>
            <!--商品规格-->
            <span class="shops_left_tit_spec">规格：{{shop.spec_key_name||'默认'}}</span>
          </div>
        </div>
        <div class="shops_right">
          <!--商品价格-->
          <span class="shops_right_price">￥{{shop.shop_price}}</span>
          <!--数量-->
          <span class="shops_right_number">x{{shop.goods_num}}</span>
        </div>
      </div>
    </section>
    <!--配送方式-->
    <section class="delivery">
      <div class="delivery_titlebox">
        <div class="delivery_title">选择配送方式</div>
      </div>
      <div class="delivery_box">
        <ul class="delivery_ul">
          <li class="delivery_ul_li">
            <div class="delivery_ul_li_left">
              <span>快速配送</span>
              <span class="delivery_ul_li_left_text">工作日、双休日与节假日均可送货</span>
            </div>
            <div class="delivery_ul_li_right delivery_ul_li_like">
              <img src="./images/z-chengs.png" width="15" />
            </div>
          </li>
          <li class="delivery_ul_li">
            <div class="delivery_ul_li_left">
              <span>使用余额</span>
              <span class="delivery_ul_li_left_text">余额：￥{{purchase.user_money}}</span>
            </div>
            <div class="delivery_ul_li_right">
              <el-switch
                v-model="value1"
                active-color="#ef4e3a">
              </el-switch>
            </div>
            <el-input placeholder="请输入密码" v-model="password" show-password style="margin-top: 20px" v-if="value1" class="animated fadeIn"></el-input>
          </li>
          <li class="delivery_ul_li" v-if="type !== 1" @click="popupVisible = true">
            <div class="delivery_ul_li_left">
              <span>使用优惠券</span>
              <span class="delivery_ul_li_left_text">优惠：{{couponPrice}}元</span>
            </div>
            <div class="delivery_ul_li_right">
              <span class="iconfont icon-iconfontjiantou4 icon_right"></span>
            </div>
          </li>
          <!--<li class="delivery_ul_li">
            <div class="delivery_ul_li_left">
              <span>使用积分</span>
              <span class="delivery_ul_li_left_text">积分：0   可抵扣：0元</span>
            </div>
            <div class="delivery_ul_li_right">
              <el-switch
                v-model="value2"
                active-color="#ef4e3a">
              </el-switch>
            </div>
          </li>-->
        </ul>
      </div>
    </section>
    <!--优惠券-->
    <section class="discount">
      <div class="discount_box">
        <div class="discount_title">用户备注（50字）</div>
        <textarea class="discount_text"maxlength="50" placeholder="选填" style="padding: 5px;" v-model="message"></textarea>
      </div>
    </section>
    <!--订单确认-->
    <section class="orderconfirm">
      <ul class="orderconfirm_ul">
        <li class="orderconfirm_ul_li">
          <span class="orderconfirm_ul_li_text">订单优惠</span>
          <span class="orderconfirm_ul_li_result">￥{{purchase.youhui_amount}}元</span>
        </li>
        <!--<li class="orderconfirm_ul_li">-->
        <!--<span class="orderconfirm_ul_li_text">商品金额</span>-->
        <!--<span class="orderconfirm_ul_li_result">￥{{$route.query.price}}元</span>-->
        <!--</li>-->
        <li class="orderconfirm_ul_li">
          <span class="orderconfirm_ul_li_text">配送费用</span>
          <span class="orderconfirm_ul_li_result">￥{{purchase.shipping_fee}}元</span>
        </li>
        <li class="orderconfirm_ul_li">
          <span class="orderconfirm_ul_li_text">优惠券抵扣</span>
          <span class="orderconfirm_ul_li_result">￥{{couponPrice?couponPrice:'0.00'}}元</span>
        </li>
        <!--<li class="orderconfirm_ul_li">
          <span class="orderconfirm_ul_li_text">积分抵扣</span>
          <span class="orderconfirm_ul_li_result">￥0.00元</span>
        </li>
        <li class="orderconfirm_ul_li">
          <span class="orderconfirm_ul_li_text">余额抵扣</span>
          <span class="orderconfirm_ul_li_result">￥0.00元</span>
        </li>-->
      </ul>
    </section>
    <!--底部提交订单-->
    <section class="ordersubmit">
      <div class="ordersubmit_btn" to="/payment" @click="sumitOrder">提交订单</div>
      <div class="ordersubmit_text">
        应付金额：<span class="ordersubmit_text_price">￥{{total_price}}</span>
      </div>
    </section>
    <!--优惠券列表-->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width: 100%;height: 50%;z-index: 1;">
      <!--头部标题-->
      <div class="coupon_title">选择优惠劵<span class="iconfont icon-wrong icon-guanbi" @click="popupVisible = false"></span></div>

      <!--优惠券列表-->
      <div class="coupon_content">
        <ul class="coupon_content_ul">
          <li class="coupon_content_ul_li" v-for="(coupons,index) in coupon" :key="index" @click="couponFn(coupons.money,coupons.condition,coupons.id)">
            <div class="content_ul_li_left">
              <div class="ul_li_left_left">
                <p class="ul_li_left_left_price">
                  <span>￥</span>
                  <span class="li_left_left_price_p">{{coupons.money}}</span>
                </p>
                <p class="ul_li_left_left_if">满{{coupons.condition}}元可使用</p>
              </div>
              <div class="content_ul_li_time">有效期{{coupons.send_start_time}}~{{coupons.send_end_time}}</div>
            </div>
            <div class="content_ul_li_right">
              <span class="iconfont icon-xuanze-copy"></span>
            </div>
          </li>
          <li class="coupon_content_ul_li" @click="couponFn(0,0)">
            <div class="content_ul_li_left_no content_ul_li_left">
              不使用优惠券
            </div>
            <div class="content_ul_li_right">
              <span class="iconfont icon-xuanze-copy"></span>
            </div>
          </li>
        </ul>
      </div>
    </mt-popup>
  </section>
</template>

<script>
  import Header from "../../../../components/header/header.vue";
  import {URL} from "../../../../API/url.js"
  import {reqOrder,reqShopCarSubmit,reqUserAddress,reqCollageOrder} from "../../../../API/index.js"
  import { Toast , Indicator } from 'mint-ui';
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        value1: false,
        value2: false,
        url: URL,
        userId: '',       //用户id  token
        shopsId: '',      //商品id
        guigeId: '',      //规格id
        addressId: [],    //请求用户地址
        shops: [],        //商品
        password: "",     //密码
        sessionShop: [],  //商品
        message: '',      //用户留言
        popupVisible: false,//优惠券列表
        type: 0,          //活动
        coupon: [],       //优惠券列表
        couponPrice: 0,  //优惠金额
        couponId: '',    //优惠劵id
        total_price: 0, //总价
      }
    },
    components: {
      Header
    },
    computed:{
      ...mapState(["purchase"])
    },
    created(){
      this.userId = localStorage.getItem('login');
      var shop = sessionStorage.getItem('shop');
      this.sessionShop = JSON.parse(shop);
      this.type = this.sessionShop[0].type;
      window.scrollTo(0,0);
      this.publicId();
      //请求下单信息
      if(this.$route.query.type == 'details'){
        this.$store.dispatch("getBuyImmediately",{
          token: this.userId,
          goods_id:this.sessionShop[0].goods_id,
          goods_num:this.sessionShop[0].goods_num,
          spec_key:this.sessionShop[0].spec_key,
          spec_key_name: this.sessionShop[0].spec_key_name,
          action:1,
          cartId: '',
          address_id: this.$route.query.address_id||'',
          type: this.sessionShop[0].type,
        })
      }else if(this.$route.query.type == "shopcart"){
        this.$store.dispatch("getBuyImmediately",{
          token: this.userId,
          goods_id:this.shopsId,
          goods_num:this.sessionShop[0].goods_num,
          spec_key:this.sessionShop[0].spec_key,
          spec_key_name: this.sessionShop[0].spec_key_name,
          action:2,
          cartId: this.$route.query.cartId,
          address_id: this.$route.query.address_id||''
        })
      }
    },
    methods:{
      /**
       * 提交订单
       */
      async sumitOrder(){
        let token = localStorage.getItem('login');
        if(token && this.shops){
          Indicator.open("正在提交...");
          if(this.$route.query.type == 'details'){
            let result;
            if(this.sessionShop[0].type == 1){
              //拼团下单
              result = await reqCollageOrder({
                token: this.userId,
                goods_id: this.sessionShop[0].goods_id,
                spec_key: this.sessionShop[0].spec_key,
                goods_num: this.sessionShop[0].goods_num,
                found_id: this.sessionShop[0].found_id||'',
                address_id: this.$route.query.address_id||this.addressId.address_id,   //地址id
                action:1,                                        //立即购买提交
                pay_type: this.value1?1:2,                       //是否使用密码
                shipping_fee: this.purchase.shipping_fee,     //快递费
                user_note: this.message,                        //用户留言
                paypwd: this.password,                          //支付密码
              })
            }else{
              result = await reqOrder({
                goods_id: this.shops[0].goods_id,       //商品id
                spec_key: this.sessionShop[0].spec_key,        //规格id
                token,                                     //用户token
                goods_num: this.shops[0].goods_num,        //数量
                address_id: this.$route.query.address_id||this.addressId.address_id,   //地址id
                total_amount: this.purchase.total_amount,    //总价格
                spec_key_name: this.sessionShop[0].spec_key_name,       //规格
                action:1,                                        //立即购买提交
                pay_type: this.value1?1:2,                       //是否使用密码
                shipping_fee: this.purchase.shipping_fee,     //快递费
                user_note: this.message,                        //用户留言
                paypwd: this.password,                          //支付密码
                couponId: this.couponId,                        //优惠券id
              });
            }
            if(result.status == 200){
              if(this.value1){
                if(this.sessionShop[0].type == 1){
                  //跳转拼团订单
                  this.$router.replace("/mine/order_collage");
                }else{
                  this.$router.replace("/mine/order");
                }
              }else{
                this.submitOrder("成功提交订单！",2000,result.order_id,result.order_sn,result.order_amount);
              }
              Indicator.close();
            }else if(result.status == 500){
              Toast(result.msg);
              Indicator.close();
            }
          }else if(this.$route.query.type == "shopcart"){
            const result = await reqOrder({
              goods_id: this.$route.query.shopId,       //商品id
              spec_key: "",        //规格id
              token,                                     //用户token
              goods_num: "",        //数量
              address_id: this.$route.query.address_id||this.addressId.address_id,   //地址id
              total_amount: this.purchase.total_amount,    //总价格
              spec_key_name: '',       //规格
              action:2,                                        //立即购买提交
              pay_type: this.value1?1:2,                       //是否使用密码
              shipping_fee: this.purchase.shipping_fee,     //快递费
              user_note: this.message,                        //用户留言
              paypwd: this.password,                          //支付密码
              cart_id: this.$route.query.cartId,               //购物车id
              couponId: this.couponId,                        //优惠券id
            });
            if(result.status == 200){
              console.log(this.value1)
              if(this.value1){
                if(this.sessionShop[0].type == 1){
                  //跳转拼团订单
                  this.$router.replace("/mine/order_collage");
                }else{
                  this.$router.replace("/mine/order");
                }
              }else{
                this.submitOrder("成功提交订单！",2000,result.order_id,result.order_sn,result.order_amount);
              }
              Indicator.close();
            }else if(result.status == 500){
              Toast(result.msg);
              Indicator.close();
            }
          }
        }else{
          Toast('亲~请填写地址！')
        }

      },
      //下单提示
      submitOrder(message,duration,order_id,order_sn,order_amount) {
        this.publicLoading(message, duration);
        setTimeout(() => {
          this.publicLoading('正在跳转支付页面...', 2500);
          setTimeout(() => {
            this.$router.replace({
              path: '/payment',
              query: {
                order_id,
                order_sn,
                order_amount
              }
            });
          }, 1500)
        }, 2000)
      },
      //loading
      publicLoading(message,duration){
        Indicator.close();
        Toast({
          message,
          duration: duration||3000
        });
      },
      //处理商品id
      publicId(){
        var arr = [];
        if(this.$route.query.type == 'shopcart'){
          for(let i=0;i<this.shops.length;i++){
            arr.push(this.shops[i].goods_id);
          }
          this.shopsId = arr.join('_');
        }
      },
      //优惠券计算
      couponFn(price,condition,couponId){
        //初始化金额
        this.total_price = this.purchase.total_amount;
        //满金额才减
        if(this.total_price > Number(condition)){
          this.couponPrice = Number(price);                       //优惠价格
          this.popupVisible = false;                              //优惠列表隐藏
          this.total_price = this.total_price-Number(price);    //总价格计算
          this.couponId = couponId||'';                                 //优惠券id
        }else{
          Toast("订单满"+condition+"元即可使用");
        }
      }
    },
    watch:{
      purchase(val){
        this.addressId = val.user_address;
        this.shops = val.goods;
        this.coupon = val.userCouponList;
        this.total_price = val.total_amount;
      }
    }
  }
</script>

<style scoped lang="scss">
  .fillOrder{
    background: #fff;
    height: auto;
    overflow: hidden;
  }
  //地址
  .address{
    margin-top: 50px;
  }
  .address_a{
    width: 92%;
    margin: 0 auto;
    padding: 10px 0 10px 0;
    height: 60px;
  }
  .address_a_left,
  .icon-dizhiguanli,
  .address_a_left_add,
  .shops_left,
  .shops_left_img,
  .shops_left_tit{
    float: left;
  }
  .address_a_right,
  .shops_right,
  .shops_right_number{
    float: right;
  }
  .address_a_left_add{
    padding: 0 10px 0 10px
  }
  .address_a_left_box,.address_a_left_add_text{
    padding-bottom: 10px;
    display: block;
  }
  .address_a_right{
    line-height: 40px;
  }
  .address_padd_img{
    width: 100%;
    border-bottom: 10px solid #f2f2f2;
  }
  //商品
  .shops{
    height: 100px;
    width: 92%;
    margin: 0 auto;
    padding: 10px 0 10px 0;
  }
  .shops_left_img{
    width: 60px;
    height: 60px;
  }
  .shops_left{
    width: 75%;
  }
  .shops_left_tit{
    padding-left: 10px;
    width: 70%;
  }
  .shops_left_tit_title{
    color: #666;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    padding-bottom: 5px;
    font-weight: 500;
  }
  .shops_left_tit_spec{
    font-size: 12px;
    color: #b5b4b4;
  }
  .shops_right_price{
    color: #f23030;
    display: block;
    margin-bottom: 5px;
    font-weight: 800;
  }
  .shops_right_number{
    color:#b5b4b4;

  }
  //配送方式
  .delivery_titlebox{
    width: 100%;
    padding: 15px 0 15px 0;
    background: #f2f2f2;
    color: #666;
  }
  .delivery_title,.delivery_ul{
    width: 92%;
    margin: 0 auto;
  }
  .delivery_box{
    width: 100%;
  }
  .delivery_ul_li{
    border-bottom: 1px solid #eee;
    height: auto;
    overflow: hidden;
    padding: 15px 0 15px 0;
  }
  .delivery_ul_li_left{
    float: left;
  }
  .delivery_ul_li_right{
    float: right;
  }
  .icon_right{
    margin: 10px 10px;
    display: block;
  }
  .delivery_ul_li_like{
    background: red;
    padding: 2px;
    border-radius: 50%;
  }
  .delivery_ul_li_left_text{
    color: #cacaca;
    display: block;
    padding-top: 10px;
  }
  //优惠券
  .discount{
    border-top: 10px solid #f2f2f2;
  }
  .discount_box{
    margin: 0 auto;
    width: 92%;
    padding: 10px 0 10px 0;
  }
  .discount_top{
    height: auto;
    overflow: hidden;
  }
  .discount_top_left,.discount_top_left_text,.discount_top_left_box{
    float: left;
  }
  .discount_top_left_box{
    margin-left: 10px;
    background: #da1d1d;
    color: #fff;
    padding: 2px 5px 2px 5px ;
  }
  .discount_top_left_text{
    font-size: 14px;
  }
  .discount_top_right{
    float: right;
  }
  .discount_title{
    padding: 10px 0 10px 0;
  }
  .discount_text{
    width: 100%;
    border: 1px solid #ebebeb;
    height: 70px;
  }
  //订单信息
  .orderconfirm{
    border-top: 10px solid #f2f2f2;
    margin-bottom: 70px;
  }
  .orderconfirm_ul{
    width: 92%;
    margin: 10px auto;
  }
  .orderconfirm_ul_li{
    color: #848484;
    padding: 5px 0 5px 0;
    overflow: hidden;
    height: auto;
  }
  .orderconfirm_ul_li_text{
    float: left;
  }
  .orderconfirm_ul_li_result{
    float: right;
    color: #dd2924;
  }
  //底部提交订单
  .ordersubmit{
    position: fixed;
    z-index: 100;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: #fff;
  }
  .ordersubmit_btn{
    float: right;
    width: 30%;
    height: 100%;
    background: #f23030;
    text-align: center;
    line-height: 50px;
    color: #fff;
    font-size: 14px;
  }
  .ordersubmit_text{
    float: right;
    line-height: 50px;
    margin-right: 10px;
  }
  .ordersubmit_text_price{
    color: #f23030;
  }
  //优惠券列表
  .coupon_title{
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    position: relative;
  }
  .icon-guanbi{
    float: right;
  }
  .coupon_content{
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
  .coupon_content_ul{
    width: 92%;
    margin: 0 auto;
    padding-bottom: 60px;
  }
  .coupon_content_ul_li{
    padding: 10px 10px;
    width: 100%;
    height: auto;
    overflow: hidden;
    box-shadow: 1px 1px 10px #f3f3f3;
    margin: 10px 0;
    border-radius: 10px;
  }
  .content_ul_li_left_no{
    margin-top: 10px;
  }
  .content_ul_li_left{
    float: left;
  }
  .content_ul_li_right{
    float: right;
  }
  .ul_li_left_left{
    float: left;
  }
  .ul_li_left_left_price{
    font-size: 16px;
    color: #ca0000;
    font-weight: 800;
  }
  .li_left_left_price_p{
    font-size: 20px;
  }
  .ul_li_left_left_if{
    font-size: 12px;
    color: #9797a9;
  }
  .content_ul_li_time{
    float: left;
    margin-left: 20px;
    margin-top: 10px;
    font-size: 12px;
  }
  .content_ul_li_right{
    margin-top: 10px;
  }
  .icon-xuanze-copy{
    font-size: 20px;
  }
</style>

