<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'余额明细'" :middle="'title'"/>
        <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">全部</li>
                    <li @click="cur=1" :class="{active:cur==1}">赚取</li>
                    <li @click="cur=2" :class="{active:cur==2}">消费</li>
                </ul>
            </div>
            <div class="tab-content" style="margin-top: 57px;">
                <div v-show="cur==0" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">金额</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                    <div style="position:relative;top:40px;">
                        <div v-for="(item,index) in mx">
                          <router-link :to="'/mine/yuer_mxs/'+item.log_id">
                              <div class="mx" >
                                  <div class="yuer_li">
                                      <div class="yuer_lis">
                                          <div class="lis a">{{item.order_sn}}</div>
                                          <div class="lis h">{{item.user_money}}</div>
                                          <div class="lis hui">{{item.change_data}}</div>
                                      </div>
                                      <div class="ms">描述：{{item.desc}}</div>
                                  </div>
                              </div>
                          </router-link>
                      </div>
                    </div>
                    
                </div>
                <div v-show="cur==1" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">金额</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                  <div style="position:relative;top:40px;">
                    <div v-for="(item,index) in mx">
                        <router-link :to="'/mine/yuer_mxs/'+item.log_id">
                            <div class="mx" v-if="item.user_money>0">
                                <div class="yuer_li">
                                    <div class="yuer_lis">
                                        <div class="lis a">{{item.order_sn}}</div>
                                        <div class="lis h">{{item.user_money}}</div>
                                        <div class="lis hui">{{item.change_data}}</div>
                                    </div>
                                    <div class="ms">描述：{{item.desc}}</div>
                                </div>
                            </div>
                        </router-link>
                    </div>
                    </div>
                </div>
                <div v-show="cur==2" class="margin">
                    <div class="jf">
                        <div class="jf_top">
                            <div class="jf_tops">订单</div>
                            <div class="jf_tops">金额</div>
                            <div class="jf_tops">时间</div>
                        </div>
                    </div>
                    <div style="position:relative;top:40px;">
                      <div v-for="(item,index) in mx">
                          <router-link :to="'/mine/yuer_mxs/'+item.log_id">
                              <div class="mx" v-if="item.user_money<0">
                                  <div class="yuer_li">
                                      <div class="yuer_lis">
                                          <div class="lis a">{{item.order_sn}}</div>
                                          <div class="lis h">{{item.user_money}}</div>
                                          <div class="lis hui">{{item.change_data}}</div>
                                      </div>
                                      <div class="ms">描述：{{item.desc}}</div>
                                  </div>
                              </div>
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
    import {URL} from "../../API/url.js";
    export default {
    data:function() {
        return{
            cur:0,
            mx:[]
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
                    this.mx = response.data;
                      for(var i = 0;i<response.data.length;i++){
                          if(!response.data[i].order_sn){
                            response.data[i].order_sn='无'
                            
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
      background: #fff;
      padding-top: 50px;
      height: 100%;
    }
    .margin{
      margin-bottom:40px;
         
    }
    .ne{
      width: 100%;
      height: 37px;
      padding: 20px 0;
      position: fixed;
      z-index: 999;
      background: #fff;
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
      width: 100%;
      position: fixed;
      background: #fff;
      z-index: 999;
    }
    .jf_top{
      width:90%;
      height:40px;
      line-height: 40px;
      margin-left: 5%;
      overflow:hidden;
      border-bottom: 1px solid #fbfbfb;
    }
    .jf_tops{
      width:33.33%;
      float:left;
      text-align: center;
    }
    .mx{
      width:100%;
    }
    .yuer_lis{
      padding-top:10px;
      margin-bottom:10px;
      overflow:hidden;
    }
    .yuer_li{
      width:90%;
      margin-left: 5%;
      border-bottom:1px solid #fbfbfb;
    }
/*    .yuer_li:last-child{
      border-bottom:none;
    }*/
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
</style>
