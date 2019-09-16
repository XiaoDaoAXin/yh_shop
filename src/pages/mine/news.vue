<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'消息中心'" :middle="'title'" />
        <div class="app">
             <router-link to="/mine/logistics">
                 <div class="xiao_li">
                    <img src="../../img/mesg-activi.png" height="46" width="46" alt="" class="xiao_img"/>
                    <div class="xiao_xx">
                        <p class="p pp">物流</p>
                        <p class="p">暂无消息</p>
                    </div>
                </div>
            </router-link>
           <router-link to="/mine/tz">
                 <div class="xiao_li">
                    <img src="../../img/mesg-logistics.png" height="46" width="46" alt="" class="xiao_img"/>
                    <div class="xiao_xx">
                        <p class="p pp">通知</p>
                        <p class="p">暂无消息</p>
                    </div>
                </div>
           </router-link>
           <router-link to="/mine/activity">
                <div class="xiao_li" style="border:none;">
                    <img src="../../img/mesg-notes.png" height="46" width="46" alt="" class="xiao_img"/>
                    <div class="xiao_xx">
                        <p class="p pp">活动</p>
                        <p class="p">暂无消息</p>
                    </div>
                </div>
           </router-link>
        </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
export default {
    data:function() {
        return{

        }
      },
      components:{
        Header
      },
      methods:{

      }
    }
</script>
<style type="text/css" scoped>
/**/
.app{
    padding-top: 50px;
}
.set{
    width:100%;
    height:40px;
    text-align: center;
    line-height: 40px;
    background:#f8f8f8;
}
.fan{
    float:left;
    font-size: 24px;
    margin-left:3%;
}
.lei{
    float:right;
    font-size: 24px;
    margin-right:3%;
}
.xx{
    font-size: 15px;
}
.xiao_li{
    padding-bottom: 15px;
    background: #fff;
    border-bottom: 1px solid #eee;
}
.xiao_img{
    float: left;
    margin:17px;
}
.xiao_xx{
    display:inline-block;
    margin-top: 17px;
}
.p{
    height:25px;
    line-height: 25px;
}
</style>
