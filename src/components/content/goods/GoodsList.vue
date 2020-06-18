<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :goodsItem="item" />
      
    </div>
</template>

<script>
//导入每个商品的子组件
import GoodsListItem from './GoodsListItem.vue'

export default {
    name:  '',
    mixins: [],
    props: {
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components: {
      GoodsListItem
    },
    data () {
        return {

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

    }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }

</style>
