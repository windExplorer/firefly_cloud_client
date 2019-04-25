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
                            <span><img :src="userInfo.avatar" width="50" height="50" alt=""></span>
                            <span class="name">{{ userInfo.nickname }}</span>
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
                        <li slot="reference"><img :src="userInfo.avatar" alt=""> <span class="name">{{ userInfo.nickname }}</span> <span class="menu"><i class="el-icon-arrow-down"></i></span></li>
                    </el-popover>
                </ul>

            </el-header>
            <el-main>
                <transition
                    name="custom-classes-transition"
                    enter-active-class="animated bounceInLeft"
                    leave-active-class="animated zoomOutRight"
                >
                    <router-view></router-view>
                </transition>
                
            </el-main>
        </el-container>
        <!-- 其他 -->
        <el-dialog title="收货地址" :visible.sync="pwdVisible">
            123
            <div slot="footer" class="dialog-footer">
                <el-button @click="pwdVisible = false">取 消</el-button>
                <el-button type="primary" @click="pwdVisible = false">确 定</el-button>
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

            },
            emailForm: {

            },
            pwdVisible: false,
            emailVisible: false,
            formLabelWidth: '120px'
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
                    this.$store.commit('user/setUInfo', '')
                    this.$store.commit('user/setLogin', '')
                    this.$axios.defaults.headers.common['token'] = ''
                    this.$axios.defaults.headers.common['username'] = ''
                    this.$notify({
                        title: '成功',
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push('/dynamic')
                }else{
                    this.$notify.error({
                        title: '错误',
                        message: res.msg
                    })
                }
            })
            .catch(err => {
                load.close()
                this.$notify.error({
                    title: '错误',
                    message: `请求出错`
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
        }
    },
    created() {
        this.userInfo.avatar = this.$global.adminUrl + this.$store.state.user.userInfo.avatar
        console.log(typeof(this.$store.state.user.userInfo.avatar) == 'undefined')
        if(typeof(this.$store.state.user.userInfo.avatar) == 'undefined'){
            this.userInfo.avatar = require(`../assets/imgs/head.jpeg`)
        }
        this.userInfo.nickname = this.$store.state.user.userInfo.nickname || `游客`
        console.log(this.userInfo)
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

  


</style>
