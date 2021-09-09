<template>
  <div>
    <!--走马灯模块-->
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <el-carousel trigger="click" indicator-position="outside" :interval="5000" height="550px">
          <el-carousel-item v-for="index in 3" :key="index">
            <img @click="clickCar(lampInfo.carId[index], lampInfo.carSrc[index])" :src=lampInfo.carSrc[index] class="run-picture">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4"></el-col>
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
          <template v-for="i in carBrand" :key="i">
            <el-tab-pane :label="i" :name="i"></el-tab-pane>
          </template>
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
          <el-tab-pane label="不限" name="不限"></el-tab-pane>
          <template v-for="i in carList" :key="i">
            <el-tab-pane v-if="i != null" :label="i" :name="i"></el-tab-pane>
          </template>
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
        <el-tabs @click="selectPrice" v-model="carPrice">
          <el-tab-pane label="不限" name="不限"></el-tab-pane>
          <el-tab-pane label="5万以下" name="5"></el-tab-pane>
          <el-tab-pane label="5-8万" name="8"></el-tab-pane>
          <el-tab-pane label="8-11万" name="11"></el-tab-pane>
          <el-tab-pane label="11-14万" name="14"></el-tab-pane>
          <el-tab-pane label="14-17万" name="17"></el-tab-pane>
          <el-tab-pane label="17-20万" name="20"></el-tab-pane>
          <el-tab-pane label="20-50万" name="50"></el-tab-pane>
          <el-tab-pane label="50-100万" name="100"></el-tab-pane>
          <el-tab-pane label="100万以上" name="300"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!--  排序  -->
    <el-row :gutter="10">
      <el-col :span="4"></el-col>
      <el-col :span="1">
        <p>排序:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs @click="selectOrder" v-model="carOrder">
          <el-tab-pane label="不限" name="不限"></el-tab-pane>
          <el-tab-pane v-if="!priceOrder" v-model="priceOrder" label="价格↑" name="1"></el-tab-pane>
          <el-tab-pane v-else label="价格↓" name="1"></el-tab-pane>
          <el-tab-pane v-if="!regOrder" v-model="regOrder" label="车龄↑" name="2"></el-tab-pane>
          <el-tab-pane v-else label="车龄↓" name="2"></el-tab-pane>
          <el-tab-pane v-if="!kiloOrder" v-model="kiloOrder" label="里程数↑" name="3"></el-tab-pane>
          <el-tab-pane v-else label="里程数↓" name="3"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <!--车的图片、信息展示-->
    <el-row :gutter="10">
      <el-col :span="6" v-for="(y,index) in 20" :key="y" v-model="carInfo">
        <el-card @click="clickCar(carInfo.carId[index])" v-if="carInfo.carName[index] != null" :body-style="{ padding: '0px' }" shadow="hover" class="carMarTop">
          <img :src=carInfo.carSrc[index] class="picture">
          <div style="margin-left: 14px">
            <h3>{{ carInfo.carName[index] }}</h3>
            <label>{{carInfo.carTime[index]}}|{{carInfo.carDis[index]}}|{{carInfo.service[index]}}</label>
            <h4>{{  carInfo.carPrice[index] }}</h4>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="carMarTop">
      <el-col :span="6"></el-col>
      <el-col :span="12">
        <img v-if="carInfo.carName[0] == null" src="../assets/notfound.png" class="notfound">
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--分页-->
    <el-row :gutter="10" class="carMarTop">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="carInfo.page"
            layout="prev, pager, next, jumper"
            :page-count="totalPage">
        </el-pagination>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

  </div>
</template>

