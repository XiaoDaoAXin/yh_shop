<template>
    <div class="index" >
      <!--头部区域-->
      <header>
        <!--搜索search区域-->
        <Header :type="'iconText'" :right="'slot'" >
          <!--显示我的按钮-->
          <div class="h_search_right" @click="$router.replace('/mine')">
            <span class="iconfont icon-wode"></span>
            <span>我的</span>
          </div>
        </Header>
        <!--nav导航区域-->
        <section class="h_nav">
          <div class="h_nav_div">
            <!--横向滑动-->
            <div class="person-wrap" ref="personWrap">
              <ul class="person-list" ref="personTab" v-show="navBtn">
                <!--<li class="person-item red">推荐</li>-->
                <li class="person-item"  ref="personTabLi" v-for="(navs , index) in nav" :key="index" @click="num = index" ><router-link :to="{path: '/search/searchShops',query: {searchid: navs.id,value: navs.name}}">{{navs.name}}</router-link></li>
              </ul>
              <!--<span v-show="!navBtn">全部频道</span>-->
            </div>
            <!--切换-->
            <!--<span class="iconfont" :class="navBtn?'icon-jiantou9':'icon-shangjiantou'" @click="navBtn = !navBtn"></span>-->
          </div>
          <!--全部查看-->
          <!--<div v-if="!navBtn" class="h_nav_div_whole">
            <ul class="h_nav_div_whole_ul">
              <li v-for="(navs , index) in nav" :key="index" class="h_nav_li" :style="'border: 1px solid '+navs.borderColor"><router-link :class="num === index?'red':''" :to="{path: '/classs',query: {id: navs.id}}">{{navs.text}}</router-link></li>
            </ul>
          </div>-->
        </section>
      </header>
      <div id="index">
        <div id="index_box">
          <div style="margin-top: 55px;text-align: center;">
            <img src="../../../static/img/loading.png" width="32" class="loadings_img" style="margin-bottom: 10px;" />
          </div>
          <!--轮播区域-->
          <bannerIndex :sessionIndexDate="sessionIndexDate"/>
          <section class="btns">
            <router-link class="sectionBtn" :to="navs.menu_url" v-for="(navs , index) in navTab" :key="index">
              <img v-lazy="url+navs.icon" width="25" height="25" /><br>
              <span>{{navs.menu_name}}</span>
            </router-link>
          </section>
          <!--商品列表-->
          <shops :sessionIndexDate="sessionIndexDate" />
          <!--上拉加载-->
          <div class="loadings" v-if="bottomLoading">
            <img src="../../../static/img/loading.png" width="32" class="loadings_img" />
          </div>
          <!--底部-->
          <section class="bottom" v-if="booleanData">
            <div class="bottom_box">
              <span class="bottom_login" @click="$router.replace('/login/login')" v-if="!userId">登录</span>
              <span class="bottom_top_left" v-if="userId"></span>
              <span class="bottom_top" @click="returnTop">回到顶部</span>
              <span class="bottom_top_right" v-if="userId"></span>
              <span class="bottom_register" @click="$router.replace('/login/reg')" v-if="!userId">注册</span>
            </div>
            <div class="bottom_statement">
              Copyright © 2016-2025 易合商城 版权所有
            </div>
          </section>
        </div>

      </div>
      <!--底部导航-->
      <appNav class="appnav" />
      <Loading :type="1" v-if="loadding" />
    </div>
</template>

