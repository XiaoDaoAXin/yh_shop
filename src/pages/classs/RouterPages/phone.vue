<template>
  <section class="ification_scroll">
    <div class="ification_scroll_box"  ref="ification_scroll_box">
      <div v-for="(right ,index) in rightClass" :key="index" class="ification">
        <div class="ification_title_box">
      		<span class="ification_title">{{right.name}}</span>
      	</div>
        <ul class="ification_ul">
          <li v-for="(r ,i) in right.category3" :key="i" class="ification_ul_li">
            <router-link :to="{path: '/search/searchShops' , query:{value: r.name,path: $route.fullPath,searchid: r.id}}" style="color:#848484;">
              <img :src="r.image?url+r.image:'/static/img/static.png'" class="ification_ul_li_img" />
              <span class="ification_ul_li_title">{{r.name?r.name:'暂无标题'}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <Loading :type="1" v-if="false" />
  </section>
</template>

<script>
    import BScroll from 'better-scroll'
    import Loading from '../../../components/loading/loading.vue';
    import {URL} from '../../../API/url.js'
    import {mapState} from 'vuex'
    var scrollT;
    export default {
      data(){
        return {
          rightClass: [],
          navId: String,
          loading:false,
          url: URL,
        }
      },
      components:{
        Loading
      },
      //二级分类初始化
      created(){
        this.$nextTick(() => {
          this.ificationScroll();
        });
        if(this.$route.query.id){
          this.$store.dispatch('getClassification',this.$route.query.id)
        }else{
          this.$store.dispatch('getClassification')
        }
        if(this.sessionClassDate){
          this.level(this.sessionClassDate)
        }else{
          this.loadding = true
        }
      },
      methods:{
        ificationScroll(){
          this.$nextTick(() => {
            scrollT = new BScroll(".ification_scroll",{
              scrollY: true,
              click: true
            });
          })
        },
        //二级分类以及三级分类方法
        level(val){
          let classA = [];  //一级分类数组
          let classB = [];  //二级分类数组
          let classC = [];  //三级分类数组

          let arr = [];
          /*
            获取一级分类

          if(val[0].data){
            classA = val[0].data;
          }*/

          /**
           * 获取二级分类

          let c;
          let _obj = Object.keys(classA);
          for(let i=0;i<_obj.length;i++){
            arr.push({title: classA[i].name,shopClass: classA[i].data});
          }
          for(let i=0;i<classB.length;i++){
            for(let j=0;j<classB[i].length;j++){
              classC.push(classB[i][j])
            }
          }*/
          this.rightClass = val.category2;
        }
      },
      computed:{
        ...mapState(['classification'])
      },
      watch:{
        //监视$route有没有改变
        $route(){
          this.navId = this.$route.query.id;
          this.loading = true;
        },
        //监视$route里面的query里面id有没有改变
        navId(val){
          this.$store.dispatch('getClassification',this.$route.query.id);
          this.level(this.classification);
        },
        //监视vuex里面的classification数据有没有改变
        classification(val){
          if(!this.sessionClassDate){
            this.sessionIndex("classs",val);
            this.level(val);
            this.loading = false;
          }
          scrollT.scrollTo(0,0)
        }
      }
    }
</script>

<style scoped>
  .ification_scroll{
    float: left;
    width: 70%;
    padding: 10px;
    overflow-y: scroll;
    height: 90%;
    margin-top: 10px;
    background: #fff;
    margin-left: 30%;
  }
  .ification_scroll_box{
    padding: 0 0 100px 0;
  }
  .ification{
  	float:left;
  	width:100%;
    margin-bottom: 20px;
  }
  .ification_title_box{
  	width:110px;
  	margin:0 auto;
  	border-top:1px solid #999;
  }
  .ification_title{
  	float:left;
  	width:70px;
  	text-align:center;
    color: red;
    position:relative;
    font-size: 13px;
    background:#fff;
    top:-10px;
    left:50%;
    margin-left:-35px;
  }
  .ification_ul{
  	float:left;
  	width:100%;
  }
  .ification_ul_li{
    display: inline-block;
    text-align: center;
    padding: 10px;
    width: 30%;
  }
  .ification_ul_li_img{
    width: 100%;
  }
  .ification_ul_li_title{
    display: block;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
