<template>
  <!--轮播区域-->
  <section class="banner">
    <mt-swipe class="swiper" :auto="4000">
      <mt-swipe-item v-for="(img ,index) in banner" :key="index">
        <img v-lazy="url+img.img" />
      </mt-swipe-item>
    </mt-swipe>
  </section>
</template>

<script>
  import {mapState} from "vuex";
  import {URL} from "../../API/url.js";
    export default {
      props: ['sessionIndexDate'],
      data(){
        return {
          banner:[],
          url: URL
        }
      },
      computed:{
        ...mapState(['index'])
      },
      watch:{
        index(val){
          if(!this.sessionIndexDate){
            this.banner = val.banner;
          }
        },
      },
      created(){
        if(this.sessionIndexDate){
          this.banner = this.sessionIndexDate.banner;
        }
      }
    }
</script>

<style scoped  lang="scss" >
  //banner区域
  .banner{
    height: 150px;
  }
  .swiper,img,.banner{
    width: 100%;
  }
</style>
