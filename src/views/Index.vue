<template>
  <div id="index">
    <ConTainer/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import ConTainer from "@/components/ConTainer.vue";

export default {
  name: "index",
  components: {
    HelloWorld,
    ConTainer
  }
};
</script>

<style lang='scss'>
.page-container {
  /* background: rgba(255,255,255, .7); */
  color: #333;
  width: calc(100% - 50px);
  height: calc(100% - 40px);
  margin-left: 10px;
  padding: 20px;
}
.el-tabs.el-tabs--left {
  .el-tabs__item {
    color: #fff;
    height: 50px;
    line-height: 50px;
  }
  .el-tabs__active-bar.is-left {
    height: 50px !important;
  }
  .el-tabs__item:hover{
    color: #ffd04b;
  }
  .el-tabs__item.is-active {
    color: #ffd04b;
    background: rgba(0, 0, 0, 0.4);
  }
  .el-tabs__content {
    height: 100%;
  }
  .el-tab-pane {
    background: #fff;
    color: #333;
    height: 100%;
    padding: 10px;
  }
}
.el-form-item__content{
  text-align: left;
}
</style>
