<template>
  <div id="login">
    <svg-icon icon-class="Search" class="search"></svg-icon>
    <div class="countPrice">商品总额{{(price/100).toFixed(2)}}</div>
    <div class="pointPrice">
      <p>可用{{point}}积分，兑换{{(point/10).toFixed(2)}}元</p>
      <cube-switch v-model="isSwitch" :disabled="disable"></cube-switch>不使用积分
    </div>
    <div style="text-align: left;">
      <label><input name="ticket" type="radio" v-model="ticketType" value="0" />不使用优惠券 </label><br>
      <label><input name="ticket" type="radio" v-model="ticketType" value="1" />10元优惠券，满100元可用 </label><br>
      <label><input name="ticket" type="radio" v-model="ticketType" value="2" />50%折扣券，最搞抵扣金额100，满100元可用</label><br>
      <label><input name="ticket" type="radio" v-model="ticketType" value="3" />服务权益券，最高抵扣金额100</label><br>
    </div>
    <div>支付金额{{(totalPrice/100).toFixed(2)}}</div>
  </div>
</template>

<script>
export default {
  created () {
    this.price = 100 // 设置总金额
    this.maxCarBean = 300 // 设置最大使用积分
    this.minLimitPrice = 100 // 设置使用门槛
    this.maxLimitPrice = 100 // 设置最高抵扣金额
    this.disscountRate = 70 // 设置折扣比例
    this.prices = 90 // 设置代金券优惠金额
  },
  mounted () {
    this.price = this.price * 100 // 设置总金额
    this.maxCarBean = this.maxCarBean * 100 // 设置最大使用积分
    this.minLimitPrice = this.minLimitPrice * 100 // 设置使用门槛
    this.maxLimitPrice = this.maxLimitPrice * 100 // 设置最高抵扣金额
    this.disscountRate = this.disscountRate * 100 // 设置折扣比例
    this.prices = this.prices * 100 // 设置代金券优惠金额
  },
  data () {
    return {
      minLimitPrice: 0, // 使用门槛
      maxLimitPrice: 0, // 最高抵扣金额
      disscountRate: 0, // 折扣比例
      prices: 0, // 代金券优惠金额
      ticketType: 0,
      showTotalTicket: 'true',
      maxCarBean: 0,
      isChangeSwitch: false,
      exchangeScale: 10, // 积分兑换金钱的比例
      userPointNum: 0, // 用户积分数量
      disable: false, // 控制switch是否禁用字段
      isSwitch: false, // switch状态
      couponPrice: 0, // 优惠券金额
      point: 0, // 积分金额
      price: 0, // 商品金额
      cutTicketPrice: 0, // 总金额减去优惠券金额之后的金额
      totalPrice: 0 // 优惠后的金额（减去优惠券金额与积分金额后的差）
    }
  },
  name: 'login'
}
</script>

<style scoped>
.search{
  width: 100px;
  height: 100px;
  background-color: red;
  color: gray;
}
  div{
    line-height: 100px;
  }
</style>
