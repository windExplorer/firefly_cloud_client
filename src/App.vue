<template>
  <div id="app">
    <transition
        name="custom-classes-transition"
        enter-active-class="animated zoomInDown"
        leave-active-class="animated zoomOutUp"
    >
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app'
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
