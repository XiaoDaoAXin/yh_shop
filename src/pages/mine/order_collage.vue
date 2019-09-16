<template>
  <div>
    <Header :type="'back'" :title="'我的订单'" :right="'choice'" :middle="'title'" backp="/mine"/>
    <div class="app">
      <div class="ne">
        <ul class="tab-tilte">
          <li @click="tabFn(0,'')" :class="{active:cur==0}">全部</li>
          <li @click="tabFn(1,'WAITPAY')" :class="{active:cur==1}">待付款</li>
          <li @click="tabFn(2,'WAITTEAM')" :class="{active:cur==2}">待成团</li>
          <li @click="tabFn(3,'WAITSEND')" :class="{active:cur==3}">待发货</li>
          <li @click="tabFn(4,'WAITRECEIVE')" :class="{active:cur==4}">待收货</li>
          <li @click="tabFn(5,'WAITCCOMMENT')" :class="{active:cur==5}">已完成</li>
        </ul>
      </div>
      <div class="tab-content">
        <div>
          <div class="order" v-for="(item,index) in orders">
            <router-link :to="'/mine/order_xq/'+item.order_id">
              <div>
                <div class="order_b">
                  <span class="order_bh">订单编号：{{item.order_sn}}</span>
                  <span class="order_r">{{item.msg}}</span>
                </div>
                <div class="order_sp"  v-for="(ouin,index) in item.goods">
                  <div class="order_xx">
                    <img :src="ouin.goods_thum_images" height="70" width="70" alt="" class="order_img"/>
                    <div class="order_spxx">
                      <p class="sp_name aa">{{ouin.goods_name}}</p>
                      <!-- <p class="sp_names aa">花狗</p> -->
                      <p class="sp_mo aa">￥{{ouin.member_goods_price}}</p>
                      <p class="sp_shu">数量&nbsp;&nbsp;{{ouin.goods_num}}</p>
                    </div>
                  </div>
                </div>
                <div class="num">
                  <span class="sp_mos">￥{{item.total_amount}}</span>&nbsp;&nbsp;<span>共{{item.num}}件</span>
                </div>
              </div>
            </router-link>
            <div class="order_ji">
              <button class="btns" v-if="item.msg == '待付款'" @click="cancel_order(item.order_id)">取消订单</button>
              <button class="btns" id="h" v-if="item.msg == '待付款'" @click="wxpay(item.order_id,item.total_amount,item.order_sn)" >立即付款</button>
              <router-link to="/mine/comment">
                <button class="btns" v-if="item.msg == '待评价'">评价订单</button>
              </router-link>
              <router-link :to="'/mine/call_order/'+item.order_id">
                <button class="btns" v-if="item.msg == '待发货'">取消订单</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Header from "../../components/header/header.vue";
  import { Toast,MessageBox } from 'mint-ui';
  import {mapState} from 'vuex';
  export default {
    data:function() {
      return{
        orders:[],
        userId: '',
        cur: 0,
      }
    },
    components:{
      Header
    },
    created(){
      this.userId = localStorage.getItem('login');
      this.$store.dispatch('getCollageOrderMine',{token: this.userId,type: ''});
    },
    computed:{
      ...mapState(['collageorder'])
    },
    watch:{
      collageorder(val){
        this.orders = val.order;
      }
    },
    methods:{
      tabFn(index,type){
        this.cur = index;
        this.$store.dispatch('getCollageOrderMine',{token: this.userId,type: type});
      }
    }
  }
</script>
<style type="text/css" scoped>
  .app {
    width: 100%;
    margin: 0 auto;
    padding-top:50px;
  }
  .ne{
    width: 100%;
    height:37px;
    background:#fff;
    overflow-x: scroll;
  }
  .tab-tilte{
    width: 100%;
  }
  .tab-tilte li{
    float: left;
    width: 16.66666%;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
  }
  /* 点击对应的标题添加对应的背景颜色 */
  .tab-tilte .active{
    color: #f23030;
    border-bottom:1px solid #f23030;
  }
  /****/
  .order{
    width:100%;
    background:#fff;
    margin-top: 12px;
  }
  .order_b{
    width:100%;
    padding:10px;
  }
  .order_bh{
    color:#666;
    font-size: 12px;
  }
  .order_r{
    color:#f23030;
    font-size: 14px;
    float:right;
    margin-right: 3%;
  }
  .order_sp{
    width:100%;
  }
  .order_xx{
    width:94%;
    margin-left: 3%;
    border-bottom:1px solid #eee;
    padding-bottom: 15px;
  }
  .order_spxx{
    width: 63%;
    margin-left: 3%;
    display: inline-block;
  }
  .order_img{
    margin: 1px auto;
    float:left;
  }
  .aa{
    margin-bottom:10px;
  }
  #h{
    background:#f23030;
    color:#fff;
  }
  .sp_name{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .sp_mo{
    color:#f23030;
  }
  .sp_mos{
    color:#f23030;
    margin-left: 2%;
  }
  .sp_shu{
    color:#666;
  }
  .order_ji{
    height: 40px;
    line-height: 40px;
  }
  .btns{
    padding: 5px 10px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    float: right;
    margin-right: 3%;
    margin-top: 5px;
  }
  .order_no{
    text-align: center;
  }
  .one{
    margin-top: 12px;
  }
  .two{
    margin:15px;
    color:#666;
  }
  .order_imgs{
    margin-top: 20px;
  }
  .gg{
    width:90%;
    height:40px;
    background:#f23030;
    color:#fff;
    border-radius: 5px;
    margin-left: 5%;
  }
  .num{
    margin-top: 5px;
    float: left;
    width: 50%;
    height: 30px;
    line-height: 30px;
  }

</style>
