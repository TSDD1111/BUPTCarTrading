<template>
  <el-table
      :data="sellCarInfo[0]"
      style="width: 100%"
      current-row-key="carId">
    <el-table-column
        prop="carId"
        label="车Id"
        width="100">
    </el-table-column>
    <el-table-column
        prop="name"
        label="车名"
        width="400">
    </el-table-column>
    <el-table-column
        prop="prePrice"
        label="价格"
        width="100">
    </el-table-column>
    <el-table-column
        prop="selled"
        label="是否出售"
        width="150">
    </el-table-column>
    <el-table-column
        prop="userName"
        label="买家用户名"
        width="150">
    </el-table-column>
    <el-table-column
        prop="userTelnum"
        label="买家手机号"
        width="100">
    </el-table-column>
    <el-table-column align="right">
      <template #default="scope">
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >下架</el-button
        >
      </template>
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
import {getUserInfo, sCarInfo, deleteCarInfo} from "../http/api";
import {ElMessage} from "element-plus";
export default {
  name: 'sellCarInfo',
  setup() {
    let sellCarInfo = reactive([])
    let searchInfo = {
      userId:null,
      page:1,
    }
    let totalPage = ref(0);
    getUserInfo().then(res=>{
      searchInfo.userId = res.userId
      searchInfo.page = 1
      sCarInfo(searchInfo).then(res=>{
        totalPage.value = res.totalPage
        sellCarInfo.pop()
        sellCarInfo.push(res.data);
        for(let i = 0; i < res.data.length; i++){
          sellCarInfo[0][i].prePrice = (sellCarInfo[0][i].prePrice) + "万";
          if(sellCarInfo[0][i].selled == false){
            sellCarInfo[0][i].selled = "未出售";
          }
          else{
            sellCarInfo[0][i].selled = "已出售";
          }
        }
      })
    })
    //改变页码时的变化
    let handleCurrentChange=(currentPage)=>{
      searchInfo.page = currentPage;
      sCarInfo(searchInfo).then(res=>{
        totalPage.value = res.totalPage
        sellCarInfo.pop()
        sellCarInfo.push(res.data);
        for(let i = 0; i < res.data.length; i++){
          sellCarInfo[0][i].prePrice = (sellCarInfo[0][i].prePrice) + "万";
          if(sellCarInfo[0][i].selled == false){
            sellCarInfo[0][i].selled = "未出售";
          }
          else{
            sellCarInfo[0][i].selled = "已出售";
          }
        }
      })
    }
    // 下架汽车
    let handleDelete=(index, row)=>{
      if(row.selled == '未出售'){
        deleteCarInfo(row.carId).then(()=>{
          ElMessage.success({
            message: '该车下架成功!',
            type: 'success'
          });
          location.reload()
        })
      }
      else{
        ElMessage.error('该车已经出售，无法下架!');
      }
    }
    return{
      sellCarInfo,
      totalPage,
      searchInfo,
      handleCurrentChange,
      handleDelete,
    }
  }
}
</script>

<style lang="scss">
.carMarTop{
  margin-top: 20px;
}
</style>