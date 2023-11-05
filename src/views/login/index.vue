<template>
  <div class="login-container">
    <el-form class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">V-POKER管理后台</h3>
      </div>

      <div class="user-name-box">
        <el-input v-model="username" placeholder="请输入用户名">
          <i slot="prefix" class="el-input__icon el-icon-user-solid" />
        </el-input>
      </div>

      <div class="user-psw-box">
        <el-input v-model="password" placeholder="请输入密码" show-password>
          <i slot="prefix" class="el-input__icon el-icon-lock" />
        </el-input>
      </div>
   
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="adminLogin"
      >立即登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/admin';
import { setKey, loginOut } from '@/utils/auth';
import {resetRouter} from '@/router';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      showCode: false,
      username: '',
      password: '',
    }
  },
  mounted() {
    loginOut();   
  },
  methods: {
    async adminLogin() {
      const params = {
        user_name: this.username,
        password: this.password
      }
      // 前端校验
      if (!params.user_name) return this.$message({ type: 'error', message: '请输入登录管理员名称' })
      if (!params.password) return this.$message({ type: 'error', message: '请输入登录管理员密码' })
      
      const { code, data,message } = await login({ ...params });
      if (code == 0) {
        this.$message({
        type:'success',
        message:'登录成功'
      })
        localStorage.setItem('user',JSON.stringify(data))
        resetRouter();//加载动态路由
        this.$goto('home')
      }else{
        this.$message({
        type:'error',
        message:message
      })
      }
     
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 30px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .user-name-box {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .user-psw-box {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .user-code-box {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
