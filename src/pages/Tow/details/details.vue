<template>
  <section class="dateils">
    <div ref="dateils">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'详情'" :middle="'title'" :routers="$route.query.path" :val="$route.query.value" :scroll="$route.query.scroll" />
      <!--banner区域-->
      <mt-swipe class="swiper" :style="'height:'+bannerHeight+'px;'" ref="swiperImg" :auto="4000">
        <mt-swipe-item v-for="(img ,index) in banner" :key="index">
          <img :src="url+img.image_url"  />
        </mt-swipe-item>
      </mt-swipe>
      <!--价格等区域-->
      <section class="price">
        <!--标题 + 收藏-->
        <div class="price_title_collection">
          <!--标题-->
          <div class="price_title_left">
            <span>{{detailss.goods_name||''}}</span>
          </div>
          <!--收藏-->
          <div class="price_collection_right" @click="addCollection()" :style="detailss.is_collect&&userId?'color:#e2264d':''">
            <!--<span class="iconfont icon-icon-test1 "></span>-->
            <div class="heart" id="like2" rel="like" :class="details.is_collect&&userId?'heartAnimation':''"></div>
            <span>{{details.is_collect&&userId?'已收藏':'收藏'}}</span>
          </div>
        </div>
        <!--价格 + 虚拟价格-->
        <div>
          <!--价格-->
          <!--秒杀价格-->
          <span class="price_p" v-if="detailss.prom_type == 1">抢购价￥{{detailss.shop_price||''}}</span>
          <!--拼图价格-->
          <span class="price_p" v-if="detailss.prom_type == 6">拼团价￥{{detailss.teamprice||''}}</span>
          <!--普通价格-->
          <span class="price_p" v-else>￥{{detailss.shop_price||''}}</span>
          <!--虚拟价格-->
          <span class="price_s">￥{{detailss.market_price}}</span>
          <!--库存-->
          <span class="shops_box_stock" style="float: right">库存：{{$route.query.goods_num||detailss.store_count}}</span>
        </div>
        <!--销量 + 运费 + 商家地址-->
        <div class="price_volume">
          <!--销量-->
          <div class="price_volume_v">运费：{{detailss.postage}}</div>
          <!--运费-->
          <div class="price_volume_freight">运费：{{detailss.is_free_shipping === 1?'包邮':'不包邮'
            }}</div>
          <!--商家地址-->
          <!--<div class="price_volume_address">广东深圳</div>-->
          <!--秒杀-->
          <div v-if="detailss.prom_type == 1" class="price_volume_address_spike">
            <div class="price_volume_address_spike_left">限时抢购</div>
            <div class="price_volume_address_spike_right">抢购剩余时间：{{dates}}</div>
          </div>
        </div>
      </section>
      <!--领卷-->
      <section class="coupon" @click="boxShow(1,0)">
        <div class="coupon_box">
          <span class="coupon_box_c">领卷</span>
          <span class="iconfont icon-iconfontjiantou4"></span>
        </div>
      </section>
      <!--拼团-->
      <section class="coupon collage" v-if="detailss.prom_type == 6">
        <!--标题-->
        <div class="collage_title">
          <div class="collage_title_left">1人在拼单，可直接参与</div>
          <div class="collage_title_right" @click="collageDetails = true">
            <span class="coupon_box_c" >查看更多</span>
            <span class="iconfont icon-iconfontjiantou4"></span>
          </div>
        </div>
        <yd-slider autoplay="3000" direction="vertical" :show-pagination="false" style="height: 100px;">
          <yd-slider-item  style="height: 100px;padding-bottom: 10px;"v-for="(team,index) in teamFoundsG" :key="index">
            <div class="collage_ul_li" v-for="(teams , i) in team" :key="i">
              <div class="collage_ul_li_left">
                <!--头像-->
                <img class="ul_li_left_img" :src="teams.head_pic"/>
                <!--昵称-->
                <span class="ul_li_left_text">{{teams.nickname}}</span>
              </div>
              <div class="collage_ul_li_right">
                <div class="ul_li_right_tips">
                  <p class="li_right_tips_top">还差{{teams.surplus}}人拼成</p>
                  <!--时间-->
                  <p class="li_right_tips_btn">余剩{{teamFoundsTime}}</p>
                </div>
                <!--按钮-->
                <div class="ul_li_right_btn" @click="anOrder(teams.found_id,true)">
                  去拼单
                </div>
              </div>
            </div>
          </yd-slider-item>
        </yd-slider>
      </section>
      <!--拼团查看更多-->
      <section class="collage_details" v-if="collageDetails">
        <div class="collage_details_back"></div>
        <div class="collage_details_box">
          <div class="details_box_title">
            <span class="details_box_title_text">正在拼单</span>
            <span class="iconfont icon-wrong details_box_title_icon" @click="collageDetails = false"></span>
          </div>
          <div class="details_box_center" v-if="teamFounds">
            <div class="details_box_d" v-for="(team,index) in teamFounds" :key="index">
              <div class="details_box_d_left">
                <!--头像-->
                <img class="box_d_left_img" :src="team.head_pic" />
                <div class="box_d_left_other">
                  <p class="d_left_other_p">
                    <!--昵称-->
                    <span class="d_left_other_p_name">{{team.nickname}}</span>
                    <!--拼团人数-->
                    <span class="d_left_other_p_num">还差{{team.surplus}}人</span>
                  </p>
                  <!--剩余时间-->
                  <p class="d_left_other_p_time">余剩：18:46:30</p>
                </div>
              </div>
              <!--按钮-->
              <div class="details_box_d_right" @click="anOrder(team.found_id,true)">去拼单</div>
            </div>
          </div>

        </div>
      </section>
      <!--地址等区域-->
      <section class="address">
        <!--地址-->
        <!--<div class="address_box">
          <div class="coupon_box">
            <span class="coupon_box_c">地址</span>
            <span class="address_box_text">广东省</span>
            <span class="iconfont icon-iconfontjiantou4"></span>
          </div>
        </div>-->
        <!--拼团规格-->
        <div class="address_box" @click="boxShow(2 , 1 , '' ,'collage')" v-if="detailss.prom_type == 6">
          <div class="coupon_box">
            <span class="coupon_box_c">规格</span>
            <!-- <span class="address_box_text">1件</span> -->
            <span class="iconfont icon-iconfontjiantou4"></span>
          </div>
        </div>
        <!--普通规格-->
        <div class="address_box" @click="boxShow(2 , 1 ,'' ,'default')" v-else>
          <div class="coupon_box">
            <span class="coupon_box_c">规格</span>
            <!-- <span class="address_box_text">1件</span> -->
            <span class="iconfont icon-iconfontjiantou4"></span>
          </div>
        </div>
        <!--服务-->
        <div class="address_box">
          <div class="coupon_box">
            <span class="coupon_box_c">服务</span>
            <span class="address_box_text">由商城提供</span>
            <!-- <span class="iconfont icon-iconfontjiantou4"></span> -->
          </div>
        </div>
        <!--评价-->
        <div class="address_box" @click="$router.replace({path:'/home/dateils/evaluate',query:{id: detailss.goods_id,path: $route.fullPath}})">
          <div class="coupon_box">
            <span class="coupon_box_c">用户评价</span>
            <span class="iconfont icon-iconfontjiantou4"></span>
          </div>
        </div>
      </section>
      <!--详情-->
      <section style="margin-bottom: 50px;overflow: hidden;">
        <div class="dateils_title">商品详情</div>
        <div v-html="detailsImg" id="detailsImg"></div>
        <div style="height: 50px;"></div>
      </section>
      <!--底部按钮-->
      <!--拼团-->
      <section class="btns" v-if="detailss.prom_type == 6" style="z-index: 100;">
        <div class="btn_left" style="padding: 5px 0;" @click="boxShow(2,2,false,'default')">
          <span>￥{{detailss.shopprice}}</span><br>
          <span>单独购买</span>
        </div>
        <div class="btn_right" style="padding: 5px 0;" @click="boxShow(2,2,false,'collage')">
          <span>￥{{detailss.teamprice}}</span><br>
          <span>发起拼单</span>
        </div>
      </section>
      <section class="btns" v-else-if="!detailss.prom_type">
        <div class="btn_left" @click="boxShow(2,2,true)">加入购物车</div>
        <div class="btn_right" @click="boxShow(2,2,false,'default')">立即购买</div>
      </section>

      <!--规格-->
      <section v-if="box" class="collarroll_b">
        <div style="width: 100%;height: 100%;" @click="box = false"></div>
        <section class="collarroll animated fadeInUpBig">
          <!--点击显示优惠券-->
          <div class="collarroll_box" v-if="collar">
            <div class="collarroll_box_div">
              <span>优惠券列表</span>
              <span class="iconfont icon-guanbi collarroll_box_icon" @click="box = false"></span>
            </div>
            <ul class="discount">
              <li class="discount_youhui" v-for="(coupons,index) in coupon" :key="index">
                <div class="discount_youhui_left">
                  <!--价格-->
                  <p class="discount_youhui_left_price">￥{{coupons.money}}</p>
                  <div class="youhui_left_box">
                    <!--条件-->
                    <p class="youhui_left_box_if">满{{coupons.condition}}元使用</p>
                    <!--活动时间-->
                    <p class="youhui_left_box_time">{{coupons.use_end_time}}结束</p>
                  </div>
                </div>
                <!--按钮-->
                <div class="discount_youhui_right" v-if="coupons.isuse == 2">已过期</div>
                <div class="discount_youhui_right" v-if="coupons.isuse == 1">已使用</div>
                <div class="discount_youhui_right"  @click="couponReceiveFn(coupons.id,index)" v-else="coupons.isuse == 0">{{coupons.isget?'已领取':'领取'}}</div>
              </li>
            </ul>
          </div>
          <!--点击显示购买规格-->
          <div class="collarroll_show" v-else>
            <div>
              <!--商品-->
              <div class="collarroll_shops">
                <div class="collarroll_shops_s">
                  <!--商品图片-->
                  <img :src="image||url+detailss.original_img"  class="collarroll_shops_img" />
                  <div class="collarroll_shops_box">
                    <!--商品名称-->
                    <span class="collarroll_shops_box_title">{{detailss.goods_name}}</span>
                    <div class="collarroll_shops_box_price">
                      <!--商品价格-->
                      <span class="shops_box_price">￥{{claPrice||detailss.shop_price}}</span><br>
                      <!--库存-->
                      <div v-if="specIdStr">
                        <span class="shops_box_stock" v-if="claStock">库存：{{claStock}}</span>
                        <span class="shops_box_stock" v-else>库存：0</span>
                      </div>
                      <div v-else>
                        <span class="shops_box_stock">库存：{{detailss.store_count}}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="iconfont icon-guanbi collarroll_box_icon" @click="box = false"></span>
              </div>
              <!--数量-->
              <div class="number_box">
                <span class="number_box_title">数量</span>
                <div class="number_box_n">
                  <div class="number_box_n_reduce" @click="number > 1 ?number--:0">-</div>
                  <span style="padding: 20px">{{number}}</span>
                  <div class="number_box_n_plus" @click="numberFn()">+</div>
                </div>
              </div>
              <!--规格种类-->
              <div v-if="list">
                <div class="Specifications" v-if="list[0]">
                  <div class="Specifications_title">{{list[0].name}}</div>
                  <ul>
                    <li class="Specifications_type" v-for="(gavin,j) in list[0].spec_item" :key="j" @click="choiceActiveClass(j,gavin.id,gavin.item,gavin.img)" :class="typeActive === j?'Specifications_type_active':''">{{gavin.item}}</li>
                  </ul>
                </div>
                <div class="Specifications" v-if="list[1]">
                  <div class="Specifications_title">{{list[1].name}}</div>
                  <ul>
                    <li class="Specifications_type" v-for="(gavin,j) in list[1].spec_item" :key="j" @click="choiceActiveClass1(j,gavin.id,gavin.item,gavin.img)" :class="typeActive1 === j?'Specifications_type_active':''">{{gavin.item}}</li>
                  </ul>
                </div>
                <div class="Specifications" v-if="list[2]">
                  <div class="Specifications_title">{{list[2].name}}</div>
                  <ul>
                    <li class="Specifications_type" v-for="(gavin,j) in list[2].spec_item" :key="j" @click="choiceActiveClass2(j,gavin.id,gavin.item,gavin.img)" :class="typeActive2 === j?'Specifications_type_active':''">{{gavin.item}}</li>
                  </ul>
                </div>
                <div class="Specifications" v-if="list[3]">
                  <div class="Specifications_title">{{list[3].name}}</div>
                  <ul>
                    <li class="Specifications_type" v-for="(gavin,j) in list[3].spec_item" :key="j" @click="choiceActiveClass3(j,gavin.id,gavin.item,gavin.img)" :class="typeActive3 === j?'Specifications_type_active':''">{{gavin.item}}</li>
                  </ul>
                </div>
              </div>

              <!--底部购买按钮-->
              <section class="booleanBtn">
                <div class="btns" v-if="btn">
                  <section class="btns" v-if="detailss.prom_type == 6" style="z-index: 100;">
                    <!--<div class="btn_left" style="padding: 5px 0;" @click="collageOrderFn('default')">
                      <span>￥{{detailss.shop_price}}</span><br>
                      <span>单独购买</span>
                    </div>-->
                    <div class="btn_right" style="padding: 5px 0;width: 100%;" @click="collageOrderFn('collage')">
                      <span>￥{{detailss.teamprice}}</span><br>
                      <span>发起拼单</span>
                    </div>
                  </section>
                  <div v-else>
                    <div class="btn_left" @click="shopsCart()">加入购物车</div>
                    <div class="btn_right" @click="anOrder()">立即购买</div>
                  </div>
                </div>
                <div v-else class="booleanBtn_determine">
                  <div class="booleanBtn_determine_btn" @click="shopsCart()" v-if="choice">确认</div>
                  <div class="booleanBtn_determine_btn" @click="anOrder()" v-else>确认</div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </section>
    </div>
    <Loading :type="1" v-if="loading" />

  </section>
