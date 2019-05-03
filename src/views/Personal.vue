<template>
    <div class="personal page-container">
        <el-tabs :tab-position="tabPosition" style="height: 100%;" v-model="$store.state.page.personal.tab_active" @tab-click="TabClick">
            <el-tab-pane name="1" :ptitle="'基本资料'">
                <span slot="label"><i class="el-icon-user"></i> 基本资料</span>
                <vue-scroll>
                <div class="tab tab1">
                    <el-row :gutter="20">
                        <el-col :span="12" :offset="6">
                            <el-form ref="form" :model="baseInfo" label-width="120px">
                                <el-form-item label="用户名">
                                    <el-input v-model="baseInfo.username" autocomplete="off" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="昵称">
                                    <el-input v-model="baseInfo.nickname" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-radio-group v-model="baseInfo.gender">
                                    <el-radio :label="0">保密</el-radio>
                                    <el-radio :label="1">女</el-radio>
                                    <el-radio :label="2">男</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="出生日期">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="baseInfo.born" style="width: 100%;" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="个性签名">
                                    <el-input type="textarea" maxlength="100" show-word-limit v-model="baseInfo.sign_context" rows="4"></el-input>
                                </el-form-item>
                                <el-form-item label="个人描述">
                                    <el-input type="textarea" maxlength="255" show-word-limit v-model="baseInfo.description_context" rows="10"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubBase">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    
                </div>
                </vue-scroll>
            </el-tab-pane>

            <el-tab-pane name="2" :ptitle="'我的头像'">
                <span slot="label"><i class="el-icon-user"></i> 我的头像</span>
                <div class="tab tab2">
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div class="avatar-box">
                                <img :src="$store.getters['user/getUserInfo'].avatar" alt="">
                            </div>
                        </el-col>
                        <el-col :span="10">
                            <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                :http-request="uploadFileMethod"
                                :drag="true"
                                :multiple="false"
                                :name="'file'"
                                :file-list="fileList"
                                >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png/gif/bmp文件，且不超过1mb</div>
                            </el-upload>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>

            <el-tab-pane name="3" :ptitle="'其他资料'">
                <span slot="label"><i class="el-icon-user"></i> 其他资料</span>
                <vue-scroll>
                <div class="tab tab3">
                    
                    <el-row :gutter="20">
                        <el-col :span="10">
                            <div class="block">
                                <el-timeline>
                                    <el-timeline-item timestamp="我的邀请码" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.invite_code }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="受邀码" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.reg_invite_code }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的空间" placement="top">
                                    <el-card>
                                        <h4>{{ $global.easyFileSize($store.state.user.userInfo.total_size) }} </h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="剩余空间" placement="top">
                                    <el-card>
                                        <h4>{{ $global.easyFileSize($store.state.user.userInfo.total_size-$store.state.user.userInfo.use_size) }} </h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的积分" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.score }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的等级" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.level }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="注册时间" placement="top">
                                    <el-card>
                                        <h4>{{ $global.formatTime($store.state.user.userInfo.regtime) }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="最近更新" placement="top">
                                    <el-card>
                                        <h4>{{ $global.formatTime($store.state.user.userInfo.uptime) }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-col>
                        
                        <el-col :span="10">
                            <div class="block">
                                <el-timeline>
                                    <el-timeline-item timestamp="我的邮箱" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.email }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的电话" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.tel || `null` }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的QQ" placement="top">
                                    <el-card>
                                        <h4>{{ $store.state.user.userInfo.qq || `null` }}</h4>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="当前连续登录天数" placement="top">
                                    <el-card>
                                        <p>{{ $store.state.user.userInfo.login_day || 0 }}</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="最多连续登录天数" placement="top">
                                    <el-card>
                                        <p>{{ $store.state.user.userInfo.login_max_day || 0 }}</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="总登录天数" placement="top">
                                    <el-card>
                                        <p>{{ $store.state.user.userInfo.login_total_day || 0 }}</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的签名" placement="top">
                                    <el-card>
                                        <p>{{ $store.state.user.userInfo.sign_context || `null` }}</p>
                                    </el-card>
                                    </el-timeline-item>
                                    <el-timeline-item timestamp="我的描述" placement="top">
                                    <el-card>
                                        <p v-html="$store.state.user.userInfo.description_context || `null`"></p>
                                    </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </div>
                        </el-col>

                    </el-row>
                    
                </div>
                </vue-scroll>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

export default {
    name: 'personal',
    data() {
        return {
            tabPosition: 'left',
            baseInfo: {
                username: this.$store.state.user.userInfo.username,
                nickname: this.$store.state.user.userInfo.nickname,
                born: this.$store.state.user.userInfo.born,
                gender: this.$store.state.user.userInfo.gender,
                sign_context: this.$store.state.user.userInfo.sign_context,
                description_context: this.$store.state.user.userInfo.description_context
            },
            avatar: '',
            imageUrl: '',
            fileList: [],
        }
    },
     methods: {
        onSubBase() {
            let load = this.$loading({ fullscreen: true })
            this.$apis.userApi.changeBase(this.baseInfo)
            .then(res => {
                load.close()
                res = res.data
                if(res.code == 1){
                    this.$store.commit('user/setBase', this.baseInfo)
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                    })
                }else if(res.code == -100){
                    this.$notify({
                        title: '警告',
                        message: res.msg,
                        type: 'warnning',
                        duration: 1500
                    })
                    this.$router.push('/login')
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: res.msg,
                        duration: 2000
                    })
                }
            })
            .catch(err => {
                load.close()
                this.$notify.error({
                    title: '错误',
                    message: `请求出错`,
                    duration: 2000
                })
                console.log(err)
            })
        },

        uploadFileMethod(param) {
            let fileObject = param.file;
            let formData = new FormData();
            formData.append("file", fileObject)
            console.log(fileObject)
            this.$global.getFileMd5(fileObject, md5 => {
                let load = this.$loading({ fullscreen: true })
                this.$apis.fileApi.checkFileMd5({md5: md5, type: 1})
                .then(res => {
                    load.close()
                    res = res.data
                    if(res.code == 1){    
                        this.$notify({
                            title: '成功',
                            message: `头像上传成功`,
                            type: 'success',
                            duration: 1500
                        })
                        this.$store.commit('user/setAvatar', res.data.net_path)
                    }
                    else if(res.code == 0){
                        this.$notify.error({
                            title: '错误',
                            message: res.msg,
                            duration: 2000
                        })
                    }
                    else if(res.code == -1){
                        let load = this.$loading({ fullscreen: true })
                        formData.append('type', 1)
                        this.$apis.userApi.upAvatar(formData)
                        .then(res => {
                            load.close()
                            res = res.data
                            if(res.code == 1){
                                this.$notify({
                                    title: '成功',
                                    message: res.msg,
                                    type: 'success',
                                    duration: 1500
                                })
                                this.$store.commit('user/setAvatar', res.data.url)
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: res.msg,
                                    duration: 2000
                                })
                            }
                        })
                        .catch(err => {
                            load.close()
                            this.$notify.error({
                                title: '错误',
                                message: `请求出错`,
                                duration: 2000
                            })
                            console.log(err)
                        })
                    }
                })
            })
        },
        TabClick(e) {
            //console.log(e.name)
            this.$store.commit('page/setPersonal_tabActive', e.name)
            //console.log(this.$store.state.page)
            this.$store.commit('page/setTitle', this.$global.name + ' - ' + e.$attrs.ptitle)
        }
        
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.$store.commit('page/setTitle', this.$global.name + ' - 个人中心')
    }
}
</script>

<style lang='scss'>
.personal{
    .tab2{
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .avatar-box{
            text-align: center;
            img{
                margin: auto;
                box-shadow: 0 0 10px #409EFF ;
                border-radius: 2px;
            }
        }
    }   
    .tab3{
        text-align: left;
    }
}
</style>