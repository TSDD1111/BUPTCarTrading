<template>
  <div>
    <!--走马灯模块-->
    <el-row :gutter="10">
      <el-col :span="7"></el-col>
      <el-col :span="10">
        <el-carousel trigger="click" indicator-position="outside" :interval="5000" height="350px">
          <el-carousel-item v-for="item in 3" :key="item">
            <img @click="clickCar" src="../assets/1.jpg" class="run-picture">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>
    <!--导航栏-->
    <el-row :gutter="10">
      <el-col :span="7"></el-col>
      <el-col :span="9">
        <el-input
            placeholder="例如：奔驰"
            prefix-icon="el-icon-search"
            v-model="search">
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="searchInfo" icon="el-icon-search" circle></el-button>
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>
    <!--  品牌  -->
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="1">
        <p>品牌:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs @click="selectBrand" v-model="carType">
          <el-tab-pane label="不限" name="不限"></el-tab-pane>
          <el-tab-pane v-for="i in carBrand[0]" :key="i" :label="i" :name="i"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!--  车系  -->
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="1">
        <p>车系:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs @click="selectSort" v-model="carSort">
          <el-tab-pane label="不限" name="first"></el-tab-pane>
          <el-tab-pane v-for="i in carList[1]" :key="i" :label="i.carSeries" :name="i.carSeries"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!--  价格  -->
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="1">
        <p>价格:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs v-model="carPrice">
          <el-tab-pane label="不限" name="first"></el-tab-pane>
          <el-tab-pane label="3万以下" name="second"></el-tab-pane>
          <el-tab-pane label="3-5万" name="third"></el-tab-pane>
          <el-tab-pane label="5-7万" name="fourth"></el-tab-pane>
          <el-tab-pane label="7-9万" name="fifth"></el-tab-pane>
          <el-tab-pane label="9-12万" name="sixth"></el-tab-pane>
          <el-tab-pane label="12-16万" name="seventh"></el-tab-pane>
          <el-tab-pane label="16-20万" name="eighth"></el-tab-pane>
          <el-tab-pane label="20万以上" name="ninth"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!--车的图片、信息展示-->
    <el-row :gutter="10" v-for="y in 5" :key="y" class="carMarTop">
      <el-col :span="2"></el-col>
      <el-col :span="5" v-for="i in 4" :key="i">
        <el-card @click="clickCar" :body-style="{ padding: '0px' }" shadow="hover">
          <img src="../assets/1.jpg" class="picture">
          <div style="margin-left: 14px">
            <h3>法拉利</h3>
            <label>2018年|10公里|到店服务</label>
            <h4>40万</h4>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>

  </div>
</template>

<script>
import router from "../router/index.js";
import {ref, reactive} from 'vue';
import { getCarBrand,getCarSort } from '../http/api.js'     //获取api

export default {
  name: 'Buy',
  setup(){
    let carType = ref('不限')   //车品牌
    let search = ref("")    //搜索栏
    let carBrand = reactive([])  //车品牌数组
    //获取所有的车品牌
    getCarBrand().then(res=>{
      //通过push能动态改变界面的值
      carBrand.push(res)
    })
    let carSort = ref('不限')    //对应车品牌的车种类
    let carPrice = ref('first')   //车价格
    //车种类数组
    let carList = reactive([{}])
    getCarSort("奔驰").then(res=>{
      carList.push(res)
    })
    //点击搜索按钮
    let searchInfo=()=>{

    }
    //点击不同的品牌
    let selectBrand=()=>{
      if(carType.value != '不限'){
        getCarSort(carType.value).then(res=>{
          carList.pop()
          carList.push(res)
        })
      }
    }
    //点击不同的车系
    let selectSort=()=>{

    }
    //点击某辆车，跳转到对应的车界面
    let clickCar=()=>{
      router.push(router.options.routes[0].children[2])
      return
    }
    return{
      clickCar,
      selectBrand,
      selectSort,
      searchInfo,
      carBrand,
      search,
      carType,
      carSort,
      carPrice,
      carList,
    }
  },
}
</script>

<style lang="scss">
.run-picture{
  width: 610px;
  height: 350px;
}
.carMarTop{
  margin-top: 20px;
}
.picture{
  margin-left: 10px;
  width: 280px;
  height: 190px;
}
</style>