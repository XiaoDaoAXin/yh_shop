<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :title="'提现'" :middle="'title'"/>
        <div class="card">
           <div class="cards">
               <div class="cara_top">
                    <span class="card_j">可提现总金额</span>
                   <span class="card_e">当日额度：{{tx.total_money}}</span>
               </div>
                <div class="cara_cen">￥{{money}}</div>
           </div>
       </div>
       <div class="card_b">
           <div class="card_bs">
               <p class="jin">提现金额</p>
               <div class="moe">
                   <span class="hei">￥</span>
                   <input type="number" style="height: 100%;" v-model="cur"/>
               </div>
                <!-- <div class="tx"> -->
                    <!-- <span>手续费：1%</span> -->
                    <!-- <span class="htx">全部提现</span> -->
                <!-- </div> -->
           </div>
        </div>
       <div class="xcarr">
           <router-link to="/mine/card">
                <div class="xcard">
                 <span class="card_k">银行卡：</span>
                 <input type="text" class="nm" placeholder="请选择银行卡" disabled="disabled" v-model="car" value="" name="cart"/>
                 <span class="iconfont icon-iconfontjiantou4"></span>
                </div>
           </router-link>
            <button class="btntj" @click="btns">提交申请</button>
            <div class="xxxx">
                <p class="withdraw-foot-p">温馨提示：</p>
                <p class="withdraw-foot-dl">
                    <p>1.提现金额须大于 {{tx.min}} 元，小于{{tx.max}}  元</p>
                    <p>2.提现收取{{tx.fee}}%的手续费</p>
                    <p>3.手续费在到账金额中扣除；</p>
                    <p>4.提现审核一般3 - 5个工作日到账。</p>
                </p>
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
            cur:'',
            car:'',
            tx:'',
            money:'',
            card_id:''
        }
      },
      components:{
        Header
      },
      created(){
        this.card_id = this.$route.params.id;
      },
      mounted(){
        this.getAjax();
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                  if (response.status==200) {
                      this.tx=response.config;
                      this.money= response.money
                      this.car = response.bank_num
                  }else{

                      this.ishei = true;
                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/tx',{
                "token":token,
                "id":this.card_id
              }).then(successCallback,errorCallback);
        },
        btns:function(){
          console.log(this.cur)
          var token = localStorage.getItem("login");
            var successCallback =  (response) => {
            console.log(response)
                  if (response.status==200) {
                      Toast({
                      message: "提现成功,待审核",
                      position: 'bottom',
                      duration: 1000
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine/balance'})
                    },1500)
                  }else{
                    Toast({
                      message: response.msg,
                      position: 'bottom',
                      duration: 2000
                    });
                  }
                }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/cashs',{
                "token":token,
                "bank_id":this.card_id,
                "money":this.cur
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style scoped>
    .card{
        width:100%;
        background:#ff594a;
        color:#fff;
        padding-top: 50px;
    }
    .cards{
        width:90%;
        margin-left: 5%;
    }
    .cara_top{
        padding:15px 0;
    }
    .cara_cen{
        font-size: 25px;
        height:52px;
        line-height: 52px;
    }
    .card_e{
        float:right;
    }
    .card_b{
        width:100%;
        background:#fff;

    }
    .card_bs{
        width:90%;
        margin-left: 5%;
    }
    .hei{
        font-size: 17px;
        font-weight: bold;
    }
    .jin{
        padding-top: 15px;
    }
    .moe{
        height:50px;
        line-height: 50px;
        border-bottom:1px solid #eee;
        overflow: hidden;
    }
    .tx{
        height:40px;
        line-height: 40px;
    }
    .htx{
        color:#ff594a;
        float:right;
    }
    .xcarr{
        width:100%;
        background:#fff;
        padding:15px 0;
    }
    .xcard{
        width:90%;
        margin-left:5%;
        color: #000;
    }
    .nm{
        background:#fff;
        color: #000;
    }
    .iconfont{
      float:right;
    }
    .btntj{
        width:90%;
        height:45px;
        color:#fff;
        border-radius: 5px;
        margin-left: 5%;
        background:#ff594a;
        margin-top: 50px;
    }
    .xxxx{
        width:90%;
        margin-left: 5%;
        margin-top: 40px;
        color:#666;
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
