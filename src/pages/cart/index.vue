<template>
  <div class="discover">
    <div class="dis-container">
      <!--导航栏-->
      <Header title="购物车" middle="title" right="choice" />

      <!--空购物车-->
      <div class="shop" v-if="shopCartList.length == 0">
        <span class="icon iconfont">&#xe682;</span>
        <p>购物车暂无商品</p>
        <router-link class="shop-go" to="/">去逛逛</router-link>
      </div>

      <!--购物车商品-->
      <div class="shop-list" v-else>
        <div class="list-new" v-for="(item, index) in shopCartList" :key="index" >
          <div class="list-list">
            <div class="list-left">
              <div class="radio">
                <input type="checkbox" :value="index" :checked="item.checked" @click.stop="addNumber(item.member_goods_price,item.goods_num,item.checked,item.id,index,item.goods_price)" />
                <img :src="url+item.img" @click="$router.replace({path: '/home/dateils',query:{path: $route.fullPath,id: item.shop_id}})" />
              </div>
            </div>
            <div class="list-right">
              <div class="list-right-top">
                <p>{{item.goods_name}}</p>
                <span class="icon iconfont" @click.stop="delerte(item.id,index,item.goods_price,item.goods_num)">&#xe610;</span>
              </div>
              <div class="list-font">{{item.spec_key_name}}</div>
              <div class="list-right-bottom">
                <p>¥{{item.goods_price}}</p>
                <div class="computation" id="app">
                  <button @click.stop="addSubtract(false,item.goods_id,item.id,item.goods_price,item.member_goods_price,index)" >-</button>
                  <input type="text" v-model="item.goods_num">
                  <button @click.stop="addSubtract(true,item.goods_id,item.id,item.goods_price,item.member_goods_price,index)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--商品列表-->
      <div class="shoppings" >
        <p class="title">看看热卖</p>
        <ul class="shoppings_ul">
          <li class="hotshop" v-for="(shop,index) in shopCartS" :key="index" @click="$router.replace({path: '/home/dateils',query:{path: $route.fullPath,id: shop.goods_id}})">
            <img :src="url+shop.original_img" />
            <a>{{shop.goods_name}}</a>
            <p>
                  <span>
                    ¥{{shop.shop_price}}
                  </span>
              <span style="font-size: 12px;color: #a9a9a9;text-decoration:line-through;">
                    ￥{{shop.market_price}}
                  </span>
            </p>
          </li>
        </ul>
      </div>
      <!-- <div style="height: 110px;float: left;width: 100%;"></div> -->
      <!--提交栏-->
      <div class="foohi" v-if="shopCartList.length">
        <div class="payit">
          <div class="alllef">
            <div class="radio">
              <input type="checkbox" @click="selectAll" :checked="checked" />
              <span class="all">全选</span>
            </div>
          </div>
          <div class="youbia">
            <span>总计：<i class="pmo">￥{{money}}</i></span>
            <!--<p class="lastime"><span>节省：￥{{nummoney}}</span></p>-->
          </div>
          <div class="fr" @click="submitShop">
            <a>去结算</a>
          </div>
        </div>
      </div>
    </div>
    <appNav />
    <Loading :type="1" v-if="loading"/>
  </div>
</template>

