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
  <!--分页-->
  <el-row :gutter="10" class="carMarTop">
    <el-col :span="8"></el-col>
    <el-col :span="8">
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="searchInfo.page"
          layout="prev, pager, next, jumper"
          :page-count="totalPage">
      </el-pagination>
    </el-col>
    <el-col :span="8"></el-col>
  </el-row>
</template>

<script>
import {reactive, ref} from "vue";
import {getUserInfo, bCarInfo} from "../http/api";
export default {
  name: 'buyCarInfo',
  setup() {
    let buyCarInfo = reactive([])
    let searchInfo = {
      userId:null,
      page:1,
    }
    let totalPage = ref(0);
    getUserInfo().then(res=>{
      searchInfo.userId = res.userId
      searchInfo.page = 1
      bCarInfo(searchInfo).then(res=>{
        totalPage.value = res.totalPage
        buyCarInfo.pop()
        buyCarInfo.push(res.data)
        for(let i = 0; i < res.data.length; i++){
          buyCarInfo[0][i].order.tradePrice = (buyCarInfo[0][i].order.tradePrice / 10000) + "万";
          //截取时间
          if(buyCarInfo[0][i].order.createDate != null){
            buyCarInfo[0][i].order.createDate = buyCarInfo[0][i].order.createDate.slice(0, 10) + " " + buyCarInfo[0][i].order.createDate.slice(11, 19);
          }
        }
      })
    })
    //改变页码时的变化
    let handleCurrentChange=(currentPage)=>{
      searchInfo.page = currentPage;
      bCarInfo(searchInfo).then(res=>{
        totalPage.value = res.totalPage
        buyCarInfo.pop()
        buyCarInfo.push(res.data)
        for(let i = 0; i < res.data.length; i++){
          buyCarInfo[0][i].order.tradePrice = (buyCarInfo[0][i].order.tradePrice / 10000) + "万";
          //截取时间
          if(buyCarInfo[0][i].order.createDate != null){
            buyCarInfo[0][i].order.createDate = buyCarInfo[0][i].order.createDate.slice(0, 10) + " " + buyCarInfo[0][i].order.createDate.slice(11, 19);
          }
        }
      })
    }
    return{
      buyCarInfo,
      totalPage,
      searchInfo,
      handleCurrentChange,
    }
  }
}
</script>

<style lang="scss">
.carMarTop{
  margin-top: 20px;
}
</style>