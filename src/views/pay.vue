<template>
  <div id="payNode"></div>
</template>

import axios;
<script>
// eslint-disable-next-line no-unused-vars
import router from "../router";


export default {
  name : 'Pay',
  setup() {
    let htmlCode = router.currentRoute.value.params.htmlCode
    document.querySelector('#app').innerHTML = htmlCode
    document.forms[0].submit()

  },

}
</script>
<style>

</style>
