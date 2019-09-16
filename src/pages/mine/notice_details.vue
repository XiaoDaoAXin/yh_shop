<template>
  <div>
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :title="'最新公告'" :middle="'title'"/>
    <!--公告详情-->
    <div class="details">
      <div class="details_box">
        <div class="details_box_title">发货公告</div>
        <div class="details_box_centent">
          <p>关于偏远地区发货规定：</p>
          <p>1.西藏、港澳台不发货；</p>
          <p>2.新疆、海南、内蒙请联系客服一号补差价。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header.vue";
  export default {
    components:{
      Header
    },
  }
</script>

<style scoped>
  .details{
    width: 100%;
    height: 100%;
    background: #efeff4;
    position: fixed;
    top: 0;
  }
  .details_box{
    width: 92%;
    height: auto;
    overflow: hidden;
    background: #fff;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    box-shadow: 1px 1px 18px #d2d0d0;
    margin: 90px auto;
  }
  .details_box_title{
    text-align: center;
    padding: 10px 0;
    font-size: 18px;
  }
  .details_box_centent{
    color: #8f8f94;
    padding: 10px;
    font-size: 14px;
  }
</style>
