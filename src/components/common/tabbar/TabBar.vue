<template>
    <div id="tap-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
    name:  '',
    mixins: [],
    props: {},
    components: {},
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

<style>
#tap-bar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f6f6f6;
  position: fixed;      /* 给整个tapbar进行固定定位 */
  bottom: 0;
  left: 0;
  right: 0;

  box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
}

</style>
