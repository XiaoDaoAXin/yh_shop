<template>
    <div>
    <Header :type="'back'" :title="'领劵中心'" :right="'choice'" :middle="'title'"/>
         <div class="app">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">默认</li>
                    <li @click="cur=1" :class="{active:cur==1}">即将过期</li>
                    <li @click="cur=2" :class="{active:cur==2}">面积最大</li>
                </ul>
            </div>
            <div class="tab-content">
                <div v-show="cur==0">
                    <p class="coupon" v-show="isShow">暂无可领的优惠券</p>
                </div>
                <div v-show="cur==1">
                    <p class="coupon" v-show="isShow">暂无可领的优惠券</p>
                </div>
                <div v-show="cur==2">
                    <p class="coupon" v-show="isShow">暂无可领的优惠券</p>
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
             cur:0,
             isShow:'',
             a:1

        }
      },
      components:{
        Header
      },
      mounted(){
        console.log(this.a)
        if(this.a==1){
            this.isShow = true;
        }else{
            this.isShow = false;
        }
      },
      methods:{

      }
    }
</script>
<style type="text/css" scoped>
 /**/
 .app {
    width: 100%;
    margin: 0 auto;
    padding-top:50px;
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
/****/
.coupon{
    height:30px;
    line-height: 30px;
    text-align: center;
    margin-top: 50px;
}
</style>