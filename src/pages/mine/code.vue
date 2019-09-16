<template>
  <div class="ypl-flex">
    <!--头部-->
    <Header :type="'routers'" :right="'choice'" :title="'我的推荐'" :middle="'title'" />
    <div class="invitePosterPage flex">
      <img v-if="posterDataUrl" :src="posterDataUrl" class="poster-bg" alt="邀请海报"/>
      <div v-else id="poster" class="flex-row" style="position: relative">
        <img class="poster-bg" :src="qrcode"/>
        <canvas class="qr" id="qrCode-canvas"></canvas>
      </div>
    </div>
    <!-- <p style="color:red;position:absolute;bottom:16px;left:36%;">长按保存分享给好友即可发展下级</p> -->
  </div>
</template>

<script>
  // import $ from 'jquery'
  // import QRCode from 'qrcode'
  // import html2canvas from 'html2canvas';
  import Header from "../../components/header/header.vue"
  import {URL} from "../../API/url.js";
  export default {
    name: 'Poster',
    data () {
      return {
        posterDataUrl:'',
        qrcode:''
      }
    },
    mounted () {
       this.getAjax();
      // this.createQRCode()
      // setTimeout(function(){
      //        $('#show').remove()
      //     },600)
    },
    components:{
      Header
    },
    methods: {
      getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                if(response.status==200){
                  this.pic = response.pic;
                  this.qrcode = response.qrcode;

                }
              }
              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/qr_code',{
                "token":token
              }).then(successCallback,errorCallback);
        },
      // createQRCode () {
      //   //先用 QRCode 生成二维码 canvas，然后用 html2canvas 合成整张海报并转成 base64 显示出来
      //   let canvas = document.getElementById('qrCode-canvas')
      //   QRCode.toCanvas(canvas,(error) => {
      //        this.loading = false;
      //     if (error) {
      //     } else {
      //       //qrcode 生成的二维码会带有一些默认样式，需要调整下
      //       canvas.style.width = '120px'
      //       canvas.style.height = '120px'
      //       $("#qrCode-canvas").css("marginLeft","35%");
      //       let poster = document.getElementById('poster')
      //       html2canvas(poster).then(canvas => {
      //         this.posterDataUrl = canvas.toDataURL()
      //       });
      //     }
      //   })
      // }
    }

}
</script>
<style type="text/css">

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
/**/
  .invitePosterPage{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50px;
  }
  .poster-bg{
    width:100%;
    height:100%;
  }

</style>