<script>
  import appNav from '../../components/TabNav/appNav';
  import Header from "../../components/header/header.vue";
  import bannerIndex from "../../components/bannerIndex/bannerIndex.vue";
  import shops from "../../components/shops/shops.vue";
  import BScroll from 'better-scroll';
  import {mapState} from "vuex";
  import {URL} from "../../API/url.js";
  import Loading from "../../components/loading/loading.vue";
  import { Toast } from 'mint-ui';
  export default {
      components:{
        appNav,
        Header,
        bannerIndex,
        shops,
        Loading
      },
      data(){
          return{
            nav: [],        //头部nav导航区域
            navBtn: true,  //头部nav隐藏区域
            num: 0,
            userId: "",    //用户id
            navTab: [],     //导航tab
            url: URL,
            sessionIndexDate: [],
            loadding: false,
            pullUpLoadP: Number,         //缓存已加载页数
            scrolls: Object,
            booleanData: false,       //是否是已经记载完数据
            bottomLoading: true,    //底部加载
            booleanRefresh: false     //是否刷新
            //scroll: Object,
          }
      },
    created() {
        this.$store.dispatch('getIndex');
        this.userId = localStorage.getItem('login');
        this.sessionIndexDate = JSON.parse(sessionStorage.getItem("index"))
        this.pullUpLoadP = JSON.parse(sessionStorage.getItem("pullUpLoadPIndex"))       //取到本地存储的数据
        if(this.sessionIndexDate){
            this.navTab = this.sessionIndexDate.nav;
            //this.$store.dispatch('getIndex',this.pullUpLoadP);
            this.navFn(this.sessionIndexDate);
        }else{
            this.$store.dispatch('getIndex');
            this.loadding = true
        }
        this.$nextTick(() => {
            this.windowScroll();
        })
    },
    computed:{
    ...mapState(['index'])
    },
    methods: {
      personScroll() {
        // 获取里的width
        let width = (this.$refs.personTabLi[0].clientWidth*this.nav.length)+(13*this.nav.length);
        this.$refs.personTab.style.width = width + "px" || 800+'px';
        // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.personWrap, {
              startX: 0,
              click: true,
              scrollX: true,
              // 忽略竖直方向的滚动
              eventPassthrough: "vertical"
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      load(){
        this.$store.dispatch('getShops')
      },
      returnTop(){
        this.scrolls.scrollTo(0,0,1000);
      },
      navFn(val){
        var arr = [];
        var color = ["#67C23A","#E6A23C","#409EFF","#F56C6C","#909399","#67C23A","#E6A23C","#409EFF","#F56C6C","#909399","#67C23A","#E6A23C","#409EFF","#F56C6C","#909399","#67C23A","#E6A23C","#409EFF","#F56C6C","#909399","#67C23A","#E6A23C","#409EFF","#F56C6C","#909399"];
        if(val){
          for(let i=0;i<val.primary_classification.length;i++){
            arr.push({name: val.primary_classification[i].name,borderColor: color[i],id: val.primary_classification[i].id});
          }
          this.nav = arr;
        }
        this.$nextTick(()=>{
          this.personScroll();
        })
      },
      //监视滚动条
      windowScroll(){
        this.scrolls = new BScroll(document.getElementById("index"),{
          click: true,
          scrollY: true,
          probeType: 1,
          pullUpLoad: {
            threshold: -10, // 当上拉距离超过30px时触发 pullingUp 事件
          },
          pullDownRefresh:{
            threshold: -10, // 当上拉距离超过30px时触发 pullingUp 事件
          }
        });
        //监视上拉加载
        this.scrolls.on("pullingUp",() => {
          this.sessionIndexDate = JSON.parse(sessionStorage.getItem("index"))              //取到本地存储的数据
          this.pullUpLoadP = JSON.parse(sessionStorage.getItem("pullUpLoadPIndex"))       //取到本地存储的数据
          if(this.pullUpLoadP){
            this.$store.dispatch('getIndex',this.pullUpLoadP)      //请求已缓存的下一组数据
          }
          this.pullUpLoadP++;       //如果此数据有值，将页数+1
        });
        //滚动监视
        let scroll_record = JSON.parse(sessionStorage.getItem("scrollIndex"))       //取到本地存储的数据
        this.scrolls.on("scroll",(obj) => {
          if(obj.y){
            this.sessionIndex("scrollIndex",obj.y);                                     //缓存滚动值
          }
        });
        //滚动条滚动到原来的位置
        this.scrolls.scrollTo(0,scroll_record||0);
        //下拉刷新
        this.scrolls.on("pullingDown",() => {
          this.sessionIndex("index","");               //初始化缓存首页数据
          this.sessionIndex("pullUpLoadPIndex",1);    //初始化缓存页数
          this.$store.dispatch('getIndex');           //初始化请求
          this.pullUpLoadP = 2;                        //初始化加载页数
          this.booleanRefresh = true;                 //开启下拉刷新按钮
          this.sessionIndexDate = [];                 //初始化数据属性
        });
      }
    },
    watch:{
      index(val){
        if(!this.sessionIndexDate){
          // console.log(val)
          this.loadding = false;
          this.navTab = val.nav
          this.navFn(val);
          this.sessionIndex("index",val);             //初始化缓存
          this.sessionIndex("pullUpLoadPIndex",2);  //初始化缓存
        }else{
          if(val.hot_goods.length){                 //如果请求有数据，就执行
            //console.log(3333333333)
            this.scrolls.finishPullUp()              //事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
            if(this.booleanRefresh){                //判断是否是刷新
              this.sessionIndexDate = val;          //将新刷新的数据传给属性
              setTimeout(() => {
                Toast({
                  message:"加载完毕！",
                  duration:1500
                })
                this.scrolls.finishPullDown()                         // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
                this.$router.replace("/homeHref")         //刷新页面
              },1000)
            }else{
              //console.log(555555555)
              for(let i=0;i<val.hot_goods.length;i++){
                this.sessionIndexDate.hot_goods.push(val.hot_goods[i]);               //将所有数据合并之前的数据存储到属性中
              }
            }
            this.sessionIndex("pullUpLoadPIndex",this.pullUpLoadP);                   //初始化缓存
          }else{
            //console.log(6666666666)
            setTimeout(() => {
              this.booleanData = true;                           //如果数据为空，则代表没有数据
              this.bottomLoading = false;                       //关闭正在加载
            },1000)
          }
          //console.log(777777777)
          this.sessionIndex("index",this.sessionIndexDate);     //将已处理的数据缓存到本地种
        }

      }
    },
    mounted () {
     function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
      }
      if(GetQueryString("token")){
          localStorage.setItem("login",GetQueryString("token"));
      }


    },
  }
