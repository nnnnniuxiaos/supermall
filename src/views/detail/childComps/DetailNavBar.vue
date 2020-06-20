<template>
    <div>
      <nav-bar>
        <div slot="left" class="backImage" @click="backClick"><img src="~assets/img/common/back.svg"></div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles" class="title-item" 
          :class="{active:index === currentIndex}"
          @click="itemClick(index)"
          >{{item}}</div>
        </div>
        
      </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:  '',
    mixins: [],
    props: {},
    components: {
      NavBar
    },
    data () {
        return {
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
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
        this.currentIndex = index
      },
      backClick(){
        this.$router.back()
      }
    }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 15px;
  }
  .title-item{
    flex: 1;
  }
  .backImage img{
    margin-top: 10px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
