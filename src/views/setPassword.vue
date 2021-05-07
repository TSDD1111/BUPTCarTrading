<!--整个页面模板布局-->
<template>
  <div class="login">
    <h1>BUPT二手车交易平台重置密码</h1>
    <el-form label-width="80px" :model="resetData">
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="resetData.userPassword" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input placeholder="请再次输入密码" v-model="confirmPassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetFun" class="sub-btn" round="true" type="primary">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--该页面脚本编写-->
<script>
// 引用外部组件等
import { reactive,ref } from 'vue'             //用于设置响应式数据
import { ElMessage } from 'element-plus'   //Element中用于实现消息提示
import { resetPass } from '../http/api.js'     //api中封装的登录判断，传递给后端
import router from '../router/index.js'    //用于页面跳转
export  default {
  name:'Login',
  //启动时使用
  setup(){
    //登录的数据：账号和密码
    let resetData=reactive({
      userTelnum:'',
      userPassword:''
    })
    console.log(router);
    resetData.userTelnum = router.currentRoute.value.params.id;
    let confirmPassword = ref('');
    //点击登录时的判断
    let resetFun=()=>{
      //判断密码为空或者两次密码不相等的情况
      if(!confirmPassword.value || !resetData.userPassword){
        ElMessage.error('两次输入密码不能为空！');
      }
      else if(resetData.userPassword.length < 6){
        ElMessage.error('密码不能小于6位！');
      }
      else if(resetData.userPassword != confirmPassword.value){
        ElMessage.error('两次输入密码不相等！');
      }
      //执行登录操作，发送信息给后端
      if(resetData.userPassword.length >= 6){
        resetPass(resetData).then(res=>{
          //跳转到买车界面等
          if(res == true){
            ElMessage.success({
              message: '重置密码成功！',
              type: 'success'
            });
            router.push('/')
          }
          else{
            ElMessage.error('密码重置失败！');
          }
        })
      }
    }
    //记得返回参数等
    return{
      resetData,
      confirmPassword,
      resetFun
    }
  }
}
</script>
<!--该页面颜色等格式设置-->
<style>
/*设置login的布局*/
.login{
  width: 500px;
  margin: 150px auto;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
}
/*设置h1的布局*/
h1{
  text-align: center;
}
/*设置按钮的布局*/
.sub-btn{
  width: 100%;
  color: white;
}
.re-btn{
  width: 100%;
  color: black;
  background-color: white;
}
</style>