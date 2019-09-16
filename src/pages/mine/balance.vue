<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'我的余额'" :middle="'title'" :background="'#e63842'" />
        <div class="y">
            <img src="../../img/zjgl.jpg" height="550" width="750" alt="" class="y_img"/>
            <div class="y_yy">
                <div class="yyy">
                    <p>{{all.user_money}}</p>
                    <p class="y_ye">可用余额</p>
                </div>
                <div class="yyy s">
                    <p>{{all.frozen_money}}</p>
                    <p class="y_ye">冻结金额</p>
                </div>

            </div>


        </div>
        <div>
            <router-link to="/mine/yuer_mx">
                <div class="yu t">
                    <span class="l">余额明细</span>
                    <span class="iconfont icon-iconfontjiantou4 r"></span>
                </div>
            </router-link>
            <router-link to="/mine/jf_mx">
                <div class="yu">
                    <span class="l">积分明细</span>
                    <span class="iconfont icon-iconfontjiantou4 r"></span>
                </div>
            </router-link>
<!--             <router-link to="/mine/cz_mx">
                <div class="yu">
                    <span class="l">充值明细</span>
                    <span class="iconfont icon-iconfontjiantou4 r"></span>
                </div>
            </router-link> -->
            <router-link to="/mine/tx_mx">
                <div class="yu">
                    <span class="l">提现明细</span>
                    <span class="iconfont icon-iconfontjiantou4 r"></span>
                </div>
            </router-link>
            <router-link to="/mine/tx/0">
                <div class="yu">
                    <span class="l">申请提现</span>
                    <span class="iconfont icon-iconfontjiantou4 r"></span>
                </div>
            </router-link>

        </div>
        <appNav />
    </div>
</template>
<script type="text/javascript">
    import appNav from "../../components/TabNav/appNav";
    import {URL} from "../../API/url.js";
    import Header from "../../components/header/header.vue";
    export default {
    data:function() {
        return{
            all:''
        }
      },
      components:{
        appNav,
        Header
      },
       mounted(){
        this.getAjax();
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
            console.log(response)
                  if (response.status==200) {
                      this.all  = response.data;
                  }else{

                      this.ishei = true;
                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/index',{
                "token":token
              }).then(successCallback,errorCallback);
        },
      }
    }
</script>
<style scoped>
    .y{
        background: #fff;
        padding-top: 50px;
    }
    .y_img{
        width:100%;
        height:115px;
    }
    .y_yy{
        text-align: center;
        color:#fff;
        position:absolute;
        width:100%;
        left:0;
        top:128px;
    }
    .yyy{
        width:50%;
        float:left;
    }
    .s{
        float:right;
    }

    .z{
        overflow:hidden;
        position: absolute;
        top: 216px;
        width: 100%;

    }
    .z_z{
        width: 100%;
        float: left;
        text-align: center;
        color: #fff;
        height: 44px;
        line-height: 44px;
    }
    .t{
        margin-top: 12px;
    }
    .yu{
        width:100%;
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        background:#fff;
    }
    .l{
        margin-left: 3%;
    }
    .r{
        float:right;
        margin-right: 3%;
    }
</style>
