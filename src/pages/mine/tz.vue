<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'消息通知'" :middle="'title'" />
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
