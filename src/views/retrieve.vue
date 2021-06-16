<template>
  <div class="retrieve">
    <h1>BUPT二手车交易平台重置密码</h1>
    <el-form label-width="80px" :model="setData">
      <el-form-item label="邮箱号码">
        <el-input placeholder="请输入邮箱号码" v-model="setData.userMail"></el-input>
        <el-button @click="getCode" round type="primary" size="small">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input placeholder="请输入验证码" v-model="setData.verCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="subFun" class="reg-btn" round type="primary">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {reactive} from 'vue';   //用于设置响应式数据
import {ElMessage} from "element-plus";
import {send, setPassword} from "../http/api";
import router from "../router/index.js";

export default {
  name: 'Retrieve',
  setup(){
    //登录的数据：账号和密码
    let setData = reactive({
      userMail:'',
      verCode:''
    })
    //判断邮箱格式
    let mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let mailRe = new RegExp(mailReg)
    //点击获取验证码的判断
    let getCode=()=>{
      if(!mailRe.test(setData.userMail)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!setData.userMail){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      //向后台请求发送验证码
      send(setData.userMail).then(res=>{
        if(res == true){
          ElMessage.success({
            message: '验证码已发送！',
            type: 'success'
          });
        }
      })
    }
    //点击重置密码时的判断
    let subFun=()=>{
      if(!mailRe.test(setData.userMail)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!setData.userMail && !setData.verCode){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      else if(setData.verCode.length != 4){
        ElMessage.error('验证码为4位数字！');
        return;
      }
      //执行申请操作，发送信息给后端
      setPassword(setData).then(res=>{
        if(res == true){
          ElMessage.success({
            message: '请输入新的密码！',
            type: 'success'
          });
          router.push({name:"SetPassword", params:{mail:setData.userMail}});
        }
        else{
          ElMessage.error('该邮箱未被注册！');
        }
      })
    }

    return {
      setData,
      subFun,
      setPassword,
      getCode
    }
  },
}
</script>
<style lang="scss" scoped>
.retrieve{
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
</style>