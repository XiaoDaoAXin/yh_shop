<template>
  <section>
    <!--顶部-->
    <header id="header">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'秒杀'" :middle="'title'" />
      <!--时间段-->
      <div class="time">
        <ul class="time_ul">
          <li class="time_ul_li" v-for="(dates,index) in date" :key="index" :class="index == active?'red':''" @click="activeFn(index,dates.start_time,dates.end_time)">
            <p>{{dates.font}}</p>
            <span>{{index == 1?'秒杀中':'即将开抢'}}</span>
          </li>
        </ul>
      </div>
      <!--提示-->
      <div class="tips">
        <div class="tips_t">{{boolean?'正在秒杀，先下单先得哦~':'秒杀活动即将开场'}}</div>
        <div class="tips_time">{{boolean?'距离结束':'距离开始'}}{{dates}}</div>
      </div>
    </header>
    <!--商品-->
    <div class="shop">
      <ul class="shop_ul">
        <li class="shop_ul_li" v-for="(shops,index) in shop" :key="index">
          <!--左边图片-->
          <img class="shop_ul_li_img" :src="url+shops.original_img" />
          <!--右边信息-->
          <div class="shop_ul_li_right">
            <!--标题-->
            <div class="shop_ul_li_right_title">{{shops.goods_name}}</div>
            <!--价格+虚拟价+已秒杀-->
            <div class="shop_ul_li_right_box">
              <div class="right_box_top">
                <!--价格-->
                <p style="color: red;">￥{{shops.price}}</p>
                <!--虚拟价-->
                <span style="text-decoration: line-through;font-size: 12px">￥{{shops.shop_price}}</span>
              </div>
              <div class="right_box_bottom">
                <!--跳转-->
                <div @click="shopFn(shops.goods_id,shops.id)" class="right_box_bottom_btn" :style="!boolean?'background: #eee':''">{{boolean?'去秒杀':'未开场'}}</div>
                <!--已秒杀-->
                <div class="right_box_bottom_progress">
                  <el-progress :text-inside="true" :stroke-width="15" :percentage="shops.order_num" style="width: 100px;display: inline-block"></el-progress>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Loading :type="1" v-if="loading" />
  </section>
</template>

<script>
    import Header from "../../../components/header/header.vue";
    import {ChineseDateHours} from "./js/date.js";
    import {URL} from "../../../API/url.js";
    import {mapState} from "vuex";
    import Loading from "../../../components/loading/loading.vue";
    export default {
      data(){
        return {
          date: [],         //时间
          shop: [],         //商品
          timeStamp: Number,  //时间戳
          dates: '',
          url: URL,
          active: 1,         //选中
          boolean: true,     //是否为秒杀
          timeout: Function,
          loading: true      //loading
        }
      },
      created(){
        this.$store.dispatch("getSpike");
      },
      mounted(){

      },
      components:{
        Header,
        Loading
      },
      computed:{
        ...mapState(["spike"])
      },
      methods:{
        //剩余秒杀时间
        newDate(date){
          this.timeout = setInterval(()=>{
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            this.dates = ChineseDateHours((date-timestamp)+143999.99);
          },100)
        },
        //点击更换样式
        activeFn(index,start_time,end_time){
          this.loading = true
          this.active = index;      //更换样式
          index > 1? this.boolean = false:this.boolean = true;   //切换文字
          this.$store.dispatch("getSpikeclick",{start_time,end_time});    //切换时间段
        },
        //跳转详情页
        shopFn(goods_id,flash_sale_id){
          if(this.boolean){
            this.$router.replace({path: "/home/dateils",query:{id: goods_id,flash_sale_id: flash_sale_id}})
          }
        }
      },
      watch:{
        spike(val){
          if(val){
            console.log(val.time_space)
            window.clearInterval(this.timeout);
            this.date = val.time_space;
            this.shop = val.flash_sale_goods;
            this.timeStamp = val.time_space[this.active].end_time
            this.newDate(this.timeStamp);
            this.loading = false;
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  #header{
    background: #ffffff;
    top: 0;
    z-index: 100;
    font-size: 12px;
    height: auto;
    overflow: hidden;
    position: static;
  }
  section{
    height: 100%;
    background: #fff;
    color: #5a5a5a;
    font-family: Helvetica,PingFangSC-Regular,"Droid Sans",Arial,sans-serif;
  }
  .shop{
    height: auto;
    overflow: hidden;
  }
  //秒杀时间
  .time{
    width: 100%;
    background: #fff;
    margin-top: 50px;
  }
  .time_ul{
    width: 92%;
    margin: 0 auto;
    text-align: center;
  }
  .time_ul_li{
    display: inline-block;
    padding: 10px;
  }
  .time_ul_li p{
    font-size: 14px;
    font-weight: 600;
  }
  .time_ul_li span{
    font-size: 12px;
  }
  .tips{
    width: 92%;
    margin: 0 auto;
    height: 40px;
    padding: 5px 0px;
    border-bottom: 1px solid #e0e0e0;
  }
  .tips_t{
    float: left;
  }
  .tips_time{
    float: right;
  }
  .red{
    color: red;
  }

  //秒杀商品
  .shop_ul{
    width: 92%;
    margin: 0 auto;
  }
  .shop_ul_li{
    padding: 20px 0;
    height: auto;
    overflow: hidden;
  }
  .shop_ul_li_img{
    width: 30%;
    float: left;
    height: 100px;
  }
  .shop_ul_li_right{
    float: left;
    margin-left: 3%;
    width: 67%;
  }
  .shop_ul_li_right_title{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .shop_ul_li_right_box{
    margin-top: 20px;
  }
  .right_box_top{
    float: left;
  }
  .right_box_bottom{
    float: right;
  }
  .right_box_bottom_btn{
    float: right;
    padding: 5px 10px;
    background: red;
    border-radius: 5px;
    color: #fff;
    font-size: 12px;
  }
  .right_box_bottom_progress{
    margin-top: 30px;
  }

</style>
