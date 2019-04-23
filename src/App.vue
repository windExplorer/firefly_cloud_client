<template>
  <div id="app">
    <ConTainer />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import ConTainer from '@/components/ConTainer.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    ConTainer
  }
}
</script>

<style lang='scss'>
*{
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  cursor: pointer;
}
img{
  vertical-align: middle;
  cursor: pointer;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
