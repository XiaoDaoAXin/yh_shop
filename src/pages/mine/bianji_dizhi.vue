<template>
    <div style="background:#fff;">
      <!--头部-->
      <Header :type="'routers'" :right="'slot'" :title="'编辑收货地址'" :middle="'title'">
        <div class="h_search_right" @click="out">
          <img src="../../img/move.png" height="26" width="26" alt="" />
        </div>
      </Header>
        <form @submit.prevent="showData">
        <div class="dz">
            <div class="add_li">
                <span class="sh">收货人：</span>
                <input type="text" class="addshr" style="padding-left: 6%;" v-model="names" />
            </div>
            <div class="add_li">
                <span class="sh">手机号码：</span>
                <input type="text" class="addshr" v-model="phone"/>
            </div>
          <div class="add_li">
                <span class="sh">省：</span>
                <div class="right r" style="gloat:left;">
                    <select name="public-choice" v-model="shq"  @change="getCouponSelected">
                        <option :value="item.id" v-for="(item,index) in province" >{{item.name}}</option>
                    </select>
                </div>
          </div>
          <div class="add_li">
                <span class="sh">市：</span>
                <div class="right r">
                    <select name="public-choice" v-model="shqs" @change="getCouponSelecteds">
                        <option :value="item.id" v-for="(item,index) in city">{{item.name}}</option>
                    </select>
                </div>
          </div>
          <div class="add_li">
                <span class="sh">区：</span>
                <div class="right r">
                    <select name="public-choice" v-model="shqss">
                        <option :value="item.id" v-for="(item,index) in district">{{item.name}}</option>
                    </select>
                </div>
          </div>
            <div class="add_li">
                <span class="sh">详细地址：</span>
                <input type="text" class="addshr" v-model="dizhi"/>
            </div>
            <div class="add_li">
                <span class="sh">设为默认地址</span>
                <mt-switch v-model="value"></mt-switch>
            </div>

        </div>
        <button class="btn" type="submit">保存该地址</button>
        </form>
    </div>
</template>
<script>
import VDistpicker from 'v-distpicker';
import { Toast } from 'mint-ui';
import Header from "../../components/header/header.vue";
import {URL} from "../../API/url.js";
export default {
    components: {VDistpicker},
    name: "particular",
    data:function() {
        return{
            value: false,
            names:'',
            phone:'',
            dizhi:'',
            province:[],
            shq:'',
            shqs:'',
            shqss:'',
            address:'',
            city:[],
            district:[],
            dizhi_id:''

        }
      },
      created(){
        this.dizhi_id = this.$route.params.id;
        this.getAjax()
      },
      components:{
        Header
      },
      methods:{
        getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                  this.province=response.province;
                  this.city=response.city;
                  this.district=response.district;
                  this.address=response.address;
                  this.names=response.address.consignee;
                  this.phone=response.address.mobile;
                  this.dizhi=response.address.address;
                  this.shq=response.address.province;
                  this.shqs=response.address.city;
                  this.shqss=response.address.district;
                  if (response.address.is_default==0) {
                    this.value=false;
                  }else{
                    this.value=true;
                  }

                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/edit_address',{
                "token":token,"id":this.dizhi_id
              }).then(successCallback,errorCallback);
        },
        getCouponSelected:function(){
            var successCallback =  (response) => {
                if(response.status==200){
                  this.city=response.city;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/get_city',{
                "province_id":this.shq
              }).then(successCallback,errorCallback);
        },
        getCouponSelecteds:function(){
            var successCallback =  (response) => {
                if(response.status==200){
                   this.district=response.district;
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/get_district',{
                "city_id":this.shqs
              }).then(successCallback,errorCallback);
        },
        showData:function(e){
             var token = localStorage.getItem("login");
              if (this.names=='') {
                        Toast({
                          message:'请填写收货人',
                          position: 'bottom',
                          duration: 2000
                        });
                        return
                      }
              if (this.phone=='') {
                    Toast({
                      message:'请填写手机号码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
              if (this.phone.length>11 || this.phone.length<10) {
                    Toast({
                      message:'请输入11位手机号码',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
              if (this.shq=='') {
                    Toast({
                      message:'请选择省',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
              if (this.shqs=='') {
                    Toast({
                      message:'请选择市',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
             if (this.shqss=='') {
                    Toast({
                      message:'请选择地区',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
             if (this.dizhi=='') {
                    Toast({
                      message:'请填写详细地区',
                      position: 'bottom',
                      duration: 2000
                    });
                    return
                  }
             var successCallback =  (response) => {
                if(response.status==200){
                    Toast({
                      message:'编辑成功',
                      position: 'bottom',
                      duration: 1000
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine/dizhi',query:{cartId: this.$route.query.cartId,shopId: this.$route.query.shopId,type: this.$route.query.type}})
                        var path = JSON.parse(sessionStorage.getItem("path"));
                        path.pop();
                        this.sessionIndex("path",path);
                    },1500)

                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/edit_address_post',{
                "token":token,
                "id":this.dizhi_id,
                "consignee":this.names,
                "mobile":this.phone,
                "province":this.shq,
                "city":this.shqs,
                "district":this.shqss,
                "address":this.dizhi,
                "is_default":this.value,
              }).then(successCallback,errorCallback);

        },
        out:function(){
          var token = localStorage.getItem("login");
          var successCallback =  (response) => {
                if(response.status==200){
                  Toast({
                      message: response.msg,
                      position: 'bottom',
                      duration: 1000
                    });
                    setTimeout(() =>{
                        this.$router.push({path:'/mine/dizhi',query:{cartId: this.$route.query.cartId,shopId: this.$route.query.shopId,type: this.$route.query.type}})
                      var path = JSON.parse(sessionStorage.getItem("path"));
                      path.pop();
                      this.sessionIndex("path",path);
                    },1500)
                }else{
                  Toast({
                      message: response.msg,
                      position: 'bottom',
                      duration: 1000
                    });
                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/del_address',{
                "token":token,
                "id":this.dizhi_id
              }).then(successCallback,errorCallback);
        }
      }
    }
</script>
<style scoped>
select {
    width:75%;
    height: 100%;
    padding: 0 3%;
    appearance:none;
    border:none;
    background: #fff;
}
select::-ms-expand { display: none; }
.dz{
    padding-top: 50px;
}
input{
    width:70%;
    height:44px;
    padding-left: 3%;
}
.sh{
    height:44px;
    float:left;
    margin-left: 5%;
}
.add_li{
    height:45px;
    line-height: 45px;
    background:#fff;
    border-bottom:1px solid #eee;
    overflow: hidden;
}
.addshr{
    float:left;
}
.mint-switch-core{
    margin-top: 6px;
}
.mint-switch{
    float: right;
    margin-right: 3%;
    margin-top: 6px;
}
.mint-switch-input:checked + .mint-switch-core{
    border-color: #e30000;
    background-color: #e30000;
}
.btn{
    width:90%;
    height:40px;
    margin-left: 5%;
    border-radius: 5px;
    background:#f23030;
    color:#fff;
    margin-top: 30px;
    margin-bottom: 30px;
}
header{
    background: #f8f8f8;
    height: 50px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    font-size: 12px;
  }
  .header_box{
    display: inline-block;
  }
  .header{
    width: 92%;
    margin: 0 auto;
    padding-top: 10px;
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
  .h_search_right{
    float: right;
    text-align: center;
  }
  .right{
    height: 45px;
  }
</style>
