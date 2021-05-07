<template>
  <div class="retrieve">
    <h1>BUPT二手车交易平台重置密码</h1>
    <el-form label-width="80px">
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="userTelnum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="subFun" class="reg-btn" round="true" type="primary">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {ref} from 'vue';   //用于设置响应式数据
import {ElMessage} from "element-plus";
import {setPassword} from "../http/api";
import router from "../router/index.js";

export default {
  name: 'Register',
  setup(){
    //登录的数据：账号和密码
    let userTelnum = ref('');
    //点击注册时的判断
    let subFun=()=>{
      //用于判断手机号是否含有非数字字符
      let numReg = /^[0-9]*$/
      let numRe = new RegExp(numReg)
      //判断手机号为空或者其他情况
      if(!userTelnum.value){
        ElMessage.error('手机号不能为空！');
      }
      else if (!numRe.test(userTelnum.value)) {
        ElMessage.error('手机号不能含有除数字以外的字符！');
      }
      else if(userTelnum.value.length != 11 && userTelnum.value.length != 8){
        ElMessage.error('请输入正确的手机号码！');
      }
      //执行申请操作，发送信息给后端
      setPassword(userTelnum.value).then(res=>{
        if(res == true){
          ElMessage.success({
            message: '请输入新的密码！',
            type: 'success'
          });
          router.push({name:"SetPassword", params:{id:userTelnum.value}});
        }
        else{
          ElMessage.error('该手机号未被注册！');
        }
      })
    }

    return {
      userTelnum,
      subFun,
      setPassword
    }
  },
}
</script>
<style>
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