<template>
  <div>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>品牌:</p>
      </el-col>
      <el-col class="choose" :span="15">
        <el-button class="btn" type="text">不限</el-button>
        <el-button class="btn" type="text">大众</el-button>
        <el-button class="btn" type="text">宝马</el-button>
        <el-button class="btn" type="text">奔驰</el-button>
        <el-button class="btn" type="text">丰田</el-button>
        <el-button class="btn" type="text">本田</el-button>
        <el-button class="btn" type="text">奥迪</el-button>
        <el-button class="btn" type="text">别克</el-button>
        <el-button class="btn" type="text">日产</el-button>
        <el-button class="btn" type="text">福特</el-button>
      </el-col>
      <el-col class="choose" :span="1">
        <el-button class="fin-btn" type="text">全部</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>车系:</p>
      </el-col>
      <el-col class="choose" :span="15">
        <el-button class="btn" type="text">不限</el-button>
        <el-button class="btn" type="text">高尔夫</el-button>
        <el-button class="btn" type="text">迈腾</el-button>
        <el-button class="btn" type="text">速腾</el-button>
        <el-button class="btn" type="text">大众POLO</el-button>
        <el-button class="btn" type="text">朗逸</el-button>
        <el-button class="btn" type="text">帕萨特</el-button>
        <el-button class="btn" type="text">途观</el-button>
        <el-button class="btn" type="text">宝来</el-button>
        <el-button class="btn" type="text">大众CC</el-button>
      </el-col>
      <el-col class="choose" :span="1">
        <el-button class="fin-btn" type="text">全部</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="table" :span="1">
        <p>价格:</p>
      </el-col>
      <el-col class="choose" :span="16">
        <el-button class="btn" type="text">不限</el-button>
        <el-button class="btn" type="text">3万以下</el-button>
        <el-button class="btn" type="text">3-5万</el-button>
        <el-button class="btn" type="text">5-7万</el-button>
        <el-button class="btn" type="text">7-9万</el-button>
        <el-button class="btn" type="text">9-12万</el-button>
        <el-button class="btn" type="text">12-16万</el-button>
        <el-button class="btn" type="text">16-20万</el-button>
        <el-button class="btn" type="text">20万以上</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="picture-table" :span="20">
        <img src="../assets/1.jpg" class="fir-picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
      </el-col>
      <el-col class="picture-table" :span="20">
        <img src="../assets/1.jpg" class="fir-picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
      </el-col>
      <el-col class="picture-table" :span="20">
        <img src="../assets/1.jpg" class="fir-picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
      </el-col>
      <el-col class="picture-table" :span="20">
        <img src="../assets/1.jpg" class="fir-picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
      </el-col>
      <el-col class="picture-table" :span="20">
        <img src="../assets/1.jpg" class="fir-picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
        <img src="../assets/1.jpg" class="picture">
      </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style lang="scss">
.line{
  margin-top: 0px;
  margin-left: 120px;
}
.table{
  margin-left: 200px;
}
.btn{
  margin-top: 7px;
  margin-right: 35px;
  font-size: 17px;
}
.fin-btn{
  margin-top: 7px;
  font-size: 17px;
  text-align: right;
}
.choose{
  border-bottom: 1px solid black;
}
.fir-picture{
  width: 300px;
  height: 200px;
}
.picture{
  margin-left: 10px;
  width: 300px;
  height: 200px;
}
.picture-table{
  margin-top: 50px;
  margin-left: 140px;
}
</style>