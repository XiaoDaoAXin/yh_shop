<template>
    <div>
         <Header :type="'routers'" :title="'积分商城'" :right="'choice'" :middle="'title'"/>
        <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">默认</li>
                    <li @click="cur=1" :class="{active:cur==1}">兑换量<span class="iconfont icon-xiajiantou x"></span></li>
                    <li @click="cur=2" :class="{active:cur==2}">积分值<span class="iconfont icon-xiajiantou x"></span></li>
                </ul>
            </div>
            <div class="tab-content">
                <div v-show="cur==0">
                    <div class="jf">
                        <div class="jf_li">
                            <img src="../../img/sp.jpg" height="80" width="80" alt="" class="jf_img"/>
                            <div class="jf_lis">
                                <p class="jf_tit">狗狗狗股狗狗狗股狗狗狗股狗狗狗股狗狗狗股</p>
                                <div class="jf_m"><span class="jf_mh">25</span><span class="jf_mo">+1000积分</span></div>
                                <div class="jf_bb">
                                    <span class="jf_sm">市场价：￥147.00</span>
                                    <span class="jf_dh">立即兑换</span>
                                </div>

                            </div>
                        </div>
                    </div>
                     <div class="jf">
                        <div class="jf_li">
                            <img src="../../img/sp.jpg" height="80" width="80" alt="" class="jf_img"/>
                            <div class="jf_lis">
                                <p class="jf_tit">狗狗狗股狗狗狗股狗狗狗股狗狗狗股狗狗狗股</p>
                                <div class="jf_m"><span class="jf_mh">25</span><span class="jf_mo">+1000积分</span></div>
                                <div class="jf_bb">
                                    <span class="jf_sm">市场价：￥147.00</span>
                                    <span class="jf_dh">立即兑换</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="cur==1">
                     <div class="jf">
                        <div class="jf_li">
                            <img src="../../img/sp.jpg" height="80" width="80" alt="" class="jf_img"/>
                            <div class="jf_lis">
                                <p class="jf_tit">狗狗狗股狗狗狗股狗狗狗股狗狗狗股狗狗狗股</p>
                                <div class="jf_m"><span class="jf_mh">25</span><span class="jf_mo">+1000积分</span></div>
                                <div class="jf_bb">
                                    <span class="jf_sm">市场价：￥147.00</span>
                                    <span class="jf_dh">立即兑换</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="cur==2">
                     <div class="jf">
                        <div class="jf_li">
                            <img src="../../img/sp.jpg" height="80" width="80" alt="" class="jf_img"/>
                            <div class="jf_lis">
                                <p class="jf_tit">狗狗狗股狗狗狗股狗狗狗股狗狗狗股狗狗狗股</p>
                                <div class="jf_m"><span class="jf_mh">25</span><span class="jf_mo">+1000积分</span></div>
                                <div class="jf_bb">
                                    <span class="jf_sm">市场价：￥147.00</span>
                                    <span class="jf_dh">立即兑换</span>
                                </div>

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
    export default {
    data:function() {
        return{
            cur:0
        }
      },
      components:{
        Header
      },
      methods:{

      }
    }
</script>
<style scoped>
    .app {
        width: 100%;
        margin: 0 auto;
        padding-top: 50px;
    }
    .x{
        font-size: 12px;
        margin-left:3%;
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
    }
    .jf{
        width:100%;
        background:#fff;
        border-bottom: 1px solid #eee;
        padding-top: 14px;
    }
    .jf_li{
        width:90%;
        margin-left: 5%;
        overflow:hidden;
    }
    .jf_img{
        float:left;
    }
    .jf_lis{
        float:left;
        width:67%;
        margin-left: 3%;
    }
    .jf_tit{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin:8px 0;
    }
    .jf_mh{
        color:#f23030;
    }
    .jf_m{
        margin:8px 0;
    }
    .jf_mo{
        color:#666;
    }
    .jf_sm{
        color:#666;
    }
    .jf_bb{
        padding-bottom: 20px;
    }
    .jf_dh{
        padding:3px 7px;
        border:1px solid #eee;
        float: right;
        /*padding-bottom: 15px;*/
    }
</style>
