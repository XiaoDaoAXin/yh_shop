<template>
  <section class="searchShops">
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :middle="'search'"/>
    <!--切换按钮-->
    <section class="tabBtn" v-if="shops">
      <div class="tabBtn_b">
        <div class="tabBtn_box">
          <ul class="tabBtn_ul">
            <li class="tabBtn_li" :class="type == 'comprehensive'||type == 'newProduct'||type == 'evaluation' ?'red':''">
              <span class="tabBtn_li_text" @click="heald = !heald">{{comprehensive}}</span>
              <span class="iconfont icon-xiajiantou"></span>
            </li>
            <li class="tabBtn_li" @click="healdshow('销量')" :class="type == 'sales'?'red':''">
              <span class="tabBtn_li_text">销量</span>
              <span class="iconfont icon-xiaoliangjiantou"></span>
            </li>
            <li class="tabBtn_li" :class="type == 'price'?'red':''" @click="healdshow('价格')">
              <span class="tabBtn_li_text" >价格</span>
              <span class="iconfont icon-shangxia"></span>
            </li>
            <li class="tabBtn_li" @click="screen = true" :class="type == 'screening'?'red':''">
              <span class="tabBtn_li_text">筛选</span>
              <span class="iconfont icon-shaixuan"></span>
            </li>
          </ul>
          <div class="tabBtn_right" @click="listOption = !listOption"><span class="iconfont icon-liebiao"></span></div>
        </div>
      </div>
      <div>
        <!--弹出综合等列表-->
        <div class="tabBtn_heald" v-if="heald">
          <ul class="tabBtn_heald_ul">
            <li class="tabBtn_heald_li" @click="healdshow('综合')" :class="comprehensivenum === 0?'red':''">
              <span class="tabBtn_heald_text">综合</span>
              <span class="iconfont" :class="comprehensivenum === 0?'icon-selected':''"></span>
            </li>
            <li class="tabBtn_heald_li" @click="healdshow('新品')" :class="comprehensivenum === 1?'red':''">
              <span class="tabBtn_heald_text">新品</span>
              <span class="iconfont" :class="comprehensivenum === 1?'icon-selected':''"></span>
            </li>
            <li class="tabBtn_heald_li" @click="healdshow('评价')" :class="comprehensivenum === 2?'red':''">
              <span class="tabBtn_heald_text">评价</span>
              <span class="iconfont" :class="comprehensivenum === 2?'icon-selected':''"></span>
            </li>
          </ul>
          <div class="tabBtn_heald_null" @click="heald = false"></div>
        </div>
        <!--弹出筛选等列表-->
        <div class="tabBtn_screen " v-if="screen">
          <div class="tabBtn_screen_box animated fadeInRightBig">
            <header class="tabBtn_screen_box_header">
              <span class="iconfont icon-back" @click="screen = false"></span>
              <span class="screen_box_header_title">筛选</span>
              <span class="screen_box_header_submit" @click="submitSearch()">确定</span>
            </header>
            <section class="tabBtn_screen_box_s">
              <ul class="tabBtn_screen_box_s_ul">
                <!--筛选按钮-->
                <li class="tabBtn_screen_box_s_li" @click="screenAddClass('all')" :class="whole == 'all'?'red':''">显示全部</li>
                <li class="tabBtn_screen_box_s_li" @click="screenAddClass('free_post')" :class="whole == 'free_post'?'red':''">仅看包邮</li>
                <li class="tabBtn_screen_box_s_li" @click="screenAddClass('store_count')" :class="whole == 'store_count'?'red':''">仅看有货</li>
                <li class="tabBtn_screen_box_s_li" @click="screenAddClass('prom_type')" :class="whole == 'prom_type'?'red':''">促销商品</li>
              </ul>
            </section>
            <section class="tabBtn_screen_box_list">
              <yd-accordion accordion>
                <yd-accordion-item title="全部分类" style="font-size: 14px;">
                  <ul>
                    <li v-for="(classification,index) in shopclass" :key="index">
                      <span  style="padding: 15px 30px;display: block;font-size: 14px;border-bottom: 1px solid #fdf7f7;">{{classification.name}}</span>
                      <ul>
                        <li v-for="(c,i) in classification.sub_menu" :key="i" style="padding: 15px 40px;border-bottom: 1px solid #fdf7f7;" @click="classificationFn(c.id)">{{c.name}}</li>
                      </ul>
                    </li>
                  </ul>
                </yd-accordion-item>
                <yd-accordion-item :title="spec.name" style="font-size: 14px;" v-for="(spec,index) in specifications" :key="index">
                  <ul>
                    <li v-for="(s,i) in spec.item" :key="i" style="padding: 15px 30px;display: block;font-size: 14px;border-bottom: 1px solid #fdf7f7;" @click="specificationsFn(i,s.key,s.val)" >{{s.item}}</li>
                  </ul>
                </yd-accordion-item>
                <yd-accordion-item title="价格"  style="font-size: 14px;">
                  <div style="padding: .24rem;">
                    <p style="padding: 5px 0" v-for="(p,index) in price" :key="index" @click="priceAddClass(p.price)" :class="priceNum === index?'red':''">{{p.price}}</p>
                  </div>
                </yd-accordion-item>
              </yd-accordion>
            </section>
          </div>
          <div class="tabBtn_screen_hidden" @click="screen = false"></div>
        </div>
      </div>
    </section>
    <!--商品-->
    <section class="shops" v-if="shops">
      <ul class="shops_ul" v-if="!listOption">
        <li class="shops_li" v-for="(shop,index) in shops" :key="index" @click="shopsdetails(shop.goods_id)">
          <!--商品信息-->
          <div class="shop">
            <!--商品图片-->
            <div class="shop_box_img"><img :src="url+shop.original_img" class="shop_box_img_i" /></div>
            <div class="shop_box">
              <!--商品标题-->
              <span class="shop_box_title">{{shop.goods_name}}</span>
              <div class="shop_box_bottom">
                <div class="shop_box_bottom_left">
                  <!--商品价格-->
                  <p class="bottom_left_price">￥{{shop.shop_price}}元</p>
                  <div class="bottom_left_box">
                    <!--商品评价-->
                    <!-- <span class="left_box_evaluate">{{shop.comment_count}}条评价</span> -->
                    <!--商品好评率-->
                    <!-- <span class="left_box_praise">{{shop.praise?shop.praise+'%好评':''}}</span> -->
                  </div>
                </div>
                <div class="shop_box_bottom_right">
                  <!--购物车图标-->
                  <!-- <span class="iconfont icon-cart"></span> -->
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul class="shops_vertical" v-else>
        <li class="shops_vertical_li" v-for="(shop , index) in shops" :key="index" @click="shopsdetails(shop.goods_id)">
          <!--商品图片-->
          <img class="shops_vertical_li_img" :src="url+shop.original_img" />
          <!--商品标题-->
          <p class="shops_vertical_li_title">{{shop.goods_name}}</p>
          <div class="vertical_li_box">
            <!--商品价格-->
            <span class="vertical_li_box_price">￥{{shop.shop_price}}元</span>
            <!--加入购物车-->
            <!-- <span class="iconfont icon-cart icon-cart-app"></span> -->
          </div>
          <!-- <div class="vertical_li_bottom"> -->
            <!--商品评价-->
            <!-- <span class="vertical_li_bottom_evaluate">{{shop.comment_count}}条评价</span> -->
            <!--商品好评率-->
            <!-- <span class="vertical_li_bottom_praise">{{shop.praise?shop.praise+'%好评':''}}</span> -->
          <!-- </div> -->
        </li>
      </ul>
    </section>

    <!--找不到报错-->
    <section class="search404" v-else>
      <div class="search404_s">
        <img src="../../../../static/img/404.png" />
        <p>非常抱歉</p>
        <span>没有找到相关的宝贝！</span>
      </div>
    </section>
    <Loading :type="1" v-if="loading" />
  </section>
