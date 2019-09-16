<template>
  <section class="stores">
    <!--切换按钮-->
    <section class="tabBtn">
      <div class="tabBtn_b">
        <div class="tabBtn_box">
          <ul class="tabBtn_ul">
            <li class="tabBtn_li">
              <span class="tabBtn_li_text">销量</span>
              <span class="iconfont icon-xiajiantou"></span>
            </li>
            <li class="tabBtn_li">
              <span class="tabBtn_li_text">销量</span>
              <span class="iconfont icon-xiaoliangjiantou"></span>
            </li>
            <li class="tabBtn_li">
              <span class="tabBtn_li_text" >价格</span>
              <span class="iconfont icon-shangxia"></span>
            </li>
            <li class="tabBtn_li">
              <span class="tabBtn_li_text">筛选</span>
              <span class="iconfont icon-shaixuan"></span>
            </li>
          </ul>
          <div class="tabBtn_right"><span class="iconfont icon-liebiao"></span></div>
        </div>
      </div>
      <div>
        <!--弹出综合等列表-->
        <div class="tabBtn_heald" v-if="false">
          <ul class="tabBtn_heald_ul">
            <li class="tabBtn_heald_li">
              <span class="tabBtn_heald_text">综合</span>
              <span class="iconfont"></span>
            </li>
            <li class="tabBtn_heald_li">
              <span class="tabBtn_heald_text">新品</span>
              <span class="iconfont"></span>
            </li>
            <li class="tabBtn_heald_li">
              <span class="tabBtn_heald_text">评价</span>
              <span class="iconfont"></span>
            </li>
          </ul>
          <div class="tabBtn_heald_null"></div>
        </div>
        <!--弹出筛选等列表-->
        <div class="tabBtn_screen " v-if="false">
          <div class="tabBtn_screen_box animated fadeInRightBig">
            <header class="tabBtn_screen_box_header">
              <span class="iconfont icon-back"></span>
              <span class="screen_box_header_title">筛选</span>
              <span class="screen_box_header_submit">确定</span>
            </header>
            <section class="tabBtn_screen_box_s">
              <ul class="tabBtn_screen_box_s_ul">
                <!--筛选按钮-->
                <li class="tabBtn_screen_box_s_li">显示全部</li>
                <li class="tabBtn_screen_box_s_li">仅看包邮</li>
                <li class="tabBtn_screen_box_s_li">仅看有货</li>
                <li class="tabBtn_screen_box_s_li">促销商品</li>
              </ul>
            </section>
            <section class="tabBtn_screen_box_list">
              <yd-accordion accordion>
                <yd-accordion-item title="全部分类" style="font-size: 14px;">
                  <ul>
                    <li>
                      <span  style="padding: 15px 30px;display: block;font-size: 14px;border-bottom: 1px solid #fdf7f7;">1545</span>
                      <ul>
                        <li style="padding: 15px 40px;border-bottom: 1px solid #fdf7f7;">485</li>
                      </ul>
                    </li>
                  </ul>
                </yd-accordion-item>
                <yd-accordion-item style="font-size: 14px;">
                  <ul>
                    <li style="padding: 15px 30px;display: block;font-size: 14px;border-bottom: 1px solid #fdf7f7;">345634</li>
                  </ul>
                </yd-accordion-item>
                <yd-accordion-item title="价格"  style="font-size: 14px;">
                  <div style="padding: .24rem;">
                    <p style="padding: 5px 0">4855</p>
                  </div>
                </yd-accordion-item>
              </yd-accordion>
            </section>
          </div>
          <div class="tabBtn_screen_hidden" @click="screen = false"></div>
        </div>
      </div>
    </section>
    <!--商铺-->
    <section class="shops">
      <ul class="shops_ul">
        <li class="shops_li">
          <!--商铺信息-->
          <div class="shop">
            <!--商铺图片-->
            <div class="shop_box_img"><img src="url+shop.original_img" class="shop_box_img_i" /></div>
            <div class="shop_box">
              <!--商铺标题-->
              <span class="shop_box_title">5242</span>
              <el-rate
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
              <span class="shop_box_yue">月销：4878</span>
                  <!--商铺介绍-->
                  <p class="bottom_left_price"> 这一篇主要是创建一个vue项目并结合饿了么框架element-ui。 1.先创建vue项目,我准备把项目放在e盘下:E:\Work\RegisterProject; 命令行进入这个目录:</p>
                  <div class="bottom_left_box">
                    <!--商品评价-->
                    <!-- <span class="left_box_evaluate">{{shop.comment_count}}条评价</span> -->
                    <!--商品好评率-->
                    <!-- <span class="left_box_praise">{{shop.praise?shop.praise+'%好评':''}}</span> -->
                  </div>
                </div>
                <div class="shop_box_bottom_right">
                  <!--购物车图标-->
                  <!-- <span class="iconfont icon-cart"></span> -->
                </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
    export default {
        data(){
          return {
            value: 4.7
          }
        }
    }
