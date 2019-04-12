<template>
  <div class="back" :style="backgroundDiv">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">注册用户</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="学号/工号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="recheckPass">
        <el-input type="password" v-model="ruleForm2.recheckPass" auto-complete="off" placeholder="确认密码" onblur="checkRepwd()"></el-input>
      </el-form-item>
      <el-form-item prop="teamNum">
        <el-input type="text" v-model="ruleForm2.teamNum" auto-complete="off" placeholder="区队编码"></el-input>
      </el-form-item>
      <el-form-item prop="secretKey">
        <el-input type="text" v-model="ruleForm2.secretKey" auto-complete="off" placeholder="密钥（注册管理员账号必填）"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:30%;" @click.native.prevent="handleRegister" :loading="logining">注册</el-button>
        <el-button @click.native.prevent="handleReset" style="width:30%;">重置</el-button>
        <el-button @click="$router.go(-1)" style="width:30%;">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { requestRegister } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        backgroundDiv: {
        // backgroundImage:'url(' + require('../../static/background1.jpg') + ')',
        // backgroundRepeat:'no-repeat',
        // backgroundSize:'100% 100%'
        },
        ruleForm2: {
          account: '',
          name: '',
          checkPass: '',
          recheckPass: '',
          teamNum: '',
          secretKey: ''
        },
        rules2: {
          account: [
            // 账号7位长度
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ],
          recheckPass: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
          ],
          teamNum: [
            { required: true, message: '请输入区队编号', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm2.resetFields();
      },
      // backLogin() {

      // },
      handleRegister(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { 
              account: this.ruleForm2.account, 
              name: this.ruleForm2.name,
              password: this.ruleForm2.checkPass,
              teamNum: this.ruleForm2.teamNum,
              secretKey: this.ruleForm2.secretKey || ''
              };
            requestRegister(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
                this.handleReset()
              } else {
                this.$router.push({ path: '/login' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      checkRepwd(){
        var repwd=$("repwd");
        var pwd=$("pwd");
        var repwdId=divId("repwd_prompt");
        repwdId.innerHTML="";
          if(pwd!=repwd){
            repwdId.innerHTML="两次输入的密码不一致!";
          return false;
          }
          return true;
        }
    }
  }

</script>

<style lang="scss" scoped>
  .back {
    height: 105%;
    width: 100%;
    // margin-top: -50px;
    .login-container {
      /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      width: 350px;
      position: absolute;
      right: 550px;
      top: 50px;
      margin: 100px 20px auto auto;
      padding: 20px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
</style>