<template>
    <div class="box">
         <Header :type="'routers'" :title="'充值'" :right="'choice'" :middle="'title'"/>
         <div class="cz">
             <p class="cz_i">当前余额</p>
             <p class="cz_j">￥9998.00</p>
         </div>
         <div class="cz_s">
             <span class="cs_j">充值金额：￥</span>
             <input type="text"  placeholder="请输入充值金额" class="cs_in" value="" v-model="cur" />
         </div>
         <div class="cz_q">
            <div class="cz_qq r" @click="cur=50" :class="{active:cur==50}">￥50</div>
            <div class="cz_qq r" @click="cur=100" :class="{active:cur==100}">￥100</div>
            <div class="cz_qq" @click="cur=500" :class="{active:cur==500}">￥500</div>
         </div>
         <button class="btns" @click="showToggle">下一步</button>
         <div class="zhe opacity" v-show="isShow">
             <div class="zcs">
                 <div class="czs_s">
                     <div class="czs_si">
                         <p class="czs_ss">确认充值<span class="x_r" @click="showToggle">x</span></p>
                         <p class="czs_ss">{{cur}}</p>
                     </div>
                     <div>
                         <div class="cz_fs"><span>选择充值方式：</span></div>
                         <div class="ff">
                             <input type="radio" name="vehicle" value="Car" checked class="dan"/>
                             <img src="../../img/wx.png" class="zf_img"/>
                         </div>
                         <button class="zfb">确认充值</button>
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
            cur: this.$route.query.price||50,
            isShow:false
        }
      },
      components:{
        Header
      },
      methods:{
        checkItem: function () {
          this.ind = index
        },
        showToggle:function(){
          console.log(this.cur)
            this.isShow = !this.isShow
        }
      }
    }
</script>
<style scoped>
    .box{
        background:#fff;
        height: 100%;
        position: fixed;
        width: 100%;
    }
    .cz{
        margin-top:70px;
        color:#fff;
        font-size: 15px;
        text-align: center;
        background:#ff594a;
        width:80%;
        margin-left: 10%;
    }
    .cz_i{
        padding-top:7px;
        padding-bottom: 3px;
    }
    .cz_j{
        padding-bottom:7px;
        font-size: 15px;
    }
    .cz_s{
        width:70%;
        height:50px;
        line-height: 50px;
        margin-left: 15%;
        border:1px solid #eee;
        margin-top: 20px;
    }
    .cz_q{
        width:70%;
        margin-left:15%;
        padding-top: 20px;
        overflow:hidden;
    }
    .cs_j{
        margin-left: 3%;
    }
    .cs_in{
        width: 55%;
    }
    .cz_qq{
        width:26%;
        height:35px;
        line-height: 35px;
        text-align: center;
        border:1px solid #eee;
        float:left;
    }
    .r{
        margin-right:11%;
    }
    .cz_q .active{
        color:#ff594a;
        border-color:#ff594a;
    }
    .btns{
        width:70%;
        height:40px;
        margin-left: 15%;
        background:#ff594a;
        color:#fff;
        border-radius: 30px;
        margin-top: 20px;
        margin-bottom:20px;
    }
    .zhe{
        height:100%;
        width:100%;
        position:fixed;
        top:0;
        z-index:1000;
    }
    .opacity{
        background:rgba(0,0,0,0.5);
    }
    .dan{
        margin-left: 5%;
    }
    .zcs{
        width:100%;
        background:#fff;
        position:fixed;
        bottom:0;
    }
    .czs_s{
        width:90%;
        margin-left: 5%;
    }
    .czs_si{
        border-bottom: 1px solid #eee;
        text-align:center;
    }
    .czs_ss{
        margin:10px 0;
        font-size: 15px;
    }
    .cz_fs{
        height:30px;
        line-height: 30px;
        margin:5px 0;
        font-size: 14px;
    }
    .ff{
        border:1px solid #58bc58;
        width: 27%;
    }
    .x_r{
        float:right;
    }
    .zf_img{
        width:50px;
        height:28px;
        margin:5px 0 5px 2%;
    }
    .zfb{
        width:100%;
        height:40px;
        background:#ff594a;
        border-radius: 5px;
        color:#fff;
        margin: 40px 0;
    }
</style>
