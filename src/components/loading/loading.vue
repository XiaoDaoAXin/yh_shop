<template>
  <section>
    <div class="loading" data-id="2">
      <!--第一种loading-->
      <div id="preloader_1" v-if="type===1?true:false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--第二种loading-->
      <div id="preloader_2" v-if="type===2?true:false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--第三种loading-->
      <div id="preloader_3" v-if="type===3?true:false"></div>
      <!--第四种loading-->
      <div id="preloader_4" v-if="type===4?true:false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--第五种loading-->
      <div id="preloader5" v-if="type===5?true:false"></div>
      <!--第六种loading-->
      <div id="preloader6" v-if="type===6?true:false">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script>
    import "./js/jquery.js"
    import './js/loading.js'
    export default {
        props: ['type']
    }
</script>

<style scoped>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 2000;
  }
  #preloader_1,
  #preloader_2,
  #preloader_3,
  #preloader_4,
  #preloader5,
  #preloader6{
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -20px 0 0 -20px;
  }
</style>
