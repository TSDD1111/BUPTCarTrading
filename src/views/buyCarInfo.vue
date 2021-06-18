<template>
  <el-table
      :data="buyCarInfo[0]"
      style="width: 100%">
    <el-table-column
        prop="order.orderId"
        label="订单号"
        width="100">
    </el-table-column>
    <el-table-column
        prop="carname"
        label="车名"
        width="350">
    </el-table-column>
    <el-table-column
        prop="order.tradePrice"
        label="价格"
        width="150">
    </el-table-column>
    <el-table-column
        prop="order.createDate"
        label="成交时间"
        width="200">
    </el-table-column>
    <el-table-column
        prop="seller.userName"
        label="卖家用户名"
        width="150">
    </el-table-column>
    <el-table-column
        prop="seller.userTelnum"
        label="卖家手机号"
        width="200">
    </el-table-column>
  </el-table>
</template>

<script>
import {reactive} from "vue";
import {getUserInfo, bCarInfo} from "../http/api";

export default {
  name: 'buyCarInfo',
  setup() {
    let buyCarInfo = reactive([])
    getUserInfo().then(res=>{
      bCarInfo(res.userId).then(res=>{
        buyCarInfo.push(res);
        for(let i = 0; i < res.length; i++){
          buyCarInfo[0][i].order.tradePrice = (buyCarInfo[0][i].order.tradePrice / 10000) + "万";
          //截取时间
          if(buyCarInfo[0][i].order.createDate != null){
            buyCarInfo[0][i].order.createDate = buyCarInfo[0][i].order.createDate.slice(0,10) + " " + buyCarInfo[0][i].order.createDate.slice(11,19);
          }
        }
      })
    })
    return{
      buyCarInfo,
    }
  }
}
</script>

<style lang="scss">

</style>