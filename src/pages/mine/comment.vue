<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'我的评价'" :middle="'title'" />
        <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">全部评价</li>
                    <li @click="cur=1" :class="{active:cur==1}">待评价</li>
                    <li @click="cur=2" :class="{active:cur==2}">已评价</li>
                </ul>
            </div>
            <div class="tab-content">
                <div v-show="cur==0">

                    <div class="pj" v-for="(item,index) in all">
                        <div class="pjs">
                            <img :src="item.goods_thum_images" height="60" width="60" alt="" class="pj_img"/>
                            <div class="pj_xx">
                                <p class="pj_tit">{{item.goods_name}}</p>
                                <p class="pj_sj">购买时间:{{item.add_time}}</p>
                            </div>
                            <router-link :to="'/mine/comment_pl/'+item.rec_id" v-if="item.is_comment == 0">
                                <div class="pj_pj" >评价订单</div>

                            </router-link>
                            <router-link :to="'/mine/comment_xq/'+item.comment_id" v-if="item.is_comment == 1">
                                <div class="pj_ck">查看评价</div>
                            </router-link>

                        </div>
                    </div>


                </div>
                <div v-show="cur==1">
                    <div class="pj"  v-for="(item,index) in all" v-if="item.is_comment == 0">
                    <!--     <p class="pjm_m">没找到相关记录</p>
                        <router-link to="/">
                            <div class="pjm_gg">去逛逛</div>
                        </router-link> -->
                        <div class="pjs">
                            <img :src="item.goods_thum_images" height="60" width="60" alt="" class="pj_img"/>
                            <div class="pj_xx">
                                <p class="pj_tit">{{item.goods_name}}</p>
                                <p class="pj_sj">购买时间:{{item.add_time}}</p>
                            </div>
                            <router-link to="/mine/comment_pl">
                                <div class="pj_pj" >评价订单</div>
                            </router-link>

                        </div>
                    </div>

                </div>
                <div v-show="cur==2">
                <!-- 查看评价 -->
                     <div class="pj" v-for="(item,index) in all" v-if="item.is_comment == 1">
                        <div class="pjs">
                            <img :src="item.goods_thum_images" height="60" width="60" alt="" class="pj_img"/>
                            <div class="pj_xx">
                                <p class="pj_tit">{{item.goods_name}}</p>
                                <p class="pj_sj">购买时间:{{item.add_time}}</p>
                            </div>
                            <router-link to="/mine/comment_xq">
                                <div class="pj_ck">查看评价</div>
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
import { Toast } from 'mint-ui';
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
            cur:0,
            isShow:'',
            a:1,
            all:[],
        }
      },
      components:{
        Header
      },
      mounted(){
        // console.log(this.a)
        // if(this.a==1){
        //     this.isShow = true;
        // }else{
        //     this.isShow = false;
        // }
        this.getAjax();
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                    this.all=response.data;
                }else{
                    this.isShow = true;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/comment',{
                "token":token
              }).then(successCallback,errorCallback);
        },
        tui:function(){
           this.$router.push({ path:'/mine'})
        }
      }
    }
</script>
<style scoped>
/**/
 .app {
    width: 100%;
    margin: 0 auto;
    padding-top: 50px;
}
.ne{
    width: 100%;
    height:37px;
    background:#fff;
}
.tab-tilte{
     width: 90%;
     margin-left: 5%;
}
.tab-tilte li{
    float: left;
    width: 33.3%;
    padding: 10px 0;
    text-align: center;
    cursor: pointer;
}
/* 点击对应的标题添加对应的背景颜色 */
.tab-tilte .active{
    color: #f23030;
    border-bottom:1px solid #f23030;
}
.pj{
    width:100%;
    background:#fff;
    margin-top: 12px;
    border-bottom: 1px solid #eee;
}
.pjs{
    width:90%;
    margin-left: 5%;
    overflow:hidden;
}
.pj_img{
    float:left;
    margin-top:10px;
}
.pj_xx{
    float:left;
    margin-left: 3%;
    width: 70%;
}
.pj_tit{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin:12px 0;
}
.pj_sj{
    color:#666;
    margin:12px 0;
}
.pj_pj{
    padding:4px 12px;
    float:right;
    margin-right: 3%;
    border:1px solid #F23030;
    color:#F23030;
    margin-bottom:10px;
}
.pj_ck{
    padding:4px 12px;
    float:right;
    margin-right: 3%;
    border:1px solid #eee;
    color:#777;
    margin-bottom:10px;
}
.pj_m{
    text-align: center;
}
.pjm_img{
    margin-top: 20px;
}
.pjm_m{
    padding:20px;
}
.pjm_gg{
    width:40%;
    height:30px;
    line-height: 30px;
    margin-left: 30%;
    background:#f23030;
    color:#fff;
}

</style>
