<template>
<div class="nearby">
  <Header type="routers" right="choice" title="我要开店" middle="title" />
  <!--个人信息-->
  <div class="integral" style="margin-top: 60px;">
    <p class="integral_title">个人信息</p>
    <!--联系人姓名-->
    <div class="integral_box">
      <p class="integral_box_t">联系人</p>
      <el-input v-model="name" placeholder="请输入您的称呼" class="integral_box_text"></el-input>
    </div>
    <!--联系人电话-->
    <div class="integral_box">
      <p class="integral_box_t">联系电话</p>
      <el-input v-model="phone" placeholder="请输入您的联系方式" class="integral_box_text"></el-input>
    </div>
    <!--联系人邮箱-->
    <div class="integral_box">
      <p class="integral_box_t">邮箱(选填)</p>
      <el-input v-model="email" placeholder="请输入商家邮箱" class="integral_box_text"></el-input>
    </div>
  </div>
  <!--店家信息-->
  <div class="integral">
    <p class="integral_title">店家信息</p>
    <!--店铺名称-->
    <div class="integral_box">
      <p class="integral_box_t">店铺名称</p>
      <el-input v-model="shop_name" placeholder="请输入店铺名称" class="integral_box_text"></el-input>
    </div>
    <!--店铺省份-->
    <div class="integral_box">
      <p class="integral_box_t">选择省份</p>
      <el-select v-model="shop_province" placeholder="请选择">
        <el-option
          v-for="item in data_province"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--店铺城市-->
    <div class="integral_box">
      <p class="integral_box_t">选择城市</p>
      <el-select v-model="shop_city" placeholder="请选择">
        <el-option
          v-for="item in data_city"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--店铺区域-->
    <div class="integral_box">
      <p class="integral_box_t">选择区域</p>
      <el-select v-model="shop_area" placeholder="请选择">
        <el-option
          v-for="item in data_area"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--店铺详细地址-->
    <div class="integral_box">
      <p class="integral_box_t">详细地址</p>
      <el-input v-model="shop_address" placeholder="请输入详细地址" class="integral_box_text"></el-input>
    </div>
    <!--店铺经营类目-->
    <div class="integral_box">
      <p class="integral_box_t">经营类目</p>
      <el-select v-model="shop_category" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--店铺月营业额-->
    <div class="integral_box">
      <p class="integral_box_t">月营业额</p>
      <el-input v-model="shop_amount" placeholder="请输入月营业额" class="integral_box_text"></el-input>
    </div>
    <!--店铺营业许可-->
    <div class="integral_box">
      <p class="integral_box_t">是否持有营业许可证</p>
      <el-select v-model="shop_business_if" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--营业许可照片-->
    <div class="integral_box">
      <p class="integral_box_t">上传营业许可证</p>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :auto-upload="true"
        :limit="4"
        :before-upload="change()"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <!--店铺轮播图-->
    <div class="integral_box">
      <p class="integral_box_t">上传店铺轮播图片</p>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :limit="4">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <!--店铺详情-->
    <div class="integral_box">
      <p class="integral_box_t">店铺详情</p>
      <quill-editor ref="myTextEditor"
                    v-model="content">
      </quill-editor>
    </div>
    <!--店铺介绍-->
    <div class="integral_box">
      <p class="integral_box_t">店铺介绍</p>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="shop_conent"
        maxlength="30"
        show-word-limit
      />
    </div>
    <!--店铺定位（请在店铺所在地定位）-->
    <div class="integral_box">
      <button class="quisition" :style="location.lat?'background: linear-gradient(33deg, #6DE195, #C4E759)':'background: linear-gradient(33deg, #DEB0DF, #A16BFE);'" @click="address = true">{{location.lat?`已获取店铺位置：${location.lat},${location.lng}`:'店铺定位（请在店铺所在地定位）'}}</button>
    </div>
  </div>
  <button class="quisition" @click="submit">我要开店</button>
  <!--地图-->
  <div class="mapbox" v-if="address">
    <div class="mapbox_box"  @click="address = false"></div>
    <div class="mapbox bm-view"> 
      <BaiduMap geolocation="true" navigation="true" marker="true" />
      <button class="quisition" @click="addressFn" :style="location.lat?'background: linear-gradient(33deg, #6DE195, #C4E759)':'background: linear-gradient(33deg, #DEB0DF, #A16BFE);'">{{location.lat?'已获取':'未获取(请点击地图右下角获取)'}}</button>
    </div>
  </div>
</div>
</template>

