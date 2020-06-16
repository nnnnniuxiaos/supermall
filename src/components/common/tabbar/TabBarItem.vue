<template>
      <div class="tapbaritems" @click="itemClick">
        <!-- 留下两个插槽用来插不同的图片和文字 -->
        <div v-if='!isActive'><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
</template>

<script>
export default {
    name:  '',
    mixins: [],
    props: {
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    components: {},
    data () {
        return {
          /* isActive:false */
        }
    },
    watch: {

    },
    computed: {
      isActive(){
        return this.$route.path.includes(this.path)
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    created () {

    },
    mounted () {
      
    },
    methods: {
      itemClick(){
        console.log('itemClick');
        this.$router.replace(this.path)
      }
    }
}
</script>

<style scoped>
.tapbaritems{
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* line-height: 49px; */
}
.tapbaritems  img{
  margin-top: 3px;
  width: 25px;
  height: 25px;
  vertical-align: middle;
}

</style>
