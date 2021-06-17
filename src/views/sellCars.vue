<template>
  <div class="big">
    <button class="salecar" @click="logincheck()">我要卖车</button>
    <el-dialog title="我要卖车" v-model="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="品牌" :label-width="formLabelWidth">
          <el-select v-model="form.brand" >
            <el-option v-for="i in carbrands" :key="i" :label="i.brand" :value="i.brand" @click="requestCarSeries(i.brand)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="form.regdate"
              type="date"
              placeholder="Pick a date"
              :default-value="new Date(2010, 9, 1)"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="型号" :label-width="formLabelWidth">
          <el-select v-model="form.name">
            <el-option v-for="i in carinfo[0]" :key="i" :label="i.carSeries" :value="i.carSeries" @click="updateForm(i)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有未维修的损坏" :label-width="formLabelWidth">
          <el-select v-model="form.isnotrepair" >
            <el-option  label="是" :value="0"></el-option>
            <el-option  label="否" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行驶里程(公里)"  :label-width="formLabelWidth" prop="kilometer" :rules="[
      { required: true, message: '里程不能为空'},
      { type: 'number', min:1,max:1000000,message: '里程必须为数字值,且要符合大小'}
    ]">
          <el-input type="kilometer" v-model.number="form.kilometer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格"  :label-width="formLabelWidth" prop="price" :rules="[
      { required: true, message: '价格不能为空'},
      { type: 'number', min:1,max:100000000,message: '价格必须为数字值,且要符合大小'}
    ]">
          <el-input type="price" v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述"  :label-width="formLabelWidth" prop="carDescribe" :rules="[
      { required: true, message: '描述不能为空'},
    ]">
          <el-input type="carDescribe" v-model.number="form.carDescribe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="车辆图片" :label-width="formLabelWidth">
          <el-upload
              class="upload-demo"
              action="http://8.140.2.249//car/oss/uploadFile"
              :on-success="Upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item  :label-width="formLabelWidth">
          <el-button type="primary" @click="submitForm()" :loading="submit_button_load">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
        title="提示"
        v-model="diglogVisible"
        width="30%">
      <span>{{diglogText}}</span>
      <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="diglogVisible = false" >确 定</el-button>
    </span>
      </template>
    </el-dialog>
  </div>
</template>

import axios;
<script>
import {reactive, ref} from "vue";
import {isNumber} from "element-plus/es/utils/util";
// eslint-disable-next-line no-unused-vars
import {getCarBrand, getCarSeries, getUserInfo, insertCar, submmitUpload} from "../http/api";

export default {
  name: 'sellcars',
  setup() {
    //reactive参数必须是对象(json/arr),不能用reactive
    let dialogTableVisible = ref(false)
    let formLabelWidth =  '120px'
    let form = reactive({
      brand:null,
      carDescribe:null,
      images:null,
      isnotrepair:null,
      kilometer:null,
      model:null,
      name:null,
      power:null,
      price:null,
      regdate:null,
      region:"北京",
      sellerId:1
    })
    let carbrands = reactive([])
    let carnames = reactive([])
    let carinfo = reactive([])
    let diglogVisible = ref(false)
    let diglogText = ref(null)
    let submit_button_load = ref(false)
    getCarBrand().then(
        res=>{
          for(var i =0;i<res.length;i++){
            carbrands.push({brand:res[i]})
          }
        })
    function logincheck(){
      //此处判断是否登录
      getUserInfo().then(res=>{
        if(res == ""){
          form.sellerId= null
        }else{
          form.sellerId = res.userId
        }
        if(form.sellerId==null) {
          diglogVisible.value = true
          diglogText.value = "请先登录"
        }else{
          dialogTableVisible.value = true
        }
      })
    }

    function submitForm() {
      if (isNumber(form.price)&&isNumber(form.kilometer)&&form.price>0
          &&form.kilometer>0&&form.brand!=""&&form.isnotrepair!=null
          &&form.name!=""&&form.carDescribe!=null&&form.price!=null
          &&form.regdate!=null&&form.images!=null
      )
      {
        insertCar(form).then(res=>{
          if(res == "") {
            dialogTableVisible.value = false
            diglogVisible.value = true
            diglogText.value = "提交成功"
          }
        })
      }
    }

    function updateForm(i){
      form.brand = i.brand
      form.name = i.carSeries
      form.model = i.bodytype
      form.power = "1.5L"
    }

    function  requestCarSeries(brand){
      getCarSeries(brand).then(res=>{
        carinfo.splice(0)
        carinfo.push(res)
        form.name = ""
      })
    }

    //upload images,res is url of images
    function Upload(res) {
      form.images = []
      form.images.push(res)
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
      diglogVisible,
      submit_button_load,
      diglogText,
      Upload,
      logincheck
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