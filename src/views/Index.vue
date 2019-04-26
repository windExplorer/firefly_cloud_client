<template>
  <div id="index">
    <ConTainer />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import ConTainer from '@/components/ConTainer.vue'

export default {
  name: 'index',
  components: {
    HelloWorld,
    ConTainer
  }
}
</script>

<style lang='scss'>
.page-container{
  background: #fff;
  color: #333;
  width: calc(100% - 10px);
  height: 100%;
  margin-left: 10px;
}
</style>
