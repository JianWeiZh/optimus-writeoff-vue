import axios from 'axios'
import { Toast } from 'cube-ui'
import qs from 'qs'

import { verifivationUrl } from '@/utils/verificationUrl'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 500000, // 请求超时时间
  // 默认等待请求头格式
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // 请求参数
  params: {
    _appid: 'optimus.m'
  },
  responseType: 'json',
  // 对发送请求前的请求头进行配置
  transformRequest: [function (data, headers) {
    const ct = headers['Content-Type']
    // json 类型
    if (ct && ct.indexOf('application/json') > -1) {
      return JSON.stringify(data)
    }
    // FormData 类型，ie10 +
    if (ct && ct.indexOf('multipart/form-data') > -1) {
      return data
    }
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }]
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers['authorization'] = localStorage.getItem('token')
  config.headers['channel'] = process.env.VUE_APP_CHANNEL
  verifivationUrl(config)
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  async response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    const res = response.data
    // 成功（1.http状态码为200 2.res的code为0） ==> 需要前后台定制好code成功值
    if (res.returncode === 0) {
      return Promise.resolve(res)
    }
    if (Object.prototype.toString.call(res) === '[object Array]') {
      return Promise.resolve(res)
    }
    // 失败(1. http状态码为200 2.res的code非0)
    if (res.returncode === 500) {
      const toast = Toast.$create({
        type: 'warn',
        time: 3000,
        txt: res.message
      }, false)
      toast.show()
    } else {
      const toast = Toast.$create({
        type: 'warn',
        time: 3000,
        txt: res.message
      }, false)
      toast.show()
      return Promise.resolve(res)
    }

    return Promise.reject(res)
  },
  // 失败 http状态码非200
  error => {
    const toast = Toast.$create({
      type: 'warn',
      time: 3000,
      txt: '无法连接网络，请稍后重试'
    })
    toast.show()
    return Promise.reject(error)
  }
)

export default service
