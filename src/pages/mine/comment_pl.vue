<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'slot'" :title="'我的评论'" :middle="'title'">
        <div class="h_search_right">
          <div class="qb">
            <div class="shan" @click="btns">提交</div>
          </div>
        </div>
      </Header>
         <div class="top">
           <div class="pj">
                <div class="pjs">
                    <img :src="item.goods_thum_images" height="60" width="60" alt="" class="pj_img"/>
                    <div class="pj_xx">
                         <p class="pj_tit">{{item.goods_name}}</p>
                     </div>
                </div>
            </div>
         </div>
         <div  class="dy-content">
               <div>
                   <textarea placeholder="写下购买体会和使用感受来帮助其他小伙伴~" maxlength="200" v-model="messages" @input="descInput" class="tet"></textarea>
                   <!-- 限制textarea字数 -->
                   <div class="numberV">{{txtVal}}/200</div>
               </div>
         </div>
         <div class="image-lists">
            <div class="image-list">
                 <div class="head_img">
                   <img :src="img_t?img_t:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2958741368,2388767557&fm=26&gp=0.jpg'" @click.stop="uploadHeadImg" class="set_img"/>
                   <span class="iconfont icon-guanbi" v-if="img_t" @click="removeImgFn()"></span>
                 </div>
                 <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" style="display: none;"/>
                <!-- <div class="comment_img" style="padding-bottom: 10px;" ></div> -->
            </div>
         </div>
          <div class="pl_box">
            <div class="pl_lis">
                <span class="pl_tls l">评分</span>
                <span class="boxy r">满意请给5分哦</span>
            </div>
            <div class="pl_boxs">
              <div class="block">
                <span class="demonstration pl_tls">商品符合度</span>
                <el-rate v-model="value1" class="boxy"></el-rate>
              </div>
              <div class="block">
                <span class="demonstration pl_tls">店家服务态度</span>
                <el-rate v-model="value2" class="boxy"></el-rate>
              </div>
              <div class="block" style="padding-bottom:10px;">
                <span class="demonstration pl_tls">物流发货速度</span>
                <el-rate v-model="value3" class="boxy"></el-rate>
              </div>
            </div>
          </div>
    </div>
</template>
<script>
import $ from 'jquery';
import { Toast } from 'mint-ui';
import {URL} from "../../API/url.js";
import Header from "../../components/header/header.vue";
export default {
    data(){
        return{
            messages:"",
            txtVal: 0,
            isPhoto: true,
            imgcon:[],
            i:0,
            value1: null,
            value2: null,
            value3: null,
            rec_id:'',
            item:'',
            goods_id:'',
            order_id:'',
            img_t:''
        }
    },
    watch: {
          imgUrls: 'toggleAddPic'
        },
    components:{
        Header
      },
      created(){
        this.rec_id = this.$route.params.id
      },
    mounted(){

        this.getAjax();
      },
    methods:{

        descInput(){
          this.txtVal = this.messages.length;

        },
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                    this.item=response.order_goods;
                    this.order_id=response.order_goods.order_id;
                    this.goods_id=response.order_goods.goods_id;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/add_comment',{
                "token":token,"rec_id":this.rec_id
              }).then(successCallback,errorCallback);
        },
        btns:function(){
          var token = localStorage.getItem("login");
          if(this.messages==''){
            Toast({
              message:'请填写评价',
              position: 'bottom',
              duration: 1000
            });
            return
          }
          if(this.value1==''){
            Toast({
              message:'请给商品符合度评分',
              position: 'bottom',
              duration: 1000
            });
            return
          }
          if(this.value3==''){
            Toast({
              message:'请给店家服务态度评分',
              position: 'bottom',
              duration: 1000
            });
            return
          }
          if(this.value3==''){
            Toast({
              message:'请给物流发货速度评分',
              position: 'bottom',
              duration: 1000
            });
            return
          }
          var successCallback =  (response) => {
               if(response.status==200){
                    Toast({
                      message:response.msg,
                      position: 'bottom',
                      duration: 1000
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine'})
                    },1500)
                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
            }
            var errorCallback =  (response) => {
            }
            this.$http.post(URL+'/api/user/add_comment_post',{
              "token":token,
              "rec_id":this.rec_id,
              "goods_id":this.goods_id,
              "order_id":this.order_id,
              "content":this.messages,
              "comment_img_file1":this.img_t||'',
              "goods_rank":this.value1,
              "service_rank":this.value2,
              "deliver_rank":this.value3
            }).then(successCallback,errorCallback);

        },
        uploadHeadImg: function () {
          this.$el.querySelector('.hiddenInput').click()
        },
        // 将头像显示
        handleFile: function (e) {
            var that = this
          let $target = e.target || e.srcElement
          let file = $target.files[0]
          var reader = new FileReader()
          reader.onload = (data) => {
            let res = data.target || data.srcElement
            this.img_t = res.result

          }
            reader.readAsDataURL(file)
        },
        //删除图片
        removeImgFn(){
          this.img_t = ''
        }
    }
  }

</script>
<style  scoped>
    .pl_lis{
      height:40px;
      line-height: 40px;
      border-bottom: 1px solid #eeee;
      margin-top: 10px;
    }
    .set_img{
      width:70px;
      height:70px;
      margin: 5px 1px;
    }
    .l{
      margin-left: 3%;
    }
    .r{
      margin-right: 3%;
    }
    .block{
      overflow:hidden;
      margin:10px 0;
    }
    .pl_tls{
      float:left;
    }
    .boxy{
      float:right;
    }
    .pl_box{
      width:100%;
      background:#fff;
    }
    .pl_boxs{
      width:94%;
      margin-left: 3%;
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
  .h_search_right{
    float: right;
    text-align: center;
  }
  .qb{
    margin-top: 5px;
    font-size: 14px;
  }
  .shan{
    color:#f23030;
  }
  /**/
    .top{
      margin-top: 50px;
    }
    .pj{
        width:100%;
        background:#fff;
        margin-top: 12px;
        padding-bottom: 12px;
    }
    .pjs{
        width:90%;
        margin-left: 5%;
        overflow:hidden;
    }
    .pj_img{
        float:left;
        margin-top:10px;
    }
    .pj_xx{
        float:left;
        margin-left: 3%;
        width: 70%;
    }
    .pj_tit{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin:12px 0;
    }
    .pj_sj{
        color:#666;
        margin:12px 0;
    }
    .tet{
      background:#f3f5f7;
    }
    .numberV{
      margin-right: 3%;
      text-align: right;
      margin-bottom:15px;
    }
    .dy-content textarea{
      width:100%;
      height: 160px;
      border: 0px;
      padding: 15px 0 0 5%;
    }
    .list-default-img{
      padding: 10px 0;
    }
    .image-lists{
      width:100%;
      background:#fff;
    }
    .image-list{
      width:94%;
      margin-left: 3%;
    }
    .head_img{
      width: 20%;
      position: relative;
    }
    .icon-guanbi{
      position: absolute;
      top: 0;
      right: -5px;
      color: #cacaca;
    }
    .tjs{
      margin-left: 5%;
    }
    .xj_img{
        margin-top: 18px;
    }
    textarea:focus {
        outline: none;
    }

</style>
