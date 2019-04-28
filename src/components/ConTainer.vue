<template>
    <div class="container">
        <el-container>
            <el-header>
                <h1><span @click="Reload">萤火云</span></h1>
                <ul class="left">
                    <li v-show="$store.state.user.isLogin"><router-link to='/'>网盘</router-link></li>
                    <li><router-link to='/dynamic'>动态</router-link></li>
                    <li v-show="$store.state.user.isLogin"><router-link to='/message'>消息</router-link></li>
                </ul>
                <ul class="right">
                    <el-popover
                        placement="top-start"
                        width="230"
                        trigger="hover">
                        <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span><img :src="$store.getters['user/getUserInfo'].avatar || `../assets/imgs/head.jpeg`" width="50" height="50" alt=""></span>
                            <span class="name">{{ $store.state.user.userInfo.nickname || `游客` }}</span>
                        </div>
                        <div>
                            <ul v-show="$store.state.user.isLogin">
                                <li @click="personal">个人资料</li>
                                <li @click="changePwd">修改密码</li>
                                <li @click="changeEmail">修改邮箱</li>
                                <li @click="loginOut">退出</li>
                            </ul>
                            <ul v-show="!$store.state.user.isLogin">
                                <li @click="loginIn">登录</li>
                            </ul>
                        </div>
                        </el-card>
                        <li slot="reference"><img :src="$store.getters['user/getUserInfo'].avatar || `../assets/imgs/head.jpeg`" alt=""> <span class="name">{{ $store.state.user.userInfo.nickname || `游客` }}</span> <span class="menu"><i class="el-icon-arrow-down"></i></span></li>
                    </el-popover>
                </ul>

            </el-header>
            <el-main>
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated zoomOutRight"
                    mode="out-in"
                >
                    <router-view></router-view>
                </transition>
                
            </el-main>
        </el-container>
        <!-- 其他 -->
        <el-dialog title="修改密码" :visible.sync="pwdVisible" :width="`500px`">
            <el-form :model="pwdForm">
                <el-form-item label="原密码" :label-width="formLabelWidth">
                    <el-input v-model="pwdForm.password1" autocomplete="off" autofocus="true" type='password'></el-input>
                </el-form-item>
                <el-form-item label="新密码" :label-width="formLabelWidth">
                    <el-input v-model="pwdForm.password2" autocomplete="off" type='password'></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="pwdForm.password3" autocomplete="off" type='password'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="pwdVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitPwd">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改邮箱" :visible.sync="emailVisible" :width="`500px`">
            <el-form :model="emailForm">
                <el-form-item label="验证码" :label-width="formLabelWidth">
                    <el-input v-model="emailForm.vcode" autocomplete="off" autofocus="true" type='text'></el-input>
                    <div class="getVcode">
                        <el-button type="primary" round size='mini' @click="getVcode" :disabled="allow_getVcode">获取验证码 <span v-show="timer">{{ `(${timer})` }}</span></el-button>
                    </div>
                </el-form-item>
                <el-form-item label="新邮箱" :label-width="formLabelWidth">
                    <el-input v-model="emailForm.email" autocomplete="off" type='email'></el-input>
                </el-form-item>
                <el-form-item label="确认邮箱" :label-width="formLabelWidth">
                    <el-input v-model="emailForm.email2" autocomplete="off" type='email'></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="emailVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmitEmail">确 定</el-button>
            </div>
        </el-dialog>
  </div>
</template>

<script>