</template>

<script>
  import Vue from 'vue';
  import {Accordion, AccordionItem} from 'vue-ydui/dist/lib.rem/accordion';
  import Header from '../../../components/header/header.vue';
  import {URL} from '../../../API/url.js';
  import {mapState} from 'vuex';
  import Loading from '../../../components/loading/loading.vue';
  import { Toast } from 'mint-ui';
  Vue.component(Accordion.name, Accordion);
  Vue.component(AccordionItem.name, AccordionItem);
  export default {
    components:{
      Header,
      Loading
    },
    data(){
      return{
        shops: [],
        listOption: this.$route.query.listOption||true,     //列表选项
        value: String,         //搜索内容
        url: URL,
        loading: true,
        searchShop: false,     //搜索不到商品
        screenNum: Number,     //筛选按钮下标
        brandid:[],             //品牌数组
        brandNum: Number,      //品牌下标
        price: [
          {price: '0-500'},
          {price: '500-1000'},
          {price: '1000-1500'},
          {price: '1500-2000'},
          {price: '2000-2500'},
          {price: '2500-3000'}
        ],                      //价格
        priceNum: 'desc',       //价格下标
        heald: false,           //点击激活切换模式
        type: this.$route.query.type||'comprehensive',            //切换模式
        screening: String,       //筛选模式
        comprehensive: '综合',  //综合字段
        comprehensivenum: 0,    //记录综合选择模式
        screen: false,           //筛选
        int: 0,                   //价格排序
        whole: String,                 //是否查看全部
        packages: 0,             //是否包邮
        in_stock: 0,             //是否有货
        preferential: 0,        //是否是促销商品
        brand: 0,                //筛选品牌
        the_price: 0,           //价格区间筛选
        scroll: this.$route.query.scroll,      //滚动条
        shopclass: [],       //商品分类
        specifications: []    //规格
      }
    },
    //程序初始化
    created(){
      //请求
      this.req({id: this.$route.query.searchid});
    },
    watch:{
      shopssearch(val){
        this.shops = val.goods_list;
        this.shopclass = val.cateArr;
        this.specifications = val.filter_spec;            //规格
        this.loading = false;
        console.log(this.shops)
      }
    },
    computed:{
      ...mapState(['shopssearch'])
    },
    methods:{
      healdshow(type){
        this.heald = false;
        this.loading = true;
        if(type == '综合'){
          this.comprehensivenum = 0;                 //切换样式
          this.req({id: this.$route.query.searchid});       //默认请求
          this.comprehensive = '综合';               //切换样式
          this.type = 'comprehensive';
        }else if(type == '新品'){
          this.comprehensivenum = 1;                  //切换样式
          this.req({id: this.$route.query.searchid,sort: 'is_new'});    //切换新品模式
          this.comprehensive = '新品';                //切换样式
          this.type = 'comprehensive';
          this.screening = 'is_new';            //筛选模式
        }else if(type == '评价'){
          this.comprehensivenum = 2;                  //切换样式
          this.req({id: this.$route.query.searchid,sort: 'comment_count'});   //切换评价模式
          this.comprehensive = '评价';                //切换样式
          this.type = 'comprehensive';
          this.screening = 'comment_count';            //筛选模式
        }else if(type == '销量'){
          this.req({id: this.$route.query.searchid,sort:'sales_sum'});
          this.type = 'sales';
          this.screening = 'sales_sum';            //筛选模式
        }else if(type == '价格'){
          if(this.priceNum == 'desc'){
            this.priceNum = 'asc';
          }else if(this.priceNum == 'asc'){
            this.priceNum = 'desc';
          }
          this.type = 'price'
          this.req({id:this.$route.query.searchid,sort:'shop_price',sort_asc: this.priceNum});
          this.screening = 'shop_price';            //筛选模式
        }
      },
      req({id,sort,sort_asc,spec,price,sel}){
        if(!this.$route.query.searchid){
          this.$store.dispatch("getShopsSearch",{q: this.$route.query.value,sort:sort||'',sort_asc: sort_asc||'',spec:spec||'',price:price||'',sel:sel||''})
        }else{
          this.$store.dispatch("getShopsClassSearch",{id,sort:sort||'',sort_asc: sort_asc||'',spec:spec||'',price:price||'',sel:sel||''})
        }

        this.screen = false;
      },
      //$route数据缓存
      shopsdetails(shopid){
        this.$router.replace({
          path: '/home/dateils',
          query:{
            id: shopid,     //商品id
            scroll: document.documentElement.scrollTop,     //滚动高度
            listOption: this.listOption,     //商品样式
            searchType: this.type,         //选择搜索
            value: this.$route.query.value,     //搜索内容
          }})
      },
      //分类跳转
      classificationFn(id){
        this.req({id});
      },
      //活动筛选
      screenAddClass(type){
        this.whole = type;
      },
      //价格筛选
      priceAddClass(price){
        this.req({id:this.$route.query.searchid,price});
      },
      //规格
      specificationsFn(index,key,val){
        var str = key+"_"+val;
        this.req({id: this.$route.query.searchid,spec: str||''});
      },
      //提交
      submitSearch(){
        this.req({id: this.$route.query.searchid,sel: this.whole||''});
      }
    },
    updated(){
      var owidth = $(".shops_vertical_li_img").outerWidth();
      $(".shops_vertical_li_img").css("height",owidth+"px");
    }
  }
