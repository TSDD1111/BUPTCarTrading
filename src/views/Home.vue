<template>
  <div class="home">
    <el-container>
      <el-header class="top">
        <el-row :gutter="10">
          <el-col :span="19">
            <h1>BUPT二手车交易平台</h1>
          </el-col>
          <el-col :span="5">
            <el-menu :default-active="index1" background-color="#efefef" class="navigation" mode="horizontal">
              <el-menu-item @click="buyCar" index="1">我要买车</el-menu-item>
              <el-menu-item @click="sellCar" index="2">我要卖车</el-menu-item>
              <el-menu-item @click="loginCar" index="3" v-if="sort == 0">登录</el-menu-item>
              <el-menu-item @click="personSet" index="3" v-else-if="sort == 1">个人中心</el-menu-item>
            </el-menu>
          </el-col>
<!--          <el-col :span="2">-->
<!--            <div class="exit">-->
<!--              <span class="btn-exit">admin</span>-->
<!--              <el-button class="btn-exit" type="text">退出</el-button>-->
<!--            </div>-->
<!--          </el-col>-->
        </el-row>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
ref
} from "vue";
import router from "../router/index.js"

export default {
  name: 'Home',
  setup(){
    //判断用户是否登录
    let sort = ref(0)
    if(router.currentRoute.value.params.sort){
      sort = router.currentRoute.value.params.sort
    }
    let buyCar=()=>{
      router.push({name:'Buy', params:{carType: 'first'}});
    }
    let sellCar=()=>{
      router.push(router.options.routes[0].children[1]);
    }
    //跳转到登录界面
    let loginCar=()=>{
      router.push('/login')
    }
    //跳转到个人设置
    let personSet=()=>{
      router.push(router.options.routes[0].children[4])
    }
    return{
      index1 : "1",
      index2 : "2",
      sort,
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