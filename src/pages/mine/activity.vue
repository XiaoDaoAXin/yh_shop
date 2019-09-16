<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'slot'" :title="'银行卡'" :middle="'title'">
        <div class="h_search_right">
          <div class="qb">
            <div class="shan" @click="cleak">清空</div>
            <div class="ggg"></div>
            <div class="bj" @click="showToggle">编辑</div>
          </div>
        </div>
      </Header>
      <div class="xi" v-show="isShow">
          <p>暂无消息记录～</p>
      </div>
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue"
export default {
    data:function() {
        return{
            isShow: '',
            a:1
        }
      },
      mounted(){
        console.log(this.a)
        if(this.a==1){
            this.isShow = true;
        }else{
            this.isShow = false;
        }
      },
      components:{
        Header
      },
    methods:{
        tui:function(){
            window.location.href="/mine"
        }
    }
    }
</script>
<style type="text/css" scoped>
/**/
.xi{
    width:100%;
    color:#666;
    text-align: center;
    padding-top: 100px;
}
</style>
