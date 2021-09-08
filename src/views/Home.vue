<template>
  <div class="home">
    <el-container>
      <el-header class="top">
        <el-row :gutter="10">
          <el-col :span="19">
            <h1>BUPT二手车交易平台</h1>
          </el-col>
          <el-col :span="5">
            <el-menu :default-active="choose" background-color="#efefef" class="navigation" mode="horizontal" v-model="choose">
              <el-menu-item @click="buyCar" index="1">我要买车</el-menu-item>
              <el-menu-item @click="sellCar" index="2">我要卖车</el-menu-item>
              <el-menu-item @click="personSet" index="3" v-if="sort == 1">
                <div class="block"><el-avatar shape="square" :size="50" :src="avatar"></el-avatar></div>
              </el-menu-item>
              <el-menu-item @click="loginCar" index="3" v-else>登录</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
ref,watch
} from "vue";
import router from "../router/index.js"
import {getUserInfo} from "../http/api";

export default {
  name: 'Home',
  setup(){
    //判断用户是否登录
    let sort = ref(0)
    let userName = ref("")
    let choose = ref("1")
    let avatar = ref("")
    getUserInfo().then(res=>{
      if(res != ""){
        sort.value = 1;
        userName.value = res.userName
        avatar.value = res.avatar
      }
      else{
        sort.value = 0;
      }
    })
    let url = router.currentRoute.value.name;
    if(url == "Buy"){
      choose.value = "1";
    }
    else if(url == "sellcars"){
      choose.value = "2";
    }
    else if(url == "personInfo" || url == "buyCarInfo" || url == "sellCarInfo" || url == "changePerInfo" || url == "changePassword"){
      choose.value = "3";
    }
    //监听是否退出登录
    watch(()=>router.currentRoute.value.name, (newValue) =>{
      if(newValue == "Buy" || newValue == "CarInfo"){
        choose.value = "1";
        getUserInfo().then(res=>{
          if(res != ""){
            sort.value = 1;
            userName.value = res.userName
            avatar.value = res.avatar
          }
          else{
            sort.value = 0;
          }
        })
      }
      else if(newValue == "personInfo"){
        choose.value = "3";
        getUserInfo().then(res=>{
          if(res != ""){
            sort.value = 1;
            userName.value = res.userName
            avatar.value = res.avatar
          }
          else{
            sort.value = 0;
          }
        })
      }
    });
    //我要买车
    let buyCar=()=>{
      choose.value = "1";
      router.push({name:'Buy', params:{carType: 'first'}});
    }
    //我要卖车
    let sellCar=()=>{
      choose.value = "2"
      router.push(router.options.routes[0].children[1]);
    }
    //跳转到登录界面
    let loginCar=()=>{
      choose.value = "3";
      router.push('/login')
    }
    //跳转到个人设置
    let personSet=()=>{
      choose.value = "3";
      router.push("/perInfo")
    }
    return{
      sort,
      userName,
      choose,
      avatar,
      buyCar,
      sellCar,
      loginCar,
      personSet,
    }
  },
}
</script>
<style lang="scss" scoped>
.top{
  background-color: #efefef;
  padding: 5px;
  h1{
    text-align: center;
    margin-top: 5px;
    font-size: 32px;
  }
  .exit{
    margin-top: 10px;
    text-align: right;
  }
  .navigation{
    margin-top: -5px;
  }
  .btn-exit{
    margin-left: 10px;
  }
}
</style>