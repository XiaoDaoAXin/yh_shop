<template>
    <div>
        <Header :type="'back'" :title="'充值记录'" :right="'choice'" :middle="'title'"/>
        <div class="jf">
            <div class="jf_top">
                <div class="jf_tops">支付方式</div>
                <div class="jf_tops">日期</div>
                <div class="jf_tops">金额</div>
                <div class="jf_tops">状态</div>
            </div>
            <div class="jf_top">
                <div class="jf_tops h">微信支付</div>
                <div class="jf_tops h">2019-4-07</div>
                <div class="jf_tops h">100.00</div>
                <div class="jf_tops hong">待支付</div>
            </div>
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
<style scoped>
    .jf{
        width:100%;
        /*background:#fff;*/
        padding-top: 50px;
    }
    .jf_top{
        width:90%;
        margin-left: 5%;
        border-bottom:1px solid #eee;
        overflow:hidden;
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