<script>
  import appNav from "../../components/TabNav/appNav";
  import Header from "../../components/header/header";
  import {mapState} from 'vuex';
  import {URL} from '../../API/url.js';
  import Loading from "../../components/loading/loading.vue";
  import {reqShopCartRemove,reqShopCartNumber,reqBuyImmediately} from "../../API/index.js";
  import { MessageBox ,Toast } from 'mint-ui';
  export default {
    data() {
      return {
        money: 0,
        nummoney: 0,
        selectArr:[],
        checked: false,
        Foohiti: true,
        url: URL,
        userId: String,       //用户ID
        shopCartList: [],     //已加入购物车商品列表
        shopCartS: [],        //购物车热卖商品列表
        goodsIdAdd: [],       //商品计算价格
        num: 0,                //记录进来次数
        price: 0,
        loading: false,
        cartId: [],           //购物车ID
        shopId: [],           //商品ID
        sessionCartDate: [],  //本地缓存
      }
    },
    watch: {
      shopcart(val){
        this.sessionIndex("cart",val.hot_goods);
        this.fn(val);
        if(!this.sessionCartDate){
          this.loading = false;
          this.shopCartS = val.hot_goods;//购物车热卖商品列表
        }
      },
      selectArr(val){
        this.cartId = [];
        this.shopId = [];
        for(let i=0;i<val.length;i++){
          this.cartId.push(val[i].id);
          this.shopId.push(val[i].goods_id);
        }

      }
    },
    methods:{
      fn(val,index){
        if(val){
          let data = val.cart_list;
          for(let i=0;i<data.length;i++){
            this.shopCartList.push({
              id: data[i].id,          //下标
              img: data[i].original_img,       //图片
              goods_id: data[i].id,       //购物车id
              shop_id: data[i].goods_id,    //商品id
              goods_name: data[i].goods_name,       //商品标题
              spec_key_name: data[i].spec_key_name,       //规格
              goods_price: data[i].goods_price,           //价格
              member_goods_price: data[i].member_goods_price,    //优惠价
              goods_num: Number(data[i].goods_num),      //数量
              checked: false,                   //是否选择
              spec_key: data[i].spec_key,       //规格id
            });
          }
        }
        this.loading = false
      },
      //全选反选
      selectAll(){
        if(this.checked == false){
          this.money = 0;
          this.nummoney = 0;
          this.checked = true;
          this.selectArr = [];
          for(let i=0;i<this.shopCartList.length;i++){
            this.shopCartList[i].checked = true;
            /**
             *  计算总价格
             *    优惠价格*商品数量 = 总价格
             */
            this.money +=Number(this.shopCartList[i].member_goods_price)*Number(this.shopCartList[i].goods_num);
            /**
             *   计算已优惠总价格
             *      （商品原价*商品数量）- （优惠价格*商品数量）= 已优惠价格
             */
            this.nummoney +=(Number(this.shopCartList[i].goods_price)*Number(this.shopCartList[i].goods_num))-(Number(this.shopCartList[i].member_goods_price)*Number(this.shopCartList[i].goods_num));
            this.money = Number(this.money.toFixed(2));           //保存后面两位小数
            this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
            this.selectArr.push(this.shopCartList[i])
          }
        }else{
          for(let i=0;i<this.shopCartList.length;i++){
            this.shopCartList[i].checked = false;
          }
          this.checked = false;
          this.money = 0;
          this.nummoney = 0;
          this.selectArr = []
        }

      },
      //计算价格
      addNumber(price,num,check,id,index,prices){
        this.price = price*num;
        if(check == false){
          for(let i=0;i<this.shopCartList.length;i++){
            if(id == this.shopCartList[i].id){
              this.shopCartList[i].checked = true;
            }
          }
          this.money += this.price;
          /**
           *    计算优惠价格
           *      总价格 - （优惠价*数量） =  优惠价格
           */
          this.nummoney += (Number(prices)*Number(num)) - this.price;
          this.money = Number(this.money.toFixed(2));           //保存后面两位小数
          this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
          this.selectArr.push(this.shopCartList[index]);      //将选择商品存入数组
        }else{
          for(let i=0;i<this.shopCartList.length;i++){
            if(id == this.shopCartList[i].id){
              this.shopCartList[i].checked = false;
              this.selectArr.splice(i,1);
            }
          }
          this.checked = false
          this.money -= this.price;
          /**
           *    计算优惠价格
           *      总价格 - （优惠价*数量） =  优惠价格
           */
          this.nummoney -= (Number(prices)*Number(num)) - this.price;
          this.money = Number(this.money.toFixed(2));           //保存后面两位小数
          this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
        }
        this.checkboxblug();
      },
      //总价·总节省计算
      total: function() {
        this.money = price;
      },
      //删除商品
      delerte(shopid,index,price,num){
        if(this.userId){
          MessageBox.confirm('确定要删除该宝贝吗?').then(async () => {
            const result = await reqShopCartRemove(this.userId,shopid);
            Toast({
              message: '已删除该商品！',
              duration: 2000
            });
            if(this.shopCartList[index].checked){
              this.money -= Number(price)*Number(num);
            }
            setTimeout(()=>{
              this.shopCartList.splice(index,1);//删除数组里面的商品信息
              if(this.selectArr.length == this.shopCartList.length){
                this.selectArr = this.shopCartList
                this.checked = true;
              }
            },1000)

            //减去已删除的商品价格

          });
        }
      },
      //商品数量
      async addSubtract(boolean,shopid,id,price,prices,gavinIndex){

        let num = 0;
        let len = 0;
        let index = 0;
        if(boolean){
          for(let i=0;i<this.shopCartList.length;i++){
            if(id == this.shopCartList[i].id){
              this.shopCartList[i].goods_num++;
              num = this.shopCartList[i].goods_num;
              if(this.shopCartList[i].checked){
                this.money += Number(prices);
                /**
                 *    计算数量增加时总价随着增加
                 *      原价-优惠价 = 1个商品总价格
                 */
                this.nummoney += Number(price) - Number(prices);
                this.money = Number(this.money.toFixed(2));           //保存后面两位小数
                this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
                index = i;
              }
            }
          }
        }else{
          for(let i=0;i<this.shopCartList.length;i++){
            if(id == this.shopCartList[i].id && this.shopCartList[i].goods_num > 1){
              this.shopCartList[i].goods_num--;
              num = this.shopCartList[i].goods_num;
              if(this.shopCartList[i].checked){
                this.money -= Number(prices);
                /**
                 *    计算数量减时总价随着减
                 *      原价-优惠价 = 1个商品总价格
                 */
                this.nummoney -= Number(price) - Number(prices);
                this.money = Number(this.money.toFixed(2));           //保存后面两位小数
                this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
                index = i;
              }
            }
          }
        }
        const result = await reqShopCartNumber(this.userId,shopid,num == 0 ?1:num);
        if(result.status == '500'&&boolean){
          Toast(result.msg)
          this.shopCartList[gavinIndex].goods_num--;
          if(this.shopCartList[gavinIndex].checked){
            this.money -= Number(prices);
            /**
             *    计算数量减时总价随着减
             *      原价-优惠价 = 1个商品总价格
             */
            this.nummoney -= Number(price) - Number(prices);
            this.money = Number(this.money.toFixed(2));           //保存后面两位小数
            this.nummoney = Number(this.nummoney.toFixed(2));    //保存后面两位小数
          }

        }else{

        }
        if(this.shopCartList[gavinIndex].goods_num<= 0)this.shopCartList[gavinIndex].goods_num = 1
      },
      //识别是否全选
      checkboxblug(){
        if(this.selectArr.length == this.shopCartList.length){
          this.checked = true;
        }
      },
      //提交订单
      async submitShop(){
        const result = await reqBuyImmediately(
          this.userId,
          '',
          '',
          '',
          '',
          2,
          this.cartId.join("_"),
          '');
        if(result.status == 500){
          Toast(result.msg)
        }else{
          if(this.money == 0){return false;}
          this.cartId = this.cartId.join("_");
          this.shopId = this.shopId.join("_");
          this.$router.replace({path: '/dateils/fillOrder',query:{
              total_price: this.money,      //总价格
              userId: this.userId,          //用户token
              //shop: this.selectArr,         //商品
              type: 'shopcart',             //类型
              cartId: this.cartId,          //购物车ID
              shopId: this.shopId,          //商品id
            }});
          this.sessionShop('shop', this.selectArr);
        }

      }
    },
    components: {
      appNav,
      Header,
      Loading
    },
    created(){
      this.userId = localStorage.getItem('login');
      this.sessionCartDate = JSON.parse(sessionStorage.getItem('cart'))
      if(this.userId){
        this.$store.dispatch('getShopCart',{id:this.userId});
      }
      //如果没有本地缓存，那就使用本地缓存
      if(this.sessionCartDate){
        this.shopCartS = this.sessionCartDate;//购物车热卖商品列表
      }
    },
    computed:{
      ...mapState(['shopcart'])
    }
  };
