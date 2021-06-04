<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
      </div>
    </el-col>
  </el-row>
  <el-row gutter="111">
    <el-col :span="12"><div class="grid-content bg-purple">
      <img id="picture" />
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple-light">
      <div class="product-textbox">
        <h1>
          {{car_information[0].name}}
        </h1>

        <el-table
            :data="car_information"
            style="width: 100%">
          <el-table-column
              prop= "brand"
              label="品牌"
              width="180">
          </el-table-column>
          <el-table-column
              prop="kilometer"
              label="里程"
              width="180">
          </el-table-column>
          <el-table-column
              prop="gearbox"
              label="变速箱">
          </el-table-column>
          <el-table-column
              prop="prePrice"
              label="价格">
          </el-table-column>
        </el-table>
        <button class="buycar">我要买车</button>
      </div>
    </div></el-col>
  </el-row>


  <el-row gutter="1111">
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <h1 class="baseinfo">
        {{car_information[0].name}} 基本信息
      </h1>
      <el-table
          :data="car_information"
          style="width: 100%">
        <el-table-column
            prop="brand"
            label="品牌"
            width="180">
        </el-table-column>
        <el-table-column
            prop="kilometer"
            label="里程"
            width="180">
        </el-table-column>
        <el-table-column
            prop="fuelType"
            label="燃料类型"
            width="180">
        </el-table-column>
        <el-table-column
            prop="gearbox"
            label="变速箱">
        </el-table-column>
        <el-table-column
            prop="power"
            label="动力">
        </el-table-column>
        <el-table-column
            prop="notRepairedDamage"
            label="是否有未修复的损坏">
        </el-table-column>
      </el-table>


    </div></el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <h1 class="baseinfo">
        评论信息
      </h1>
    </div></el-col>
  </el-row>

  <el-row v-for="carcomment in carcomments"  v-bind:key="carcomment">
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <div class="comment-block" >
        {{carcomment.comment}}
      </div>
    </div></el-col>
  </el-row>
</template>

import axios;
<script>


// eslint-disable-next-line no-unused-vars
import {getCarInfo} from "../http/api";
import {getCarComment} from "../http/api";
import {reactive} from "vue";

export default {
  name : 'carinfo',
  setup() {
    let car_information =reactive([{
      name:"奔驰S500",
      brand: "car",
      bodyType: 0,
      fuelType: 0,
      gearbox:"自动",
      power:0,
      kilometer:1000,
      notRepairedDamage:0,
      regionCode:0,
      offerType:0,
      creatDate:0,
      prePrice:10000,
      sellerID:0,
      carDescribe:0
    }])
    let carImgs = require("../assets/logo.png")

    let carid = {
      carId : 7,
    }
    let carcomments  = reactive([])
    //wait response

    getCarInfo(1).then(res=>{
      document.getElementById("picture").src = res.carImgs[0].carImg
      //carImgs = require(res.carImgs[0].carImg)
      car_information[0].name = res.carInfo.name
      car_information[0].brand = res.carInfo.brand
      car_information[0].prePrice = res.carInfo.prePrice
      car_information[0].kilometer = res.carInfo.kilometer
      car_information[0].power = res.carInfo.power
      if(res.carInfo.gearbox === 0){
        car_information[0].gearbox = "手动"
      }else{
        car_information[0].gearbox = "自动"
      }
      if(res.carInfo.notRepairedDamage === 0){
        car_information[0].notRepairedDamage = "是"
      }else{
        car_information[0].notRepairedDamage = "否"
      }
    })
    
    getCarComment(carid).then(res=>{
      for(var i = 0;i<res.length;i++) {
        var a = i.toString()
        carcomments.push({comment:res[a].commentDetails})
        console.log(carcomments[i].comment)
      }
    })


    return {
      car_information,
      carImgs,
      carid,
      carcomments
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.baseinfo{
  float: left;
}
.buycar{
  background-color: #f44336;
  border: #f44336;
  font-size: 24px;
  padding: 10px 32px;
  color: white;
  position: relative;
  left: 10px;
}
.buycar:hover{
  background-color: crimson;
}
.comment-block {
  padding: 1rem;
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
</style>
