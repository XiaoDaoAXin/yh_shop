<template>
  <!--
    参数：
      type{
        type：text  普通文本框
        type: iconText  icon+文本框
        type: back  返回按钮(系统自带，返回不准确，有可能会出现死循环)
        type: routers  返回按钮（精准返回，建议使用）
        type: ""    为空

      }
      title{
        title: "ddddd"  文本标题
        title: ""       空文本标题
      }
      choice{
        right: choice   显示选项按钮
        right: mine  显示我的按钮
      }
      value{
        value: '手机'   返回参数
        value: ''
      }
      middle{
        middle: 'title'  设置标题
        middle: 'search'  设置搜索文本框
      }
      background{
        background: '#000'    //设置背景颜色
        background: ''        //不做任何选择
      }
  -->
  <!--头部-->
  <header :style="background?'background: '+background+';color: #fff;border: none':''">
    <div class="header">
      <!--普通文本框-->
      <input type="text" placeholder="请输入关键词搜索的商品" v-if="type === 'text'?true:false" @keyup.enter="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" v-model="value3" @blur="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" />
      <!--icon+文本框-->
      <div class="h_search_typetext" v-if="type === 'iconText'?true:false" >
        <span class="iconfont icon-sousuo"></span>
        <input type="text"  placeholder="请输入关键词搜索的商品" class="h_search_typetext_text" @keyup.enter="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" v-model="value3" @blur="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" />
      </div>
      <!--返回按钮-->
      <div class="header_box">
        <a @click="backpath()" v-if="type === 'routers'?true:false">
          <span class="iconfont icon-fanhui" :style="background?'color: #fff':''"></span>
        </a>
        <a @click="back()" v-if="type === 'back'?true:false">
          <span class="iconfont icon-fanhui" :style="background?'color: #fff':''"></span>
        </a>
        <!--文本标题-->
        <span class="position_title" v-if="middle === 'title'?true:false">{{title?title:""}}</span>
        <input type="text" placeholder="请输入关键词搜索的商品" v-if="middle === 'search'?true:false" class="search_shops" @blur="submits()" v-model="inputSumit" @keydown.enter="submits"/>
      </div>
      <!--显示选项按钮-->
        <el-dropdown trigger="click" class="el-col" v-if="right === 'choice'?true:false" style="width: 27px;">
          <span class="iconfont icon-fenlei1" :style="background?'color: #fff;':''"></span>
          <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
            <el-dropdown-item :icon="el.icon" class="el-dropdown-item"  v-for="(el , index) in elComponent" :key="index">
              <router-link :to="el.href">{{el.title}}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <!--插槽-->
      <slot v-if="right == 'slot'"></slot>
    </div>
  </header>
</template>