</script>

<style lang="scss" scoped>
  input[type='checkbox']{
    float:left;
    width:18px;
    height:18px;
    -webkit-appearance:none;
    border: 4px solid #96989F;
    border-radius:50%;
    background-color:#fff;
    outline: none;
  }
  .radio input[type=checkbox]:checked{
    width:18px;
    height:18px;
    border: 0;
    border-radius:50%;
    background: url(../../img/checked.png)no-repeat center;
    background-size: 16px;
    background-color: red;
  }
  .discover {
    display: flex;
    flex-direction: column;
  }
  .dis-container {
    flex: 1;
    background: #fbfbfb;
  }
  /*空购物车*/
  .shop{
    display: flex;
    width: 100%;
    height: 290px;
    background: #ffffff;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /*display: none;*/
  }
  .shop span{
    font-size: 92px;
    margin-top:40px;
  }
  .shop p{
    width:100%;
    height:20px;
    font-size:14px;
    color:#9b9b9b;
    margin-top:20px;
    text-align: center;
  }
  .shop .shop-go{
    width: 100px;
    height:20px;
    position: relative;
    font-size: 14px;
    color: #666;
    text-align: center;
    bottom:-35px;
  }
  /*购物车商品*/
  .shop-list{
    float:left;
    width: 100%;
    height: auto;
    position: relative;
    margin-top:50px;
    /*display: none;*/
  }
  .list-new{
    float:left;
    width:100%;
    margin-bottom:10px;
    background:#ffffff;
  }
  .list-list{
    float:left;
    width:100%;
    height:110px;
    margin:30px 0;
  }
  .list-left{
    float:left;
    width:38%;
    height:110px;
  }
  .list-left input{
    float:left;
    width:18px;
    height:18px;
    margin: 41px 15px;
  }
  .list-left img{
    float:left;
    margin-top: 10px;
    width:60%;
    height:80px;
  }
  .list-right{
    float:right;
    width:62%;
    height:110px;
  }
  .list-right-top{
    float:left;
    width:95%;
    height:40px;
    margin-left:1%;
  }
  .list-right-top p{
    float:left;
    width:84%;
    height:40px;
    line-height:19px;
    font-size:14px;
    color:#000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
  .list-right-top span{
    float:right;
    font-size: 18px;
    margin-top:6px;
    margin-right:10px;
    color: #999999;
  }
  .list-font{
    float:left;
    width:90%;
    height:32px;
    margin-left:1%;
    margin-top:8px;
    color:#999;
    line-height:16px;
    font-size:12px;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .list-right-bottom{
    float:left;
    width:95%;
    height:30px;
    margin-left:1%;
  }
  .list-right-bottom p{
    float:left;
    line-height:36px;
    color:red;
    font-size:15px;
  }
  .list-right-bottom .computation{
    float:right;
    width:110px;
    height:26px;
    margin-right:10px;
    margin-top:3px;
  }
  .computation button{
    float:left;
    width:24px;
    height:24px;
    line-height:22px;
    text-align: center;
    font-size:18px;
    border:1px solid #e9e9e9;
    background: #fff;
    border-radius: 50%;
  }
  .computation input{
    float:left;
    width:50px;
    height:24px;
    line-height:24px;
    color: #000;
    text-align:center;
  }
  /*热卖商品*/
  .shoppings{
    float:left;
    width:100%;
    margin-bottom: 110px;
    overflow: hidden;
  }
  .shoppings .title{
    float:left;
    width:100%;
    line-height:50px;
    text-align: center;
    color:#666666;
    font-size:14px;
  }
  .shoppings_ul{
    float: left;
    width: 92%;
    margin: 0 4%;
  }
  .shoppings .hotshop{
    float:left;
    width:48%;
    margin:1% 1%;
    background:#fff;
    border-radius: 5px;
    box-shadow: 1px 1px 5px #e0e0e0;
  }
  .hotshop img{
    float:left;
    width:100%;
    height: 170px;
    margin-bottom:14px;
    padding: 5px;
  }
  .hotshop a{
    float:left;
    width:98%;
    height:40px;
    line-height:20px;
    margin:0 1%;
    font-size:14px;
    overflow: hidden;
    text-overflow:ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 5px 0 5px;
  }
  .hotshop p{
    float:left;
    width:100%;
    height:42px;
    line-height:32px;
    font-size:14px;
    color: red;
    text-indent: 3px;
    padding: 0 5px 0 5px;
  }

  /*提交栏*/
  .foohi{
    float:left;
    position: fixed;
    bottom: 49px;
    width: 100%;
    height: 50px;
    /*display: none;*/
  }
  .payit {
    float:left;
    width:100%;
    height:100%;
    background-color:#fbfbfb;
    overflow:hidden;
    position: relative;
  }
  .payit .alllef{
    float:left;
    position: absolute;
    top:50%;
    margin-top:-2%;
  }
  .payit .alllef .radio {
    width:inherit;
    margin:0 15px;
  }
  .payit .alllef .radio .all {
    font-size:15px;
    position:relative;
    margin-left:5px;
  }
  .payit .alllef .radio input {
    float:left;
    width:18px;
    height:18px;
  }
  .payit .youbia {
    float: left;
    height: 100%;
    position: absolute;
    right: 33%;
  }
  .payit .youbia span {
    height:50%;
    display: flex;
    justify-content: flex-end;
    align-items:Center;
    font-size:13px;
    color:#404040;
    float: left;
  }
  .payit .youbia .pmo {
    color:#f23030;
    font-size: 15px;
  }

  .payit .youbia .lastime {
    color:#666666;
  }
  .payit .fr {
    float:right;
    width:30%;
    height:100%;
    display:block;
  }
  .payit .fr a {
    color:#ffffff;
    font-size:15px;
    height:100%;
    display: flex;
    justify-content: center;
    align-items:Center;
    background-color:#f23030;
  }
</style>
