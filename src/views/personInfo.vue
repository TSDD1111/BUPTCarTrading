<template>
  <el-row :gutter="10">
    <el-col :span="6"></el-col>
    <el-col :span="8">
      <el-form :model="form" label-width="80px">
        <el-form-item label="头像:">
          <div class="block"><el-avatar shape="square" :size="100" :src="form.userPicture"></el-avatar></div>
        </el-form-item>
        <el-form-item label="用户名:">
          <label>{{form.userName}}</label>
        </el-form-item>
        <el-form-item label="用户手机:">
          <label>{{form.userTelnum}}</label>
        </el-form-item>
        <el-form-item label="用户邮箱:">
          <label>{{form.email}}</label>
        </el-form-item>
      </el-form>
      <el-col :span="12">
        <el-form-item>
          <el-button @click="changePerInfo" class="re-btn" round type="primary">修改信息</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item>
          <el-button @click="changePassword" class="re-btn" round type="primary">修改密码</el-button>
        </el-form-item>
      </el-col>
    </el-col>
    <el-col :span="10"></el-col>
  </el-row>
</template>

<script>
import {getUserInfo} from "../http/api";
import {reactive, ref} from "vue"
import router from "../router";

export default {
  name: 'personInfo',
  setup() {
    let userName = ref("")
    let form = reactive({
      userName:"",
      userTelnum:"",
      userPicture:"",
      email:"",
    })
    getUserInfo().then(res=>{
      form.userName = res.userName;
      form.userTelnum = res.userTelnum;
      form.userPicture = res.avatar;
      form.email = res.email;
    })
    //跳转到修改个人信息界面
    let changePerInfo=()=>{
      router.push("/changePerInfo");
    }
    //跳转到修改密码界面
    let changePassword=()=>{
      router.push("/changePassword");
    }

    return{
      userName,
      form,
      changePerInfo,
      changePassword,
    }
  }
}
</script>

<style lang="scss">

</style>