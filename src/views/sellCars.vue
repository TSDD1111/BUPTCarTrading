<template>
  <div class="big">
    <button class="salecar" @click="dialogTableVisible = true">我要卖车</button>
    <el-dialog title="我要卖车" v-model="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="form.brand" >
            <el-option v-for="i in carbrands" :key="i" :label="i.brand" :value="i.brand" @click="requestCarSeries(i.brand)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" :label-width="formLabelWidth">
          <el-select v-model="form.name">
            <el-option v-for="i in carinfo[0]" :key="i" :label="i.carSeries" :value="i.carSeries" @click="updateForm(i)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶里程"  :label-width="formLabelWidth" prop="kilometer" :rules="[
      { required: true, message: '里程不能为空'},
      { type: 'number', min:1,max:1000000,message: '里程必须为数字值,且要符合大小'}
    ]">
          <el-input type="kilometer" v-model.number="form.kilometer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有未维修的损坏" :label-width="formLabelWidth">
          <el-select v-model="form.notrepaireddamage" >
            <el-option  label="是" :value="0"></el-option>
            <el-option  label="否" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  :label-width="formLabelWidth">
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

import axios;
<script>
import {reactive, ref} from "vue";
import {isNumber} from "element-plus/es/utils/util";
// eslint-disable-next-line no-unused-vars
import {getCarBrand,getCarSeries,submitOrder} from "../http/api";

export default {
  name: 'sellcars',
  setup() {
    //reactive参数必须是对象(json/arr),不能用reactive
    let dialogTableVisible = ref(false)
    let formLabelWidth =  '120px'
    let form = reactive({
      sellerId:0,
      carId:0,
      carDescribe:"啊啊啊啊",
      name:"",
      regdate : 0,
      model : 0,
      brand : "",
      bodytype:0,
      fueltype:0,
      gearbox:0,
      power:0,
      kilometer:null,
      notrepaireddamage:null,
      regioncode:0,
      seller:0,
      offertype:1,
      prePrice:0
    })
    console.log(form)
    let carbrands = reactive([])
    let carnames = reactive([])
    let carinfo = reactive([])
    getCarBrand().then(res=>{
      for(var i =0;i<res.length;i++){
        carbrands.push({brand:res[i]})
      }
    })
    function submitForm() {
      if (isNumber(form.kilometer)&&form.brand!=""&&form.notrepaireddamage!=null&&form.name!="") {
        dialogTableVisible.value = false
        console.log(form)
        submitOrder(form)
      }
    }
    function updateForm(i){
      form.brand = i.brand
      form.name = i.carSeries
      form.gearbox = i.gearbox
      form.fuelType = i.fuelType
      form.bodyType = i.bodytype
    }
    function  requestCarSeries(brand){
      getCarSeries(brand).then(res=>{
        carinfo.splice(0)
        carinfo.push(res)
        form.name = ""
      })
    }
    return {
      dialogTableVisible,
      form,
      formLabelWidth,
      carbrands,
      carnames,
      carinfo,
      submitForm,
      updateForm,
      requestCarSeries,
    }
  },
}

</script>

<style scoped>
.big{
  background:url('../assets/1.jpg') 0 0 repeat;
  height: 1000px;
}
.salecar{
  background-color: #f44336;
  border: #f44336;
  font-size: 24px;
  padding: 10px 32px;
  color: white;
  position: relative;
  left: 700px;
  top: 200px;
}
.salecar:hover{
  background-color: crimson;
}
</style>
