<template>
  <div class="register">
    <h1>BUPT二手车交易平台注册</h1>
    <el-form label-width="80px" :model="registerData">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="registerData.userName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="密码">
            <el-input placeholder="请输入密码，密码长度大于等于6位" v-model="registerData.userPassword" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="确认密码">
            <el-input placeholder="请再次输入相同的密码" v-model="confirmPassword" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="手机号">
            <el-input placeholder="请输入手机号,11位或者8位手机号" v-model="registerData.userTelnum"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="19">
          <el-form-item label="邮箱">
            <el-input placeholder="请输入邮箱号码" v-model="registerData.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button @click="getCode" round type="primary" class="re-btn" size="small">获取验证码</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="验证码">
            <el-input placeholder="请输入验证码" v-model="registerData.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item>
            <el-button @click="subFun" class="reg-btn" round type="primary">注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item>
            <el-button @click="changeLoginFun" class="login-btn" round type="primary">已有账号，前往登录</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import {register,send} from "../http/api";
import router from "../router/index.js";             //用于设置响应式数据

export default {
  name: 'Register',
  setup(){
    //登录的数据：账号和密码
    let registerData=reactive({
      userName:'',
      userPassword:'',
      userTelnum:'',
      email:'',
      code:''
    })
    let confirmPassword = ref('');
    //用于判断手机号是否含有非数字字符
    let teleReg = /^[0-9]*$/
    let teleRe = new RegExp(teleReg)
    //判断邮箱格式
    let mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let mailRe = new RegExp(mailReg)
    //点击注册时的判断
    let subFun=()=>{
      //判断账号为空或者密码为空的情况
      if(!registerData.userName || !registerData.userPassword || !confirmPassword.value){
        ElMessage.error('用户名或者密码不能为空！');
        return;
      }
      else if(registerData.userPassword.length < 6){
        ElMessage.error('密码不能小于6位！');
        return;
      }
      else if(!registerData.userTelnum){
        ElMessage.error('手机号不能为空！');
        return;
      }
      else if (!teleRe.test(registerData.userTelnum)) {
        ElMessage.error('手机号不能含有除数字以外的字符！');
        return;
      }
      else if(registerData.userTelnum.length != 11 && registerData.userTelnum.length != 8){
        ElMessage.error('请输入正确的手机号码！');
        return;
      }
      else if(registerData.userPassword != confirmPassword.value){
        ElMessage.error('两次输入的密码不相等！');
        return;
      }
      else if(!mailRe.test(registerData.email)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!registerData.email){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      else if(registerData.code.length != 4){
        ElMessage.error('验证码为4位数字！');
        return;
      }
      //执行登录操作，发送信息给后端
      register(registerData).then(res=>{
        //跳转到买车界面等
        if(res == 0){
          ElMessage.success({
            message: '注册成功！',
            type: 'success'
          });
          router.push('/')
        }
        else if(res == -1){
          ElMessage.error('手机号或邮箱已被注册！');
        }
        else if(res == -2){
          ElMessage.error('验证码出错！');
        }
      })
    }
    //点击获取验证码的判断
    let getCode=()=>{
      if(!mailRe.test(registerData.email)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!registerData.email){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      //向后台请求发送验证码
      send(registerData.email).then(res=>{
        if(res == true){
          ElMessage.success({
            message: '验证码已发送！',
            type: 'success'
          });
        }
      })
    }
    //切换到登录界面
    let changeLoginFun=()=>{
      router.push('/login')
    }
    return {
      registerData,
      confirmPassword,
      subFun,
      getCode,
      changeLoginFun,
    }
  },
}
</script>
<style lang="scss">
.register{
  width: 500px;
  margin: 150px auto;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
}
h1{
  text-align: center;
}
.reg-btn{
  width: 100%;
  color: white;
}
.login-btn{
  width: 100%;
  color: black;
  background-color: white;
}
.get-btn{
}
</style>