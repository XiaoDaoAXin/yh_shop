<template>
  <section class="evaluateDateils">
    <Header :type="'routers'" :title="'评价详情'" :right="'choice'" :middle="'title'" />

    <!--评价区域-->
    <ul class="evaluate_ul">
      <li class="evaluate_ul_li">
        <!--用户信息-->
        <div class="ul_li_user">
          <div class="ul_li_user_header">
            <img :src="$route.query.head_pic" class="user_header_img" />
            <span class="user_header_phone">{{$route.query.username}}</span>
          </div>
          <div class="ul_li_user_time">{{$route.query.add_time}}</div>
        </div>
        <!--评价信息-->
        <div class="ul_li_evaluate">
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <span class="ul_li_evaluate_text">{{$route.query.content}}</span>
          <ul class="li_evaluate_ul">
            <li v-for="(image , index) in $route.query.img|| ''" :key="index" class="li_evaluate_ul_li"><img :src="url+image" class="li_evaluate_ul_li_img"/></li>
          </ul>
        </div>
        <div class="fabulous" @click="good($route.query.comment_id)">
          <div class="heart" id="like2" rel="like" :class="$route.query.good&&userId?'heartAnimation':''"><p style="margin-top: 15px">{{$route.query.zan_num}}</p></div>
        </div>
      </li>
    </ul>

    <!--回复区域-->
    <div class="r">
      <div class="reply">
        <!--评论回复次数-->
        <div class="reply_title">回复({{replys.length}})</div>
        <ul class="reply_ul">
          <li class="reply_li" v-for="(r,index) in replys" :key="index">
            <div class="reply_li_box">
              <img src="https://img.alicdn.com/imgextra/i1/0/O1CN014dIgfs1Q4m9Rxwzrf_!!0-rate.jpg_40x40.jpg" class="reply_li_box_img" />
              <div class="li_box_b">
                <div class="li_box_b_top">
                  <!--用户头像-->
                  <span class="li_box_b_top_title">{{r.user_name}} 回复：{{$route.query.username}}</span>
                  <!--用户评论时间-->
                  <span class="li_box_b_top_time">{{r.reply_time}}</span>
                </div>
                <!--用户评论文字-->
                <span class="li_box_b_text" v-html="r.content">
                </span>
              </div>

            </div>
          </li>
        </ul>
      </div>
    </div>
    <div style="height: 50px;"></div>
    <!--发起评论-->
    <div class="evaluate_launch">
      <div class="evaluate_launch_back" v-if="expressiom" @click="expressiom = false"></div>
      <div class="evaluate_launch_neirong">
        <!--表情图片-->
        <!--<div class="evaluate_launch_expression animated fadeInUpBig" v-if="expressiom">
          <div class="evaluate_launch_expression_box">
            <img :src="'/static/img/expression/'+(index+1)+'.gif'" v-for="(img,index) in 91" :key="index" class="evaluate_launch_expression_box_img" @click="expressionFn(index)"/>
          </div>
        </div>-->
        <!--发布评论回复和文字-->
        <div class="evaluate_launch_b">
          <div class="evaluate_launch_box">
            <!--<input type="text" placeholder="说点什么呗" class="evaluate_launch_text" v-model="replytext" />-->
            <!--<div class="evaluate_launch_box_img" @click="expressiom = !expressiom" :style="expressiom?'background: url(/static/img/imgs.png) 0px -31px':''"></div>-->
            <div type="text" contenteditable="true" v-html="replytext" class="text" v-model="replytext"></div>
            <input type="submit" value="发送" class="evaluate_launch_submit" @click="submit()" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
    import Header from "../../../../components/header/header.vue";
    import {URL} from "../../../../API/url.js";
    import {mapState} from "vuex";
    import {formatDate} from "../js/date.js";
    import { Toast , Indicator } from 'mint-ui';
    import {saveRange,insertContent,keepLastIndex} from "./js";   //导入已封装的方法，表情插入方法
    import {reqGive} from "../../../../API/index.js";
    export default {
      components:{
        Header
      },
      data(){
        return {
          value: Number(this.$route.query.goods_rank),
          url: URL,
          replys: [],
          replytext: "",     //回复内容
          userId: '',
          expressiom: false,      //表情
          expressionImg: String,       //图片
          date: ""          //日期
        }
      },
      created(){
        this.userId = localStorage.getItem("login");
        this.$store.dispatch("getReply",this.$route.query.comment_id);
        //获取回复内容
        if(this.userId){
          Indicator.open("加载中...");
        }
      },
      computed:{
        ...mapState(["reply","replysend"])
      },
      watch:{
        reply(val){
          if(val){
            Indicator.close();
            for(let i=0;i<val.length;i++){
              this.replys.push({content:this.expressionImgFn(val[i].content),user_name:val[i].user_name,reply_time: val[i].date});
            }
          }
        },
        replysend(val){
          if(val){
            this.replys = [];
            for(let i=0;i<val.length;i++){
              this.replys.push({content:this.expressionImgFn(val[i].content),user_name:val[i].user_name,reply_time: val[i].date});
            }
          }
          Toast("回复成功！");

          //清空文本框内容
          this.replytext = ''
          this.expressiom = false;
        }
      },
      methods:{
        submit(){
          const keyWord = ["你妈逼","小学生","SB","sb","傻逼","骚逼","二逼","你麻痹","尼玛币","你妈比","尼玛","垃圾","辣鸡","腊鸡","鸡巴","臭逼","强奸","屁眼","小鸡鸡","操尼玛","操你妈","草你妈","草拟吗","草泥马","艹尼玛","曹尼玛","沙雕","傻屌","曹尼玛"];
          this.replytext = document.getElementsByClassName("text")[0].innerHTML;
          if(this.userId&&this.replytext){
            keyWord.forEach((key) => {
              let str = "";
              let reg = new RegExp(key,"gi");
              for(var i=0;i<key.length;i++){
                str += "*";
              }
              let a = document.getElementsByClassName("text")[0];
              this.replytext = this.replytext.replace(reg,str);
            })
            this.$store.dispatch('getReplySend',{
              token: this.userId,
              comment_id: this.$route.query.comment_id,
              content: this.replytext
            });
          }else{
            if(this.userId == ''){
              Toast("亲~请登录后再评论");
            }else if(this.replytext == ''){
              Toast("亲~输入的内容不能为空哦！")
            }
          }
        },
        //表情处理
        expressionFn(index){
          let a = document.getElementsByClassName("text")[0];
          a.focus();
          saveRange();
          insertContent("<img src='/static/img/expression/"+(index+1)+".gif' style='height: 20px;width: 22px;padding: 0 1px;' />");
          keepLastIndex(a.innerHTML);
          this.replytext = a.innerHTML;
        },
        //表情图片解析
        expressionImgFn(val){
            let zuo = val.replace(/&lt;/g,'<');
            let you = zuo.replace(/&gt;/g,'>');
            let shuangyinghao = you.replace(/&quot;/g,'"');
            return shuangyinghao;
        },
        //评论点赞
        async good(commentid){
          //判断是否登录
          if(this.userId != ''){
            Indicator.open("这评价不错，给个赞！");
            const result = await reqGive(commentid,this.$route.query.id,this.userId);
            if(result.status == "200"){
              //点赞成功
              this.$route.query.zan_num++;
              this.$route.query.good++;
              Indicator.close();
            }else{
              //已经点赞
              Toast("您已经点过赞了！");
              Indicator.close();
            }
          }else{

          }

        },
      }
    }
