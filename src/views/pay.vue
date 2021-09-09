<template>
<!--  <form name="punchout_form" method="post" action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=P%2FoivF%2BkbSaPen9krCjfokjBP6kzdFPZmgWDfutQBmCg6OSmAZxzGx1QolL88rKzsFkYUAwcQX5P%2BDbe%2FXME89dgsbWyzCTkx7YdkjW3kMw%2BDE%2BFdtFZYsXFaKN5tOdSwAB2N2v4RcXVtrqm%2BdARMQSf68ZaSo1L8AiKbgTPhRke9wy1WcR1XAodiXpSN9sL%2B5MNWxWvMynWMINoCXY%2Fk6D8x9stxjASipgRxvA4LDVrdXyaqAkLLqdceKvyd%2FVijjVBlzXMoPdXNG5ZUOM4CsHHqWoVIl0a9oVt80BSgHO6377Zv0VWx4BMIlqn2K3D6CpB0rDj%2FBGcsUHfqBEdKQ%3D%3D&return_url=http%3A%2F%2F8.140.2.249&notify_url=http%3A%2F%2F8.140.2.249%2Fcar%2Forder%2Fpayed%2Fnotify&version=1.0&app_id=2021000118600084&sign_type=RSA2&timestamp=2021-09-05+22%3A48%3A01&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">-->
<!--    <input type="hidden" name="biz_content" value="{&quot;out_trade_no&quot;:&quot;53&quot;,&quot;total_amount&quot;:&quot;2280.00&quot;,&quot;subject&quot;:&quot;奔驰C级 2015款 改款 C 200 L 运动型&quot;,&quot;body&quot;:&quot;null&quot;,&quot;timeout_express&quot;:&quot;5m&quot;,&quot;product_code&quot;:&quot;FAST_INSTANT_TRADE_PAY&quot;}">-->
<!--    <input type="submit" value="立即支付" style="display:none" >-->
<!--  </form>-->
  <div id="payNode"></div>
</template>

import axios;
<script>
// eslint-disable-next-line no-unused-vars
import {getCarInfo, submitOrder} from "../http/api";
import router from "../router";


export default {
  name : 'Pay',
  setup() {
    let htmlCode = router.currentRoute.value.params.htmlCode
    console.log(htmlCode)
    console.log(document.querySelector('#app'))
    document.querySelector('#app').innerHTML = htmlCode
    document.forms[0].submit()

  },

}
</script>
<style>

</style>
