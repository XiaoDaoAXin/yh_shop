<template>
    <div class="zo">
      <!--头部-->
      <Header :type="'routers'" :right="'choice'" :title="'设置'" :middle="'title'" />
        <div class="set_li tx">
            <span class="set_lil">头像</span>
        <div class="item_bock head_p image-list">
             <div class="head_img">
               <img :src="img_t" @click.stop="uploadHeadImg"  class="set_img"/>
             </div>
             <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
        </div>

        </div>
        <router-link to="/mine/name">
            <div class="set_li">
                <span class="set_lil">用户名</span>
                <div class="set_lir">
                    <span>{{set.nickname}}</span>
                    <span class="iconfont icon-iconfontjiantou4 font"></span>
                </div>
            </div>
        </router-link>
        <router-link to="/mine/six">
            <div class="set_li">
                <span class="set_lil">性别</span>
                <div class="set_lir">
                    <span >{{six}}</span>
                    <span class="iconfont icon-iconfontjiantou4 font"></span>
                </div>
            </div>
        </router-link>
         <mt-datetime-picker
            lockScroll="true"
            ref="datePicker"
            v-model="dateVal"
            class="myPicker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value}年"
            month-format="{value}月"
            date-format="{value}日"
            @confirm="dateConfirm()">
        </mt-datetime-picker>
        <div class="set_li" @click="selectData">
            <span class="set_lil">生日</span>
            <div class="set_lir">
                <div class="selectTime"><p class="timeDes">{{this.selectedValue}}</p></div>
                <span class="iconfont icon-iconfontjiantou4 font"></span>
            </div>
        </div>
        <router-link to="/mine/phone">
            <div class="set_li">
                <span class="set_lil">修改手机</span>
                <div class="set_lir">
                    <span class="iconfont icon-iconfontjiantou4 font"></span>
                </div>
            </div>
        </router-link>
        <router-link to="/mine/password">
            <div class="set_li">
                <span class="set_lil">修改密码</span>
                <div class="set_lir">
                    <span class="iconfont icon-iconfontjiantou4 font"></span>
                </div>
            </div>
        </router-link>
         <router-link to="/mine/payword">
            <div class="set_li">
                <span class="set_lil">支付密码</span>
                <div class="set_lir">
                    <span class="iconfont icon-iconfontjiantou4 font"></span>
                </div>
            </div>
        </router-link>
        <el-button type="text" class="out" @click="out">安全退出</el-button>
    </div>
</template>
<script>
    import Vue from 'vue'
    import $ from 'jquery';
    import Header from "../../components/header/header.vue";
    import {formatDate} from '../../uilt/formdata.js'
    import {DatetimePicker } from 'mint-ui'
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
    import {URL} from "../../API/url.js";
    Vue.component(DatetimePicker.name, DatetimePicker)
    export default {
    name: 'pickerDemo',
    data:function() {
        return{
            dateVal: '', // 默认是当前日期
            selectedValue: '',
            startDate: new Date('1950-01-01'),
            endDate:new Date('2520-01-01'),
            set:[],
            six:'',
            img_t:'',

        }
      },
      components:{
        Header
      },
       watch: {
          imgUrls: 'toggleAddPic'
        },
      mounted () {
            let that = this
            this.getAjax();
        },
      methods:{
        uploadHeadImg: function () {
              this.$el.querySelector('.hiddenInput').click()
            },
            // 将头像显示
            handleFile: function (e) {
                var that = this
              let $target = e.target || e.srcElement
              let file = $target.files[0]
              var reader = new FileReader()
              reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.img_t = res.result
                var token = localStorage.getItem("login");
                var successCallback =  (response) => {
                if(response.status==200){
                // this.img_t = response.head_pic
                  Toast({
                      message:'设置成功' ,
                      position: 'bottom',
                      duration: 2000
                    });
                }else{
                    Toast({
                      message:response.msg ,
                      position: 'bottom',
                      duration: 2000
                    });
                }
              }
              this.$http.post(URL+'/api/user/set_userinfo',{
                "token":token,
                "head_pic":this.img_t,
              }).then(successCallback);
              }
                reader.readAsDataURL(file)
            },
        openPicker() {
            this.$refs.picker.open();
        },
        selectData () { // 打开时间选择器
            // 如果已经选过日期，则再次打开时间选择器时，日期回显（不需要回显的话可以去掉 这个判断）
            if (this.selectedValue) {
                this.dateVal = this.selectedValue
            } else {
                this.dateVal = new Date()
            }
            this.$refs['datePicker'].open()
        },
        dateConfirm () { // 时间选择器确定按钮，并把时间转换成我们需要的时间格式
            this.selectedValue = formatDate(this.dateVal)
            var token = localStorage.getItem("login");
             var successCallback =  (response) => {
                if(response.status==200){
                  this.selectedValue = this.selectedValue
                  Toast({
                      message:'设置成功' ,
                      position: 'bottom',
                      duration: 2000
                    });
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
              this.$http.post(URL+'/api/user/set_userinfo',{
                "token":token,
                "birthday":this.selectedValue
              }).then(successCallback,errorCallback);
        },
        out:function(){
            MessageBox({
              title: '提示',
              message: '确定退出账号吗？',
              showCancelButton: true
            }).then(action => { 
                 if (action == 'confirm') {    
                      localStorage.removeItem('login')
                      this.$router.push({path:'/login/login'});
                      this.sessionIndex("mine",'')
                 }
                 }).catch(err => { 
                 if (err == 'cancel') {    
                 
                 } 
            })
        },
        getAjax:function () {
        var token = localStorage.getItem("login");
         var successCallback =  (response) => {
            if(response.status==200){
            localStorage.setItem('status',response.data.paypwd_status)
              this.set = response.data
              this.img_t = response.data.head_pic
              this.six = response.data.sex
              this.selectedValue = response.data.birthday
                if(response.data.sex==0){
                    this.six='保密';
                }else if(response.data.sex==1){
                    this.six='男';
                }else{
                    this.six='女';
                }
            }

          }
          var errorCallback =  (response) => {
          }
          this.$http.post(URL+'/api/user/userinfo',{
            "token":token
          }).then(successCallback,errorCallback);
        }

      }
    }
</script>
<style lang="scss" scoped>
    .hiddenInput{
        height: 80px;
        width: 80px;
        position: absolute;
        right: 0;
        opacity: 0;
        z-index: 99;
    }
    .zo{
      background:#fff;
    }
    .set_li{
        width:100%;
        height:46px;
        line-height: 45px;
        background:#fff;
        border-bottom: 1px solid #eee;
    }

    .tx{
        height:80px;
        margin-top: 50px;
        line-height: 80px;
    }
    .set_lil{
        margin-left: 3%;
        float: left;
    }
    .set_lir{
        float:right;
        margin-right: 3%;
    }
    .font{
        font-size: 14px;
    }
    .set_img{
        width: 60px;
        height: 60px;
        margin-top: 10px;
        margin-right: 3%;
        float: right;
        border-radius: 50%;
    }
    .out{
        width:90%;
        height:45px;
        border-radius: 5px;
        color:#fff;
        margin-left: 5%;
        background:#f23030;
        margin-top: 20px;
        margin-bottom:20px;
    }
    .selectTime{
        display: inline-block;
    }
</style>
