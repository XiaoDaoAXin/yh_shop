<template>
    <div class="mine">
      <div class="top" >
        <div class="top_img">
          <router-link to="/mine/set">
          <span class="iconfont icon-set-s top_imgs" ></span>
          </router-link>
        </div>
        <div class="tops_img">
          <img :src="mine.head_pic" height="70" width="70" alt="" class="tops_imgs"/>
        </div>
        <div style="float:left;margin-left:5%;">
          <div class="li_top">
          <span class="col">昵称：</span><span class="top_xx" style="margin-top:5px;">{{mine.nickname}}</span>
          </div>
          <div class="li_top">
            <span class="col">等级：</span><span class="top_xx">{{mine.user_level}}</span>
          </div>
          <div class="li_top">
            <span class="col">I&nbsp;&nbsp;&nbsp;D：</span><span class="top_xx">{{mine.id_number}}</span>
          </div>
        </div>
      </div>
      <div class="top_li">
        <div class="li_t">
        <router-link to="/mine/balance" class="ji">
          <div class="li_l">
              <p class="li_p">{{mine.user_money}}</p>
              <p class="li_p">可用余额</p>
            </div>
        </router-link>
            <router-link to="/mine/balance" class="ji">
              <div class="li_l">
                <p class="li_p">{{mine.frozen_money}}</p>
                <p class="li_p">冻结金额</p>
              </div>
            </router-link>
        </div>
      </div>
      <div class="in_da">
        <div class="nei_li">
          <router-link :to="t.menu_url" v-for="(t,index) in tab" :key="index">
            <div class="lis">
              <img :src="t.icon" class="lis_img">
              <p class="lis_p">{{t.menu_name}}</p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="heights"></div>
        <Loading :type="1" v-if="loading"/>
        <appNav />
    </div>
</template>

