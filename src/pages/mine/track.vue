<template>
    <div class="box">
        <Header :type="'routers'" :title="'我的足迹'" :right="'slot'" :middle="'title'">
          <div class="h_search_right">
            <div class="qb">
              <div class="shan" @click="cleak">清空</div>
              <div class="ggg"></div>
              <div class="bj" @click="showToggle">编辑</div>
            </div>
          </div>
        </Header>
       <div class="zjj"></div>
       <div class="zj" v-for='checkb in checkboxData' :key="checkb.id">
           <div class="zj_r">{{checkb.date}}</div>
             <div class="jf">
                <input type="checkbox" name='checkboxinput' :id="checkb.visit_id" v-show="isShow" v-model="checkboxList" :value="checkb.visit_id" class="xuan"/>
                <div class="jf_li">
                    <img :src="checkb.goods_thum_images" height="80" width="80" alt="" class="jf_img"/>
                    <div class="jf_lis">
                        <p class="jf_tit">{{checkb.goods_name}}</p>
                        <div class="jf_bb">
                            <span class="jf_sm">￥{{checkb.shop_price}}</span>
                            <router-link :to="{path: '/search/searchShops',query: {value:checkb.cat_id}}">
                              <span class="jf_dh">看相似</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
       </div>
       <!-- <div class="he"></div> -->
       <!-- bottom -->
      <div class="bottom" v-show="isShow">
          <div class="le">
              <input type="checkbox" v-model='checked' value="Car" class="xuan xuans" @click="checkAll"/><span>全选</span>
          </div>
          <div class="sc" @click="del">删除</div>
      </div>
      <div class="show" v-show="ishei">
          <img src="../../img/none2.png" height="98" width="80" alt="" /><br /><br />
          <p>还没有浏览记录</p>
      </div>
    </div>
</template>
<script type="text/javascript">
    import Header from "../../components/header/header.vue";
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    import {URL} from "../../API/url.js";
    export default {
    data:function() {
        return{
         isShow:false,
         ishei:'',
         a:1,
         checked: false,
         checkboxList:[],
         checkboxData:[]
        }
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

                  if (response.status==200) {

                      this.checkboxData=response.data;
                  }else{

                      this.ishei = true;
                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/visit_log',{
                "token":token
              }).then(successCallback,errorCallback);
        },
        del:function () {
            var visit_ids=this.checkboxList
            var token = localStorage.getItem("login");
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
              this.$http.post(URL+'/api/user/del_visit_log',{
                "token":token,"visit_ids":visit_ids
              }).then(successCallback,errorCallback);
        },
        cleak:function(){
            MessageBox({
              title: '提示',
              message: '确定要清空全部浏览记录？',
              showCancelButton: true
            }).then(action => { 
                 if (action == 'confirm') {    
                 
                      var token = localStorage.getItem("login");
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
                        this.$http.post(URL+'/api/user/clear_visit_log',{
                          "token":token
                        }).then(successCallback,errorCallback);
                 }
                 }).catch(err => { 
                 if (err == 'cancel') {    
                 
                 } 
            })
        },
        showToggle:function(){
            this.isShow = !this.isShow
        },
        checkAll:function() {
           if (this.checked) {//实现反选
                this.checkboxList = [];
            } else { //实现全选
                this.checkboxList = [];
                this.checkboxData.forEach( (item) => {
                    this.checkboxList.push(item.visit_id);
                });
            }
        }
      }
    }
</script>
<style scoped>
    .zj_r{
        height:40px;
        line-height: 40px;
        background:#fff;
        padding-left: 5%;
        border-bottom:1px solid #eee;
    }
    .zjj{
        height:50px;
        background:#fff;
    }
     .jf{
        width:100%;
        background:#fff;
        padding: 10px 0;
    }
    .jf_li{
        width: 85%;
        margin-left: 5%;
        overflow:hidden;
    }
    .jf_img{
        float:left;
    }
    .jf_lis{
        float:left;
        width:67%;
        margin-left: 3%;
    }
    .jf_tit{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin:12px 0;
    }
    .jf_sm{
        color:#f23030;
    }
    .jf_bb{
        margin:18px 0;
    }
    .jf_dh{
        padding:3px 7px;
        border:1px solid #eee;
        float: right;
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
  .qb{
    margin-top: 5px;
    font-size: 14px;
  }
  .shan{
    float:left;
    color:#999;
    height:18px;
    padding:0 5px;
  }
  .ggg{
    float:left;
    background:#999;
    width:1px;
    height:15px;
    margin-top: 3px;
  }
  .bj{
    float:left;
    height:18px;
    color:#999;
    padding:0 5px;
  }
  .xuan{
    float: left;
    margin: 30px 3% 0px 3%;
  }
  .xuans{
     margin: 17px 3% 0 10%;
  }
  .bottom{
    width:100%;
    height:50px;
    line-height: 50px;
    overflow:hidden;
    position:fixed;
    bottom:0;
    background: #fff;
  }
  .le{
    float:left;
    width: 30%;
  }
  .sc{
    float:right;
    width:30%;
    background:#f23030;
    color:#fff;
    text-align: center;
  }
  .he{
    height:15px;
    background:#fff;
  }
  .show{
    margin-top: 50px;
    color:#777;
    text-align:center;
    }
</style>