</script>

<style scoped  lang="scss">
  .searchShops{
    width: 100%;
    height: 100%;
  }
  .tabBtn{
    height:auto;
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #f3f1f175;
    background:rgba(0, 0, 0, 0.03137254901960784);
    z-index: 1000;
  }
  .tabBtn_b{
    width: 100%;
    background: #fff;
  }
  .tabBtn_box{
    width: 92%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .tabBtn_ul{
    float: left;
    width:92%;
  }
  .tabBtn_li{
    float: left;
    font-size: 14px;
    width: 24%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .iconfont{
    color: #999;
    font-size: 12px;
  }
  .tabBtn_right{
    float: left;
    padding-top: 11px;
  }
  .icon-liebiao{
    font-size: 18px;
  }

  //切换列表功能
  .tabBtn_heald{
    width: 100%;
    background: rgba(0, 0, 0, 0.08);
  }
  .tabBtn_heald_ul{
    background: #fff;
  }
  .tabBtn_heald_li{
    padding: 10px;
    width: 92%;
    margin: 0 auto;
  }
  .tabBtn_heald_null{
    height: 15rem;
  }
  .icon-selected{
    color: red;
    float: right;
    font-size: 22px;
  }
  .red{
    color: red;
  }

  //筛选列表
  .tabBtn_screen{
    width: 100%;
    height: 15rem;
    background: rgba(0, 0, 0, 0.08);
    position: absolute;
    top: -50px;
  }
  .tabBtn_screen_box{
    width: 92%;
    float: right;
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 200px;
  }
  .tabBtn_screen_box_header{
    height: 50px;
    background:  #f8f8f8;
    padding: 0 10px 0 10px;
    line-height: 50px;
  }
  .icon-back{
    float: left;
    font-size: 25px;
    font-weight: 400;
  }
  .screen_box_header_submit{
    float: right;
  }
  .screen_box_header_title{
    position: absolute;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    text-align: center;
  }
  .tabBtn_screen_box{
    z-index: 2;
  }
  .tabBtn_screen_box_s_ul{
    width: 92%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .tabBtn_screen_box_s_li{
    padding: 5px 10px 5px 10px;
    float: left;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    margin: 10px;
  }
  .tabBtn_screen_hidden{
    width: 100%;
    height: 100%;
  }

  //横商品
  .shops{
    padding-top: 89px;
  }
  .shops_ul{
    width: 100%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
    background: #fff;
    padding: 0 4%;
  }
  .shops_li{
    position: relative;
    padding: 15px 0 15px 0;
    border-bottom: 1px solid #c7c7c775;
    height: auto;
    overflow: hidden;
  }
  .shop_box_img{
    float: left;
    width: 25%;
  }
  .shop_box_img_i{
    width: 100%;
    height: 100px;
    overflow: hidden;
  }
  .shop_box{
    float: left;
    width: 70%;
    overflow: hidden;
    margin-left: 5%;
    font-size: 14px;
    height: auto;
    position: relative;
  }
  .shop_box_title{
    display: block;
    height: 35px;
    overflow: hidden;
  }
  .shop_box_bottom{
    padding-top: .1rem;
    width: 100%;
    position: relative;
    height: auto;
    overflow: hidden;
  }
  .shop_box_bottom_left{
    float: left;
  }
  .bottom_left_price{
    color: #f23030;
    font-size: 14px;
    padding: 10px 0 10px 0;
    font-weight: 800;
    height: auto;
    overflow: hidden;
  }
  .bottom_left_box{
    color: #999;
    font-size: 12px;
  }
  .left_box_evaluate{
    margin-right: 10px;
  }
  .shop_box_bottom_right{
    float: right;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .icon-cart{
    font-size: 16px;
  }

  //竖商品
  .shops_vertical{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0;
    padding: 0;
    background: #ffffff73;
    /*-moz-column-count:3;
    -webkit-column-count:3;
    column-count:3;
    -moz-column-gap: 5px;
    -webkit-column-gap: 5px;
    column-gap: 5px;
    text-align: left;*/
    float: left;
    /*padding-left: 1%;*/
  }
  .shops_vertical .shops_vertical_li:nth-child(1n+1){
    margin: 1px 1px;
  }
  /*.shops_vertical .shops_vertical_li:nth-child(3n){
    margin-left: 1%;
    margin-right: 1%;
  }*/
  .shops_vertical_li{
    background: #fff;
    float: left;
    width: 32.7%;
    /*-moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;*/
    overflow: hidden;
    font-size: 16px;
    /*border: 1px solid #a79e9e75;*/
    margin: 3px 0;
    /*border-radius: 10px;*/
    /*box-shadow: 1px 1px 5px #f5f5f5;*/
    padding: 0px;
  }
  .shops_vertical_li_img{
    vertical-align: middle;
    width: 100%;
  }
  .shops_vertical_li_title{
    font-size: 12px;
    /*height: 40px;*/
    overflow: hidden;
    padding: 10px 10px 5px 10px;
    overflow: hidden;
    white-space:nowrap;
    -webkit-text-overflow:ellipsis;
    -moz-text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    -ms-text-overflow:ellipsis;
    text-overflow:ellipsis;
  }
  .vertical_li_box{
    padding: 0 10px 15px 10px;
    height: auto;
    overflow: hidden;
  }
  .vertical_li_box_price{
    color: #f23030;
    /*font-weight: 600;*/
    font-size: 13px;
    float: left;
  }
  .icon-cart-app{
    float: right;
    font-size: 20px;
  }
  .vertical_li_bottom{
    font-size: 12px;
    padding: 5px 10px 25px 10px;
  }
  .vertical_li_bottom_evaluate{
    float: left;
  }
  .vertical_li_bottom_praise{
    float: right;
  }

  //404找不到
  .search404{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .search404_s{
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 250px;
    margin: -125px 0 0 -100px;
    text-align: center;
  }
  .search404 p{
    padding: 10px 0 10px 0;
    font-size: 14px;
    font-weight: 800;
    color: #a98787;
  }
  .search404 span{
    color: #cccccc;
  }
</style>
