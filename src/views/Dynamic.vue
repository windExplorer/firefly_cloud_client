<template>
    <div class="dynamic page-container">
        <el-tabs
        :tab-position="tabPosition"
        style="height: 100%;"
        v-model="$store.state.page.dynamic.tab_active"
        @tab-click="TabClick"
        >
            <el-tab-pane name="1" :ptitle="'最新分享'">
                <span slot="label">
                <i class="el-icon-user"></i> 最新分享
                </span>
                <vue-scroll>
                <div class="tab tab1">
                    <i class="el-icon-discover"></i> 最新分享 ({{ $store.state.dynamic.new_share.length }})
                    <el-divider></el-divider>
                    <div class="share-items" v-for="(item, index) in $store.state.dynamic.new_share" :key="item.id">
                        <img :src="item.user.avatar" alt="" class="avatar">
                        <span class="nickname">{{ item.user.nickname }}</span>
                        <span class="text">分享了文件:</span>
                        <span class="link"><el-tag type="primary"><el-link type="primary" :href="item.downUrl" target="_blank"  :underline="false" icon="el-icon-link">{{ item.downUrl }}</el-link></el-tag></span>
                        <span class="encrypt copyBtn" :data-clipboard-text="item.share_password" @click="$global.copy()"><el-tag type="success" style="cursor:pointer;" ><i class="el-icon-lock"></i> {{ item.share_password }}</el-tag></span>
                        <span class="copy">
                            <el-tooltip class="item" effect="light" content="复制链接和提取码" placement="top">
                                <el-button type="primary" icon="el-icon-document-copy" size="mini" circle :data-clipboard-text="`链接: ${item.downUrl}  提取码: ${item.share_password} [来自${$store.state.user.userInfo.nickname}的分享]`" class="copyBtn" @click="$global.copy()"></el-button>
                            </el-tooltip>
                        </span>
                        <span class="location"><i class="el-icon-location"></i> {{ item.custom_location }}</span>
                        <span class="uptime"><i class="el-icon-time"></i> {{ $global.formatTime(item.uptime, 'Y-m-d H:i') }}</span>
                        <div class="context">
                            <h4><i class="el-icon-s-promotion"></i> {{ item.subject }}</h4>
                            <blockquote>{{ item.content }}</blockquote>
                        </div>
                    </div>

                    
                </div>
                </vue-scroll>
            </el-tab-pane>

            <el-tab-pane name="2" :ptitle="'标题2'">
                <span slot="label" v-show="false">
                <i class="el-icon-user"></i> 热门分享
                </span>
                <vue-scroll>
                <div class="tab tab2">
                    <el-row :gutter="20">
                    <el-col :span="10">我的下载</el-col>

                    <el-col :span="10"></el-col>
                    </el-row>
                </div>
                </vue-scroll>
            </el-tab-pane>

            <el-tab-pane name="3" :ptitle="'标题3'">
                <span slot="label" v-show="false">
                <i class="el-icon-user"></i> 热门评论
                </span>
                <vue-scroll>
                <div class="tab tab3">
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
        this.$store.dispatch('dynamic/getNewShare')
    }
}
</script>


<style lang='scss'>
.dynamic{
    text-align: left;
    font-size: 15px;
    .share-items{
        font-size: 14px;
        margin-bottom: 50px;
        border-bottom: 1px dashed #409eff;
        .avatar{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #409EFF;
        }
        .nickname{
            margin-left: 10px;
            font-weight: bold;
            color: #409EFF;
        }
        .text{
            margin-left: 20px;
        }
        .link{
            margin-left: 10px;
        }
        .encrypt{
            margin-left: 10px;
        }
        .copy{
            margin-left: 10px;
        }
        .location{
            margin-left: 10px;
            i{
                color: #E6A23C;
            }
        }
        .uptime{
            margin-left: 10px;
            i{
                color: #67C23A;
            }
        }
        .context{
            margin-left: 50px;
            margin-top: 8px;

            blockquote{
                margin-top: 10px;
                margin-bottom: 10px;
                padding: 15px;
                line-height: 22px;
                border-left: 5px solid #009688;
                border-radius: 0 2px 2px 0;
                background-color: #f2f2f2;
            }
        }
    }
    .share-items:nth-last-child(1){
        border-bottom: none;
        margin-bottom: 20px;
    }
}
   
</style>