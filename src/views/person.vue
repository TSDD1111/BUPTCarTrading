<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
          :default-active="choose"
          class="el-menu-vertical-demo" v-model="choose">
        <el-menu-item @click="personInfo" index="1">
          <i class="el-icon-menu"></i>
          <template #title>个人信息</template>
        </el-menu-item>
        <el-menu-item @click="buyCarInfo" index="2">
          <i class="el-icon-shopping-cart-full"></i>
          <template #title>买车信息</template>
        </el-menu-item>
        <el-menu-item @click="sellCarInfo" index="3">
          <i class="el-icon-truck"></i>
          <template #title>卖车信息</template>
        </el-menu-item>
        <el-menu-item @click="logout" index="4">
          <i class="el-icon-switch-button"></i>
          <template #title>退出登录</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
  ref, watch
} from "vue";
import router from "../router/index.js"
import {logOut} from "../http/api";

export default {
  name: 'Person',
  setup(){
    //锁定导航栏
    let choose = ref(1);
    let url = router.currentRoute.value.name;
    if(url == "personInfo"){
      choose.value = "1";
    }
    else if(url == "buyCarInfo"){
      choose.value = "2";
    }
    else if(url == "sellCarInfo"){
      choose.value = "3";
    }
    watch(()=>router.currentRoute.value.name, (newValue) =>{
      if(newValue == "personInfo"){
        choose.value = "1";
      }
    });
    //跳转到登录界面
    let logout=()=>{
      logOut()
      router.push("/")
    }
    let personInfo=()=>{
      router.push("/perInfo")
    }
    let buyCarInfo=()=>{
      router.push("/buyCarInfo");
    }
    let sellCarInfo=()=>{
      router.push("/sellCarInfo");
    }
    return{
      personInfo,
      buyCarInfo,
      sellCarInfo,
      logout,
      choose,
    }
  },
}
</script>
<style lang="scss" scoped>

</style>