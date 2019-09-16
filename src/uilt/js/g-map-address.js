import Vue from "vue";
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
import {
  BmMarker,
  BmGeolocation,
  BmNavigation,
  BmPanorama,
  BmControl,
  BmLocalSearch,
  BmTransit,
  BmWalking,
  BmDriving,
  BmBus,
  BmMapType,
  BmAutoComplete,
} from 'vue-baidu-map';


Vue.component('baidu-map',BaiduMap);              //地图
Vue.component('gavin-marker',BmMarker);              //地图定点
Vue.component('gavin-geolocation',BmGeolocation);   //地图定位
Vue.component('gavin-navigation',BmNavigation);     //地图缩放
Vue.component('gavin-panorama',BmPanorama);          //地图全景
Vue.component('gavin-control',BmControl);            //自定义控件
Vue.component('gavin-local-search',BmLocalSearch);  //地图搜索
Vue.component('gavin-transit',BmTransit);            //地图公交路线规划
Vue.component('gavin-walking',BmWalking);            //地图步行路线规划
Vue.component('gavin-driving',BmDriving);            //地图驾车路线规划
Vue.component('gavin-bus',BmBus);                    //地图公交路线检索
Vue.component('gavin-map-type',BmMapType);           //地图类型
Vue.component('bm-auto-complete',BmAutoComplete);           //地图类型
