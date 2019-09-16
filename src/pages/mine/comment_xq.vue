<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'choice'" :title="'订单评价'" :middle="'title'" />
        <div class="box">
            <div class="pj_xq">
                <img :src="pl.head_pic" height="32" width="32" alt="" class="xq_img"/>
                <span>{{pl.username}}</span>
                <span class="xq_ri">{{pl.add_time}}</span>
            </div>
            <div class="pj_ly">
                <el-rate
                  v-model="pl.goods_rank"
                  disabled
                  show-score
                  text-color="#f10"
                  score-template="{value}" class="xx">
                </el-rate>
                <p class="pl">{{pl.content}}</p>
                <div class="imgimg">
                    <img :src="item" alt="" v-for="(item,index) in img"/>
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
             comment_id:'',
             pl:[],
             img:[]
        }
      },
      components:{
        Header
      },
      created(){
        this.comment_id = this.$route.params.id
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
                      this.pl= response.info;
                      this.img= response.info.img;
                      // this.value= response.info.goods_rank;
                  }
                }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/comment_info',{
                "token":token,
                "comment_id":this.comment_id
              }).then(successCallback,errorCallback);
        },
        tui:function(){
           this.$router.push({ path:'/mine/comment'})
        }
      }
    }
</script>
<style scoped>
    .box{
        padding-top: 50px;
        background: #fff;
    }
    .pj_xq{
        height:40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
    }
    .xq_img{
        margin:0 3%;
        border-radius: 50%;
        position: relative;
        bottom: 2px;
    }
    .xq_ri{
        float:right;
        margin-right: 3%;
    }
    .pj_ly{
        width:94%;
        margin-left: 3%;
    }
    .pl{
        display:block;
        padding:15px 0;
    }
    .imgimg img{
        width:18.9%;
        padding-bottom: 15px;
        margin-right: 1%;
    }
    .xx{
        margin-top: 10px;
    }
</style>
