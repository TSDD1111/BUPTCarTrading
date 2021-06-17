<template>
  <el-row :gutter="10">
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <h1>修改密码界面</h1>
      <el-form label-width="80px" :model="userChangeInfo">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="密码">
              <el-input placeholder="请输入新的密码，密码长度大于等于6位(不修改，请输入原有密码)" v-model="userChangeInfo.userPassword" show-password></el-input>
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
              <el-input placeholder="请输入新的手机号,11位或者8位手机号(不修改，请输入原有手机)" v-model="userChangeInfo.userTelnum">
                {{userInfo.userTelnum}}
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="19">
            <el-form-item label="邮箱">
              <el-input placeholder="请输入新的邮箱号码(不修改，请输入原有邮箱)" v-model="userChangeInfo.email">
                {{userInfo.email}}
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button @click="getCode" round type="primary" class="re-btn" size="small">获取验证码</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="验证码">
              <el-input placeholder="请输入验证码" v-model="userChangeInfo.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item>
              <el-button @click="commitFunc" class="sub-btn" round type="primary">修改信息</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import {reactive, ref} from "vue"
import router from "../router";
import {ElMessage} from "element-plus";
import {send, getUserInfo, updateUserInfo} from "../http/api";

export default {
  name: 'personInfo',
  setup() {
    let userChangeInfo = reactive({
      userId:"",
      userPassword:"",
      code:"",
      userTelnum:"",
      email:"",
    })
    getUserInfo().then(res=>{
      userChangeInfo.userId = res.userId;
      userChangeInfo.userTelnum = res.userTelnum;
      userChangeInfo.email = res.email;
    })
    //用于判断手机号是否含有非数字字符
    let teleReg = /^[0-9]*$/
    let teleRe = new RegExp(teleReg)
    //判断邮箱格式
    let mailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    let mailRe = new RegExp(mailReg)
    let confirmPassword = ref("");
    //提交修改信息
    let commitFunc=()=>{
    //判断密码为空的情况
      if(!userChangeInfo.userPassword || !confirmPassword.value){
        ElMessage.error('密码不能为空！');
        return;
      }
      else if(userChangeInfo.userPassword.length < 6){
        ElMessage.error('密码不能小于6位！');
        return;
      }
      else if(!userChangeInfo.userTelnum){
        ElMessage.error('手机号不能为空！');
        return;
      }
      else if (!teleRe.test(userChangeInfo.userTelnum)) {
        ElMessage.error('手机号不能含有除数字以外的字符！');
        return;
      }
      else if(userChangeInfo.userTelnum.length != 11 && userChangeInfo.userTelnum.length != 8){
        ElMessage.error('请输入正确的手机号码！');
        return;
      }
      else if(userChangeInfo.userPassword != confirmPassword.value){
        ElMessage.error('两次输入的密码不相等！');
        return;
      }
      else if(!mailRe.test(userChangeInfo.email)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!userChangeInfo.email){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      else if(userChangeInfo.code.length != 4){
        ElMessage.error('验证码为4位数字！');
        return;
      }
      updateUserInfo(userChangeInfo);
      router.push("/");
    }
    //点击获取验证码的判断
    let getCode=()=>{
      if(!mailRe.test(userChangeInfo.email)){
        ElMessage.error('请输入正确的邮箱,如123@qq.com！');
        return;
      }
      else if(!userChangeInfo.email){
        ElMessage.error('邮箱不能为空！');
        return;
      }
      //向后台请求发送验证码
      send(userChangeInfo.email).then(res=>{
        if(res == true){
          ElMessage.success({
            message: '验证码已发送！',
            type: 'success'
          });
        }
      })
    }
    return{
      userChangeInfo,
      confirmPassword,
      commitFunc,
      getCode,
    }

  }
}
</script>

<style lang="scss">
.re-btn{
  width: 100%;
  color: black;
  background-color: white;
}
.sub-btn{
  width: 100%;
  color: white;
}
</style>