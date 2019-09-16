<template>
  <section class="group">
    <!--头部区域-->
    <header>
      <!--搜索search区域-->
      <Header :type="'routers'" :right="'choice'" :title="'团购'" :middle="'title'" />
      <!--nav导航区域-->
      <section class="h_nav">
        <div class="h_nav_div">
          <!--横向滑动-->
          <div class="person-wrap" ref="personWrap">
            <ul class="person-list" ref="personTab" v-show="navBtn">
              <li class="person-item"  ref="personTabLi" v-for="(navs , index) in nav" :key="index" @click="num = index" :class="num === index?'red':''">{{navs.text}}</li>
            </ul>
            <span v-show="!navBtn">全部频道</span>
          </div>
          <!--切换-->
          <span class="iconfont" :class="navBtn?'icon-jiantou9':'icon-shangjiantou'" @click="navBtn = !navBtn"></span>
        </div>
        <!--全部查看-->
        <div v-if="!navBtn" class="h_nav_div_whole">
          <ul class="h_nav_div_whole_ul">
            <li v-for="(navs , index) in nav" :key="index" class="h_nav_li" :style="'border: 1px solid '+navs.borderColor">{{navs.text}}</li>
          </ul>
        </div>
      </section>
    </header>

    <!--轮播区域-->
    <bannerIndex/>

    <section class="btn">
      <router-link class="sectionBtn" to="/classs">
        <span class="iconfont icon-sousuo"></span><br>
        <span>搜索</span>
      </router-link>
      <router-link class="sectionBtn" to="">
        <span class="iconfont icon-miaosha"></span><br>
        <span>秒杀</span>
      </router-link>
      <router-link class="sectionBtn" to="/home/discount">
        <span class="iconfont icon-tuangouyaoyue"></span><br>
        <span>团购</span>
      </router-link>
      <router-link class="sectionBtn" to="/home/brand">
        <span class="iconfont icon-pinpaituan"></span><br>
        <span>品牌街</span>
      </router-link>
      <router-link class="sectionBtn" to="/home/group">
        <span class="iconfont icon-jifen"></span><br>
        <span>积分商城</span>
      </router-link>
    </section>

    <!--中间区域-->
    <section class="middle">
      <div class="section_left">
        <img src="../../../../static/img/d5eee035222f2d82e2af98dcbaa2da58.jpg" class="section_left_img" />
      </div>
      <div class="section_right">
        <img src="../../../../static/img/8163831b208ddd86d7f12f97277b4dc4.jpg" class="section_right_img1" />
        <img src="../../../../static/img/2174905d797ce41bd4191269dae63118.jpg" class="section_right_img1" />
      </div>
    </section>

    <appNav class="appnav" />
  </section>
</template>

<script>
  import appNav from '../../../components/TabNav/appNav';
  import Header from "../../../components/header/header.vue";
  import bannerIndex from "../../../components/bannerIndex/bannerIndex.vue";
  import BScroll from 'better-scroll';
  export default {
    components:{
      appNav,
      Header,
      bannerIndex,
    },
    data(){
      return{
        nav: [
          {text:"推荐",borderColor: '#67C23A'},
          {text:"推荐",borderColor: '#E6A23C'},
          {text:"推荐",borderColor: '#409EFF'},
          {text:"推荐",borderColor: '#F56C6C'},
          {text:"推荐",borderColor: '#909399'},
          {text:"推荐",borderColor: '#67C23A'},
          {text:"推荐",borderColor: '#E6A23C'},
          {text:"推荐",borderColor: '#409EFF'},
          {text:"推荐",borderColor: '#F56C6C'},
          {text:"推荐",borderColor: '#909399'},
          {text:"推荐",borderColor: '#67C23A'},
          {text:"推荐",borderColor: '#E6A23C'},
          {text:"推荐",borderColor: '#409EFF'},
          {text:"推荐",borderColor: '#F56C6C'},
          {text:"推荐",borderColor: '#909399'},
        ],
        navBtn: true,
        num: 0
      }
    },
    created() {
      this.$nextTick(() => {
        this.personScroll();
      });
      //this.$store.dispatch('getShops')
    },
    methods: {
      personScroll() {
        // 获取里的width
        let width = (this.$refs.personTabLi[0].clientWidth*this.nav.length)+(this.nav.length*10);
        this.$refs.personTab.style.width = width + "px";
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .appnav{
    position: fixed;
    bottom: 0;
    z-index: 99;
    background: #fff;
  }
  .group{
    background: #fff;
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
    width: 85%;
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
  .btn {
    width: 92%;
    margin: 20px auto;
    text-align: center;
  }
  .sectionBtn{
    display: inline-block;
    text-align: center;
    width: 19%;
  }
  .h_nav_div_whole{
    background: #fff;
  }
  .h_nav_div_whole_ul{
    width: 90%;
    margin: 0 auto;
  }
  .icon-sousuo{
    color: #73edaa;
  }
  .icon-miaosha{
    color: #f2649a;
  }
  .icon-tuangouyaoyue{
    color: #bb80f1;
  }
  .icon-pinpaituan{
    color: #fbca22;
  }
  .icon-jifen{
    color: #f89e6f;
  }
  .icon-sousuo,
  .icon-miaosha,
  .icon-tuangouyaoyue,
  .icon-pinpaituan,
  .icon-jifen{
    font-size: .6rem;
  }

  //中间区域
  .middle{
    border-top: 10px solid #eee;
    overflow: hidden;
    height: auto;
  }
  .section_left{
    float: left;
    width: 46.8%
  }
  .section_right{
    float: right;
    width: 53.2%;
  }
  .section_left_img{
    width: 100%;
  }
  .section_right_img1{
    width: 100%;
  }
</style>
