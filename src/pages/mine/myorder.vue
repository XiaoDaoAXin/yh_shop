<template>
    <div>
      <Header :type="'routers'" :title="'我的挂单'" :right="'choice'" :middle="'title'"/>
       
    </div>
</template>
<script type="text/javascript">
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{

        }
      },
      components:{
        Header
      },
      mounted(){

      },
      methods:{

      }
    }
</script>
<style type="text/css" scoped>
 

</style>
