<template>
  <!--商品列表-->

  <section class="shops">
   <!--  <div style="text-align: center;color: #757575;padding: 20px;">
      <span style="font-size: 16px;">产品展示</span><br/><br/><br/>
      <span style="font-size: 12px;">
        <i style="color: #6900ff;">N</i>
        <i style="color: rgb(6, 255, 0);">E</i>
        <i style="color: rgb(255, 63, 0);">W</i>
      </span>
    </div> -->
    <!--<div class="shops_box">-->
      <!--<div class="shops_box_min" :key="index" @click="getDateils(shop.goods_id,shop.goods_type)" v-for="(shop, index) in list3">-->
        <!--&lt;!&ndash;商品图片&ndash;&gt;-->
        <!--<img :src="url+shop.original_img" class="shops_box_min_img" />-->
        <!--&lt;!&ndash;商品标题&ndash;&gt;-->
        <!--<span class="block">{{shop.goods_name}}</span>-->
        <!--&lt;!&ndash;商品价格&ndash;&gt;-->
        <!--<div class="price">-->
          <!--<span class="shops_box_min_price">￥{{shop.shop_price}}</span>-->
          <!--<span class="shops_box_min_priceTow">￥{{shop.market_price}}</span>-->
        <!--</div>-->
        <!--&lt;!&ndash;商品活动&ndash;&gt;-->
        <!--&lt;!&ndash;<div>-->
          <!--<span class="shops_box_min_activity">{{shop.is_hot === 1?'热卖':'推荐'}}</span>-->
        <!--</div>&ndash;&gt;-->
        <!--&lt;!&ndash;商品描述&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="block shops_box_min_describe">{{shop.goods_remark}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;商品评价&ndash;&gt;-->
        <!--&lt;!&ndash;<span class="block shops_box_min_evaluate">{{shop.comment_count}}条好评</span>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->
    <!-- <div style="text-align: center;color: #757575;padding: 20px;float: left;width: 100%;">
      <span style="font-size: 16px;">产品展示</span><br/><br/><br/>
      <span style="font-size: 12px;">
        <i style="color: #6900ff;">H</i>
        <i style="color: rgb(6, 255, 0);">o</i>
        <i style="color: rgb(255, 63, 0);">t</i>
      </span>
    </div> -->
    <div class="shops_box">
      <div class="shops_box_min" :key="index" @click="getDateils(shop.goods_id,shop.goods_type,shop.team_id)" v-for="(shop, index) in list4" v-if="type == 'collage'">
        <!--商品图片-->
        <img v-lazy="shop.share_img" class="shops_box_min_img" />
        <!--商品标题-->
        <span class="block">{{shop.goods_name}}</span>
        <!--商品价格-->
        <div class="price">
          <span class="shops_box_min_price">拼团价￥{{shop.team_price}}</span>
          <span class="shops_box_min_priceTow">￥原价{{shop.spec_goods_price.price}}</span>
        </div>
        <!--商品活动-->
        <!--<div>
          <span class="shops_box_min_activity">{{shop.is_hot === 1?'热卖':'推荐'}}</span>
        </div>-->
        <!--商品描述-->
        <!--<span class="block shops_box_min_describe">{{shop.goods_remark}}</span>-->
        <!--商品评价-->
        <!--<span class="block shops_box_min_evaluate">{{shop.comment_count}}条好评</span>-->
      </div>
      <div class="shops_box_min" :key="index" @click="getDateils(shop.goods_id,shop.goods_type)" v-for="(shop, index) in list4" v-if="!type" >
        <!--商品图片-->
        <img v-lazy="url+shop.original_img" class="shops_box_min_img" />
        <!--商品标题-->
        <span class="block">{{shop.goods_name}}</span>
        <!--商品价格-->
        <div class="price">
          <span class="shops_box_min_price">￥{{shop.shop_price}}</span>
          <span class="shops_box_min_priceTow">￥原价{{shop.market_price}}</span>
        </div>
        <!--商品活动-->
        <!--<div>
          <span class="shops_box_min_activity">{{shop.is_hot === 1?'热卖':'推荐'}}</span>
        </div>-->
        <!--商品描述-->
        <!--<span class="block shops_box_min_describe">{{shop.goods_remark}}</span>-->
        <!--商品评价-->
        <!--<span class="block shops_box_min_evaluate">{{shop.comment_count}}条好评</span>-->
      </div>
    </div>
    <!--未加载时实现以下布局代码-->
    <div v-if="!list3" class="noloading">
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
    import {mapState} from "vuex";
    //import Loading from '../../components/loading/loading.vue';
    import {URL} from "../../API/url.js";
    export default {
      props: ['sessionIndexDate',"type"],
      data(){
        return {
          url: URL,
          list3: [],
          list4:[],
          sessionShop: [],
          booleanOne: true,         //检测是否是第一次进来
        }
      },
      computed:{
        ...mapState(["index"]),
      },
      methods:{
        getDateils(id,goods_type,prom_id){
          this.$router.replace({path: '/home/dateils',query:{id: id,scroll: document.documentElement.scrollTop,goods_type: goods_type,flash_sale_id: prom_id}});
        },
        handleReachEdge (dir) {
          return new Promise(resolve => {
            setTimeout(() => {
              if (dir > 0) {
                const first = this.list3[0];
                for (let i = 1; i < 11; i++) {
                  this.list3.unshift(first - i);
                }
              } else {
                const last = this.list3[this.list3.length - 1];
                for (let i = 1; i < 11; i++) {
                  this.list3.push(last + i);
                }
              }
              resolve();
            }, 2000);
          });
        }
      },
      components:{
        //Loading
      },
      watch:{
        index(val){
            if(sessionStorage.getItem("index")){
                this.sessionShop = JSON.parse(sessionStorage.getItem("index"))
                setTimeout(() => {
                    this.list4 = this.sessionShop.hot_goods;           //将缓存数据使用起来
                },1000)
            }else{
                this.sessionShop = val;
            }    
        }
      },
      created(){
        if(this.sessionIndexDate){
            this.list4 = this.sessionIndexDate.hot_goods;           //将缓存数据使用起来
        }
      }
    }
</script>

<style scoped lang="scss">
  //商品列表
  .shops{
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-bottom: 70px;
    border-top: 5px solid #eee;
  }
  .shops_img{
    width: 100%;
    display: block;
    padding: 16px;
  }
  .shops_box{
    width: 97%;
    margin: 0 auto;
  }
  .shops_box_min{
    width: 48%;
    float: left;
    background: #fff;
    margin: 1%;
    padding: 5px 0 10px 0;
    box-shadow: 1px 1px 10px #f1f1f1;
    /*height: 275px;*/
    border-radius: 5px;
  }
  .shops_box_min_img{
    width: 100%;
    height: 175px;
  }
  .price{
    width: 95%;
    margin: 0 auto;
    font-size: 12px;
  }
  .shops_box_min_price{
    color: #DA8C14;
    font-weight: 800;
    float: left;
  }
  .shops_box_min_priceTow{
    color: #999;
    font-size: 8px;
    float: right;
  }
  .block{
    color:#444;
    height: 27px;
    line-height: 27px;
    display: block;
    margin-top: 5px;
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .shops_box_min_activity{
    padding:2px;
    background: #E716BD;
    color: #fff;
    font-size: 8px;
  }
  .shops_box_min_describe{
    color: #E7A119;
  }
  .shops_box_min_evaluate{
    font-size: 10px;
    color: #999;
  }

  //未加载时加载
  .noloading{
    width: 92%;
    margin: 0 auto;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 15px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
