<template>
  <section>
    <!--头部-->
    <Header :type="'routers'" :title="'用户评价'" :right="'choice'" :middle="'title'" :routers="$route.query.path"/>
    <!--评价区域-->
    <section class="evaluate">
      <ul class="evaluate_ul">
        <li class="evaluate_ul_li" v-for="(xinxi , index) in eval" :key="index" >
          <!--用户信息-->
          <div class="ul_li_user">
            <div class="ul_li_user_header">
              <img :src="xinxi.head_pic" class="user_header_img" />
              <span class="user_header_phone">{{xinxi.username}}</span>
            </div>
            <div class="ul_li_user_time">{{xinxi.date}}</div>
          </div>
          <!--评价信息-->
          <div class="ul_li_evaluate">
            <el-rate
              v-model="xinxi.goods_rank"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
            <span class="ul_li_evaluate_text">{{xinxi.content}}</span>
            <ul class="li_evaluate_ul">
              <li class="li_evaluate_ul_li"><img v-for="(img) in xinxi.img"  :src="url+img" class="li_evaluate_ul_li_img"/></li>
            </ul>
          </div>
          <!--点赞评论-->
          <div class="fabulous_comment">
            <div class="fabulous" @click="good(xinxi.comment_id,index)">
              <div class="heart" id="like2" rel="like" :class="xinxi.good&&userId?'heartAnimation':''"></div>
              <span style="margin-left: -12px;position: absolute;top: 8px;">{{xinxi.zan_num}}</span>
            </div>
            <div class="comment" @click="comments(xinxi.comment_id,xinxi.date,xinxi.username,xinxi.goods_rank,xinxi.content,xinxi.zan_num,xinxi.img,xinxi.good,xinxi.head_pic)">
              <span class="iconfont icon-pinglun"></span>{{xinxi.evaluate_length}}
            </div>
          </div>
        </li>
      </ul>
    </section>
    <div class="notime" v-if="!eval.length">此商品暂无评论~</div>
  </section>
</template>

<script>
    import Header from "../../../components/header/header.vue";
    import {URL} from '../../../API/url.js'
    import {mapState} from 'vuex';
    import { Indicator , Toast } from 'mint-ui';
    import {reqGive} from "../../../API/index.js";
    export default {
      data(){
        return {
          img: ["https://img.alicdn.com/imgextra/i1/0/O1CN014dIgfs1Q4m9Rxwzrf_!!0-rate.jpg_40x40.jpg","https://img.alicdn.com/imgextra/i3/0/O1CN019Dva1W1Q4m9S3JivM_!!0-rate.jpg_40x40.jpg","https://img.alicdn.com/imgextra/i1/0/O1CN01IkTThz1Q4m9TTeh4y_!!0-rate.jpg_40x40.jpg"],
          eval: [],
          url: URL,
          userId:''
        }
      },
      computed:{
        ...mapState(['comment'])
      },
      components:{
        Header
      },
      created(){
        Indicator.open("加载中...");
        this.userId = localStorage.getItem('login');
        this.$store.dispatch('getComment',{goods_id:this.$route.query.id,token: this.userId});
      },
      methods:{
        //评论点赞
        async good(commentid,index){
          //判断是否登录
          if(this.userId){
            Indicator.open("这评价不错，给个赞！");
            const result = await reqGive(commentid,this.$route.query.id,this.userId);
            if(result.status == "200"){
              //点赞成功
              this.eval[index].zan_num++;
              this.eval[index].good++;
              Indicator.close();
            }else{
              //已经点赞
              Toast("您已经点过赞了！");
              Indicator.close();
            }
          }else{
            this.judegLogin("您还未登录！",2000)
          }

        },
        judegLogin(message,duration){
          this.publicLoading(message,duration);
          setTimeout(() => {
            this.publicLoading('正在跳转登录页面...',2500);
            setTimeout(()=>{
              this.$router.replace({path:'/login/login',query:{path: this.$route.fullPath}});
            },1500)
          },2000)
        },
        //loading加载状态弹窗
        publicLoading(message,duration){
          Indicator.close();
          Toast({
            message,
            duration: duration||3000
          });
        },
        //跳转评论
        comments(comment_id,add_time,username,goods_rank,content,zan_num,img,good,head_pic){
          if(this.userId){
            this.$router.replace({path: '/dateils/evaluate/evaluatedateils',query:{
                comment_id,     //评论模板id
                add_time,       //时间
                username,       //用户名
                goods_rank,     //评分
                content,        //内容
                zan_num,       //喜欢
                img,               //图片
                good,             //点赞
                id: this.$route.query.id,            //商品id
                head_pic          //
              }});
          }else{
            this.judegLogin("您还未登录！",2000);
          }
        },
        //时间处理，格式(2019-6-17 00:10:20)
        EnglishDate(timestamp) {
          var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var D = this.change(date.getDate()) + ' ';
          var h = this.change(date.getHours()) + ':';
          var m = this.change(date.getMinutes()) + ':';
          var s = this.change(date.getSeconds());
          return Y + M + D + h + m + s;
        },
        //时间处理
        change(t) {
          if (t < 10) {
            return "0" + t;
          } else {
            return t;
          }
        }
      },
      watch:{
        comment(val){
          if(val){
            let data = val.evaluate;
            for(let i=0;i<data.length;i++){
              this.eval.push({
                username: data[i].username,
                date: this.EnglishDate(data[i].add_time),
                goods_rank: data[i].goods_rank,
                zan_num: data[i].zan_num,
                content: data[i].content,
                evaluate_length: data[i].evaluate_length,
                comment_id: data[i].comment_id,
                good: data[i].good,
                img: data[i].img,
                head_pic: data[i].head_pic
              });
            }
            Indicator.close();
          }
          this.$nextTick(()=>{
            //window.scrollTo(0,this.$route.query.scroll)
            window.scrollTo(0,0)
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .evaluate{
    margin-top: 50px;
    background: #fff;
  }
  .evaluate_ul{
    width: 92%;
    margin: 0 auto;
  }
  .evaluate_ul_li{
    border-bottom: 1px solid #eee;
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
    width: 100%;
    display: inline-block;
    margin-left: 10px
  }
  .li_evaluate_ul_li:first-of-type{
    margin-left: 0;
  }
  .li_evaluate_ul_li_img{
    width: 100px;
    height: 100px;
    margin: 0px 10px 10px 0;
  }
  .fabulous_comment{
    margin-top: 10px;
    height: 40px;
    position: relative;
  }
  .fabulous,.comment{
    width: 48%;
    text-align: center;
    border: 1px solid #eee;
    padding: 5px;
    border-radius: 10px;
  }
  .fabulous{
    float: left;
  }
  .comment{
    float: right;
  }
  .iconfont{
    margin-right: 5px
  }
  .notime{
    padding-top: 70px;
    text-align: center;
    color: #b5b5b5;
  }

  //点赞
  .heart {
    background:url("../../../../static/img/web_heart_animation.png");
    background-position:left;
    background-repeat:no-repeat;
    height:15px;
    width:50px;
    background-size:2900%;
    margin-top: 2px;
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
