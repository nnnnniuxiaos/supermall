<template>
    <div class="tab-control">
      <div v-for="(item, index) in titles"
          class="tab-control-item"
          :class="{active: index === currentIndex}"
          @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
</template>

<script>
export default {
    name:  '',
    mixins: [],
    props: {
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {},
    data () {
        return {
          //设置变量来看当前是否处于激活状态
          currentIndex: 0
        }
    },
    watch: {

    },
    computed: {

    },
    created () {

    },
    mounted () {

    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        //将子组件的点击事件传出去
        this.$emit('tabClick',index); ``
      }
    }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 99;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    /* 设置激活状态文字高亮颜色 */
    color: var(--color-high-text);
    
  }
  .active span{
    /* 给激活状态的文字添加下边框 */
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
