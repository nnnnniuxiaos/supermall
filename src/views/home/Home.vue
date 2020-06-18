<template>
    <div id="home">
      <!-- 顶部导航栏组件 -->
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <!-- 轮播图组件 -->
      <home-swiper :banners='banners'></home-swiper>
      <!-- 推荐组件 -->
      <recommend-view :recommends='recommends'></recommend-view>
      <!-- 本周推荐组件 -->
      <feature-view></feature-view>
      <!-- 商品控制导航栏组件 -->
      <tab-control :titles='["流行","新款","精选"]'
      class="tab-control" 
      @tabClick='tabClick'
      ></tab-control>
      <!-- 商品列表组件 -->
      <goods-list :goods="goods[currentType].list"></goods-list>

    </div>
</template>

<script>
//导入组件
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import RecommendView from 'views/home/childComps/RecommendView.vue'
import FeatureView from 'views/home/childComps/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


//导入网络请求文件
import {getHomeMultidata , getHomeGoods} from 'network/home.js'


export default {
    name:  '',
    mixins: [],
    props: {},
    //注册组件
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList
    },
    data () {
        return {
          banners:[],
          recommends:[],
          result:'',
          //首页商品数据
          goods:{
            'pop':{page: 0 ,list:[]},
            'new':{page: 0 ,list:[]},
            'sell':{page: 0 ,list:[]}
          },
          //默认显示的数据
          currentType: 'pop'
        }
    },
    computed: {

    },
    //生命周期函数
    created () {
      //获取数据
      this.getHomeMultidata();
      //获取首页商品数据
      //同时请求每个分类的第一页数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted () {
      
    },
    methods: {
      //网络请求方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })},
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          console.log(res);
          //将请求到的数据保存
          this.goods[type].list.push(...res.data.list);
          //将原有的页码+1
          this.goods[type].page += 1;
      })},
      //事件监听方法
      tabClick(index){
        console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType =  'new'
            break;
          case 2:
            this.currentType =  'sell'
            break
        }
      }
    }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0  ;
    
  }
  #home{
    padding-top: 44px;
    position: relative;
  }
  /* 给tab-control设置停留效果 */
  .tab-control{
    position: sticky;
    top: 44px;
  }

</style>
