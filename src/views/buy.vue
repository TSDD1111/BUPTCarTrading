<template>
  <div>

  </div>
</template>
<script>
import router from "../router";

export  default {
  name:'buyChange',
  setup(){
    //跳转回原来的界面
    router.push({name: 'Buy', params:{carType: router.currentRoute.value.params.carType}});
    return
  }
}
</script>