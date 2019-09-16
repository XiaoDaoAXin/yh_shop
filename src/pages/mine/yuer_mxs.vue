<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'账户明细'" :middle="'title'" />
        <div class="app">
            <div class="mx_top">
                <span style="margin-left:3%;">出帐金额</span>
                <span style="font-size:15px;font-weight:700;float:right;margin-right:3%;">{{mxg.user_money}}</span>
            </div>
            <div class="mx_topx">
                <div class="mx_tops">
                    <div class="mx_ma">
                        <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
                        <span class="mx_zz" v-if="mxg.user_money>0">收入</span>
                        <span class="mx_zz" v-if="mxg.user_money<0">支出</span>
                    </div>
                    <div class="mx_ma">
                        <span>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</span>
                        <span class="mx_zz">{{mxg.change_time}}</span>
                    </div>
                    <div class="mx_ma">
                        <span>交易单号</span>
                        <span class="mx_zz">{{mxg.order_sn}}</span>
                        <span class="mx_zz" v-if="mxg.order_sn =='' ">无</span>
                    </div>
                    <div class="mx_ma">
                        <span style="float:left;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</span>
                        <span class="" style="margin-left:5%;width:77%;display:block;float:left;text-align: right;color: #666;padding-bottom: 10px">{{mxg.desc}}</span>
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
            id:'',
            mxg:[]
        }
      },
      created(){
        this.id = this.$route.params.id;
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
                console.log(response)
                  if (response.status==200) {
                      this.mxg = response.data;
                  }
                }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/account_detail',{
                "token":token,
                "log_id":this.id
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style scoped>
    .mx_top{
        line-height: 60px;
        background: #fff;
        border-bottom: 1px solid #eee;
        padding-top: 50px;
    }
    .mx_topx{
        width:100%;
        background:#fff;
        border-bottom: 1px solid #eee;
        overflow: hidden;

    }
    .mx_tops{
        width:94%;
        margin-left: 3%;
    }
    .mx_ma{
        padding:6px 0;
      width: 100%;
    }
    .mx_zz{
        float:right;
        margin-right: 3%;
        color:#666;
    }
</style>