<script>
import router from "../router/index.js";
import {ref, reactive} from 'vue';
import {getCarBrand, getCarSort, getCarPage, getBanner} from '../http/api.js'     //获取api
export default {
  name: 'Buy',
  setup(){
    //走马灯显示
    let lampInfo = reactive({
      carId:[],
      carSrc:[],
    })
    getBanner().then(res=>{
      for(let i = 0; i < res.length; i++){
        lampInfo.carId[i] = res[i].carId;
        lampInfo.carSrc[i] = res[i].carImg;
      }
    })
    let carType = ref('不限')   //车品牌
    let search = ref("")    //搜索栏
    let carBrand = reactive({})  //车品牌数组
    let carOrder = ref("不限")
    //获取所有的车品牌
    getCarBrand().then(res=>{
      for(let i = 0; i < res.length; i++){
        carBrand[i] = res[i];
      }
    })
    let carSort = ref('不限')    //对应车品牌的车种类
    let carPrice = ref('不限')   //车价格
    //获取初始的车种类的数组
    let carList = reactive({})
    getCarSort("奔驰").then(res=>{
      for(let i = 0; i < res.length; i++){
        carList[i] = res[i].carSeries;
      }
    })
    //20辆车的信息数组
    let carInfo = reactive({
      page:1,
      carId:[],
      carName:[],
      carPrice:[],
      carTime:[],
      carDis:[],
      service:[],
      carSrc:[],
    })
    let totalPage = ref(0);
    //搜索信息
    let carPageSearch = {
      brand:null,
      series:null,
      priceLower:null,
      priceUpper:null,
    }
    //返回初始的20辆车结果
    getCarPage(carPageSearch).then(res=>{
      totalPage.value = res.totalPage;
      for(let i = 0; i < res.list.length; i++){
        carInfo.carName[i] = res.list[i].name;
        carInfo.carId[i] = res.list[i].carId;
        carInfo.carPrice[i] = res.list[i].prePrice + "万";
        carInfo.carDis[i] = res.list[i].kilometer + "万公里";
        carInfo.service[i] = "到店服务";
        carInfo.carSrc[i] = res.list[i].cover;
        carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年"
      }
    })
    //点击搜索按钮
    let searchInfo=()=>{
      carPageSearch = {
        condition:search.value,
      }
      carType.value = "不限"
      carSort.value = "不限"
      carPrice.value = "不限"
      getCarPage(carPageSearch).then(res=>{
        totalPage.value = res.totalPage;
        for(let i = 0; i < res.list.length; i++){
          carInfo.carName[i] = res.list[i].name;
          carInfo.carId[i] = res.list[i].carId;
          carInfo.carPrice[i] = res.list[i].prePrice + "万";
          carInfo.carDis[i] = res.list[i].kilometer + "万公里";
          carInfo.service[i] = "到店服务";
          carInfo.carSrc[i] = res.list[i].cover;
          carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
        }
        //不足的值赋null取消显示
        for(let i = res.list.length; i < 20; i++){
          carInfo.carName[i] = null;
        }
      })
    }
    //点击不同的品牌
    let selectBrand=()=>{
      //清空搜索栏
      search.value = "";
      //清空搜索语句
      carPageSearch = {};
      //判断价格
      if(carPrice.value != "不限"){
        if(carPrice.value == "5"){
          carPageSearch.priceLower = null;
          carPageSearch.priceUpper = 5;
        }
        else if(carPrice.value == "8"){
          carPageSearch.priceLower = 5;
          carPageSearch.priceUpper = 8;
        }
        else if(carPrice.value == "11"){
          carPageSearch.priceLower = 8;
          carPageSearch.priceUpper = 11;
        }
        else if(carPrice.value == "14"){
          carPageSearch.priceLower = 11;
          carPageSearch.priceUpper = 14;
        }
        else if(carPrice.value == "17"){
          carPageSearch.priceLower = 14;
          carPageSearch.priceUpper = 17;
        }
        else if(carPrice.value == "20"){
          carPageSearch.priceLower = 17;
          carPageSearch.priceUpper = 20;
        }
        else if(carPrice.value == "50"){
          carPageSearch.priceLower = 20;
          carPageSearch.priceUpper = 50;
        }
        else if(carPrice.value == "100"){
          carPageSearch.priceLower = 50;
          carPageSearch.priceUpper = 100;
        }
        else if(carPrice.value == "300"){
          carPageSearch.priceLower = 100;
          carPageSearch.priceUpper = null;
        }
      }
      else{
        carPageSearch.priceLower = null;
        carPageSearch.priceUpper = null;
      }
      //判断排序
      if(carOrder.value == "1"){
        if(priceOrder.value == true){
          carPageSearch.priceOrder = false;
        }
        else{
          carPageSearch.priceOrder = true;
        }
      }
      else if(carOrder.value == "2"){
        if(regOrder.value == true){
          carPageSearch.regOrder = false;
        }
        else{
          carPageSearch.regOrder = true;
        }
      }
      else if(carOrder.value == "3"){
        if(kiloOrder.value == true){
          carPageSearch.kiloOrder = false;
        }
        else{
          carPageSearch.kiloOrder = true;
        }
      }
      //选择某一种品牌
      if(carType.value != '不限'){
        getCarSort(carType.value).then(res=>{
          for(let i = 0; i < res.length; i++){
            carList[i] = res[i].carSeries;
          }
          for(let i = res.length; i < Object.keys(carList).length; i++){
            carList[i] = null
          }
        })
        carSort.value = "不限";
        carPageSearch.brand = carType.value;
        carPageSearch.series = null;
        getCarPage(carPageSearch).then(res=>{
          totalPage.value = res.totalPage;
          for(let i = 0; i < res.list.length; i++){
            carInfo.carName[i] = res.list[i].name;
            carInfo.carId[i] = res.list[i].carId;
            carInfo.carPrice[i] = res.list[i].prePrice + "万";
            carInfo.carDis[i] = res.list[i].kilometer + "万公里";
            carInfo.service[i] = "到店服务";
            carInfo.carSrc[i] = res.list[i].cover;
            carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
          }
          //不足的值赋null取消显示
          for(let i = res.list.length; i < 20; i++){
            carInfo.carName[i] = null;
          }
        })
      }
      //对品牌没有要求
      else{
        carPageSearch.brand = null;
        carPageSearch.series = null;
        carSort.value = "不限";
        getCarPage(carPageSearch).then(res=>{
          totalPage.value = res.totalPage;
          for(let i = 0; i < res.list.length; i++){
            carInfo.carName[i] = res.list[i].name;
            carInfo.carId[i] = res.list[i].carId;
            carInfo.carPrice[i] = res.list[i].prePrice + "万";
            carInfo.carDis[i] = res.list[i].kilometer + "万公里";
            carInfo.service[i] = "到店服务";
            carInfo.carSrc[i] = res.list[i].cover;
            carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
          }
          //不足的值赋null取消显示
          for(let i = res.list.length; i < 20; i++){
            carInfo.carName[i] = null;
          }
        })
      }
    }
    //点击不同的车系
    let selectSort=()=>{
      search.value = "";
      carPageSearch = {};
      //判断价格
      if(carPrice.value != "不限"){
        if(carPrice.value == "5"){
          carPageSearch.priceLower = null;
          carPageSearch.priceUpper = 5;
        }
        else if(carPrice.value == "8"){
          carPageSearch.priceLower = 5;
          carPageSearch.priceUpper = 8;
        }
        else if(carPrice.value == "11"){
          carPageSearch.priceLower = 8;
          carPageSearch.priceUpper = 11;
        }
        else if(carPrice.value == "14"){
          carPageSearch.priceLower = 11;
          carPageSearch.priceUpper = 14;
        }
        else if(carPrice.value == "17"){
          carPageSearch.priceLower = 14;
          carPageSearch.priceUpper = 17;
        }
        else if(carPrice.value == "20"){
          carPageSearch.priceLower = 17;
          carPageSearch.priceUpper = 20;
        }
        else if(carPrice.value == "20"){
          carPageSearch.priceLower = 17;
          carPageSearch.priceUpper = 20;
        }
        else if(carPrice.value == "50"){
          carPageSearch.priceLower = 20;
          carPageSearch.priceUpper = 50;
        }
        else if(carPrice.value == "100"){
          carPageSearch.priceLower = 50;
          carPageSearch.priceUpper = 100;
        }
        else if(carPrice.value == "300"){
          carPageSearch.priceLower = 100;
          carPageSearch.priceUpper = null;
        }
      }
      else{
        carPageSearch.priceLower = null;
        carPageSearch.priceUpper = null;
      }
      //判断排序
      if(carOrder.value == "1"){
        if(priceOrder.value == true){
          carPageSearch.priceOrder = false;
        }
        else{
          carPageSearch.priceOrder = true;
        }
      }
      else if(carOrder.value == "2"){
        if(regOrder.value == true){
          carPageSearch.regOrder = false;
        }
        else{
          carPageSearch.regOrder = true;
        }
      }
      else if(carOrder.value == "3"){
        if(kiloOrder.value == true){
          carPageSearch.kiloOrder = false;
        }
        else{
          carPageSearch.kiloOrder = true;
        }
      }
      //选择某一种车系
      if(carSort.value != "不限"){
        if(carType.value != "不限"){
          carPageSearch.brand = carType.value;
          carPageSearch.series = carSort.value;
        }
        else{
          carPageSearch.brand = null;
          carPageSearch.series = carSort.value;
        }
        getCarPage(carPageSearch).then(res=>{
          totalPage.value = res.totalPage;
          for(let i = 0; i < res.list.length; i++){
            carInfo.carName[i] = res.list[i].name;
            carInfo.carId[i] = res.list[i].carId;
            carInfo.carPrice[i] = res.list[i].prePrice + "万";
            carInfo.carDis[i] = res.list[i].kilometer + "万公里";
            carInfo.service[i] = "到店服务";
            carInfo.carSrc[i] = res.list[i].cover;
            carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
          }
          //不足的值赋null取消显示
          for(let i = res.list.length; i < 20; i++){
            carInfo.carName[i] = null;
          }
        })
      }
      //对车系没有要求
      else{
        if(carType.value != "不限"){
          carPageSearch.brand = carType.value;
          carPageSearch.series = null;
        }
        else{
          carPageSearch.brand = null;
          carPageSearch.series = null;
        }
        getCarPage(carPageSearch).then(res=>{
          totalPage.value = res.totalPage;
          for(let i = 0; i < res.list.length; i++){
            carInfo.carName[i] = res.list[i].name;
            carInfo.carId[i] = res.list[i].carId;
            carInfo.carPrice[i] = res.list[i].prePrice + "万";
            carInfo.carDis[i] = res.list[i].kilometer + "万公里";
            carInfo.service[i] = "到店服务";
            carInfo.carSrc[i] = res.list[i].cover;
            carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
          }
          //不足的值赋null取消显示
          for(let i = res.list.length; i < 20; i++){
            carInfo.carName[i] = null;
          }
        })
      }
    }
    //点击不同的价格
    let selectPrice=()=>{
      search.value = "";
      carPageSearch = {};
      //判断价格
      if(carPrice.value != "不限"){
        if(carPrice.value == "5"){
          carPageSearch.priceLower = null;
          carPageSearch.priceUpper = 5;
        }
        else if(carPrice.value == "8"){
          carPageSearch.priceLower = 5;
          carPageSearch.priceUpper = 8;
        }
        else if(carPrice.value == "11"){
          carPageSearch.priceLower = 8;
          carPageSearch.priceUpper = 11;
        }
        else if(carPrice.value == "14"){
          carPageSearch.priceLower = 11;
          carPageSearch.priceUpper = 14;
        }
        else if(carPrice.value == "17"){
          carPageSearch.priceLower = 14;
          carPageSearch.priceUpper = 17;
        }
        else if(carPrice.value == "20"){
          carPageSearch.priceLower = 17;
          carPageSearch.priceUpper = 20;
        }
        else if(carPrice.value == "50"){
          carPageSearch.priceLower = 20;
          carPageSearch.priceUpper = 50;
        }
        else if(carPrice.value == "100"){
          carPageSearch.priceLower = 50;
          carPageSearch.priceUpper = 100;
        }
        else if(carPrice.value == "300"){
          carPageSearch.priceLower = 100;
          carPageSearch.priceUpper = null;
        }
      }
      else{
        carPageSearch.priceLower = null;
        carPageSearch.priceUpper = null;
      }
      //判断品牌
      if(carType.value != "不限"){
        carPageSearch.brand = carType.value;
      }
      else{
        carPageSearch.brand = null;
      }
      //判断车系
      if(carSort.value != "不限"){
        carPageSearch.series = carSort.value;
      }
      else{
        carPageSearch.series = null;
      }
      //判断排序
      if(carOrder.value == "1"){
        if(priceOrder.value == true){
          carPageSearch.priceOrder = false;
        }
        else{
          carPageSearch.priceOrder = true;
        }
      }
      else if(carOrder.value == "2"){
        if(regOrder.value == true){
          carPageSearch.regOrder = false;
        }
        else{
          carPageSearch.regOrder = true;
        }
      }
      else if(carOrder.value == "3"){
        if(kiloOrder.value == true){
          carPageSearch.kiloOrder = false;
        }
        else{
          carPageSearch.kiloOrder = true;
        }
      }
      //向后端发送请求
      getCarPage(carPageSearch).then(res=>{
        totalPage.value = res.totalPage;
        for(let i = 0; i < res.list.length; i++){
          carInfo.carName[i] = res.list[i].name;
          carInfo.carId[i] = res.list[i].carId;
          carInfo.carPrice[i] = res.list[i].prePrice + "万";
          carInfo.carDis[i] = res.list[i].kilometer + "万公里";
          carInfo.service[i] = "到店服务";
          carInfo.carSrc[i] = res.list[i].cover;
          carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
        }
        //不足的值赋null取消显示
        for(let i = res.list.length; i < 20; i++){
          carInfo.carName[i] = null;
        }
      })
    }
    //点击不同的排序
    let priceOrder = ref(false);
    let kiloOrder = ref(false);
    let regOrder = ref(false);
    let selectOrder=()=>{
      search.value = "";
      carPageSearch = {};
      //判断价格
      if(carPrice.value != "不限"){
        if(carPrice.value == "5"){
          carPageSearch.priceLower = null;
          carPageSearch.priceUpper = 5;
        }
        else if(carPrice.value == "8"){
          carPageSearch.priceLower = 5;
          carPageSearch.priceUpper = 8;
        }
        else if(carPrice.value == "11"){
          carPageSearch.priceLower = 8;
          carPageSearch.priceUpper = 11;
        }
        else if(carPrice.value == "14"){
          carPageSearch.priceLower = 11;
          carPageSearch.priceUpper = 14;
        }
        else if(carPrice.value == "17"){
          carPageSearch.priceLower = 14;
          carPageSearch.priceUpper = 17;
        }
        else if(carPrice.value == "20"){
          carPageSearch.priceLower = 17;
          carPageSearch.priceUpper = 20;
        }
        else if(carPrice.value == "50"){
          carPageSearch.priceLower = 20;
          carPageSearch.priceUpper = 50;
        }
        else if(carPrice.value == "100"){
          carPageSearch.priceLower = 50;
          carPageSearch.priceUpper = 100;
        }
        else if(carPrice.value == "300"){
          carPageSearch.priceLower = 100;
          carPageSearch.priceUpper = null;
        }
      }
      else{
        carPageSearch.priceLower = null;
        carPageSearch.priceUpper = null;
      }
      //判断品牌
      if(carType.value != "不限"){
        carPageSearch.brand = carType.value;
      }
      else{
        carPageSearch.brand = null;
      }
      //判断车系
      if(carSort.value != "不限"){
        carPageSearch.series = carSort.value;
      }
      else{
        carPageSearch.series = null;
      }
      //判断排序
      if(carOrder.value == "1"){
        priceOrder.value = !priceOrder.value;
        if(priceOrder.value == true){
          carPageSearch.priceOrder = false;
        }
        else{
          carPageSearch.priceOrder = true;
        }
      }
      else if(carOrder.value == "2"){
        regOrder.value = !regOrder.value;
        if(regOrder.value == true){
          carPageSearch.regOrder = false;
        }
        else{
          carPageSearch.regOrder = true;
        }
      }
      else if(carOrder.value == "3"){
        kiloOrder.value = !kiloOrder.value;
        if(kiloOrder.value == true){
          carPageSearch.kiloOrder = false;
        }
        else{
          carPageSearch.kiloOrder = true;
        }
      }
      //向后端发送请求
      getCarPage(carPageSearch).then(res=>{
        totalPage.value = res.totalPage;
        for(let i = 0; i < res.list.length; i++){
          carInfo.carName[i] = res.list[i].name;
          carInfo.carId[i] = res.list[i].carId;
          carInfo.carPrice[i] = res.list[i].prePrice + "万";
          carInfo.carDis[i] = res.list[i].kilometer + "万公里";
          carInfo.service[i] = "到店服务";
          carInfo.carSrc[i] = res.list[i].cover;
          carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
        }
        //不足的值赋null取消显示
        for(let i = res.list.length; i < 20; i++){
          carInfo.carName[i] = null;
        }
      })
    }
    //点击某辆车，跳转到对应的车界面
    let clickCar=(carID, carSrc)=>{
      router.push({path: 'carInfo', query:{carId: carID, carSrc: carSrc}})
      return
    }
    //改变页码时的变化
    let handleCurrentChange=(currentPage)=>{
      carInfo.page = currentPage;
      carPageSearch.currentPage = currentPage;
      getCarPage(carPageSearch).then(res=>{
        totalPage.value = res.totalPage;
        for(let i = 0; i < res.list.length; i++){
          carInfo.carName[i] = res.list[i].name;
          carInfo.carId[i] = res.list[i].carId;
          carInfo.carPrice[i] = res.list[i].prePrice + "万";
          carInfo.carDis[i] = res.list[i].kilometer + "万公里";
          carInfo.service[i] = "到店服务";
          carInfo.carSrc[i] = res.list[i].cover;
          carInfo.carTime[i] = (2021 - res.list[i].regdate.slice(0, 4)) + "年";
        }
        //不足的值赋null取消显示
        for(let i = res.list.length; i < 20; i++){
          carInfo.carName[i] = null;
        }
      })
    }
    return{
      clickCar,
      selectBrand,
      selectSort,
      selectPrice,
      searchInfo,
      selectOrder,
      handleCurrentChange,
      carBrand,
      search,
      carType,
      carSort,
      carPrice,
      carOrder,
      carList,
      carInfo,
      totalPage,
      lampInfo,
      priceOrder,
      kiloOrder,
      regOrder,
    }
  },
}
</script>

<style lang="scss">
.run-picture{
  width: 982px;
  height: 550px;
}
.carMarTop{
  margin-top: 20px;
}
.picture{
  margin-left: 10px;
  width: 340px;
  height: 250px;
}
.notfound{
  width: 800px;
  height: 300px;
}
</style>