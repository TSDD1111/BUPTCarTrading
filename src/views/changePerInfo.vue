<template>
  <el-row :gutter="10">
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <h1>修改信息界面</h1>
      <el-form label-width="80px" :model="userChangeInfo">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                  action="http://8.140.2.249/car/oss/uploadFile"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                <img v-if="userChangeInfo.avatar" :src="userChangeInfo.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="用户名">
              <el-input placeholder="请输入新的用户名" v-model="userChangeInfo.userName">
                {{userChangeInfo.userName}}
              </el-input>
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
import {getUserInfo, updateUserInfo} from "../http/api";
import {reactive} from "vue"
import router from "../router";
import {ElMessage} from "element-plus";

export default {
  name: 'personInfo',
  setup() {
    let userChangeInfo = reactive({
      userId:"",
      userName:"",
      avatar:"",
    })
    getUserInfo().then(res=>{
      userChangeInfo.userId = res.userId;
      userChangeInfo.userName = res.userName;
      userChangeInfo.avatar = res.avatar;
    })
    //上传头像的返回
    let handleAvatarSuccess=(response)=>{
      userChangeInfo.avatar = response;
    }
    //跳转到修改个人信息界面
    let commitFunc=()=>{
      if(!userChangeInfo.userName){
        ElMessage.error('用户名不能为空');
        return;
      }
      updateUserInfo(userChangeInfo);
      router.push("/perInfo");
    }

    return{
      userChangeInfo,
      commitFunc,
      handleAvatarSuccess,
    }
  }
}
</script>

<style lang="scss">
.avatar{
  width: 350px;
  height: 350px;
}
.sub-btn{
  width: 100%;
  color: white;
}
</style>