<template>
    <div>
        <!--头部-->
        <Header :type="'routers'" :right="'slot'" :title="'银行卡'" :middle="'title'">
          <div class="h_search_right">
            <router-link to="/mine/my_addcard">
              <div class="tjs h">
                <span>添加</span>
              </div>
            </router-link>
          </div>
        </Header>
       <div class="txs">
          <div class="card" v-for='(item,index) in card'>
            <!-- <router-link :to="'/mine/tx/'+item.bank_id"> -->
                  <div class="card_a">
                    <p class="card_ar">{{item.bank_username}}</p>
                    <p class="card_ar">{{item.bank_name}}</p>
                    <p class="card_ar">{{item.bank_num}}</p>
                  </div>
            <!-- </router-link> -->
             <p style="float:right;font-size:24px;margin-right:3%;color:#fff;" @click="out(item.bank_id,index)">×</p>
          </div>
       </div>
    </div>
</template>
<script type="text/javascript">
    import Header from "../../components/header/header.vue";
    import {URL} from "../../API/url.js";
    export default {
    data:function() {
        return{
            card:[]
        }
      },
      mounted(){
        this.getAjax();
      },
      components:{
        Header
      },
      methods:{
          getAjax:function () {
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
            console.log(response)
                  if (response.status==200) {

                      this.card= response.data
                  }else{
                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/card',{
                "token":token
              }).then(successCallback,errorCallback);
        },
        out:function(e,index){
          console.log(index)
            var token = localStorage.getItem("login");
            var successCallback =  (response) => {
                  if (response.status==200) {
                    this.card.splice(index,1);
                  }else{

                  }
                }

              var errorCallback =  (response) => {
              }
              this.$http.post(URL+'/api/user/deletecard',{
                "token":token,
                "id":e,
              }).then(successCallback,errorCallback);
        },
        tui:function(){
           this.$router.push({ path:'/mine'})
        }
      }
    }
</script>
<style scoped>

.txs{
    width:100%;
    padding-top: 60px;
}
.add{
  font-size: 12px;
  color: #fff;
  float: right;
  margin-right:3%;
}
.card{
  width: 90%;
  height: 100px;
  background: #761cf1;
  border-radius: 5px;
  margin-left:5%;
  margin-top:15px;
  font-size:14px;
}
.card_a{
  width: 80%;
  line-height: 20px;
  margin-left:5%;
  padding-top:25px;
  display:inline-block;
  color: #fff;
}
.card_ar{
  display: block;
}
/**/
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
.tjs{
    float: right;
    margin-top: 6px;
  }
  .h{
    color:#ff594a;
  }
/**/
</style>
