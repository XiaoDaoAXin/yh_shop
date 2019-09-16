// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './modules/config'
import "./uilt/css/Gavin.css"
import "./uilt/js/jquery.js"
import './uilt/js/loading.js'
import jquery from 'jquery'
//图片懒加载
import VueLazyload from "vue-lazyload"

import FastClick from 'fastclick' // 去除手机端点击300ms

FastClick.attach(document.body)
FastClick.prototype.focus = function(targetElement) {

    var length;

    //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError

    //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法

    if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {

        length = targetElement.value.length;

        targetElement.setSelectionRange(length, length);

        /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/

        targetElement.focus();

    } else {

        targetElement.focus();

    }

};

Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '/static/img/timg.gif',
  loading: '/static/img/timg.gif',
  attempt: 1,
  listenEvents: [ 'scroll' ]
})
//import css iconfont
import "./uilt/iconfont/iconfont.css"

import "./uilt/mint-ui/ui.css"
import { Swipe, SwipeItem , Actionsheet } from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Actionsheet.name, Actionsheet);

//import Element-ui componetns
import {Dropdown,DropdownMenu,DropdownItem,Button,Switch,Input,Rate,Progress,Select,Option,Carousel,Cascader,Upload,Dialog} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Dropdown)
.use(DropdownMenu)
.use(DropdownItem)
.use(Button)
.use(Switch)
.use(Input)
.use(Rate)
.use(Progress)
.use(Select)
.use(Option)
.use(Carousel)
  .use(Cascader)
  .use(Upload)
  .use(Dialog)
/*import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);*/


//import Vuex model
import store from "./store";

//import vue-ydui components
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
import {Slider, SliderItem} from 'vue-ydui/dist/lib.rem/slider';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
Vue.component(Slider.name, Slider);
Vue.component(SliderItem.name, SliderItem);

//富文本编辑器
import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
Vue.use(QuillEditor)

import "./uilt/css/style.css"
import "./uilt/js/ydui.flexible.js"
import './uilt/js/g-map-address.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

/**
 *  检测是否登录
 *
 */
Vue.prototype.$ = jquery
Vue.config.productionTip = false;
import {URL} from "./API/url.js"
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const type = to.meta.type
  // 判断该路由是否需要登录权限
  if (type =='login') {
    getAjax:{
      var token=localStorage.getItem("login");
      var successCallback =  (response) => {
        var data = eval('('+response+')')
        if(data.status==500){
          localStorage.removeItem('login')
          next('/login/login')
        }else{
          next()
        }
      }
      var errorCallback =  (response) => {
      }
      Vue.prototype.$.post(URL+'/api/login/check_login',{
        "token":token
      }).then(successCallback,errorCallback);
    }
    if (window.localStorage.getItem('login')) {
      next()
    } else {
      next('/login/login')
    }
  } else {
    next()  // 确保一定要有next()被调用
  }
})

/**
 * 商品存储
 */
Vue.prototype.sessionShop = function (key, newVal) {
  if (key === 'shop') {

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
}

/**
 * 数据缓存
 */
Vue.prototype.sessionIndex = function (key, newVal) {

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
