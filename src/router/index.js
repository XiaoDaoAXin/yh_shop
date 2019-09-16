import Vue from 'vue'
import Router from 'vue-router'
const mine = () => import('../pages/mine')
const home = () => import('../pages/home')
const classs = () => import('../pages/classs')
const cart = () => import('../pages/cart')

const homeHref = () => import('../pages/home/homeHref.vue');
const Phone = () => import("../pages/classs/RouterPages/phone.vue") //导入子路由手机数码
const Dateils = () => import("../pages/Tow/details/details.vue")   //导入详情路由
const Evaluate = () => import("../pages/Tow/evaluate/evaluate.vue")    //导入评论模块
const EvaluateDateils = () => import("../pages/Tow/evaluate/evaluateDateils/evaluateDateils.vue")
const FillOrder = () => import("../pages/Tow/details/fillOrder/fillOrder.vue")   //导入填写订单模块
const Payment = () => import("../pages/Tow/payment/payment.vue")   //导入支付订单模块
const Search = () => import("../pages/Tow/search/search.vue")    //导入搜索页面
const SearchShops = () => import("../pages/Tow/searchShops/searchShops.vue")   //导入搜索商品页面模块
const Spike = () => import("../pages/Tow/spike/spike.vue")           //秒杀
const set = () => import('../pages/mine/set')
const name = () => import('../pages/mine/name')
const six = () => import('../pages/mine/six')
const password = () => import('../pages/mine/password')
const payword = () => import('../pages/mine/payword')
const dizhi = () => import('../pages/mine/dizhi')
const add_dizhi = () => import('../pages/mine/add_dizhi')
const bianji_dizhi = () => import('../pages/mine/bianji_dizhi')
const order = () => import('../pages/mine/order')
const order_xq = () => import('../pages/mine/order_xq')
const call_order = () => import('../pages/mine/call_order.vue')
const coupon = () => import('../pages/mine/coupon')
const coupon_center = () => import('../pages/mine/coupon_center')
const news = () => import('../pages/mine/news')
const logistics = () => import('../pages/mine/logistics')
const tz = () => import('../pages/mine/tz')
const activity = () => import('../pages/mine/activity')
const login = () => import('../pages/Tow/login/login')
const reg = () => import('../pages/Tow/login/reg')
const new_word = () => import('../pages/Tow/login/new_word')
const collect = () => import('../pages/mine/collect')
const comment = () => import('../pages/mine/comment')
const comment_pl = () => import('../pages/mine/comment_pl')
const comment_xq = () => import('../pages/mine/comment_xq')
const exchange = () => import('../pages/mine/exchange')
const track = () => import('../pages/mine/track')
const integral = () => import('../pages/mine/integral')
const balance = () => import('../pages/mine/balance')
const yuer_mx = () => import('../pages/mine/yuer_mx')
const yuer_mxs = () => import('../pages/mine/yuer_mxs')
const jf_mx = () => import('../pages/mine/jf_mx')
const cz_mx = () => import('../pages/mine/cz_mx')
const tx_mx = () => import('../pages/mine/tx_mx')
const recharge = () => import('../pages/mine/recharge')
const tx = () => import('../pages/mine/tx')
const card = () => import('../pages/mine/card')
const my_card = () => import('../pages/mine/my_card')
const addcard = () => import('../pages/mine/addcard')
const my_addcard = () => import('../pages/mine/my_addcard')
const code = () => import('../pages/mine/code')
const phone = () => import('../pages/mine/phone')
const team = () => import('../pages/mine/team')
const offorder_plan = () => import('../pages/mine/offorder_plan');
const orderCollage = () => import('../pages/mine/order_collage');             //拼团订单
const Investment = () => import("../pages/mine/investment.vue");             //投资记录
const Notice = () => import("../pages/mine/notice.vue");                     //公告
const NoticeDetails = () => import("../pages/mine/notice_details.vue");     //公告详情
const Assemble = () => import("../pages/Tow/Assemble/Assemble.vue");        //拼团
const Discount = () => import("../pages/Tow/discount/discount.vue")         //优惠券
const Stores = () => import("../pages/Tow/stores/stores.vue");              //多门店首页
const Integral = () => import("../pages/Tow/stores/integral.vue");          //多门店申请
Vue.use(Router)
export default new Router({
  //mode: 'history',
  routes: [
    {
      path: "/",
      redirect:"/home",

    },
    {
      path: '/home',
      component: home
    }, {
      path: '/classs',
      component: classs,
      children: [
        {path: "/",redirect:"/classs/phone"},
        {path: "/classs/phone", component: Phone},  //跳转手机数码
      ]
    }, {
      path: '/cart',
      component: cart,
      meta: {
        type: 'login'
      }
    },{
      path: '/homeHref',
      component: homeHref,
    },{
      path: '/mine',
      component: mine,
      meta: {
        type: 'login'
      }
    }, {
      //导入详情路由
      path : "/home/dateils",
      name: "details",
      component: Dateils,

    },{
      //导入评论模块
      path: "/home/dateils/evaluate",
      component: Evaluate
    },{
      //导入评论详情模块
      path: "/dateils/evaluate/evaluatedateils",
      component: EvaluateDateils,
      meta: {
        type: 'login'
      }
    },{
      //导入填写订单模块
      path: '/dateils/fillOrder',
      component: FillOrder,
      meta: {
        type: 'login'
      }
    },{
      //支付页面
      path: '/payment',
      component: Payment,
      meta: {
        type: 'login'
      }
    },{
      //搜索模块
      path: '/search',
      component: Search
    },{
      //导入搜索商品页面模块
      path: '/search/searchShops',
      component:  SearchShops
    },{
      //秒杀
      path: '/spike',
      component: Spike
    },
  // 设置
  {
    path: '/mine/set',
    name: 'set',
    component: set,
    meta: {
        type: 'login'
      }
  },
  // 修改昵称
  {
    path: '/mine/name',
    name: 'name',
    component: name,
    meta: {
        type: 'login'
      }
  },
  // 生日
  {
    path: '/mine/six',
    name: 'six',
    component: six,
    meta: {
        type: 'login'
      }
  },
  // 修改密码
  {
    path: '/mine/password',
    name: 'password',
    component: password,
    meta: {
        type: 'login'
      }
  },
  // 修改密码
  {
    path: '/mine/payword',
    name: 'payword',
    component: payword,
    meta: {
        type: 'login'
      }
  },
  // 地址
  {
    path: '/mine/dizhi',
    name: 'dizhi',
    component: dizhi,
    meta: {
        type: 'login'
      }
  },
  // 添加地址
  {
    path: '/mine/add_dizhi',
    name: 'add_dizhi',
    component: add_dizhi,
    meta: {
        type: 'login'
      }
  },
  // 编辑地址
  {
    path: '/mine/bianji_dizhi/:id',
    name: 'bianji_dizhi',
    component: bianji_dizhi,
    meta: {
        type: 'login'
      }
  },
  // 我的订单
  {
    path: '/mine/order',
    name: 'order',
    component: order,
    meta: {
        type: 'login'
      }
  },
  // 订单详情
  {
    path: '/mine/order_xq/:id',
    name: 'order_xq',
    component: order_xq,
    meta: {
        type: 'login'
      }
  },
  // 退款进度
   {
    path: '/mine/offorder_plan/:id',
    name: 'offorder_plan',
    component: offorder_plan,
    meta: {
        type: 'login'
      }
  },
  // 我的优惠券
  {
    path: '/mine/coupon',
    name: 'coupon',
    component: coupon,
    meta: {
        type: 'login'
      }
  },
  // 领劵中心
  {
    path: '/mine/coupon_center',
    name: 'coupon_center',
    component: coupon_center,
    meta: {
        type: 'login'
      }
  },
  // 我的团队
  {
    path: '/mine/team',
    name: 'team',
    component: team,
    meta: {
        type: 'login'
      }
  },
  // 我的消息
  {
    path: '/mine/news',
    name: 'news',
    component: news,
    meta: {
        type: 'login'
      }
  },
  // 物流信息
  {
    path: '/mine/logistics',
    name: 'logistics',
    component: logistics,
    meta: {
        type: 'login'
      }
  },
  // 通知信息
  {
    path: '/mine/tz',
    name: 'tz',
    component: tz,
    meta: {
        type: 'login'
      }
  },
  // 活动信息
  {
    path: '/mine/activity',
    name: 'activity',
    component: activity,
    meta: {
        type: 'login'
      }
  },
  // 登录
  {
    path: '/login/login',
    name: 'login',
    component: login,
    meta: {
        type:''

      }
  },
  // 注册
  {
    path: '/login/reg',
    name: 'reg',
    component: reg,
    meta: {

      }
  },
  // 重置密码
  /*{
    path: '/login/new_word',
    name: 'new_word',
    component: new_word,
    meta: {
        title: 'new_word',
        type: 'login'
      }
  },*/
  // 我的收藏
  {
    path: '/mine/collect',
    name: 'collect',
    component: collect,
    meta: {
        type: 'login'
      }
  },
  // 我的评价
  {
    path: '/mine/comment',
    name: 'comment',
    component: comment,
    meta: {
        type: 'login'
      }
  },
  // 评价晒单
  {
    path: '/mine/comment_pl/:id',
    name: 'comment_pl',
    component: comment_pl,
    meta: {
        type: 'login'
      }
  },
  // 评论详情
  {
    path: '/mine/comment_xq/:id',
    name: 'comment_xq',
    component: comment_xq,
    meta: {
        type: 'login'
      }
  },
  // 积分商城
  {
    path: '/mine/exchange',
    name: 'exchange',
    component: exchange,
    meta: {
        type: 'login'
      }
  },
  // 我的足迹
  {
    path: '/mine/track',
    name: 'track',
    component: track,
    meta: {
        type: 'login'
      }
  },
  // 积分明细
  {
    path: '/mine/integral',
    name: 'integral',
    component: integral,
    meta: {
        type: 'login'
      }
  },
  // 余额
  {
    path: '/mine/balance',
    name: 'balance',
    component: balance,
    meta: {
        type: 'login'
      }
  },
  // 账户明细
  {
    path: '/mine/yuer_mx',
    name: 'yuer_mx',
    component: yuer_mx,
    meta: {
        type: 'login'
      }
  },
  {
    path: '/mine/yuer_mxs/:id',
    name: 'yuer_mxs',
    component: yuer_mxs,
    meta: {
        type: 'login'
      }
  },
  // 积分明细
  {
    path: '/mine/jf_mx',
    name: 'jf_mx',
    component: jf_mx,
    meta: {
        type: 'login'
      }
  },
  // 充值明细
  {
    path: '/mine/cz_mx',
    name: 'cz_mx',
    component: cz_mx,
    meta: {
        type: 'login'
      }
  },
  // 提现明细
  {
    path: '/mine/tx_mx',
    name: 'tx_mx',
    component: tx_mx,
    meta: {
        type: 'login'
      }
  },
  // 充值
  {
    path: '/mine/recharge',
    name: 'recharge',
    component: recharge,
    meta: {
        type: 'login'
      }
  },
  // 提现
  {
    path: '/mine/tx/:id',
    name: 'tx',
    component: tx,
    meta: {
        type: 'login'
      }
  },
  // 银行卡
  {
    path: '/mine/card',
    name: 'card',
    component: card,
    meta: {
        type: 'login'
      }
  },
  // 2
   {
    path: '/mine/my_card',
    name: 'my_card',
    component: my_card,
    meta: {
        type: 'login'
      }
  },
  // 添加银行卡
  {
    path: '/mine/addcard',
    name: 'addcard',
    component: addcard,
    meta: {
        type: 'login'
      }
  },
  // 2
  {
    path: '/mine/my_addcard',
    component: my_addcard,
    meta: {
        type: 'login'
      }
  },
  // 二维码
  {
    path: '/mine/code',
    component: code,
    meta: {
        type: 'login'
      }
  },
  // 取消订单
  {
    path: '/mine/call_order/:id',
    component: call_order,
    meta: {
        type: 'login'
      }
  },
  // 修改手机号码
  {
    path: '/mine/phone',
    component: phone,
    meta: {
        type: 'login'
      }
  },// 投资记录
  {
    path: '/mine/investment',
    component: Investment,
    meta: {
      type: 'login'
    }
  },{
      //公告
      path: '/mine/notice',
      component: Notice,
      meta: {
        type: 'login'
      }
    },{
      //公告详情
      path: '/mine/notice_details',
      component: NoticeDetails,
      meta: {
        type: 'login'
      }
    },{
      //拼团订单
      path: '/mine/order_collage',
      component: orderCollage,
      meta: {
        type: 'login'
      }
    },{
      //拼团
      path: '/assemble',
      component: Assemble,
    },{
      //优惠券
      path: '/discount',
      component: Discount,
    },{
      //多门店
      path: '/stores',
      component: Stores,
    },{
      //多门店申请
      path: '/stores/integral',
      component: Integral,
    }
    ],
})