<script>
import $ from 'jquery'
import appNav from "../../components/TabNav/appNav";
import Loading from '../../components/loading/loading.vue';
import {URL} from "../../API/url.js";
import {G_copy} from "../../uilt/js/public.js";     //公共方法
import { Toast , Indicator } from 'mint-ui';
import {mapState} from "vuex";
export default {
  data() {
    return {
      loading:false,
      mine:[],
      tab: [
        // {path: '/mine/order',classG: 'icon-dingdan',color: '#88147f',content: '我的订单'},
        // {path: '/mine/comment',classG: 'icon-iconfontevaluate',color: '#17abe3',content: '我的评价'},
        // {path: '/mine/team',classG: 'icon-icon-test',color: '#0061b2',content: '我的团队'},
        // {path: '/mine/collect',classG: 'icon-icon-test1',color: '#d3217b',content: '我的收藏'},
        // {path: '/mine/my_card',classG: 'icon-coupon',color: '#88147f',content: '银行卡'},
        // {path: '/mine/code',classG: 'icon-fapiao',color: '#d81e06',content: '我的推荐'},
        // {path: '/mine/dizhi',classG: 'icon-dizhiguanli',color: 'rgb(58, 225, 49)',content: '地址管理'},
        // {path: '/mine/track',classG: 'icon-zuji',color: 'rgb(126, 49, 225)',content: '我的足迹'},
        // {path: '/mine/jf_mx',classG: 'icon-duihuan',color: 'rgb(49, 225, 210)',content: '兑换记录'},
        // {path: '/mine/tx_mx',classG: 'icon-tixian',color: 'rgb(225, 49, 202)',content: '提现记录'},
        // {path: '/mine/yuer_mx',classG: 'icon-chongzhi',color: 'rgb(225, 49, 49)',content: '充值记录'},
        // {path: '/mine/investment',classG: 'icon-touzi',color: 'rgb(49, 77, 225)',content: '投资记录'},
        // {path: '/mine/myorder',classG: 'icon-form',color: 'rgb(225, 49, 218)',content: '我的挂单'},
        // {path: '/mine/g_payd',classG: 'icon-buy',color: '#ec4c4c',content: '挂买单'},
        // {path: '/mine/g_selld',classG: 'icon-sale',color: '#c041f5',content: '挂卖单'},
        // {path: '/mine/myposition',classG: 'icon-form',color: '#ec4c4c',content: '我的持仓'},
        // {path: '/mine/z_payd',classG: 'icon-buy',color: '#26a2ff',content: '摘买单'},
        // {path: '/mine/z_selld',classG: 'icon-sale',color: '#2ecc71',content: '摘卖单'},
      ],
      alerts: false,          //推广链接弹窗
      sessionIndexDate: []   //本地存储
    }
  },
  components: {
    appNav,
    Loading
  },
  mounted(){
    if(localStorage.getItem("mheadpic")){
        var response = JSON.parse(localStorage.getItem("mheadpic"))
        this.mine = response.data
        this.tab = response.nav
        setTimeout(()=>{
            this.getAjax();
        },500)
    }else{
        this.getAjax();
    }
  },
  created(){
    // this.sessionIndexDate = JSON.parse(sessionStorage.getItem("mine"));
    // if(this.sessionIndexDate){
    //   this.mine = this.sessionIndexDate.data
    //   this.tab = this.sessionIndexDate.nav
    // }
    if(this.$route.path !== '/login/login'&&this.userId !== ''&&this.$route.path !== '/login'){
      const session = JSON.parse(sessionStorage.getItem("path"));     //获取路径
      let boole = true;     //判断路径是否有重复
      let arr = [];         //初始化的数组
      let repeat = [];      //重复数组
      //讲初始已存入的本地路由路径进行处理
      if(session == null){
        arr = []
      }else{
        for(let i=0;i<session.length;i++){
          //做是否重复处理
          if(session[i].path == this.$route.path){
            boole = false;
            repeat = session[i];        //将已重复的路径筛出来
            session.splice(i,1);        //将已重复的路径移除
            arr.push(session[i]);       //将其他路径加入
          }else{
            arr.push(session[i]);
          }
        }
        if(!boole){
          arr.push(repeat);           //将重复路径放到最后
        }
        //对空值进行处理
        for(let i=0;i<arr.length;i++){
          if(!arr[i]){
            arr.splice(i,1)
          }
        }
        this.sessionStoragePath("path",arr);
      }
      /**
       * this.$route.query.path: 判断此路径是否存在
       * boole: 判断路径是否有重复
       */
      if(boole){
        arr.push({
          fullPath:this.$route.fullPath,
          path: this.$route.path,
          scroll: this.$route.query.scroll?this.$route.query.scroll:document.documentElement.scrollTop,    //滚动条
          value: this.$route.query.value?this.$route.query.value:'',       //文本框值
          listOption: this.$route.query.listOption?this.$route.query.listOption:false,   //返回商品样式
          type: this.$route.query.searchType||'',       //选择模式
        });
        this.sessionStoragePath("path",arr);
      }
      if(this.$route.path == '/home'){
        this.sessionStoragePath("path",[{
          fullPath:this.$route.fullPath,
          path: this.$route.path
        }]);
      }
    }
  },
  methods:{
    getAjax:function () {
      var token = localStorage.getItem("login");
        var successCallback =  (response) => {
          if(response.status==200){
            localStorage.setItem("mheadpic",JSON.stringify(response))
            this.mine = response.data
            this.tab = response.nav
          }
        }
        var errorCallback =  (response) => {
        }
        this.$http.post(URL+'/api/user/index',{
          "token":token
        }).then(successCallback,errorCallback);


    },
    //本地存储路由路径方法
    sessionStoragePath(key, newVal){
      if (key === 'path') {
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
          setItem: function (k, val) {
            sessionStorage.setItem(k, JSON.stringify(val));

            // 初始化创建的事件
            newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

            // 派发对象
            window.dispatchEvent(newStorageEvent)
          }
        }
        return storage.setItem(key, newVal);
      }
    },
    //复制文本
    copy(){
      G_copy(this.$refs.extensionText);
      this.alerts = false;
      Toast("复制成功！");
    }
  }
};
</script>

<style lang="scss" scoped>

/*.heights{
  height: 50px;
}*/
 #preloader_1{
    position: absolute;
    top: 50%;
    left: 42%;
}
#preloader_1 span{
    display:block;
    bottom:0px;
    width: 9px;
    height: 5px;
    background:#9b59b6;
    position:absolute;
    animation: preloader_1 1.5s  infinite ease-in-out;
}