<script>
  export default {
    props: ["type","title","right","middle","background",'backp'],
    data(){
      return {
        elComponent: [
          {icon: "el-icon-house",href: "/home",title: "首页"},
          {icon: "el-icon-finished",href: "/classs",title: "分类"},
          {icon: "el-icon-shopping-cart-2",href: "/cart",title: "购物车"},
          {icon: "el-icon-user",href: "/mine",title: "我的"},
        ],
        value3: '',
        data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive'],
        inputSumit: this.$route.query.value,
        userId: ''
      }
    },
    created(){
      this.userId = localStorage.getItem("login");
      if(this.$route.path !== '/login/login'&&this.userId !== ''&&this.$route.path !== '/payment')this.pathGavin();
      this.$nextTick(() => {
        setTimeout(() => {
          if(this.$route.path == '/home/shops')window.scrollTo(0 , this.$route.query.scroll);
        },100)
      })
    },
    methods:{
      //自动录入路径
      pathGavin(){
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
      },
      //商品搜索
      submits(){
        if(this.$route.query.searchid){
          this.$store.dispatch('getShopsClassSearch',{q:this.$route.query.searchid})
        }else{
          this.$store.dispatch('getShopsSearch',{q:this.inputSumit})
        }

        this.$router.replace({path: '/search/searchShops',query: {scroll: 0,value: this.inputSumit}})
      },
      //返回指定路径
      backpath(){
        let pathArr = ["/mine","/home/dateils/evaluate","/dateils/evaluate/evaluatedateils",'/dateils/fillOrder',"/payment","/mine/set","/mine/name","/mine/six","/mine/password","/mine/payword","/mine/dizhi","/mine/add_dizhi","/mine/bianji_dizhi/","/mine/order","/mine/order_xq","/mine/offorder_plan","/mine/coupon","/mine/coupon_center","/mine/team","/mine/news","/mine/logistics","/mine/tz","/mine/activity","/mine/collect","/mine/comment","/mine/comment_pl","/mine/comment_xq","/mine/exchange","/mine/track","/mine/integral","/mine/balance","/mine/yuer_mx","/mine/yuer_mxs","/mine/jf_mx","/mine/cz_mx","/mine/tx_mx","/mine/recharge","/mine/tx","/mine/card","/mine/my_card","/mine/addcard","/mine/my_addcard","/mine/code","/mine/call_order","/mine/phone","/mine/investment","/mine/investment","/mine/notice","/mine/notice_details","/mine/myorder","/mine/g_payd","/mine/g_selld","/mine/myposition","/mine/z_selld","/mine/z_payd","/cart"];       //路由路径
        let session = JSON.parse(sessionStorage.getItem("path"));     //获取路径
        let arr = [];
        if(this.$route.path !== '/login/login'){
          const pathPop = session.pop();        //删除最后一个，并返回
        }
        let path = session[session.length-1];     //获取本地存储数据的最后一个JSON
        let pathBoo = false
        /*
        *   如果未登陆情况下，上级是个人中心页，则跳转到首页
        * */
        for(let i=0;i<pathArr.length;i++){
          if(path.path == pathArr[i] && this.userId == null){
            pathBoo = true
          }
        }


        if(pathBoo){
          this.$router.replace("/");
        }else if(this.userId == null){
          this.$router.replace({
            path: session.length?path.fullPath:this.$router.replace('/'),     //返回路径
            query:{
              scroll: path.scroll||this.$route.query.scroll,    //滚动条
              value: path.value?path.value:'',       //文本框值
              listOption: path.listOption||false,   //返回商品样式
              type: path.type|| '',         //选择模式
              cartId: this.$route.query.cartId||'',               //购物车id
              shopId: this.$route.query.shopId||'',               //商品id
              type: this.$route.query.type||'',
            }}
          );
        }else{
          this.$router.replace({
            path: session.length?path.fullPath:this.$router.replace('/'),     //返回路径
            query:{
              scroll: path.scroll||this.$route.query.scroll,    //滚动条
              value: path.value?path.value:'',       //文本框值
              listOption: path.listOption||false,   //返回商品样式
              type: path.type|| '',         //选择模式
              cartId: this.$route.query.cartId||'',               //购物车id
              shopId: this.$route.query.shopId||'',               //商品id
              type: this.$route.query.type||'',                   //类型
            }}
          );
        }



        for(let i=0;i<session.length;i++){
          if(session[i]){
            arr.push(session[i])
          }
        }
        //更新本地存储的路由路径
        this.sessionStoragePath("path",arr);
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
      //返回
      back(){
        this.$router.replace(this.backp)
      }
    }
  }
</script>

<style scoped lang="scss">
  //头部
  header{
    background: #fdfdfd;
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    font-size: 12px;
    border-bottom: 1px solid #f7f7f7;
  }
  .header_box{
    display: inline-block;
  }
  .header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
  }
  header input{
    width: 90%;
    height: 30px;
    background: #f1f1f1;
    border-radius: 50px;
    padding-left: 10px;
    float: left;
  }
  .icon-fenlei1{
    font-size: 30px;
    float: right;
    color: #a6a5ab;
  }
  .el-col{
    float: right;
    width: 30px;
  }
  .el-dropdown-menu{
    height: 160px;
  }
  .el-dropdown-item{
    height: 35px;
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
  .h_search_typetext{
    background: #efefef;
    float: left;
    width: 85%;
    height: 33px;
    border-radius: 5px;
    line-height: 30px;
    position: relative;
  }
  .icon-sousuo{
    margin: 0 20px 0 10px;
  }
  .h_search_typetext_text{
    background:  rgba(255, 255, 255, 0);
    position: absolute;
    top: 0;
  }
  .h_search_right{
    float: right;
    text-align: center;
  }
  .icon-wode{
    display: block;
  }
  .search_shops{
    position: absolute;
    width: 71%;
    height: 30px;
    top: 50%;
    left: 50%;
    margin: -15px 0 0 -37%;
    text-align: center;
  }
  .h_search_right{
    float: right;
    text-align: center;
  }
  .icon-wode{
    display: block;
  }
  .lei{
    margin-top:4px;
    float:right;
    font-size: 24px;
    margin-right:3%;
  }
  .tjs{
    float: right;
    margin-top: 6px;
  }
  .h{
    color:#ff594a;
  }
</style>
