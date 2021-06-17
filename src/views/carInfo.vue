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
        <button class="buycar" @click="buyCar"  >{{text1}}</button>
        <el-dialog
            title="提示"
            v-model="dialog1Visible"
            width="30%"
            :before-close="handleClose">
          <span>{{diglog1Text}}</span>
          <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialog1Visible = false">确 定</el-button>
    </span>
          </template>
        </el-dialog>
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
        <el-table-column
            prop="userTelnum"
            label="卖家电话">
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
  <el-row>
    <el-col :span="24"><div class="grid-content bg-purple-dark">
      <h1 class="baseinfo">
        写评论
      </h1>
    </div></el-col>
  </el-row>
  <el-form-item>
    <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="input_comment"
    ></el-input>
  </el-form-item>
  <el-button type="success" icon="el-icon-check" circle @click="submitComment" :loading="successbutton" ></el-button>
  <el-dialog
      title="提示"
      v-model="dialog2Visible"
      width="30%"
      :before-close="handleClose">
    <span>{{diglog2Text}}</span>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialog2Visible = false">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

import axios;
<script>
// eslint-disable-next-line no-unused-vars
import {getCarInfo, submitOrder} from "../http/api";
import {getCarComment,insertComment,insertOrder,getUserInfo} from "../http/api";
import {ref,reactive} from "vue";
import router from "../router";

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
      carDescribe:0,
      userTelnum:0
    }])
    let carImgs = require("../assets/logo.png")
    let input_comment = ref(null)
    let text1 = ref("我要买车")
    let buycar_button = ref(false)
    let submitcomment_button = ref(false)
    let carid = router.currentRoute.value.query.carId
    let userid = null
    let carcomments  = reactive([])
    let dialog1Visible = ref(false)
    let diglog1Text = ref("点击提交评论")
    let dialog2Visible = ref(false)
    let diglog2Text = ref("点击提交评论")
    let successbutton = ref(false)
    //wait response

    getCarInfo(carid).then(res=>{
      document.getElementById("picture").src = res.carImages[0]
      car_information[0].name = res.carInfo.name
      car_information[0].brand = res.carInfo.brand
      car_information[0].prePrice = res.carInfo.prePrice
      car_information[0].kilometer = res.carInfo.kilometer
      car_information[0].power = res.carInfo.power
      car_information[0].fuelType = res.carInfo.fuelType
      car_information[0].userTelnum = res.owner.userTelnum

      if(res.carInfo.gearbox === 0){
        car_information[0].gearbox = "手动"
      }else{
        car_information[0].gearbox = "自动"
      }
      if(res.carInfo.fueltype === 0){
        car_information[0].fuelType = "汽油"
      }
      else if(res.carInfo.fueltype === 1) {
        car_information[0].fuelType = "柴油"
      }
      else if(res.carInfo.fueltype === 2) {
        car_information[0].fuelType = "电动"
      }
      else{
        car_information[0].fuelType = "混合动力"
      }
      if(res.carInfo.notRepairedDamage === 0){
        car_information[0].notRepairedDamage = "是"
      }else{
        car_information[0].notRepairedDamage = "否"
      }
    })
    let carComment = {
      carId:carid
    }
    getCarComment(carComment).then(res=>{
      for(var i = 0;i<res.length;i++) {
        var a = i.toString()
        carcomments.push({comment:res[a].commentDetails})
      }
    })
    function submitComment() {
      getUserInfo().then(res=>{
        if(res == ""){
          userid= null
        }else{
          userid= res.userId
        }
        if(userid!=null) {
          if (submitcomment_button.value == false && input_comment.value != null) {
            submitcomment_button.value = true
            successbutton.value = true
            let data = {
              carId: carid,
              userId: userid,
              commentDetails: input_comment.value
            }

            insertComment(data).then(res => {
              if (res == "") {
                diglog2Text.value = "提交成功"
                dialog2Visible.value = true
                input_comment.value = null
                submitcomment_button.value = false
                successbutton.value = false
              } else {
                diglog2Text.value = "提交未成功"
                dialog2Visible.value = true
                input_comment.value = null
                successbutton.value = false
              }
            })
          } else {
            diglog2Text.value = "评论不能为空"
            dialog2Visible.value = true
          }
        }
        else {
          diglog2Text.value = "请先登录"
          dialog2Visible.value = true
        }
      })

    }
    function buyCar() {
      //此处判断是否登录
      getUserInfo().then(res=>{
        if(res == ""){
          userid= null
        }else{
          userid= res.userId
        }
        if (userid != null) {
          if (buycar_button.value == false) {
            let order = {
              buyerId: userid,
              carId: carid,
              sellerId: car_information[0].prePrice,
              tradePrice: car_information[0].sellerID
            }
            text1.value = "提交中"
            insertOrder(order).then(res => {
              if (res == "") {
                text1.value = "已提交"
                buycar_button.value = true
              } else {
                dialog1Visible.value = true
                text1.value = "我要买车"
                diglog1Text.value = "提交失败"
              }
            })
          }
        }
        else{
          dialog1Visible.value = true
          diglog1Text.value = "请先登录"
        }
      })
    }


    return {
      car_information,
      carImgs,
      carid,
      carcomments,
      input_comment,
      userid,
      submitComment,
      buyCar,
      text1,
      buycar_button,
      dialog1Visible,
      diglog1Text,
      dialog2Visible,
      diglog2Text,
      successbutton
    }
  },
}
</script>
<style>
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