#preloader_1 span:nth-child(2){
    left:11px;
    animation-delay: .2s;
}
#preloader_1 span:nth-child(3){
    left:22px;
    animation-delay: .4s;
}
#preloader_1 span:nth-child(4){
    left:33px;
    animation-delay: .6s;
}
#preloader_1 span:nth-child(5){
    left:44px;
    animation-delay: .8s;
}
@keyframes preloader_1 {
    0% {height:5px;transform:translateY(0px);background:#9b59b6;}
    25% {height:30px;transform:translateY(15px);background:#3498db;}
    50% {height:5px;transform:translateY(0px);background:#9b59b6;}
    100% {height:5px;transform:translateY(0px);background:#9b59b6;}
}

.mine {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.mine-container {
  flex: 1;
}
.top{
  background:linear-gradient(to right, #714df6, #9361ff);
  padding-bottom: 20px;
}
.top_img{
  width:100%;
  height:35px;
}
.top_imgs{
  float:right;
  text-align: center;
  color:#fff;
  font-size:23px;
  margin: 6px 3% 0 0;
}
.tops_img{
  margin-left: 5%;
  float:left;

}
.tops_imgs{
  border-radius: 5px;
}
.in_da{
  width:100%;
  margin-top: 10px;
  margin-bottom: 85px;
}
.col{
  color:#fff;
}
.top_xx{
  height:20px;
  line-height: 20px;
  text-align: center;
  color:#fff;
}
.li_top{
  height:23px;
  line-height: 23px;
}

.top_li{
  width:100%;
  background:#fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.ji{
    display: block;
    float: left;
    width: 50%;
    text-align: center;
}
a:active {
    text-decoration:none;
}
/*.li_l{
  width:49%;
  display:inline-block;
  text-align: center;
}*/
.li_p{
  margin:5px 0;
}
.nei_li{
  width:94%;
  margin:3%;
  background:#fff;
  overflow: hidden;
  box-shadow:1px 1px 18px #dedede;
  border-radius: 10px;
}
.lis{
  float:left;
  text-align: center;
  width:33.33%;
  border-right: 1px solid #fbfbfb;
  border-bottom: 1px solid #fbfbfb;
}
.lis_img{
  width: 32px;
  height: 32px;
  margin:27px 0 5px 0;
}
.lis_p{
  margin:5px 0 27px 0;
}
 /*余额充值*/
 .balance{
   width: 93%;
   padding: 16px 0;
   background: #fff;
   margin: 0px auto;
   border-radius: 10px;
   -webkit-box-shadow: 1px 1px 18px #e8e8e8;
   box-shadow: 1px 1px 18px #e8e8e8;
   margin-top: 15px;
 }
 .balance_b{
   float: left;
   font-size: 15px;
   padding-left: 15px;
 }
 .balance_recharge{
   float: right;
   font-size: 15px;
   padding-right: 15px;
 }
  /*存钱*/
  .save{
    width: 92%;
    height: 500px;
    margin: 0 auto;
    background: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    margin-top: 15px;
    box-shadow: 1px 1px 18px #dedede;
  }
  .save_top{
    padding: 10px;
    height: auto;
    overflow: hidden;
    border-bottom: 1px solid #eee;
  }
  .save_top_left{
    float: left;
    font-size: 16px;
  }
  .save_top_right{
    float: right;
  }
  .save_bottom{
    padding: 20px 10px;
    height: auto;
    overflow: hidden;
  }
  .save_bottom_left{
    float: left;
    width: 60%;
  }
  .save_bottom_left_btn{
    display: block;
    padding: 5px 10px;
    margin-top: 10px;
    border: 1px solid #7851f8;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    color: #7851f8;
    width: 135px;
  }
  .save_bottom_right{
    width: 39%;
    float: right;
  }
  .save_bottom_right_img{
    width: 60%;
  }
 /*弹窗*/
 .extension{
   width: 100%;
   height: 100%;
   position: fixed;
   z-index: 9999;
   background: rgba(0, 0, 0, 0.5);
   top: 0;
 }
 .extension_box{
   width: 80%;
   height: auto;
   overflow: hidden;
   background: #fff;
   top: 50%;
   left: 50%;
   margin: -100px -40%;
   position: absolute;
   -webkit-border-radius: 20px;
   -moz-border-radius: 20px;
   border-radius: 20px;
 }
 .extension_box_title{
   text-align: center;
   padding: .4rem 0;
   font-size: .4rem;
   color: #9c9c9c;
 }
 .extension_box_center{
   width: 90%;
   margin: 0 auto;
   padding: 0 0 .4rem 0;
   font-size: .3rem;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   color: #73efea;
 }
 .extension_box_center_tit{
   color: #fea51a;
 }
 .extension_box_btn{
   text-align: center;
   font-size: .3rem;
   padding: .2rem 0;
   color: #9c9c9c;
   width: 100%;
   border-top: 1px solid #eee;
 }
</style>
