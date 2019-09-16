<template>
  <section class="s">
    <!--头部-->
    <Header :type="'routers'" :title="'搜索'" :right="'choice'" :middle="'title'" :routers="$route.query.path"  />
    <!--搜索框-->
    <section @keyup.enter="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" class="search">
      <input type="text" v-model="value3" placeholder="请输入搜索商品关键词" class="input_search" @blur="value3 !== ''?$router.replace({path:'/search/searchShops',query: {value: value3,path: $route.fullPath}}):''" />
    </section>

    <!--热门搜索-->
    <!--<section class="popular">
      <div class="popular_title">热门搜索</div>
      <ul class="popular_ul">
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '手机',path: $route.fullPath}})">手机</li>
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '小米',path: $route.fullPath}})">小米</li>
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '华为',path: $route.fullPath}})">华为</li>
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '三星',path: $route.fullPath}})">三星</li>
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '苹果',path: $route.fullPath}})">苹果</li>
        <li class="popular_li" @click="$router.replace({path:'/search/searchShops',query: {value: '冰箱',path: $route.fullPath}})">冰箱</li>
      </ul>
    </section>-->
  </section>
</template>

<script>
  import Header from '../../../components/header/header.vue';
    export default {
      components:{
        Header
      },
      data () {
        return {
          value3: '',
        }
      }
    }
</script>

<style scoped lang="scss">
  .s{
    height: 100%;
    overflow: hidden;
  }
  .input_search{
    border: 1px solid #d6cec3;
    border-radius: 50px;
    height: 35px;
    width: 200px;
    text-align: center;
    animation: input_border 10s linear 0s infinite;
  }
  .search{
    margin: 0 auto;
    width: 100%;
    text-align: center;
    background: #fff;
    padding: 100px 0 100px 0;
  }
  .popular{
    width: 100%;
    background: #fff;
    height: 100%;
  }
  .popular_title{
    font-size: 16px;
    padding-bottom: 10px;
    width: 92%;
    margin: 0 auto;
  }
  .popular_ul{
    width: 92%;
    margin: 0 auto;
  }
  .popular_li{
    float: left;
    border: 1px solid #eee;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    margin: 10px;
  }
  .search_shops{
    width: 200px;
  }

  //按钮动画
  @keyframes input_border{
    0%{border: 1px solid #d6cec3}
    10%{border: 1px solid #d0aaaa}
    20%{border: 1px solid #d0c4aa}
    30%{border: 1px solid #c3d0aa}
    40%{border: 1px solid #b2d0aa}
    50%{border: 1px solid #aad0c7}
    60%{border: 1px solid #aacbd0}
    70%{border: 1px solid #aab0d0}
    80%{border: 1px solid #acaad0}
    90%{border: 1px solid #b7aad0}
    100%{border: 1px solid #ccaad0}
  }
</style>