</template>

<script>
    import Header from "../../../components/header/header.vue";
    import Loading from '../../../components/loading/loading.vue';
    import {URL} from '../../../API/url.js';
    import {reqShopsCart,reqCollect,reqBuyImmediately,reqStock,reqCouponReceive,reqCollageStock} from "../../../API";
    import {mapState} from 'vuex';
    import { Toast , Indicator } from 'mint-ui';
    import {EnglishDateHours,EnglishDateTime} from "./js/date.js";
    import BScroll from 'better-scroll';
    export default {
      data(){
        return {
          box: false,
          collar: false,
          number: 1,
          btn: false,
          url: URL,            //公用地址
          detailss: [],       //详情数据
          banner: Object,         //详情轮播
          loading: true ,    //loading
          loadingType: 2,    //loading样式
          detailsImg: '',    //详情图片
          list:[],            //列表分类
          userId: '',        //获取用户ID
          typeActive: Number,      //下标
          typeActive1: Number,     //下标
          typeActive2: Number,     //下标
          typeActive3: Number,     //下标
          specifications0: String,     //选择的结果
          specifications1: String,     //选择的结果
          specifications2: String,     //选择的结果
          specifications3: String,     //选择的结果
          specItemId0: Number,     //选择的ID
          specItemId1: Number,     //选择的ID
          specItemId2: Number,     //选择的ID
          specItemId3: Number,     //选择的ID
          specId:[],                //规格ID数组
          specIdStr: String,       //规格ID字符串
          specificationsLists: '',         //选择的结果
          collections: Number,       //收藏
          fn: [this.choiceActiveClass,this.choiceActiveClass1,this.choiceActiveClass2,this.choiceActiveClass3],    //方法
          bannerHeight: 0,      //banner宽度
          choice: Boolean,      //判断是购买还是加入购物车
          dates: '',              //秒杀时间
          image: "",
          claStock: "",              //规格库存
          claPrice: "",              //规格价格
          item: "",                  //结束时间
          prom_type: 0,              //活动
          collageDetails: false,   //拼团详情
          coupon: [],                //优惠券列表
          typeOrder: "default",    //购买方式
          teamFounds:[],            //参团数据
          teamFoundsG: [],          //参团数据处理
          teamFoundsTimeEnd: "",   //结束时间
          teamFoundsTime: "",      //参团时间戳
        }
      },
      created(){
        setTimeout(() => {
          this.userId = localStorage.getItem('login');
          this.$store.dispatch('getDateils',{id:this.$route.query.id,token:this.userId,flash_sale_id: this.$route.query.flash_sale_id});
          this.specificationsIdFn();
        },100);
      },
      watch:{
        details(val){
          if(this.details.msg === "请求成功"){
            //商品详情数据
            this.detailss = this.details.sql[0];
            //结束时间
            this.item = this.details.sql[0].end_time;
            //商品详情banner
            this.banner = this.details.banner;
            //商品详情规格
            this.detailss.prom_type == 6?this.list = this.details.prspec_list:this.list = this.details.spec_list;
            //活动
            this.prom_type = this.details.sql[0].prom_type;
            //秒杀时间戳处理
            this.newDate(this.item);
            //优惠券列表
            this.coupon = this.details.userCouponList;
            //优惠券列表时间戳处理
            //this.couponTimeFn(this.coupon);
            //参团数据
            this.teamFounds = this.details.sql[0].teamFounds?this.details.sql[0].teamFounds:''
            //参团时间戳
            this.teamFounds&&this.teamFounds.length?this.teamFoundsTimeEnd = this.details.sql[0].teamFounds[0].found_time:'';
            //拼团时间戳处理
            this.teamFoundsTimeDate(this.teamFoundsTimeEnd);
            //详情图处理
            this.$nextTick(()=>{
              let zuo = this.details.sql[0].goods_content.replace(/&lt;/g,'<');
              let you = zuo.replace(/&gt;/g,'>');
              let shuangyinghao = you.replace(/&quot;/g,'"');
              let imgHeight = document.body.clientWidth;
              this.bannerHeight = imgHeight;
              this.detailsImg = shuangyinghao;
              this.loading = false;
            });
            //默认规格选中
            if(this.list){
              this.$nextTick(() => {
                let arr=[this.choiceActiveClass,this.choiceActiveClass1,this.choiceActiveClass2,this.choiceActiveClass3]
                for(let i=0;i<arr.length;i++){
                  if(this.list[i]){
                    arr[i](0,this.list[i].spec_item[0].id,this.list[i].spec_item[0].item);
                  }
                }
              })
            }
          }
        },
        typeOrder(val){
          if(val == 'default'){
            //商品详情规格
            this.list = this.details.spec_list;
          }else if(val == 'collage'){
            //商品详情规格
            this.list = this.details.prspec_list;
          }
        },
        teamFounds(val){
          if(val.length){
            let num = 0;
            let arr = [];
            for(let i=0;i<val.length;i++){
              if(num < 2){
                arr.push(val[i]);
                num++;
                if(num == 2){
                  this.teamFoundsG.push(arr);
                }
              }else{
                arr = [];
                num = 0;
              }
              /*if(val.length-1 == i&&val.length%2 !== 0){
                this.teamFoundsG.push({0:val[i]});
              }*/
            }
          }
        }
      },

      components:{
        Header,
        Loading
      },
      methods:{
        boxShow(index,index2,choices,typeOrder){
          this.typeOrder = 'a'
          console.log(this.typeOrder)
          if(index === 1){
            this.box = true;
            this.collar = true;
          }else if(index === 2){
            this.box = true;
            this.collar = false;
          }
          if(index2 === 1){
            this.btn  = true
          }else if (index2 === 2){
            this.btn  = false
          }
          //判断是否购买，或者是加入购物车
          if(choices){
            this.choice = true            //为真时，加入购物车
          }else{
            this.choice = false           //未假时，立即购买
            this.typeOrder = typeOrder    //判断是否为拼团购买
            if(typeOrder == 'default'){
              this.list = this.details.spec_list;
            }
          }
          this.choiceFn();
        },
        //加入购物车
        async shopsCart(){
          this.specIdStr = this.specId.join("_")
          if(this.userId){
            Indicator.open("加载中...");
            const result = await reqShopsCart(
              this.userId,                    //用户ID
              this.detailss.goods_id,         //商品ID
              this.number,                    //购买数量
              this.specIdStr,                    //商品规格对应ID
              this.specificationsLists,     //商品规格组合名称
              1,                               //购物车选中状态

            );
            if(result.status === 200){
              this.publicLoading("成功加入购物车");
            }else if(result.status === 500){
              this.publicLoading(result.msg);
              if(result.msg == '登录已过期，请重新登录'){
                this.$router.replace("/login/login")
              }
            }else{
              this.publicLoading("此商品已在购物车");
            }
          }else{
            this.judegLogin('亲~加入购物车要登录哦！',2000);
          }
          this.box = false;
        },
        choiceActiveClass(index ,id , text , img){
          this.specItemId0 = id;
          this.typeActive = index;
          this.specifications0 = text;
          this.choiceFn(index ,id , text);
          if(img){
            this.image = this.url+img
          }
        },
        choiceActiveClass1(index , id , text,img){
          this.specItemId1 = id;
          this.typeActive1 = index;
          this.specifications1 = text;
          this.choiceFn(index ,id , text);
          if(img){
            this.image = this.url+img
          }
        },
        choiceActiveClass2(index , id , text,img){
          this.specItemId2 = id;
          this.typeActive2 = index;
          this.specifications2 = text
          this.choiceFn(index ,id , text);
          if(img){
            this.image = this.url+img
          }

        },
        choiceActiveClass3(index , id , text,img){
          this.specItemId3 = id;
          this.typeActive3 = index;
          this.specifications3 = text
          this.choiceFn(index ,id , text);
          if(img){
            this.image = this.url+img
          }
        },
        async choiceFn(index ,id , text){
          let arr = [];
          let arrId = [];
          for(let i=0;i<this.details.spec_list.length;i++){
            arr.push(this.list[i].name + ":" + eval("this.specifications"+i));
            arrId.push(eval("this.specItemId"+i));
          }
          this.specificationsLists = arr.join(" ");
          this.specId = arrId;
          this.specIdStr = this.specId.join("_");
          //请求
          if(this.specIdStr){
            let result
            if(this.prom_type == '1'){
              //秒杀规格
              result = await reqStock(this.$route.query.id,this.specIdStr,this.$route.query.flash_sale_id);
            }else if(this.prom_type == '6'&&this.typeOrder == "collage"){
              //拼团规格
              result = await reqCollageStock(this.$route.query.id,this.specIdStr);
            }else{
              //普通规格
              result = await reqStock(this.$route.query.id,this.specIdStr);
            }
            if(result.status == 200 && result.data){
              this.claStock = result.data.store_count
              this.claPrice = result.data.price
            }
          }
        },
        //收藏
        async addCollection(){
          this.specificationsIdFn();
          if(this.userId){
            Indicator.open("加载中...");
            const result = await reqCollect(this.detailss.goods_id,this.userId);
            if(result.status === 200){
              this.collections = 200;
              this.$store.dispatch('getDateils',{id:this.$route.query.id,token:this.userId});
              this.publicLoading("已收藏成功！");
            }else if(result.status === 500){
              this.collections = 500;
              this.$store.dispatch('getDateils',{id:this.$route.query.id,token:this.userId});
              this.publicLoading("已取消收藏！");
            }
          }else{
            this.judegLogin('亲~登录才可以收藏哦！',2000);
          }
        },
        //loading加载状态弹窗
        publicLoading(message,duration){
            Indicator.close();
            Toast({
              message,
              duration: duration||3000
            });
        },
        //下单
        async anOrder(found_id,typeOrder){
          this.specificationsIdFn();
          let type = typeOrder||'';
          if(type){
            this.typeOrder = 'collage';
          }
          //普通下单
          if(this.typeOrder == 'default'){
            if(this.userId){
              const result = await reqBuyImmediately(
                this.userId,
                this.detailss.goods_id,
                this.number,
                this.specIdStr,
                this.specificationsLists,
                1,
                '',
                '');
              if(result.status == 500){
                Toast(result.msg);
                if(result.msg == '登录已过期，请重新登录'){
                  this.$router.replace("/login/login")
                }
              }else{
                const price = this.$route.query.price||'';
                this.$router.replace({path: '/dateils/fillOrder',query:{
                    type: 'details',           //类型
                  }
                });
                this.sessionIndex('shop', [{
                  goods_id: this.detailss.goods_id,       //商品id
                  spec_key_name: this.specificationsLists,       //规格
                  goods_num: this.number,                          //数量
                  spec_key: this.specIdStr,                       //规格id
                  type: 0,                                           //购买类型
                }]);
              }
            }else{
              this.judegLogin('亲~登录才可以购买哦！',2000);
            }
          }else if(this.typeOrder == 'collage'){
            if(this.userId){
              this.$router.replace({path: '/dateils/fillOrder',query:{
                  type: 'details',           //类型
                }
              });
              this.sessionIndex('shop', [{
                goods_id: this.detailss.goods_id,       //商品id
                spec_key_name: this.specificationsLists,       //规格
                goods_num: this.number,                  //数量
                spec_key: this.specIdStr,                //规格id
                item_id: this.$route.query.prom_id||'',   //活动id
                type: 1,                                   //购买类型
                found_id: found_id||'',                           //拼单id
              }]);
            }else{
              this.judegLogin('亲~登录才可以购买哦！',2000);
            }
          }
        },
        //规格id合成
        specificationsIdFn(){
          this.specIdStr = this.specId.join('_');
        },
        //没登录时执行此方法
        judegLogin(message,duration){
          this.publicLoading(message,duration);
          setTimeout(() => {
            this.publicLoading('正在跳转登录页面...',2500);
            setTimeout(()=>{
              this.$router.replace({path:'/login/login',query:{path: this.$route.fullPath}});
            },1500)
          },2000)
        },
        //剩余秒杀时间
        newDate(date){
          this.timeout = setInterval(()=>{
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            this.dates = EnglishDateHours((date-timestamp)+143999.99);
          },100)
        },
        //剩余拼团时间
        teamFoundsTimeDate(date){
          setInterval(()=>{
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            this.teamFoundsTime = EnglishDateHours((date-timestamp)+143999.99);
          },100)
        },
        //增加数量
        numberFn(){
          //this.number < Number(this.detailss.store_count)?this.number++:this.publicLoading("已超过抢购数量咯！");
          this.number++
        },
        //优惠券列表时间戳处理
        couponTimeFn(coupon){
          if(coupon.length){
            for(var i=0;i<coupon.length;i++){
              this.coupon[i].use_start_time = EnglishDateTime(coupon[i].use_start_time);
              this.coupon[i].use_end_time = EnglishDateTime(coupon[i].use_end_time);
            }
          }
        },
        //领取优惠券
        async couponReceiveFn(coupon_id,index){
          const result = await reqCouponReceive(this.userId,coupon_id);
          if(result.status == 200 || result.status == 500){
            if(result.status == 200){
              this.coupon[index].isget = 1
            }
            Toast(result.msg);
          }else if(result.status == 666){
            this.judegLogin(result.msg,2500);
          }
        },
        //拼团购买
        collageOrderFn(typeOrder){
          this.typeOrder = typeOrder;
          this.anOrder();
        }
      },
      computed:{
        ...mapState(['details']),
      },
      mounted () {
        window.scrollTo(0,0)
      },

    }
