<template>
    <div>
      <Header :type="'routers'" :title="'摘卖单'" :right="'choice'" :middle="'title'"/>
        <div class="jf">
            <div class="jf_top">
                <div class="jf_tops">商品名称</div>
                <div class="jf_tops">剩挂单量</div>
                <div class="jf_tops">挂单价格</div>
                <div class="jf_tops">买卖</div>
                <div class="jf_tops">操作</div>
            </div>
            <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
             <div class="jf_top">
                <div class="jf_tops h">诗远·杜氏</div>
                <div class="jf_tops h">110</div>
                <div class="jf_tops h">10.00</div>
                <div class="jf_tops h">摘卖单</div>
                <div class="jf_tops hong"  @click="showd">摘单</div>
            </div>
        </div>
        <div v-show="isShow">
            888
        </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            isShow:false
        }
      },
      components:{
        Header
      },
      mounted(){

      },
      methods:{
        showd:function(){
            this.isShow = !this.isShow
        }
      }
    }
</script>
<style type="text/css" scoped>
    .jf{
        width:100%;
        background:#fff;
        padding-top: 50px;
    }
    .jf_top{
        width:90%;
        margin-left: 5%;
        border-bottom:1px solid #eee;
        overflow:hidden;
    }
    .jf_top:last-child{
        border-bottom:none;
    }
    .jf_tops{
        width:20%;
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