</script>

<style lang="scss" scoped>
  .appnav{
    position: fixed;
    bottom: 0;
    z-index: 99;
    background: #fff;
  }
  .index{
    background: #fff;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #index{
    height: 100%;
  }
  #index_box{
    padding-bottom: 70px;
  }
  //头部导航
  header{
    height: 50px;
    z-index: 100;
    position: fixed;
    background: #fff;
    width: 100%;
    top: 0;
  }
  .h_nav{
    width: 100%;
    margin-top: 50px;
    height: auto;
    overflow: hidden;
    padding-bottom: 10px;
    background: #fff;
    z-index: 200;
  }
  .person-list{
    height: auto;
    overflow: hidden;
    padding-bottom: 10px;
  }
  .h_nav_div{
    width: 90%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .person-wrap{
    width: 100%;
    overflow: hidden;
    height: 30px;
    float: left;
    line-height: 30px;
  }
  .person-item:first-of-type{
    padding-left: 0;
  }
  .person-item{
    display: inline-block;
    padding: 10px;
  }
  .icon-jiantou9,.icon-shangjiantou{
    float: right;
    display: block;
    margin-top: 10px;
  }
  .h_nav_li{
    width: 22%;
    height: 25px;
    display: inline-block;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 25px;
    margin: 3px;
    border-radius: 10px;
  }
  .red{
    color: red;
  }
  //分类按钮
  .btns {
    text-align: center;
    margin: 5px 0;
    margin-bottom: 10px;
    position: relative;
  }
  .sectionBtn{
    display: inline-block;
    text-align: center;
    width: 24%;
    margin: 5px 0;
  }
  .sectionBtn img{
    margin-bottom: 5px;
  }
  .h_nav_div_whole{
    background: #fff;
  }
  .h_nav_div_whole_ul{
    width: 90%;
    margin: 0 auto;
  }
  //上拉加载
  .loadings{
    text-align: center;
    padding: 20px 0 20px 0;
    margin-top: -80px;
    margin-bottom: 20px;
  }
  .loadings_img{
    width: 32px;
    animation: loading 2s linear 0s infinite;
  }
  @keyframes loading{
    0%{transform: rotate(0deg)}
    100%{transform: rotate(360deg)}
  }
  //底部
  .bottom{
    background: #fff;
    padding-bottom: 50px;
    height: auto;
    overflow: hidden;
    text-align: center;
    margin-top: -50px;
  }
  .bottom_box{
    border-bottom: 1px solid #eae7e7;
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 10px 0 10px 0;
  }
  .bottom_register{
    border-left: 1px solid #eae7e7;
    padding-left: 15px;
  }
  .bottom_login{
    border-right: 1px solid #eae7e7;
    padding-right: 15px;
  }
  .bottom_top{
    padding: 0 15px 0 15px;
  }
  .bottom_top_left{
    float:left;
    width:22px;
    border-top:1px solid #999;
    height:1px;
    position:relative;
    left:34%;
    top:9px;
  }
  .bottom_top_right{
    float:right;
    width:22px;
    border-top:1px solid #999;
    height:1px;
    position:relative;
    right:34%;
    top:9px;
  }
  .bottom_statement{
    padding: 15px 0 15px 0;
  }
  .iconfont{
    display: block;
  }
  .icon-icon,
  .icon-jinkouhufu,
  .icon-xiehongdanbai,
  .icon-yanghu{
    font-size: 25px;
  }
  .icon-icon{
    color: #26a2ff;
    font-size: 29px;

  }
  .icon-jinkouhufu{
   color: #2adf19;
  }
  .icon-xiehongdanbai{
    color: aqua;
  }
  .icon-yanghu{
    color: red;
  }
  .icon-pintuan1{
    color: mediumvioletred;
  }
  .slide-fade-enter-active {
    animation: bounce-in .5s
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateX(-100%);
  }
  @keyframes bounce-in{
    100%{transition: all .5s ease;}
  }
</style>
