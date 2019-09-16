<template>
    <div style="padding-bottom:50px;">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'我的收藏'" :middle="'title'" />
        <div class="shou">
            <div class="shou_li" v-for="(item,index) in list">
                <img :src="item.goods_thum_images" height="180" width="90%" alt="" class="shou_img"/>
                <p class="shou_tit">{{item.goods_name}}</p>
                <span class="shou_mo">￥{{item.shop_price}}</span>
                <div class="shou_move" @click="del(item.collect_id,index)">删除</div>
            </div>

        </div>
        <div class="show" v-show="isShow">
            <img src="/static/img/none.png" height="98" width="80" alt="" /><br /><br />
            <p>亲，此处还没有收藏哦～</p>
        </div>
    </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
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
            isShow:'',
            a:2,
            list:[]
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
                    this.list=response.data.result;
                }else{
                    this.isShow = true;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/collect_list',{
                "token":token
              }).then(successCallback,errorCallback);
        },
        del:function(id,index){
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                    this.list.splice(index,1);
                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/cancel_collect',{
                "token":token,"collect_id":id
              }).then(successCallback,errorCallback);
        },
        tui:function(){
           this.$router.push({ path:'/mine'})
        }
      }
    }
</script>
<style scoped>
    .shou{
        background:#fff;
        padding-top: 50px;
        overflow:hidden;
    }
    .shou_img{
        margin-left: 5%;

    }
    .shou_li{
        float:left;
        width:50%;
        box-sizing: border-box;
        border-right:1px solid #eee;
        border-bottom:1px solid #eee;
    }
    .shou_tit{
        margin:10px 0 10px 5%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .shou_mo{
        margin-left: 5%;
        color:#f23030;
        display: inline-block;
        margin-top: 5px;
    }
    .shou_move{
        float:right;
        margin-right: 5%;
        padding:3px 10px;
        margin-bottom:10px;
        border:1px solid #eee;
    }
    .show{
        margin-top: 50px;
        color:#777;
        text-align:center;
    }

</style>