<script>
	import Header from '../../../components/header/header.vue';
	import BaiduMap from "../../../components/baiduMap/baiduMap.vue";
	import {mapState} from 'vuex'
  import { Toast } from 'mint-ui';
	export default {
    data () {
      return {
        userId: '',
        dialogImageUrl: '',
        dialogVisible: false,
        name: '',                 //姓名
        phone: '',                //手机号
        email: '',                //邮箱
        shop_name: '',           //商品名称
        shop_province: '',       //已选择省份
        shop_city: '',            //已选择市区
        shop_area: '',            //已选择区域
        data_province: [],       //省份数据
        data_city: [],            //市区数据
        data_area: [],            //区域数据
        shop_address: '',         //详细地址
        shop_category: '',        //经营类目
        shop_amount: '',          //月营业额
        shop_business_if: '',     //是否持有营业许可证
        shop_conent: '',          //店铺介绍
        options: [],              //省市区地区
        disabled: false,
        content: '',   //富文本编辑
        address: false,           //地图
        location: {
          lng: '',
          lat: '',
        },                         //经纬度
        submitIf: false,          //是否能提交
      }
    },
    watch: {

    },
    components:{
        Header,
        BaiduMap
    },
    created () {
      this.userId = localStorage.getItem("token");
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      change(file){
        console.log(file);
      },
      addressFn(){
        if(this.location.lat){
          this.address = false;
        }else{
          Toast('请点击地图右下角获取地址经纬度');
        }
      },
      //提交
      submit(){
        if(this.name == ''){
          Toast('请填写您的昵称！');                   //姓名
          return
        }else if(this.phone == arr[i]){
          Toast('请填写您的手机号！');                //手机号
          return
        }else if(this.email == arr[i]){
          Toast('请填写您的邮箱！');                  //邮箱
          return
        }else if(this.shop_name == arr[i]){
          Toast('请填写您的商店名称！');         //商店名称
          return
        }else if(this.shop_province == arr[i]){
          Toast('请填写店铺省份！');         //省份
          return
        }else if(this.shop_city == arr[i]){
          Toast('请填写店铺城市！');             //市区
          return
        }else if(this.shop_area == arr[i]){
          Toast('请填写店铺区域！');             //区域
          return
        }else if(this.shop_address == arr[i]){
          Toast('请填写店铺详细地址！');     //详细地址
          return
        }else if(this.shop_category == arr[i]){
          Toast('请填写店铺经营类目！');    //经营类目
          return
        }else if(this.shop_amount == arr[i]){
          Toast('请填写店铺月营业额！');      //月营业额
          return
        }else if(this.shop_business_if == arr[i]){
          Toast('请选择是否有营业许可证！');     //是否持有营业许可证
          return
        }else if(this.shop_conent == arr[i]){
          Toast('请填写店铺介绍！');          //店铺介绍
          return
        }else if(this.content == arr[i]){
          Toast('请填写店铺详情！');               //富文本编辑店铺详情
          return
        }else if(this.location.lat == arr[i]){
          Toast('请填写店铺定位！');         //店铺定位
          return
        }else{
          Toast('成功！');
        }
      }
    },
    computed:{
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    watch:{
      //监视是否打开地图
      address(val){
        if(val){
          var time = setInterval(() => {
            if(this.$route.query.lat){
              this.location.lat = this.$route.query.lat
              this.location.lng = this.$route.query.lng
              clearInterval(time);
            }
          },500);
        }
      },
      //监视是否有经纬度
      location(val){

      }
    }
	}
</script>

<style scoped lang="scss">
  //个人信息
  .integral{
    width: 100%;
    height: auto;
    overflow: hidden;
  }
  .integral_title{
    font-size: 16px;
    padding: 10px;
  }
  .integral_box{
    width: 100%;
    background: #fff;
    padding: 10px 15px;
  }
  .integral_box_t{
    padding-bottom: 10px;
    color: #9e9e9e;
  }

  .tpis{
    color: red;
    font-size: 12px;
    text-align: right;
    padding: 10px;
  }
  .quisition{
    background: -moz-linear-gradient(225deg, #ace, #f96);
    background: -webkit-gradient(linear,100% 0%,0 100%,from(#ace),to(#f96));
    background: -webkit-linear-gradient(225deg, #ace, #f96);
    background: -o-linear-gradient(225deg, #ace, #f96);
    background: linear-gradient(225deg, #ace, #f96);
    color: #fff;
    height: 50px;
    width: 94%;
    text-align: center;
    line-height: 50px;
    margin: 25px 3%;
    border-radius: 7px;
  }
  .popshop>p{
    flex: 1;
    font-size: 15px;
    color: #555;
  }
  .opshop>p{
    flex: 1;
    font-size: 15px;
    color: #555;
  }
  .mapbox{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }
  .mapbox_box{
    width: 100%;
    height: 100%;
    background: #0000005e;
    position: fixed;
    top: 0;
  }
  .bm-view {
    width: 80%;
    height: 40%;
    position: fixed;
    top: 50%;
    margin-top: -60%;
    left: 50%;
    margin-left: -40%;
  }

</style>
