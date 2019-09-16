<template>
    <div>
      <Header :type="'routers'" :title="'挂买单'" :right="'choice'" :middle="'title'"/>
       <div class="pay_t">
         <div class="pay_li">
           <span class="pay_le">商品</span>
           <select name="public-choice" class="se" v-model="couponSelected" @change="getCouponSelected">
              <option :value="coupon.id" v-for="coupon in couponList">{{coupon.name}}</option>
            </select>
         </div>
          <div class="pay_li">
           <span class="pay_le">最新价</span>
           <span class="pay_ri">￥10086</span>
         </div>
         <div class="pay_li">
           <span class="pay_le">可用资金</span>
           <span class="pay_ri">￥10086</span>
         </div>
         <div class="pay_li">
           <span class="pay_le">涨跌停</span>
           <span class="pay_ri">-</span>
         </div>
         <div class="pay_li">
           <span class="pay_le">挂单价格</span>
           <input type="text" class="pay_ri" style="margin-top:10px;border:1px solid #c0c4cc;padding-left:3%;"/>
         </div>
         <div class="pay_li">
           <span class="pay_le">挂单数量</span>
           <input type="text" class="pay_ri" style="margin-top:10px;border:1px solid #c0c4cc;padding-left:3%;"/>
         </div>
       </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            couponList:[
                      {
                          id: 'A',
                          name: '优惠券1'
                      },
                      {
                          id: '1',
                          name: '优惠券2'
                      },
                      {
                          id: '2',
                          name: '优惠券3'
                      }
                  ],
                  couponSelected: '',
        }
      },
      created(){
          this.couponSelected = this.couponList[0].id;
      },
      components:{
        Header
      },
      mounted(){

      },
      methods:{
        getCouponSelected(){
              console.log(this.couponSelected)
          }
      }
    }
</script>
<style type="text/css" scoped>
 .pay_t{
  width:94%;
  margin-left:3%;
  background:#fff;
  font-size: 13px;
  color:#8a8a8a;
  border-radius: 5px;
  padding-top:55px;
 }
 .pay_li{
  overflow:hidden;
  height:40px;
  line-height: 40px;
  border-bottom: 1px solid #fbfbfb;
 }
 .se{
  border: solid 1px #fff;
  appearance:none;
  padding-right: 3%;
  float:right;
  margin-top: 10px;
  color:#8a8a8a;
  padding-left: 29%;
 }
 .pay_le{
    margin-left: 3%;
    float:left;
 }
 .pay_ri{
  float:right;
  margin-right:3%;
 }
select::-ms-expand { display: none; }
</style>
