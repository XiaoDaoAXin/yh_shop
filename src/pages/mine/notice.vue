<template>
  <div>
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :title="'最新公告'" :middle="'title'"/>
    <!--公告-->
    <div class="notice">
      <ul class="notice_ul">
        <li class="notice_ul_li">
          <router-link to="notice_details">
            <div class="notice_ul_li_top">
              <span class="notice_ul_li_top_title">发货公告</span>
              <span class="notice_ul_li_top_time">2019-05-31 16:07:57</span>
            </div>
            <div class="notice_ul_li_content">
              偏远地方发货规定。。。。。
            </div>
          </router-link>
        </li>
      </ul>
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
  .notice{
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 50px;
  }
  .notice_ul{
    width: 92%;
    margin: 0 auto;
  }
  .notice_ul_li{
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 18px #eee;
    padding: 10px;
    list-style: none;
    margin: 10px 0;
  }
  .notice_ul_li_top{
    padding: 10px 0;
    height: auto;
    overflow: hidden;
  }
  .notice_ul_li_top_title{
    font-size: 18px;
    float: left;
  }
  .notice_ul_li_top_time{
    float: right;
    color: #e0e0e0;
    font-size: 14px;
  }
  .notice_ul_li_content{
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
