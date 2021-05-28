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
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="search">
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button @click="searchInfo" icon="el-icon-search" circle></el-button>
      </el-col>
      <el-col :span="7"></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>品牌:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs @click="changeSort" v-model="carType">
          <el-tab-pane label="不限" name="first"></el-tab-pane>
          <el-tab-pane label="大众" name="second"></el-tab-pane>
          <el-tab-pane label="宝马" name="third"></el-tab-pane>
          <el-tab-pane label="奔驰" name="fourth"></el-tab-pane>
          <el-tab-pane label="丰田" name="fifth"></el-tab-pane>
          <el-tab-pane label="本田" name="sixth"></el-tab-pane>
          <el-tab-pane label="奥迪" name="seventh"></el-tab-pane>
          <el-tab-pane label="别克" name="eighth"></el-tab-pane>
          <el-tab-pane label="日产" name="ninth"></el-tab-pane>
          <el-tab-pane label="福特" name="tenth"></el-tab-pane>
          <el-tab-pane label="全部" name="eleventh"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>车系:</p>
      </el-col>
      <el-col :span="15">
        <el-tabs v-model="carSort">
          <el-tab-pane label="不限" name="first"></el-tab-pane>
          <el-tab-pane :label="carList[0].text" name="second"></el-tab-pane>
          <el-tab-pane :label="carList[1].text" name="third"></el-tab-pane>
          <el-tab-pane :label="carList[2].text" name="fourth"></el-tab-pane>
          <el-tab-pane :label="carList[3].text" name="fifth"></el-tab-pane>
          <el-tab-pane :label="carList[4].text" name="sixth"></el-tab-pane>
          <el-tab-pane :label="carList[5].text" name="seventh"></el-tab-pane>
          <el-tab-pane :label="carList[6].text" name="eighth"></el-tab-pane>
          <el-tab-pane :label="carList[7].text" name="ninth"></el-tab-pane>
          <el-tab-pane :label="carList[8].text" name="tenth"></el-tab-pane>
          <el-tab-pane label="全部" name="eleventh"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>价格:</p>
      </el-col>
      <el-col :span="16">
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
          <el-tab-pane label="全部" name="eleventh"></el-tab-pane>
        </el-tabs>
      </el-col>
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

export default {
  name: 'Buy',
  setup(){
    let carType = ref('first')
    let search = ref("")
    //从路由处获取carType的值,如果存在的话
    if(router.currentRoute.value.params.carType){
      carType.value = router.currentRoute.value.params.carType
    }
    let carSort = ref('first')
    let carPrice = ref('first')
    //设置carList的参数，在不同的carType下
    let carList = reactive([])
    if(carType.value == 'second' || carType.value == 'first'){
      carList = [
        {text: '高尔夫'},
        {text: '迈腾'},
        {text: '速腾'},
        {text: '朗逸'},
        {text: '帕萨特'},
        {text: '途观'},
        {text: '宝来'},
        {text: '捷达'},
        {text: '大众CC'},
      ]
    }
    else if(carType.value == 'third'){
      carList = [
        {text: '宝马3系'},
        {text: '宝马5系'},
        {text: '宝马X1'},
        {text: '宝马1系'},
        {text: '宝马X5'},
        {text: '宝马X3'},
        {text: '宝马7系'},
        {text: '宝马4系'},
        {text: '宝马8系'},
      ]
    }
    else if(carType.value == 'fourth'){
      carList = [
        {text: '奔驰C级'},
        {text: '奔驰E级'},
        {text: '奔驰A级'},
        {text: '奔驰B级'},
        {text: '奔驰S级'},
        {text: '奔驰GLA级'},
        {text: '奔驰GLC级'},
        {text: '奔驰GLK级'},
        {text: '奔驰CLA级'},
      ]
    }
    else if(carType.value == 'fifth'){
      carList = [
        {text: '普拉多'},
        {text: '凯美瑞'},
        {text: '卡罗拉'},
        {text: '汉兰达'},
        {text: '雷凌'},
        {text: 'RAV4'},
        {text: '威驰'},
        {text: '皇冠'},
        {text: '柯斯达'},
      ]
    }
    else if(carType.value == 'sixth'){
      carList = [
        {text: '思域'},
        {text: '雅阁'},
        {text: '飞度'},
        {text: '奥德赛'},
        {text: '艾力绅'},
        {text: '缤智'},
        {text: '凌派'},
        {text: '冠道'},
        {text: '本田CR-V'},
      ]
    }
    else if(carType.value == 'seventh'){
      carList = [
        {text: '奥迪A4L'},
        {text: '奥迪A6L'},
        {text: '奥迪A3'},
        {text: '奥迪Q3'},
        {text: '奥迪Q5'},
        {text: '奥迪A5'},
        {text: '奥迪Q5L'},
        {text: '奥迪Q7'},
        {text: '奥迪A8L'},
      ]
    }
    else if(carType.value == 'eighth'){
      carList = [
        {text: '英朗'},
        {text: '君威'},
        {text: '昂科威'},
        {text: '君越'},
        {text: '凯越'},
        {text: '威朗'},
        {text: '昂科拉'},
        {text: '阅朗'},
        {text: '别克GL6'},
      ]
    }
    else if(carType.value == 'ninth'){
      carList = [
        {text: '轩逸'},
        {text: '奇骏'},
        {text: '天籁'},
        {text: '骐达'},
        {text: '逍客'},
        {text: '途乐'},
        {text: '蓝鸟'},
        {text: '阳光'},
        {text: '楼兰'},
      ]
    }
    else if(carType.value == 'tenth'){
      carList = [
        {text: '福克斯'},
        {text: '蒙迪欧'},
        {text: '福睿斯'},
        {text: '锐界'},
        {text: '翼虎'},
        {text: '野马'},
        {text: '翼博'},
        {text: '嘉年华'},
        {text: '猛禽'},
      ]
    }
    //点击搜索按钮
    let searchInfo=()=>{

    }
    //点击不同的carType切换carSort
    let changeSort=()=>{
      if(carType.value != "eleventh"){
        router.push({name: 'buyChange', params:{carType: carType.value}})
        return
      }
    }
    //点击某辆车，跳转到对应的车界面
    let clickCar=()=>{
      console.log()
      router.push(router.options.routes[0].children[2])
      return
    }
    return{
      clickCar,
      changeSort,
      searchInfo,
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
.table{
  margin-left: 200px;
}
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