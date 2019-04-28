<template>
    <div class="dynamic page-container">
        <el-tabs
        :tab-position="tabPosition"
        style="height: 100%;"
        v-model="$store.state.page.dynamic.tab_active"
        @tab-click="TabClick"
        >
            <el-tab-pane name="1" :ptitle="'标题1'">
                <span slot="label">
                <i class="el-icon-user"></i> 全部文件
                </span>
                <vue-scroll>
                <div class="tab tab1">
                    <el-row :gutter="20">
                    <el-col :span="10">111</el-col>

                    <el-col :span="10"></el-col>
                    </el-row>
                </div>
                </vue-scroll>
            </el-tab-pane>

            <el-tab-pane name="2" :ptitle="'标题2'">
                <span slot="label">
                <i class="el-icon-user"></i> 我的下载
                </span>
                <vue-scroll>
                <div class="tab tab1">
                    <el-row :gutter="20">
                    <el-col :span="10">我的下载</el-col>

                    <el-col :span="10"></el-col>
                    </el-row>
                </div>
                </vue-scroll>
            </el-tab-pane>

            <el-tab-pane name="3" :ptitle="'标题3'">
                <span slot="label">
                <i class="el-icon-user"></i> 我的上传
                </span>
                <vue-scroll>
                <div class="tab tab1">
                    <el-row :gutter="20">
                    <el-col :span="10">我的上传</el-col>

                    <el-col :span="10"></el-col>
                    </el-row>
                </div>
                </vue-scroll>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
export default {
    name: 'dynamic',
    components: {
        
    },
    data() {
        return {
        tabPosition: 'left',
        }
    },
    methods: {
        TabClick(e) {
            //console.log(e.name)
            this.$store.commit('page/setDynamic_tabActive', e.name)
            this.$store.commit('page/setTitle', this.$global.name + ' - ' + e.$attrs.ptitle)
        },

    },
    computed: {
        
    },
    created() {
        this.$store.commit('page/setTitle', this.$global.name + ' - 动态')
    }
}
</script>


<style lang='scss'>
</style>