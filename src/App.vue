<template>
  <div id="app">
    <transition
        name="custom-classes-transition"
        enter-active-class="animated zoomInDown"
        leave-active-class="animated zoomOutUp"
        mode="out-in"
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
  min-width: 1200px;
}
body{
  overflow-x: hidden;
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  white-space: nowrap; //文本不会换行
}

</style>