</script>

<style scoped  lang="scss">
  .stores{
    position: relative;
  }
  .searchShops{
    width: 100%;
    height: 100%;
  }
  .tabBtn{
    height:auto;
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #f3f1f175;
    background:rgba(0, 0, 0, 0.03137254901960784);
    z-index: 1000;
  }
  .tabBtn_b{
    width: 100%;
    background: #fff;
  }
  .tabBtn_box{
    width: 92%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .tabBtn_ul{
    float: left;
    width:92%;
  }
  .tabBtn_li{
    float: left;
    font-size: 14px;
    width: 24%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .iconfont{
    color: #999;
    font-size: 12px;
  }
  .tabBtn_right{
    float: left;
    padding-top: 11px;
  }
  .icon-liebiao{
    font-size: 18px;
  }

  //切换列表功能
    .tabBtn_heald{
      width: 100%;
      background: rgba(0, 0, 0, 0.08);
    }
  .tabBtn_heald_ul{
    background: #fff;
  }
  .tabBtn_heald_li{
    padding: 10px;
    width: 92%;
    margin: 0 auto;
  }
  .tabBtn_heald_null{
    height: 15rem;
  }
  .icon-selected{
    color: red;
    float: right;
    font-size: 22px;
  }
  .red{
    color: red;
  }

  //筛选列表
    .tabBtn_screen{
      width: 100%;
      height: 15rem;
      background: rgba(0, 0, 0, 0.08);
      position: absolute;
      top: -50px;
    }
  .tabBtn_screen_box{
    width: 92%;
    float: right;
    background: #fff;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 200px;
  }
  .tabBtn_screen_box_header{
    height: 50px;
    background:  #f8f8f8;
    padding: 0 10px 0 10px;
    line-height: 50px;
  }
  .icon-back{
    float: left;
    font-size: 25px;
    font-weight: 400;
  }
  .screen_box_header_submit{
    float: right;
  }
  .screen_box_header_title{
    position: absolute;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    text-align: center;
  }
  .tabBtn_screen_box{
    z-index: 2;
  }
  .tabBtn_screen_box_s_ul{
    width: 92%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
  }
  .tabBtn_screen_box_s_li{
    padding: 5px 10px 5px 10px;
    float: left;
    border: 1px solid #f5f5f5;
    border-radius: 10px;
    margin: 10px;
  }
  .tabBtn_screen_hidden{
    width: 100%;
    height: 100%;
  }

  //横商品
    .shops{
      padding-top: 89px;
    }
  .shops_ul{
    width: 100%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
    background: #fff;
    padding: 0 4%;
  }
  .shops_li{
    position: relative;
    padding: 15px 0 15px 0;
    border-bottom: 1px solid #c7c7c775;
    height: auto;
    overflow: hidden;
  }
  .shop_box_img{
    float: left;
    width: 25%;
  }
  .shop_box_img_i{
    width: 100%;
    height: 100px;
    overflow: hidden;
  }
  .shop_box{
    float: left;
    width: 70%;
    overflow: hidden;
    margin-left: 5%;
    font-size: 14px;
    height: auto;
    position: relative;
  }
  .shop_box_yue{
    font-size: 12px;
    color: #a9a9a9;
  }
  .shop_box_title{
    display: block;
    overflow: hidden;
  }
  .shop_box_bottom{
    padding-top: .1rem;
    width: 100%;
    position: relative;
    height: auto;
    overflow: hidden;
  }
  .shop_box_bottom_left{
    float: left;
  }
  .bottom_left_price{
    color: #808080;
    font-size: 12px;
    padding: 10px 0 10px 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .bottom_left_box{
    color: #999;
    font-size: 12px;
  }
  .left_box_evaluate{
    margin-right: 10px;
  }
  .shop_box_bottom_right{
    float: right;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .icon-cart{
    font-size: 16px;
  }
</style>
