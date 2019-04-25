<template>
  <div class="login">
    <div class="login-box">
      <form action="javascript:;">
        <h1>登录</h1>
        <div class="title">用户名</div>
        <div class="input-box">
          <div class="icon"><img src="../assets/icons/user.png" alt=""></div>
            <input type="text" v-model="form.username" v-focus>
            <label class="border" for="input"></label>
        </div>

        <div class="title">密码</div>
        <div class="input-box">
          <div class="icon"><img src="../assets/icons/pwd.png" alt=""></div>
            <input type="password" v-model="form.password">
            <label class="border" for="input"></label>
        </div>

        <div class="forget">
          <span @click="gotoResetPwd">忘记密码?</span>
        </div>

        <div class="button">
          <button @click="onSubmit" type="submit">登录</button>
        </div>

        <div class="register">
          <span @click='gotoRegister'>立即注册</span>
        </div>

      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      let load = this.$loading({ fullscreen: true })
      this.$apis.userApi.loginIn(this.form)
      .then(res => {
        load.close()
        res = res.data
        if(res.code == 1){
          this.$store.commit('user/setUInfo', res.data)
          this.$store.commit('user/setLogin', true)
          this.$axios.defaults.headers.common['token'] = this.$store.state.user.userInfo.token
          this.$axios.defaults.headers.common['username'] = this.$store.state.user.userInfo.username
          this.$message({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          this.$router.push('/')
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
    gotoRegister() {
      this.$router.push('/register')
    },
    gotoResetPwd() {
      this.$router.push('/resetpwd')
    }
  },
  created() {
    
  }
}
</script>

<style lang="scss">
.login{
  background: url(../assets/imgs/bg-01.jpg);
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .login-box{
    width: 400px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 60px;
    text-align: left;
    h1{
      font-size: 39px;
      color: #333333;
      line-height: 1.2;
      text-align: center;
      font-weight: normal;
      margin-bottom: 20px;
    }

    .title{
      margin-top: 20px;
      font-size: 14px;
    }

    .input-box{
      height: 50px;
      line-height: 50px;
      position: relative; z-index: 1;
      .icon{
        display: inline-block;
        width: 50px;
        img{
          width: 30px;
          height: 25px;
        }
      }
      input{
        display: inline-block;
        width: 350px;
        height: 30px;
        border: none;
        outline: none;
        font-size: 20px;
        letter-spacing: 3px;
        font-weight: bolder;
      }
      input:focus + .border{
        border-bottom: solid #E911FC 1px;
      }
      .border{
        position: absolute;
        left: 0; 
        right: 0; 
        top: 0; 
        bottom: 0; 
        z-index: -1;
        transition: .5s;
        border-bottom: 1px #ccc solid;
      }
    }

    .forget,
    .register{
      font-size: 12px;
      text-align: right;
      margin-top: 10px;
      span{
        cursor: pointer;
        transition: .5s;
      }
      span:hover{
        color: #E911FC;
      }
    }

    .register{
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
    }

    .button{
      margin-top: 30px;
      text-align: center;
      button{
        width: 350px;
        height: 50px;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 45px;
        color: #fff;
        background: #37A9E5;
        opacity: .7;
        font-size: 16px;
        letter-spacing: 5px;
        text-align: center;
        transition: .3s;
      }
      button:hover{
        opacity: 1;
      }
    }

  }
}
</style>
