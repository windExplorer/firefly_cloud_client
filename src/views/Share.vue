<template>
    <div class="share">
        <div class="share-container">
            
            <el-container v-show="$store.state.share.showShare">
                <vue-scroll>
                    <el-main>
                        <div class="main">
                            <div class="title"><i class="el-icon-document"></i> 文件列表 <span style="color: #F56C6C;font-size: 12px;margin-left: 10px;">* 双击文件名进行下载,多文件下载暂未开放 *</span> 
                                <el-button type="primary" icon="el-icon-download" circle size="" style="float:right;" v-show="myshare_selected.length == 1" @click="$store.dispatch('share/download', myshare_selected[0]['id'])"></el-button>
                            </div>
                            <div class="limit"><span class="expire" v-show="$store.state.share.share_path.info.is_expire == 1"><i class="el-icon-time"></i> 过期时间: &nbsp;&nbsp; {{ $global.formatTime($store.state.share.share_path.info.expire_time) }}</span> <span class="frequency"><i class="el-icon-download"></i> 下载次数: &nbsp;&nbsp;{{ $store.state.share.share_path.info.use_frequency }} / {{ $store.state.share.share_path.info.frequency }}</span></div>  
                            <div class="file-container">
                                <p>
                                    <el-breadcrumb separator-class="el-icon-arrow-right">
                                    <el-breadcrumb-item v-for="(item, index) in $store.state.share.share_path.to.path" :v-key='index' ><el-link :underline="false" type="primary" @click="$store.dispatch('share/enter_folder', $store.state.share.share_path.to.pid_path[index])">{{ item }}</el-link></el-breadcrumb-item>
                                    </el-breadcrumb>
                                </p>
                                <el-table 
                                    ref="multipleTable"
                                    :data="$store.state.share.share_path.items.list || []"
                                    tooltip-effect="dark"
                                    style="width: 100%;overflow: auto;"
                                    stripe

                                    @selection-change="handleSelectionChangeShare">
                                    <el-table-column type="selection" style="width: 5%;"></el-table-column>
                                    <el-table-column label="名称" show-overflow-tooltip style="width: 70%;">
                                        <template slot-scope="scope" v-if="scope.row.name">
                                            <span v-if="!scope.row.folder_id" @click="$store.dispatch('share/enter_folder', scope.row.id)" style="cursor: pointer;" :title="`进入${scope.row.name}`">
                                                <img src="../assets/icons/Folder_24.png" alt="">&nbsp;&nbsp;
                                                {{ scope.row.name }}
                                            </span>
                                            <span v-if="scope.row.folder_id" @dblclick="$store.dispatch('share/download', scope.row.id)" style="cursor: pointer;">
                                                <img src="../assets/icons/file1.png" width="24" height="24" alt="">&nbsp;&nbsp;
                                                {{ scope.row.name }}
                                            </span>
                                            
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="大小" show-overflow-tooltip style="width: 10%;">
                                        <template slot-scope="scope">
                                            <span v-if="!scope.row.size">-</span>
                                            <span v-if="scope.row.size">{{ $global.easyFileSize(scope.row.size) }}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip label="修改时间" style="width: 15%">
                                        
                                        <template slot-scope="scope" v-if="scope.row.uptime">
                                        
                                        {{ $global.formatTime(scope.row.uptime, 'Y-m-d H:i') }}
                                        
                                        </template>
                                    </el-table-column>
                                
                                </el-table>
   
                            </div>

                            <div class="comment-container">
                                <!-- //评论容器 -->
                            </div>



                        </div>
                    </el-main>
                </vue-scroll>
                <el-aside width="240px" class="rside">
                    <div class="avatar ellipsis"><img :src="$store.state.share.shareUser.avatar" alt=""> <span class="nickname">{{ $store.state.share.shareUser.nickname }}</span></div>
                    <div class="sign">签名: &nbsp; {{ $store.state.share.shareUser.sign_context || `Ta很懒，什么也没有留下` }}</div>
                    <el-divider></el-divider>
                    <span v-show="$store.state.share.share_path.info.is_open == 1">
                        <div class="subject">主题: &nbsp; {{ $store.state.share.share_path.info.subject }}</div>
                        <div class="content">内容: &nbsp; {{ $store.state.share.share_path.info.content }}</div>
                        <el-divider></el-divider>
                        <div class="location"><i class="el-icon-location-information"></i> &nbsp;&nbsp; {{ $store.state.share.share_path.info.location }}</div>
                        <div class="regtime"><i class="el-icon-time"></i> &nbsp;&nbsp; {{ $global.formatTime($store.state.share.share_path.info.regtime) }}</div>
                    </span>
                </el-aside>
            </el-container>
        
            <!-- 输入提取码 -->
            <el-card class="box-card" v-show="!$store.state.share.showShare" >
                <div slot="header" class="clearfix" style="text-align: left;">
                    <i class="el-icon-lock"></i> <span>请输入提取码</span>
                </div>
                <div class="item">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-input v-model="$store.state.share.encrypt" placeholder="请输入提取码" autofocus @keyup.enter.native="$store.dispatch('share/get_share')"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="$store.dispatch('share/get_share')">提取</el-button>
                        </el-col>
                    </el-row>
                    
                </div>
            </el-card>
        </div>

    </div>
</template>


<script>
export default {
    name: 'share',
    components: {
        
    },
    data() {
        return {
            myshare_selected: []
            
        }
    },
    methods: {
        
        handleSelectionChangeShare(val) {
            this.myshare_selected = val
            //console.log(this.myshare_selected.length)
        },



    },
    computed: {
        
    },
    created() {
        this.$store.commit('page/setTitle', this.$global.name + ' - 分享')
        //console.log(this.$route.params.link)
        this.$store.dispatch('share/get_share')
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        console.log(to)
      }
    }
}
</script>


<style lang='scss'>
    .share{
        height: 100%;
        margin: auto;
        margin-left: 10px;
        background: #fff;
        color: #333;
    }
    .share-container{
        overflow: hidden;
        height: 100%;
        text-align: left;
        font-size: 13px;
        .rside{
            background: #F4F4F4;
            padding: 20px;
            .avatar{
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    border: 2px solid #ccc;
                }
                .nickname{
                    margin-left: 10px;
                }
            }
            .sign,
            .subject,
            .content,
            .location,
            .regtime{
                margin-top: 20px;
                i{
                    font-size: 14px;
                }
            }
            .location{
                font-size: 12px;
                
            }
            
        }
        .main{
            padding: 20px;
            .limit{
                margin-top: 10px;
                
                .frequency{
                    margin-left: 20px;
                }
            }
            
            .file-container{
                margin-top: 20px;
            }
            .comment-container{
                margin-top: 50px;
            }
        }
        .box-card{
            width: 400px;
            height: 150px;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -200px;
            margin-top: -75px;
            i{
                color: #409EFF;
                margin-right: 5px;
            }
        }
        
    }


</style>