export default {
    name: "ConTainer",
    data() {
        return {
            userInfo: {
                username: '',
                nickname: '',
                avatar: ''
            },
            pwdForm: {
                password1: '',
                password2: '',
                password3: ''
            },
            emailForm: {
                vcode: '',
                email: '',
                email2: ''
            },
            pwdVisible: false,
            emailVisible: false,
            formLabelWidth: '120px',
            allow_getVcode: '',
            timer: 0,
            t: null
        }
    },
    methods: {
        loginOut() {
            let load = this.$loading({ fullscreen: true })
            this.$apis.userApi.loginOut()
            .then(res => {
                load.close()
                res = res.data
                if(res.code == 1){
                    this.$store.commit('user/logout')
                    this.$axios.defaults.headers.common['token'] = ''
                    this.$axios.defaults.headers.common['username'] = ''
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
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
        loginIn() {
            this.$router.push('/login')
        },
        Reload() {
            this.$router.push('/')
        },
        personal() {
            this.$router.push('/personal')
        },
        changePwd() {
            this.pwdVisible = true
        },
        changeEmail() {
            this.emailVisible = true
        },
        onSubmitPwd() {
            let load = this.$loading({ fullscreen: true })
            this.$apis.userApi.changePwd(this.pwdForm)
            .then(res => {
                load.close()
                res = res.data
                if(res.code == 1){
                    this.$store.commit('user/setUInfo', '')
                    this.$store.commit('user/setLogin', '')
                    this.$axios.defaults.headers.common['token'] = ''
                    this.$axios.defaults.headers.common['username'] = ''
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                    })
                    //修改密码成功就重新登录
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
        onSubmitEmail() {
            let load = this.$loading({ fullscreen: true })
            this.$apis.userApi.changeEmail(this.emailForm)
            .then(res => {
                load.close()
                res = res.data
                if(res.code == 1){
                    this.$store.commit('user/setEmail', this.emailForm.email)
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success',
                        duration: 1500
                    })
                    this.emailVisible = false
                    this.emailForm.vcode = ''
                    this.emailForm.email = ''
                    this.emailForm.email2 = ''
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
        getVcode() {
            let load = this.$loading({ fullscreen: true })
            let data = {
                email: this.$store.state.user.userInfo.email,
                type: 2
            }
            this.$apis.userApi.getvcode(data)
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
                    // 一分钟后才能再次获取验证码
                    this.timer = 60
                    this.allow_getVcode = true
                    this.setTimer()
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
        setTimer() {
            if(this.t == null) {
                this.t = setInterval( () => {
                    this.timer -- 
                    this.$store.commit('user/set_getVcode', this.timer)
                    if(this.timer == 0){
                        this.allow_getVcode = false
                        clearInterval(this.t)
                        this.t = null
                    }
                }, 1000)
            }
        }
    },
    created() {
        /* this.userInfo.avatar = this.$global.adminUrl + this.$store.state.user.userInfo.avatar
        if(typeof(this.$store.state.user.userInfo.avatar) == 'undefined'){
            this.userInfo.avatar = require(`../assets/imgs/head.jpeg`)
        } */
        //this.userInfo.nickname = this.$store.state.user.userInfo.nickname || `游客`

        console.log(this.$store.getters['user/getUserInfo'].avatar)
        //检测是否能够获取验证码
        this.timer = this.$store.state.user.getVcode
        this.allow_getVcode = this.timer == 0 ? false : true 
        if(this.timer !== 0) {
            this.setTimer()
        }
    },
    computed: {
        
        
    },
    watch: {
        
    }
}
</script>

<style lang="scss">
$color_1: #FF6F61;
$color_2: #23B9FD;
$color_3: rgba(255, 111, 97, 1);
.el-popover{
    padding: 0 !important;
    border: none !important;
    .el-card__header{
        background: $color_1;
        color: #fff;
        height: 80px;
        img{
            border-radius: 50%;
            box-shadow: 0 0 10px $color_2;
        }
        span.name{
            font-weight: bold;
            margin-left: 15px;
        }
    }
    .el-card__body{
        padding: 0;
        ul{
            list-style-type: none;
            padding: 0;
            li{
                display: inline-block;
                height: 40px;
                line-height: 40px;
                width: 100%;
                text-align: center;
                cursor: pointer;
                transition: .3s;
                background: rgba(255, 111, 97, 0);
                color: #333;
            }
            li:hover{
                background: rgba(255, 111, 97, .3);
                color: #555;
            }
        }
    }
    .popper__arrow{
        border-color: transparent transparent $color_1 !important;
    }

}
.container {
    background-color: #574ab8;
    background-image: url(../assets/imgs/main_bg.png);
    background-position: center 0;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    color: #fff;
    a{
        color: #fff;
    }
    .el-header, 
    .el-footer {
        text-align: center;
        line-height: 60px;
        height: 60px;
    }
    .el-header{
        padding-left: 0;
        h1{
            width: 200px;
            letter-spacing: 5px;
            display: inline-block;
            position: absolute;
            left: 0;
            span{
                cursor: pointer;
            }
        }
        ul{
            position: absolute;
            left: 200px;
            list-style-type: none;
            a{
                text-decoration: none;
            }
            li{
                float: left;
                background: rgba(255, 255, 255, 0);
                transition: .5s;
                padding: 0 20px;
            }
        }
        ul.left{
            li:hover{
                background: rgba(255, 255, 255, .1);
            }
        }
        ul.right{
            right: 0;
            left: auto;
            img{
                width: 35px;
                height: 35px;
                border-radius: 35px;
            }
            .name{
                margin-left: 10px;
                font-size: 14px;
                font-weight: 500;
            }
            i{
                margin-left: 10px;
                cursor: pointer;
                transform: rotate(0deg);
                transition: .3s;
            }
            li:hover i{
                transform: rotate(180deg);
            }
            
        }
    }
    .el-main{
        padding: 0;
        padding-right: 10px;
        padding-bottom: 10px;
        height: calc(100vh - 60px);
        overflow: hidden;

        .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            opacity: 0;
        }

        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
            transform: translateX(10px);
            opacity: 0;
        }

        .bounce-enter-active {
            animation: bounce-in .5s;
        }
        .bounce-leave-active {
            animation: bounce-in .5s reverse;
        }
        @keyframes bounce-in {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.5);
            }
            100% {
                transform: scale(1);
            }
        }
    }
}
.getVcode{
    position: absolute;
    right: 5px;
    top: 0;
}

  


</style>
