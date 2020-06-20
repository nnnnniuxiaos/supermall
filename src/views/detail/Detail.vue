<template>
    <div class="detail"> 
      <detail-nav-bar  class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images='topImages'></detail-swiper>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop='shop' />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :param-info="paramInfo"/>
      </scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import Scroll from 'components/common/scroll/Scroll'

import { getDetail ,Goods ,Shop ,GoodsParam} from "network/detail.js"

export default {
    name:  '',
    mixins: [],
    props: {

    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      Scroll,
      
    },
    data () {
        return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{}

          
        }
    },
    watch: {

    },
    computed: {

    },
    created () {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      console.log(this.$route.params.iid)
      
      
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        console.log(res);
        //1.获取顶部轮播图的数据
        this.topImages = res.result.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo , data.columns , data.shopInfo.services)
        //3.获取商家信息
        this.shop = new Shop(data.shopInfo)
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo
        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      })
    },
    mounted () {

    },
    methods: {
      imageLoad(){
        this.$refs.scroll.scroll.refresh()
      }
    }
}
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 1000px;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
