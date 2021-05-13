<template>
  <div class="home">
    <el-container>
      <el-header class="top">
        <el-row :gutter="10">
          <el-col :span="18">
            <h1>BUPT二手车交易平台</h1>
          </el-col>
          <el-col :span="4">
            <el-menu :default-active="index1" background-color="#efefef" class="navigation" mode="horizontal">
              <el-menu-item @click="buyCar" index="1">我要买车</el-menu-item>
              <el-menu-item @click="sellCar" index="2">我要卖车</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="2">
            <div class="exit">
              <span class="btn-exit">admin</span>
              <el-button class="btn-exit" type="text">退出</el-button>
            </div>
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {

} from "vue";
import router from "../router/index"

export default {
  name: 'Home',
  setup(){
    let buyCar=()=>{
      router.push(router.options.routes[0].children[0]);
    }
    let sellCar=()=>{
      router.push(router.options.routes[0].children[1]);
    }
    return{
      index1 : "1",
      index2 : "2",
      buyCar,
      sellCar,
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