<template>
  <section class="brand">
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :title="'品牌街'" :middle="'title'" />
    <!--img-->
    <div class="box_img">
      <img src="../../../img/357175c001c55bfa82b9f71ceee9a260.jpg" class="image" />
    </div>
    <!--商品-->
    <div class="shops">
      <span class="iconfont icon-fanhui"></span>
      <div class="shops_box">
        <ul class="shops_ul">
          <li class="shops_li">
            <img src="../../../../static/img/goods_thumb_77_0_200_200.jpeg" class="shops_img" />
            <p class="shops_price">￥296.00</p>
            <p class="shops_p">￥299.00</p>
          </li>
        </ul>
      </div>
      <span class="iconfont icon-iconfontjiantou4"></span>
    </div>
    <!--推荐-->
    <div class="recommend">
      <div class="recommend_title">推荐大牌</div>
      <ul class="recommend_ul">
        <li class="recommend_li" v-for="(images , index) in img" :key="index"><img :src="images" class="recommend_img" /></li>
      </ul>
    </div>
  </section>
</template>

<script>
    import Header from "../../../components/header/header.vue"
    export default {
        data(){
          return {
            img: ['../../../../static/img/1.png','../../../../static/img/2.jpg','../../../../static/img/2.jpg','../../../../static/img/3.jpg','../../../../static/img/4.jpg','../../../../static/img/5.jpg','../../../../static/img/6.jpg','../../../../static/img/4.jpg','../../../../static/img/3.jpg']
          }
        },
        components:{
          Header
        }
    }
</script>

<style scoped lang="scss">
  .brand{
    background: #fff;
  }
  .image{
    width: 100%;
  }
  .box_img{
    margin-top: 50px;
  }
  .shops{
    position: relative;
    margin-top: 10px;
    border-bottom: 10px solid #f8f8f8;
  }
  .shops_box{
    width: 85%;
    margin: 0 auto;
    display: inline-block;
    height: auto;
    overflow: hidden;
  }
  .icon-fanhui{
    font-size: 22px;
    float: left;
  }
  .shops_li{
    text-align: center;
    float: left;
  }
  .shops_img{
    width: 150px;
    height: auto;
  }
  .icon-iconfontjiantou4{
    float: right;
  }
  .iconfont{
    top: 50%;
    position: absolute;
  }
  .recommend{
    width: 92%;
    margin: 0 auto;

  }
  .recommend_title{
    font-size: 16px;
    padding: 10px 0 10px 0;
    border-bottom: 1px solid #f8f8f8;
  }
  .recommend_li{
    width: 24%;
    float: left;
    height: auto;
    overflow: hidden;
    padding: 1%;
    border: 1px solid #f8f8f8;
  }
  .recommend_img{
    height: 100px;
  }
  .recommend_ul{
    height: auto;
    overflow: hidden;
  }
</style>
