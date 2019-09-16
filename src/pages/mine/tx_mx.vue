<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'提现记录'" :middle="'title'"/>
        <div class="jf">
            <div style="width:100%;position:fixed;z-index:999;background:#fff;">
                <div class="jf_top">
                    <div class="jf_tops">申请日期</div>
                    <div class="jf_tops">金额</div>
                    <div class="jf_tops">手续费</div>
                    <div class="jf_tops">状态</div>
                </div>
            </div>
            <div style="position:relative;top:41px;background:#fff;">
              <div class="jf_top" v-for="(item,index) in tx">
                  <div class="jf_tops h">{{item.time}}</div>
                  <div class="jf_tops h">{{item.money}}</div>
                  <div class="jf_tops h">{{item.taxfee}}</div>
                  <div class="jf_tops hong" v-if="item.status==0">申请中</div>
                  <div class="jf_tops hong" v-if="item.status==1">审核通过</div>
                  <div class="jf_tops hong" v-if="item.status==2">审核拒绝</div>
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
            tx:[],
        }
      },
      created(){
        this.getAjax();
     },
      components:{
        Header
      },
      methods:{
        getAjax:function () {
        var token = localStorage.getItem("login");
         var successCallback =  (response) => {
            if(response.status==200){
              this.tx = response.data
            }

          }
          var errorCallback =  (response) => {
              console.log('shibai')
          }
          this.$http.post(URL+'/api/user/withdrawals_list',{
            "token":token
          }).then(successCallback,errorCallback);
        }


      }
    }
</script>
<style scoped>
    .jf{
        width:100%;
        background:#fff;
        padding-top: 50px;
    }
    .jf_top{
        width:90%;
        margin-left: 5%;
        border-bottom:1px solid #fbfbfb;
        overflow:hidden;
    }
    .jf_top:last-child{
      border:none;
    }
    .jf_tops{
        width:25%;
        float:left;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .h{
        color:#666;
    }
    .hong{
        color:#e01222;
    }

</style>
