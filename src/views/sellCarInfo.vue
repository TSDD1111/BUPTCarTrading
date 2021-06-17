<template>
  <el-table
      :data="sellCarInfo[0]"
      style="width: 100%">
    <el-table-column
        prop="name"
        label="车名"
        width="400">
    </el-table-column>
    <el-table-column
        prop="prePrice"
        label="价格"
        width="200">
    </el-table-column>
    <el-table-column
        prop="selled"
        label="是否出售"
        width="200">
    </el-table-column>
  </el-table>
</template>

<script>
import {reactive} from "vue";
import {getUserInfo, sCarInfo} from "../http/api";

export default {
  name: 'sellCarInfo',
  setup() {
    let sellCarInfo = reactive([])
    getUserInfo().then(res=>{
      sCarInfo(res.userId).then(res=>{
        sellCarInfo.push(res);
        for(let i = 0; i < res.length; i++){
          sellCarInfo[0][i].prePrice = (sellCarInfo[0][i].prePrice / 10000) + "万";
          if(sellCarInfo[0][i].selled == false){
            sellCarInfo[0][i].selled = "未出售";
          }
          else{
            sellCarInfo[0][i].selled = "已出售";
          }
        }
      })
    })
    return{
      sellCarInfo,
    }
  }
}
</script>

<style lang="scss">

</style>