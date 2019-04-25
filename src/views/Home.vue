<template>
  <div class="home">
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <button @click="add">++</button>
          {{ this.$store.state.count }}
          {{ num }}
        </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    //HelloWorld
  },
  data() {
    return {
      num: 0
    }
  },
  methods: {
    add: function() {
      this.$store.state.count ++
      this.num ++
    }
  },
  computed: {
    
  },
  created() {
    
  }
}
</script>

<style lang="scss">
.home{
  color: #fff;
  .el-aside {
        text-align: center;
        height: calc(100vh - 60px);
        padding-top: 20px;
    }
    
    .el-main {
        text-align: center;
        line-height: 160px;
        color: #333;
        background: #fff;
        overflow: hidden;
        height: calc(100vh - 70px) !important;
        overflow-y: auto;
    }
}
</style>