</script>

<style scoped lang="scss">
  .evaluateDateils{
    background: #fff;
  }
  .evaluate_ul{
    width: 92%;
    margin: 0 auto;
    margin-top: 50px;
  }
  .evaluate_ul_li{
    padding-bottom: 10px;
  }
  .ul_li_user{
    height: 50px;
    border-bottom: 1px solid #eee;
    padding-top: 10px;
  }
  .ul_li_user_header{
    //padding: 10px 0 10px 0;
    float: left;
  }
  .user_header_img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .ul_li_user_time{
    float: right;
    line-height: 30px;
  }
  .ul_li_evaluate{
    margin: 10px 0 20px 0;
  }
  .li_evaluate_ul{
    margin-top: 10px;
    width: 100%;
  }
  .li_evaluate_ul_li{
    width: 30%;
    display: inline-block;
    margin-left: 10px
  }
  .li_evaluate_ul_li:first-of-type{
    margin-left: 0;
  }
  .li_evaluate_ul_li_img{
    width: 100px;
    height: 100px;
  }
  .fabulous_comment{
    margin-top: 10px;
    height: 40px;
  }
  .iconfont{
    margin-right: 5px;
  }
  .fabulous{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px #eee;
    text-align: center;
    line-height: 60px;
    margin: 0 auto;
  }
  .r{
    border-top: 10px solid #f8f8f8;
    margin-top: 20px;
  }
  .reply{
    margin: 0px auto;
    width:92%;
  }
  .reply_title{
    padding: 10px 0 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
  .reply_ul{
    padding: 20px 0 10px 0;
    height: auto;
    overflow: hidden;
    margin-bottom: 50px;
  }
  .reply_li{
    padding: 10px 0 20px 0;
    border-bottom: 1px solid #eee;
    height: auto;
    overflow: hidden;
  }
  .reply_li:last-of-type{
    border-bottom: 0;
  }
  .reply_li_box_img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    float: left;
  }
  .li_box_b{
    display: inline-block;
    float: left;
    width: 85%;
    margin-left: 10px;
  }
  .li_box_b_top{
    height: 20px;
  }
  .li_box_b_top_title{
    float: left;
  }
  .li_box_b_top_time{
    float: right;
    color:#c1c1c1;
  }
  .li_box_b_text{
    display: block;
  }
  .evaluate_launch{
    background: #eaeef1;
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
  }
  .evaluate_launch_neirong{
    width: 100%;
    position: fixed;
    bottom: 0;
  }
  .evaluate_launch_back{
    width: 100%;
    height: 100%;
    background: #bbbbbb8c;
    position: fixed;
    top: 0;
  }
  .evaluate_launch_b{
    width: 100%;
    background: #f5f5f5;
  }
  .evaluate_launch_box{
    width: 92%;
    padding: 10px 0 5px 0;
    margin: 0 auto;
  }
  .evaluate_launch_box .text{
    display: inline-block;
    width: 80%;
    height: 30px;
    background: #fff;
    border-radius: 50px;
    padding-left: 10px;
    line-height: 30px;
    overflow: hidden;
    outline: none;
    white-space: nowrap;
  }
  .evaluate_launch_box_img{
    background: url(../../../../../static/img/imgs.png) 0px -12px;
    width: 20px;
    height: 19px;
    display: inline-block;
    margin-bottom: 5px;
  }
  .evaluate_launch_text{
    height: 30px;
    border-radius: 50px;
    padding-left: 10px;
    width: 80%;
  }
  .evaluate_launch_submit{
    width: 15%;
    height: 30px;
    background: #f23030;
    color: #fff;
    border-radius: 5px;
    float: right;
  }
  //表情
  .evaluate_launch_expression{
    background: #fff;
    height: 160px;
    overflow: auto;
    padding: 6px;
    border-top: 1px solid #eee;
  }
  .evaluate_launch_expression_box{
    text-align: center;
  }
  .evaluate_launch_expression_box_img{
    padding: 10px;

  }

  //点赞
  .heart {
    background:url("../../../../../static/img/web_heart_animation.png");
    background-position:left;
    background-repeat:no-repeat;
    height:15px;
    width:50px;
    background-size:2900%;
    margin-top: 18px;
    display: inline-block;
  }

  @-webkit-keyframes heartBlast {
    0% {
      background-position:left;
    }
    100% {
      background-position:right;
    }
  }

  @keyframes heartBlast {
    0% {
      background-position:left;
    }
    100% {
      background-position:right;
    }
  }

  .heartAnimation {
    display:inline-block;
    -webkit-animation-name:heartBlast;
    animation-name:heartBlast;
    -webkit-animation-duration:1.3s;
    animation-duration:1.3s;
    -webkit-animation-iteration-count:2;
    animation-iteration-count:2;
    -webkit-animation-timing-function:steps(28);
    animation-timing-function:steps(28);
    background-position:right;
  }
</style>
