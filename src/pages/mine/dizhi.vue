<template>
    <div>
         <Header type="routers" :title="'收货地址管理'" :right="'choice'" :middle="'title'" />
        <div style="height:50px;"></div>
        <div class="dizhi_li" v-for="(item,index) in dizhi" @click="back(item.address_id)">
            <div class="dizhi_lix">
                <span class="dizhi_xm">{{item.consignee}}</span>
                <span v-if="item.is_default==1" class="mo">默认</span>
            </div>
            <div class="dizhi_lis">
                <span class="ph">电话：{{item.mobile}}</span>
                <span class="dizhi_dh">{{item.province_name}}{{item.city_name}}{{item.district_name}}{{item.twon_name}}{{item.address}}</span>
            </div>
             <a @click.stop="$router.replace({path: '/mine/bianji_dizhi/'+item.address_id,query:{cartId: $route.query.cartId,shopId: $route.query.shopId,type: $route.query.type}})">
                <img src="../../img/xg.png" height="22" width="22" alt="" class="xg"/>
             </a>

        </div>
        <div style="height:50px;background:#f3f5f7;"></div>
        <router-link :to="{path: '/mine/add_dizhi',query:{cartId: $route.query.cartId,shopId: $route.query.shopId,type: $route.query.type}}">
            <button class="add_btn">新增地址</button>
        </router-link>
    </div>


</template>
<script>
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            elComponent: [
                {icon: "el-icon-house",href: "/home",title: "首页"},
                {icon: "el-icon-finished",href: "/classs",title: "分类"},
                {icon: "el-icon-shopping-cart-2",href: "/cart",title: "购物车"},
                {icon: "el-icon-user",href: "/mine",title: "我的"},
              ],
            dizhi:[],
            path: []
        }
      },
      components:{
        Header
      },
      mounted(){
        this.getAjax();
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                  this.dizhi=response.address;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/address_list',{
                "token":token
              }).then(successCallback,errorCallback);
        },
        back(address_id){
          this.path = JSON.parse(sessionStorage.getItem("path"));
          if(this.$route.query.type){
            this.$router.replace({path: '/dateils/fillOrder',query:{
              address_id: address_id,
              specificationsListsID: this.$route.query.specificationsListsID,
              shop: this.$route.query.shop,       //商品
              type: this.$route.query.type,       //类型
              cartId: this.$route.query.cartId,               //购物车id
              shopId: this.$route.query.shopId,               //商品id
            }});
            this.path.pop();
            this.sessionIndex("path",this.path);
          }

        },
        tui:function(){
           this.$router.push({ path:'/mine'})
        }
      }
    }
</script>
<style>
 .dizhi_li{
    width:100%;
    background:#fff;
    border-bottom:1px solid #eee;
 }
 .dizhi_lix{
    width:23%;
    float:left;
    padding-top: 10px;
    margin-left: 4%;

 }
 .dizhi_lis{
    padding-bottom:10px;
    padding-top: 10px;
    width:50%;
    display:inline-block;
 }
 .dizhi_dh{
    display:block;
    margin-top:8px;
 }
 .ph{
    font-weight: bold;
 }
.xg{
    float: right;
    margin: 20px auto;
    margin-right: 4%;
}
.add_btn{
    width:100%;
    height:45px;
    background:#f23030;
    color:#fff;
    border:none;
    outline:none;
    position:fixed;
    bottom:0;
}
/**/
  header{
    background: #f8f8f8;
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    font-size: 12px;
  }
  .header_box{
    display: inline-block;
  }
  .header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
  }

  .icon-fanhui{
    font-size: 26px;
  }
  .position_title{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -10px 0 0 -75px;
    display: block;
    width: 150px;
    text-align: center;
    font-size: 15px;
  }
  .h_search_right{
    float: right;
    text-align: center;
  }
  .mo{
    padding:3px 5px;
    background:red;
    color:#fff;
    font-size:12px;
    display: block;
    width: 47%;
    margin-top: 5px;
    text-align: center;
  }
  /**/
</style>
