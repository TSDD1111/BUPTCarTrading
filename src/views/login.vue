<!--整个页面模板布局-->
<template>
  <div class="login">
    <h1>BUPT二手车交易平台登录</h1>
    <el-form label-width="80px" :model="loginData">
      <el-form-item label="手机号码">
        <el-input placeholder="请输入手机号" v-model="loginData.userTelnum"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input placeholder="请输入密码" v-model="loginData.userPassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="subFun" class="sub-btn" round type="primary">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="changePassFun" class="re-btn" round type="primary">忘记密码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="changeRegFun" class="re-btn" round type="primary">没有账号，前往注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--该页面脚本编写-->
<script>
// 引用外部组件等
import { reactive } from 'vue'             //用于设置响应式数据
import { ElMessage } from 'element-plus'   //Element中用于实现消息提示
import { login } from '../http/api.js'     //api中封装的登录判断，传递给后端
import router from '../router/index.js'    //用于页面跳转
export  default {
  name:'Login',
  //启动时使用
  setup(){
    //登录的数据：账号和密码
    let loginData=reactive({
      userTelnum:'',
      userPassword:''
    })
    //点击登录时的判断
    let subFun=()=>{
      //判断账号为空或者密码为空的情况
      if(!loginData.userTelnum || !loginData.userPassword){
        ElMessage.error('手机号或者密码不能为空！');
        return;
      }
      //执行登录操作，发送信息给后端
      login(loginData).then(res=>{
        //跳转到买车界面等
        if(res == true){
          router.push({name: 'Buy', params:{sort: 1}})
        }
        else{
          ElMessage.error('手机号或者密码错误！');
        }
      })
    }
    //点击忘记密码界面
    let changePassFun=()=>{
      //打开一个新窗口
      let ret = router.resolve('/reset');
      window.open(ret.href);
    }
    //点击注册界面
    let changeRegFun=()=>{
      router.push("/reg")
    }
    //记得返回参数等
    return{
      loginData,
      subFun,
      changePassFun,
      changeRegFun
    }
  }
}
</script>
<!--该页面颜色等格式设置-->
<style lang="scss">
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