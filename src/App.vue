<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { loginUserInit } from '@/api/index.js'
export default {
  created () {
    this.getLoginInfo()
  },
  methods: {
    getLoginInfo () {
      try {
        const params = {
          channel: process.env.VUE_APP_CHANNEL,
          openId: sessionStorage.getItem('openId')
        }
        loginUserInit(params).then(res => {
          const returnCode = res.returncode
          if (returnCode === 10010) {
            // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${res.message}&redirect_uri=${encodeURIComponent(process.env.VUE_APP_JUMP_URL + '/')}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
          }
        })
      } catch (err) {
        // console.warn(err)
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
