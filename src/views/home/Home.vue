<template>
    <div id="home">
      <!-- 顶部导航栏组件 -->
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <!-- 商品控制导航栏组件 -->
        <tab-control :titles='["流行","新款","精选"]'
        class="tab-control" 
        @tabClick='tabClick'
        ref="tabControl"
        v-show="isTabFixed"
        ></tab-control>
      <scroll class="content" 
              ref="scroll" 
              :probe-type='3' 
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp='loadMore'
              >
        <!-- 轮播图组件 -->
        <home-swiper :banners='banners' @swiperImageLoad.once='swiperImageLoad'></home-swiper>
        <!-- 推荐组件 -->
        <recommend-view :recommends='recommends'></recommend-view>
        <!-- 本周推荐组件 -->
        <feature-view></feature-view>
              <!-- 商品控制导航栏组件 -->
        <tab-control :titles='["流行","新款","精选"]'
        class="tab-control" 
        @tabClick='tabClick'
        ref="tabControl"
        ></tab-control>
        <!-- 商品列表组件 -->
        <goods-list :goods="goods[currentType].list"></goods-list>
      </scroll>
      <back-top @click.native='backClick' v-show="isShowBackTop"></back-top>
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
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

//导入网络请求文件
import {getHomeMultidata , getHomeGoods} from 'network/home.js'

//导入公共工具js
import {debounce} from 'common/utils.js'


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
      GoodsList,
      Scroll,
      BackTop
    },
    data () {
        return {
          //首页轮播图的数据
          banners:[],
          //首页推荐的数据
          recommends:[],
          result:'',
          //首页商品数据
          goods:{
            'pop':{page: 0 ,list:[]},
            'new':{page: 0 ,list:[]},
            'sell':{page: 0 ,list:[]}
          },
          //默认显示的数据
          currentType: 'pop',
          //要不要显示回到顶部组件
          isShowBackTop:false,
          //tabContral到顶部的距离
          tabOffsetTop: 614 ,
          //决定tabContral是否开启fixed定位
          isTabFixed: false
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
      //使用防抖函数提升性能
      //const refresh = debounce(this.$refs.scroll.scroll.refresh,50)
      //1.使用事件总线$bus 监听图片是否加载完成
      this.$bus.$on('itemImageLoad',() => {
        //console.log('123');
        //刷新高度
        this.$refs.scroll.scroll.refresh()
        //refresh()
      })
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
          //console.log(res);
          //将请求到的数据保存
          this.goods[type].list.push(...res.data.list);
          //将原有的页码+1
          this.goods[type].page += 1;
          //调用scroll的方法使其能一直触发上拉加载
          this.$refs.scroll.scroll.finishPullUp()
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
        this.$refs.tabControl.currentIndex = index;
        },
      backClick(){
        console.log('123');
        //选取子组件scroll的scroll对象的scrollTo方法
        //位移到目标 坐标  第三个参数：多少ms之内到达目标坐标 
        this.$refs.scroll.scroll.scrollTo(0,0,500)
        },
      contentScroll(position){
        //拿到子组件发射滚动的数据
        //1.判断backtop组件是否显示
        this.isShowBackTop = -position.y > 1000 ? true : false
        //2.决定tabcontral是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //下拉加载更多
      loadMore(){
        //console.log('1234');
        //调用请求商品数据函数并传入当前类型
        this.getHomeGoods(this.currentType)
      },
      //监听轮播图的图片加载完成
      swiperImageLoad(){
      //获取tabBar的offsetTop
      //this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      console.log(this.tabOffsetTop);

      }


    }
}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;
/*     position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0  ; */
    
  }
  #home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
  }
  /* 给tab-control设置停留效果 */
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
