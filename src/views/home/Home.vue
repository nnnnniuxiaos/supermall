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

      <tab-control :titles='["流行","新款","精选"]' class="tab-control"></tab-control>
      <!-- 模拟数据 -->
      <ul>
        <li>test1</li>
        <li>test2</li>
        <li>test3</li>
        <li>test4</li>
        <li>test5</li>
        <li>test6</li>
        <li>test7</li>
        <li>test8</li>
        <li>test9</li>
        <li>test10</li>
        <li>test11</li>
        <li>test12</li>
        <li>test13</li>
        <li>test14</li>
        <li>test15</li>
        <li>test16</li>
        <li>test17</li>
        <li>test18</li>
        <li>test19</li>
        <li>test20</li>
        <li>test21</li>
        <li>test22</li>
        <li>test23</li>
        <li>test24</li>
        <li>test25</li>
        <li>test26</li>
        <li>test27</li>
        <li>test28</li>
        <li>test29</li>
        <li>test30</li>
        <li>test31</li>
        <li>test32</li>
        <li>test33</li>
        <li>test34</li>
        <li>test35</li>
        <li>test36</li>
        <li>test37</li>
        <li>test38</li>
        <li>test39</li>
        <li>test40</li>
        <li>test41</li>
        <li>test42</li>
        <li>test43</li>
        <li>test44</li>
        <li>test45</li>
        <li>test46</li>
        <li>test47</li>
        <li>test48</li>
        <li>test49</li>
        <li>test50</li>
        <li>test51</li>
        <li>test52</li>
        <li>test53</li>
        <li>test54</li>
        <li>test55</li>
        <li>test56</li>
        <li>test57</li>
        <li>test58</li>
        <li>test59</li>
        <li>test60</li>
        <li>test61</li>
        <li>test62</li>
        <li>test63</li>
        <li>test64</li>
        <li>test65</li>
        <li>test66</li>
        <li>test67</li>
        <li>test68</li>
        <li>test69</li>
        <li>test70</li>
        <li>test71</li>
        <li>test72</li>
        <li>test73</li>
        <li>test74</li>
        <li>test75</li>
        <li>test76</li>
        <li>test77</li>
        <li>test78</li>
        <li>test79</li>
        <li>test80</li>
        <li>test81</li>
        <li>test82</li>
        <li>test83</li>
        <li>test84</li>
        <li>test85</li>
        <li>test86</li>
        <li>test87</li>
        <li>test88</li>
        <li>test89</li>
        <li>test90</li>
        <li>test91</li>
        <li>test92</li>
        <li>test93</li>
        <li>test94</li>
        <li>test95</li>
        <li>test96</li>
        <li>test97</li>
        <li>test98</li>
        <li>test99</li>
        <li>test100</li>
      </ul>
    </div>
</template>

<script>
//导入组件
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
import RecommendView from 'views/home/childComps/RecommendView.vue'
import FeatureView from 'views/home/childComps/FeatureView.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'



//导入网络请求文件
import {getHomeMultidata} from 'network/home.js'

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
      TabControl
    },
    data () {
        return {
          banners:[],
          recommends:[],
          result:''
        }
    },
    watch: {

    },
    computed: {

    },
    //生命周期函数
    created () {
      //获取数据
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        
      })
    },
    mounted () {

    },
    methods: {

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
