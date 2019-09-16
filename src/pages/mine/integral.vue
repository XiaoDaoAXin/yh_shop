<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'积分明细'" :middle="'title'" />
        <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">全部</li>
                    <li @click="cur=1" :class="{active:cur==1}">赚取</li>
                    <li @click="cur=2" :class="{active:cur==2}">消费</li>
                </ul>
            </div>
            <div class="tab-content">
                <div v-show="cur==0" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">积分</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                    <div v-for="(item,index) in mx">
                            <div class="mx" >
                                <div class="yuer_li">
                                    <div class="yuer_lis">
                                        <div class="lis a">{{item.order_sn}}</div>
                                        <div class="lis h">{{item.pay_points}}</div>
                                        <div class="lis hui">{{item.change_data}}</div>
                                    </div>
                                    <div class="ms">描述：{{item.desc}}</div>
                                </div>
                            </div>
                    </div>
                </div>
                <div v-show="cur==1" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">积分</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                    <div v-for="(item,index) in mx">
                            <div class="mx" v-if="item.pay_points>0">
                                <div class="yuer_li">
                                    <div class="yuer_lis">
                                        <div class="lis a">{{item.order_sn}}</div>
                                        <div class="lis h">{{item.pay_points}}</div>
                                        <div class="lis hui">{{item.change_data}}</div>
                                    </div>
                                    <div class="ms">描述：{{item.desc}}</div>
                                </div>
                            </div>
                    </div>
                </div>
                <div v-show="cur==2" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">积分</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                    <div v-for="(item,index) in mx">
                            <div class="mx" v-if="item.pay_points<0">
                                <div class="yuer_li">
                                    <div class="yuer_lis">
                                        <div class="lis a">{{item.order_sn}}</div>
                                        <div class="lis h">{{item.pay_points}}</div>
                                        <div class="lis hui">{{item.change_data}}</div>
                                    </div>
                                    <div class="ms">描述：{{item.desc}}</div>
                                </div>
                            </div>
                    </div>
            </div>
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
            cur:0,
            mx:[],
            elComponent: [
                {icon: "el-icon-house",href: "/home",title: "首页"},
                {icon: "el-icon-finished",href: "/classs",title: "分类"},
                {icon: "el-icon-shopping-cart-2",href: "/cart",title: "购物车"},
                {icon: "el-icon-user",href: "/mine",title: "我的"},
              ]
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
                  if (response.status==200) {
                      for(var i = 0;i<response.data.length;i++){
                            if(response.data[i].order_sn==''){
                            response.data[i].order_sn='无'
                            this.mx = response.data;
                          }
                      }
                  }
                }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/account_list',{
                "token":token
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style scoped>
    .app {
        width: 100%;
        margin: 0 auto;
        padding-top: 60px;
    }
    .x{
        font-size: 12px;
        margin-left:3%;
    }
    .ne{
        width: 100%;
        height:37px;
        /*background:#fff;*/
    }
    .margin{
        margin-bottom:70px;
    }
    .tab-tilte{
         width: 90%;
         margin-left: 5%;
         overflow:hidden;
         border-radius: 5px;
    }
    .tab-tilte li{
        float: left;
        width: 33.3%;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
        color: #ffff;
        background:#ff9a9b;
    }
    /* 点击对应的标题添加对应的背景颜色 */
    .tab-tilte .active{
        background:#f23030;
    }
    .jf{
        width:100%;
        /*background:#fff;*/
    }
    .jf_top{
        width:90%;
        height:40px;
        line-height: 40px;
        margin-left: 5%;
        overflow:hidden;
        border-bottom: 1px solid #eee;
    }
    .jf_tops{
        width:33.33%;
        float:left;
        text-align: center;
    }
    .mx{
        width:100%;
        /*background:#fff;*/
    }
    .yuer_lis{
        padding-top:10px;
        margin-bottom:10px;
        overflow:hidden;
    }
    .yuer_li{
        width:90%;
        margin-left: 5%;
        border-bottom:1px solid #eee;
    }
    .lis{
        width:33.33%;
        float:left;
        text-align: center;
    }
    .a{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .h{
        color:#e01222;
    }
    .hui{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:#666;
    }
    .ms{
        margin-bottom:10px;
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
  /**/
</style>
