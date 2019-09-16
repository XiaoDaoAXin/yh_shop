<!--
  地图API：
  control: true,      开启测距
  panorama: true,     开启全景
  geolocation: true,  开启定位
  marker: true,       开启定点
  mapType: true,      地图类型
  navigation: true,   开启缩放
  localSearch: true,  开启搜索
  route: true,      开启公交路线
  route: true,      开启步行路线
  route: true,      开启驾车路线
  mapType: true,      公交路线检索
-->
<template>
  <baidu-map class="map" :center="location" :zoom="15"  ak="3.0&ak=xGFBufBDEtozYKbotu9Yb23jG6CQ7QtF" @click="locationClickFn"  @ready="setDistanceToolInstance">
    <gavin-marker v-if="marker" :position="location" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @dragstart="dragstart" ></gavin-marker>
    <gavin-geolocation v-if="geolocation"  anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess" @locationError="locationError"></gavin-geolocation>
    <gavin-panorama v-if="panorama"></gavin-panorama>
    <gavin-control v-if="control"><button class="" @click="openDistanceTool">开启测距</button></gavin-control>
    <gavin-map-type v-if="mapType" :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></gavin-map-type>
    <gavin-navigation v-if="navigation" anchor="BMAP_ANCHOR_TOP_RIGHT"></gavin-navigation>
    <section v-if="localSearch">
      <div class="localSearch">
        <label class="localSearch_lable">关键词：<input v-model="keyword" class="localSearch_lable_text" placeholder="请输入关键词"></label>
        <label class="localSearch_lable">地区：<input v-model="searchAddress" class="localSearch_lable_text" placeholder="请输入地区名"></label>
      </div>
      <gavin-local-search v-if="keyword||searchAddress" :keyword="keyword" :auto-viewport="true" :location="searchAddress" @infohtmlset="searchcomplete"></gavin-local-search>
    </section>
    <div class="localSearch"v-if="route">
      <bm-auto-complete v-model="starting" :sugStyle="{zIndex: 1}" @confirm="confirm_start">
        <label class="localSearch_lable">起点：<input v-model="starting" class="localSearch_lable_text" placeholder="请输入起点"></label>
        <gavin-local-search :panel='false' :keyword="starting" :auto-viewport="true" ></gavin-local-search>
      </bm-auto-complete>
      <bm-auto-complete v-model="end" :sugStyle="{zIndex: 1}" @confirm="confirm_end">
        <label class="localSearch_lable">终点：<input v-model="end" class="localSearch_lable_text" placeholder="请输入终点"></label>
        <gavin-local-search :panel='false' :keyword="end" :auto-viewport="true" ></gavin-local-search>
      </bm-auto-complete>
      <!--<div class="start_btn" @click="stateFn()">前往出发</div>-->
      <ul class="tab_route">
        <li class="tab_route_li" :class="routeNum == 3?'tab_route_li_active':''" @click="routeNum = 3">公交路线</li>
        <li class="tab_route_li" :class="routeNum == 1?'tab_route_li_active':''" @click="routeNum = 1">步行路线</li>
        <li class="tab_route_li" :class="routeNum == 2?'tab_route_li_active':''" @click="routeNum = 2">驾车路线</li>
      </ul>
    </div>
    <section v-if="route&&routeNum == 3">
      <gavin-transit :start="starting" :end="end" :auto-viewport="true" :location="end_city"></gavin-transit>
    </section>
    <section v-if="route&&routeNum == 1">
      <gavin-walking :start="starting" :end="end" :auto-viewport="true" :location="end_city"></gavin-walking>
    </section>
    <section v-if="route&&routeNum == 2">
      <gavin-driving :start="starting" :end="end" :startCity="start_city" endCity="end_city" :auto-viewport="true" ></gavin-driving>
    </section>
    <section v-if="mapType">
      <bm-bus keyword="331" :auto-viewport="true" location="北京"></bm-bus>
    </section>
  </baidu-map>
</template>

<script>
    import DistanceTool from 'bmaplib.distancetool'
    import { Toast } from 'mint-ui';
    export default {
      props:['control','panorama','geolocation','marker','mapType','navigation','localSearch','transit','walking','driving','mapType','route'],
      data () {
        return {
          location: {
            lng: this.$route.query.lng||116.404,
            lat: this.$route.query.lat||39.915
          },
          searchAddress: '',       //搜索关键词
          keyword: '',              //搜索地区
          starting: '',             //起点
          end: '',                  //终点
          routeNum: 0,              //下标
          start_city: '',           //开始城市
          end_city: '',             //结束城市
        }
      },

      methods:{
        //拖拽时获取经纬度
        dragstart(e){
          this.location.lat = e.point.lat
          this.location.lng = e.point.lng
        },
        //点击时获取经纬度
        locationClickFn(e){
          this.location.lat = e.point.lat
          this.location.lng = e.point.lng
        },
        //点击定位
        locationSuccess(e){
          this.location.lat = e.point.lat
          this.location.lng = e.point.lng
          this.$route.query.lat = e.point.lat
          this.$route.query.lng = e.point.lng
          this.starting = e.addressComponent.province+e.addressComponent.city+e.addressComponent.district+e.addressComponent.street+e.addressComponent.streetNumber;
        },
        //定位失败
        locationError(StatusCode){
          Toast(StatusCode)
        },
        //测距
        setDistanceToolInstance ({map}) {
          this.distanceTool = new DistanceTool(map, {lineStroke : 2})
        },
        openDistanceTool (e) {
          const {distanceTool} = this
          distanceTool && distanceTool.open()
        },
        infohtmlset(e){
          //console.log(e)
          //this.location = e.item.value.business
        },
        //开始路线
        confirm_start(e){
          this.start_city = e.item.value.city;
        },
        //结束路线
        confirm_end(e){
          this.end_city = e.item.value.city;
        },
        //定位

      },
      unmount () {
        distanceTool && distanceTool.close()
      },
    }
</script>

<style scoped>
  .bm-view,.map {
    width: 100%;
    height: 100%;
  }
  .localSearch{
    width: 100%;
    margin: 0 auto;
    height: auto;
    overflow: hidden;
    background: #fff;
  }
  .localSearch_lable{
    width: 49%;
    display: inline-block;
    padding: 10px;
    color: #9e9e9e;
  }
  .localSearch_lable_text{
    padding: 10px 0;
    width: 100%;
    border-bottom: 1px solid #eee;
    display: block;
    margin: 0 auto;
  }
  .tab_route{
    width: 100%;
  }
  .tab_route_li{
    padding: 10px;
    display: inline-block;
    width: 32%;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
  }
  .tab_route_li_active{
    color: red;
    border-bottom: 1px solid red;
  }
</style>
