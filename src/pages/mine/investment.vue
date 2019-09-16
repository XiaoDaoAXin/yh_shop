<template>
  <div>
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :title="'投资记录'" :middle="'title'" />
    <div class="inves">
      <ul class="inves_ul">
        <li class="inves_title">
          <span class="inves_li_left">金额</span>
          <span class="inves_li_right">时间</span>
        </li>
        <li class="inves_li">
          <span class="inves_li_left">1.00投资</span>
          <span class="inves_li_right">2019.06.10</span>
        </li>
      </ul>
    </div>
    <div style="text-align: center;padding-top: 20px;color: #868686;">
      没有更多数据了
    </div>
  </div>
</template>

<script>
  import Header from "../../components/header/header.vue";
    export default {
      components:{
        Header
      }
    }
</script>

<style scoped>
  .inves{
    padding-top: 50px;
    width: 100%;
    background: #fff;
    height: auto;
    overflow: hidden;
  }
  .inves_ul{
    width: 92%;
    margin: 0 auto;
  }
  .inves_title,.inves_li{
    padding: 20px 0 35px 0;
    border-bottom: 1px solid #eee;
  }
  .inves_li,.inves_title{
    list-style: none;
  }
  .inves_li_left{
    float: left;
  }
  .inves_li_right{
    float: right;
  }
</style>
