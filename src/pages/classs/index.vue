<template>
  <transition name = "slide-fade">
    <div class="tingBa">
      <!--头部-->
      <Header :type="'text'" :right="'choice'"/>
      <!--中间分类区域-->
      <section v-if="leftNav">
        <!--左边滑动区域-->
        <div class="scroll">
          <ul class="scroll_ul">
            <li v-for="(nav , index) in leftNav" :key="index" class="scroll_ul_li" :class="nav.id === $route.query.id?'scroll_ul_li_active':''">
              <router-link :to="{path: '/classs/phone',query:{id: nav.id}}" @click="req(nav.id)">
                <!--<span class="iconfont" :class="nav.icon"></span>-->
                <span>{{nav.name}}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <!--右边分类区域-->
        <router-view/>
      </section>
      <!--底部导航-->
      <appNav class="appnav" />

      <!--loading-->
    </div>
  </transition>
</template>

<script>
import appNav from "../../components/TabNav/appNav";
import Header from "../../components/header/header.vue";
import {mapState} from 'vuex'
export default {
  data(){
    return {
      leftNav: [],
      active: true,
      sessionClassDate: []
    }
  },
  components: {
    appNav,
    Header,
  },
  computed:{
    ...mapState(['classification'])
  },
  watch:{
    classification(val){
      this.loadding = false;
      //后台数据与前端数据组合
      if(!this.sessionClassDate){
        this.leftNav = val.category1;
        this.sessionIndex("classs",val);
        if(this.active){
          this.$route.query.id = this.leftNav[0].id
          this.active = false
        }
      }

    }

  },
  created(){
    //从本地缓存中获取数据
    this.sessionClassDate = JSON.parse(sessionStorage.getItem("classs"));
    this.$store.dispatch('getClassification');
    //如果存在，则使用
    if(this.sessionClassDate){
        this.leftNav = this.sessionClassDate.category1;
        if(this.active){
          this.$route.query.id = this.leftNav[0].id
          this.active = false
        }
    }else{
      this.loadding = true
    }
  },
  methods:{
    req(id){
      this.$store.dispatch('getClassification',id);
    }
  }
};
</script>

<style lang="scss" scoped>
.tingBa {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  width: 100%;
}
.ting-container {
  flex: 1;
}
  .content{
    margin: 0 .21333rem;
  }
  .appnav{
    position: fixed;
    bottom: 0;
    z-index: 99;
    background: #fff;
  }

  //左边导航栏
  section{
    margin: 50px 0;
    height: 100%;
    overflow: hidden;
  }
  .scroll{
    float: left;
    width: 30%;
    position: fixed;
    left: 0;
    height: 86%;
    background: #f8f8f8;
    overflow-y: scroll;
    padding-bottom: 40px;
  }
  .scroll_ul{
    width: 100%;
    background: #f8f8f8;
  }
  .scroll_ul_li{
      border-bottom: 1px solid #f3f3f3;
      height: 45px;
      line-height: 45px;
      text-align: center;
  }
  .scroll_ul_li:last-of-type{
    border: none;
  }
  .scroll_ul_li_active,.scroll_ul_li_active a span{
    background: #fff;
    color: red;
  }/*
  .slide-fade-enter-active {
    animation: bounce-in .5s
  }
  .slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(-100%);
  }
  @keyframes bounce-in{
    100%{transition: all .5s ease;}
  }*/
</style>