</script>

<style scoped lang="scss">
  .dateils{
    background: #fff;
    position: absolute;
    width: 100%;
    left: 0%
  }
  //banner区域
  .banner{
    height: 400px;
    margin-top: 70px;
  }
  .swiper,img,.banner{
    width: 100%;
  }
  .swiper{
    height: 380px;
    margin-top: 50px;
  }

  //价格区域
  .price{
    width: 92%;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    padding-bottom: 10px;
  }
  .price_title_collection{
    width: 100%;
    padding: 20px 0 60px 0;
  }
  .price_title_left{
    font-size: 16px;
    width: 82%;
    height: 40px;
    overflow: hidden;
  }
  .price_collection_right{
    text-align: center;
  }
  .price_collection_right span{
    margin-top: -16px;
    font-size: 12px;
    display: block;
  }
  .icon-icon-test1{
    display: block;
  }
  .price_p{
    font-size: 16px;
    color: #ec5151;
  }
  .price_s{
    text-decoration: line-through;
    color: #999;
  }
  .price_volume{
    position: relative;
    padding-top: 10px;
  }
  .price_volume_freight{
    position: absolute;
    width: 150px;
    left: 50%;
    margin-left: -75px;
    text-align: center;
  }
  .heart {
    background:url("../../../../static/img/web_heart_animation.png");
    background-position:left;
    background-repeat:no-repeat;
    height:50px;
    width:50px;
    background-size:2900%;
    margin-top: -15px;
  }

  @-webkit-keyframes heartBlast {
    0% {
      background-position:left;
    }
    100% {
      background-position:right;
    }
  }

  @keyframes heartBlast {
    0% {
      background-position:left;
    }
    100% {
      background-position:right;
    }
  }

  .heartAnimation {
    display:inline-block;
    -webkit-animation-name:heartBlast;
    animation-name:heartBlast;
    -webkit-animation-duration:1.3s;
    animation-duration:1.3s;
    -webkit-animation-iteration-count:2;
    animation-iteration-count:2;
    -webkit-animation-timing-function:steps(28);
    animation-timing-function:steps(28);
    background-position:right;
  }

  //领劵
  .coupon{
    border-top: 10px solid #f8f8f8;
    margin-top: 20px;
  }
  .coupon_box{
    width: 92%;
    line-height: 40px;
    height: 40px;
    color: #777;
    margin: 0 auto;
    font-size: 14px;
  }
  //拼团
  .collage{
    width: 100%;
    height: 155px;
    margin-top: 0;
    overflow: hidden;
  }
  .collage_title{
    width: 92%;
    padding: 10px 0;
    margin: 0 auto;
    border-bottom: 1px solid #f9f9f9;
    height: auto;
    overflow: hidden;
    font-size: 14px;
  }
  .collage_title_left{
    float: left;
  }
  .collage_title_right{
    float: right;
    color: #bbb;
  }
  .collage_ul_li{
    width: 92%;
    padding: 10px 0;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .collage_ul_li_left{
    float: left;
  }
  .ul_li_left_img{
    width: 32px;
    border-radius: 50%;
    height: 32px;
    display: inline-block;
  }
  .ul_li_left_text{
    display: inline-block;
    margin-left: 10px;
  }
  .collage_ul_li_right{
    float: right;
  }
  .ul_li_right_tips{
    display: inline-block;
    margin-right: 20px;
  }
  .li_right_tips_top{
    float: right;
  }
  .li_right_tips_btn{
    color: #adadad;
    //float: right;
  }
  .ul_li_right_btn{
    float: right;
    padding: 5px 12px;
    background: red;
    color: #fff;
    border-radius: 5px;
    margin-top: 5px;
  }
  //拼团详情
  .collage_details{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 101;
    top: 0;
  }
  .collage_details_back{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: #00000057;
  }
  .collage_details_box{
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -40%;
    width: 80%;
    background: #fff;
    border-radius: 5px;
    height: 30%;
    overflow-y: scroll;
  }
  .details_box_title{
    border-bottom: 1px solid #f9f9f9;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    width: 80%;
    background: #fff;
  }
  .details_box_title_icon{
    position: absolute;
    top: -16px;
    font-size: 26px;
    right: -10px;
  }
  .details_box_center{
    margin-top: 50px;
  }
  .details_box_d{
    height: auto;
    overflow: hidden;
    width: 92%;
    margin: 10px auto;
    font-size: 12px;
  }
  .details_box_d_left{
    float: left;
  }
  .box_d_left_img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    float: left;
  }
  .box_d_left_other{
    float: left;
    margin-left: 10px;
  }
  .d_left_other_p_name,.d_left_other_p_time,.d_left_other_p_num{
    font-size: 12px;
  }
  .d_left_other_p_num{
    margin-left: 10px;
    color: #7b7b7b;
  }
  .details_box_d_right{
    float: right;
  }
  .d_left_other_p_time{
    color: #7b7b7b;
  }
  .details_box_d_right{
    padding: 5px 12px;
    background: red;
    color: #fff;
    border-radius: 5px;
    margin-top: 5px;
  }

  //公用样式
  .coupon_box_c,
  .price_volume_v,
  .price_title_left,
  .btn_left{
    float: left;
  }
  .price_volume_address,
  .price_collection_right,
  .icon-iconfontjiantou4,
  .btn_right{
    float: right;
  }
  .price_volume_address_spike{
    padding: 30px 0 10px 0;
  }
  .price_volume_address_spike_left{
    padding: 5px 10px;
    background: #f28b8b;
    width: 100px;
    border-radius: 7px;
    color: #fff;
    text-align: center;
    box-shadow: 1px 1px 5px #dbcfcf;
    float: left;
  }
  .price_volume_address_spike_right{
    padding: 5px 10px;
    background: #f28b8b;
    border-radius: 7px;
    color: #fff;
    text-align: center;
    box-shadow: 1px 1px 5px #dbcfcf;
    float: right;
    animation: input_border 10s linear 0s infinite;
  }
  //按钮动画
  @keyframes input_border{
    0%{background: #d6cec3}
    10%{background: #d0aaaa}
    20%{background: #d0c4aa}
    30%{background: #c3d0aa}
    40%{background: #b2d0aa}
    50%{background: #aad0c7}
    60%{background: #aacbd0}
    70%{background: #aab0d0}
    80%{background: #acaad0}
    90%{background: #b7aad0}
    100%{background: #ccaad0}
  }

  //地址
  .address{
    border-top: 10px solid #f8f8f8;
  }
  .address_box_text{
    margin-left: 15px;
    color: #000;
  }

  //详情
  .dateils_title{
    height: 40px;
    background: #f8f8f8;
    text-align: center;
    line-height: 40px;
  }

  //规格+优惠劵
  .collarroll_b{
    height: 100%;
    width: 100%;
    background: rgba(181, 181, 181, 0.6);
    position: fixed;
    top: 0;
    z-index: 101;
  }
  .collarroll{
    //height: 60%;
    overflow-y: scroll;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 101;
  }
  //优惠券
  .collarroll_box{
    width: 100%;
    //margin: 0 auto;
    text-align: center;
  }
  .collarroll_box_div{
    width: 92%;
    margin: 0 auto;
    padding: 20px 0 20px 0;
    border-bottom: 1px solid #eee;
  }
  .collarroll_box_icon{
    float: right;
  }
  //领卷列表
  .discount{
    margin-top: 10px;
    width: 100%;
    height: 200px;
  }
  .discount_youhui{
    margin-bottom: 10px;
    width: 92%;
    margin: 10px auto;
    border-radius: 10px;
    box-shadow: 1px 1px 11px #f3f3f3;
    height: auto;
    overflow: hidden;
    padding: 25px 10px;
  }
  .discount_youhui_left{
    float: left;
  }
  .discount_youhui_left_price{
    font-size: 25px;
    color: red;
    float: left;
  }
  .youhui_left_box{
    float: left;
    text-align: left;
    padding-left: 10px;
    color: #b7b7b7;
  }
  .discount_youhui_right{
    float: right;
    padding: 5px 15px;
    background: red;
    color: #fff;
    border-radius: 5px;
  }

  //选择商品规格
  .collarroll_show{
    width: 92%;
    margin: 20px auto;
    margin-bottom: 110px;
  }
  .collarroll_shops{
    border-bottom: 1px solid #eee;
    height: 80px;
  }
  .collarroll_shops_s{
    float: left;
    width: 90%;
  }
  .collarroll_shops_img{
    width: 60px;
    height: 60px;
    float: left;
  }
  .collarroll_shops_box{
    margin-left: 10px;
    float: left;
    position: relative;
    height: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 50%;
  }
  .collarroll_shops_box_price{
    position: absolute;
    bottom: 0;
    width: 150px;
  }
  .collarroll_shops_box_title{
    color: #666
  }
  .shops_box_price{
    font-size: 15px;
    color:#ec5151;
  }
  .shops_box_stock{
    color: #999;
    font-size: 12px;
  }
  .number_box_n,.number_box{
    padding-top: 10px;
  }
  .number_box_n_reduce,.number_box_n_plus{
    width: 30px;
    height: 30px;
    font-size: 20px!important;
    /*border-radius: 50%;*/
    display: inline-block;
    background: #dcd8d8;
    font-size: 18px;
    text-align: center;
  }
  .number_box_n_text{
    width: 60px;
    text-align: center;
    height: 30px;
  }
  .Specifications{
    margin-top: 10px;
  }
  .Specifications_title{
    margin-bottom: 10px;
  }
  .Specifications_type{
    border: 1px solid #eee;
    display: inline-block;
    padding: 5px 10px;
    color: #333;
    border-radius: 5px;
    margin-left: 10px;
    font-size: 12px;
  }
  .Specifications_type_active{
    background: #ff6161;
    color: #fff;
    border: none;
  }
  .btns,.booleanBtn_determine{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;

  }
  .btn_left{
    float: left;
    background: #ffb03f;
  }
  .btn_right{
    float: right;
    background: #ff6161;
  }
  .btn_right,.btn_left{
    width: 50%;
    padding: 15px 0 15px 0;
    color: #fff;
    text-align: center;
  }
  .booleanBtn_determine_btn{
    padding: 15px 0 15px 0;
    background: #f23030;
    color: #fff;
    text-align: center;
    display: block;
  }

  //轮播图
  #detailsImg{
    margin-bottom: 45px;
    height: auto;
    overflow: hidden;
  }
  #detailsImg{
    /deep/ p img{
      width: 100%;
    }
  }
  .slide-fade-enter-active {
    animation: bounce-in .5s
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateX(100%);
  }
  @keyframes bounce-in{
    100%{transition: all .5s ease;}
  }
</style>
