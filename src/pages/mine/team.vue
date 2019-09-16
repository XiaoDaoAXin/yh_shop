<template>
    <div>
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'我的团队'" :middle="'title'" />
        <div class="team">
            <div class="ne">
                <ul class="tab-tilte">
                    <li @click="cur=0" :class="{active:cur==0}">一级团队</li>
                    <li @click="cur=1" :class="{active:cur==1}">二级团队</li>
                    <li @click="cur=2" :class="{active:cur==2}">三级团队</li>
                </ul>
            </div>
            <div>   
                <div v-show="cur==0">
                    <div class="team_tit">
                        <span class="team_s">当前团队总人数：</span><span class="red">{{one_num}}</span>
                    </div>
                    <div class="lis" v-for='item in one'>
                        <div class="te_l">
                            <img :src="item.head_pic" height="60" width="60" alt="" class="imgs"/>
                        </div>
                        <div class="te_r">
                            <p class="te_rs hhh">{{item.nickname}}</p>
                            <p class="te_rs">{{item.mobile}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div v-show="cur==1">
                     <div class="team_tit">
                        <span class="team_s">当前团队总人数：</span><span class="red">{{two_num}}</span>
                    </div>
                    <div class="lis" v-for='item in two'>
                        <div class="te_l">
                            <img :src="item.head_pic" height="60" width="60" alt="" class="imgs"/>
                        </div>
                        <div class="te_r">
                            <p class="te_rs hhh">{{item.nickname}}</p>
                            <p class="te_rs">{{item.mobile}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div v-show="cur==2">
                     <div class="team_tit">
                        <span class="team_s">当前团队总人数：</span><span class="red">{{three_num}}</span>
                    </div>
                    <div class="lis" v-for='item in three'>
                        <div class="te_l">
                            <img :src="item.head_pic" height="60" width="60" alt="" class="imgs"/>
                        </div>
                        <div class="te_r">
                            <p class="te_rs hhh">{{item.nickname}}</p>
                            <p class="te_rs">{{item.mobile}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from "../../components/header/header.vue";
import { Toast } from 'mint-ui';
import $ from 'jquery'
import {URL} from "../../API/url.js";
export default {
    data:function() {
        return{
            elComponent: [
                {icon: "el-icon-house",href: "/home",title: "首页"},
                {icon: "el-icon-finished",href: "/classs",title: "分类"},
                {icon: "el-icon-shopping-cart-2",href: "/cart",title: "购物车"},
                {icon: "el-icon-user",href: "/mine",title: "我的"},
              ],
            cur:0,
            isShow:'',
            one:[],
            two:[],
            three:[],
            one_num:'',
            two_num:'',
            three_num:''
            


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
            if(response.status==200){
              this.one=response.one
              this.two=response.two
              this.three=response.three
              this.one_num=response.one_num
              this.two_num=response.two_num
              this.three_num=response.three_num
            }
          }
          var errorCallback =  (response) => {
          }
          this.$http.post(URL+'/api/user/my_team',{
            "token":token,
            "type":'sex'
          }).then(successCallback,errorCallback);
        },
         tui:function(){
           this.$router.push({ path:'/mine'})
        }
      }
    }
</script>
<style scoped>
    .team{
        padding-top: 50px;
    }
    .team_tit{
        height:40px;
        line-height: 40px;
        background:#fff;
        margin-top: 3px;
    }
    .team_s{
        margin-left: 3%;
    }
    .red{
        color:#f23030;
    }
    .lis{
        width:100%;
        background:#fff;
        overflow: hidden;
        margin-top: 10px;
    }
    .imgs{
        border-radius: 50%;
        margin: 2px auto;

    }
    .te_l{
        float:left;
        margin-left: 3%;
    }
    .te_r{
        float:left;
        width:72%;
        margin-left: 3%;
        padding:10px;
    }
    .te_rs{
        margin:3px 0;
    }
    .hhh{
        font-weight: bold;
    }
    .ne{
        background:#fff;
    }
    .tab-tilte{
     width: 90%;
     margin-left: 5%;
     overflow:hidden;
    }
    .tab-tilte li{
        float: left;
        width: 33.33%;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
    }
    /* 点击对应的标题添加对应的背景颜色 */
    .tab-tilte .active{
        color: #f23030;
        border-bottom:1px solid #f23030;
    }
</style>
