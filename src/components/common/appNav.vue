<template>
  <footer>
    <ul class="f_ul">
      <li v-for="(nav , index) in navLists" :key="index" class="f_li" @click="$router.replace(nav.path)" :class="nav.classActive">
        <span class="iconfont" :class="nav.icon"></span>
        <span class="f_text">{{nav.name}}</span>
      </li>
    </ul>
  </footer>
</template>

<script>
  // import Vue from 'vue';
  // import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.rem/tabbar';
  /* 使用px：import {TabBar, TabBarItem} from 'vue-ydui/dist/lib.px/tabbar'; */

  // Vue.component(TabBar.name, TabBar);
  // Vue.component(TabBarItem.name, TabBarItem);
  export default {
    data() {
      return {
        navLists: [
          {
            path: "/",
            icon: "icon-shouye",
            name: "首页",
            classActive: this.$route.path === '/home'?'router-link-exact-active':''
          },
          {
            path: "/classs",
            icon: "icon-all",
            name: "分类",
            classActive: this.$route.path === '/classs/phone'?'router-link-exact-active':''
          },
          {
            path: "/cart",
            icon: "icon-cart",
            name: "购物车",
            classActive: this.$route.path === '/cart'?'router-link-exact-active':''
          },
          {
            path: "/mine",
            icon: "icon-account",
            name: "我的",
            classActive: this.$route.path === '/mine'?'router-link-exact-active':''
          }
        ]
      }
    }
  };
</script>

<style lang="scss" scoped>
  footer{
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #f7f7f7;
  }
  .f_ul{
    width: 100%;
    text-align: center;
    padding:3px 0;
  }
  .f_li{
    display: inline-block;
    width:25%;
  }
  .iconfont{
    font-size: 22px;
  }
  .f_text{
    display: block;
  }
  .router-link-exact-active {
    color: #f23030;
  }
</style>
