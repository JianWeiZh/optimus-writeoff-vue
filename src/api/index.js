import request from '@/utils/request.js'

export const loginUserInit = function (params) {
  return request({
    url: '/operation/login/user/init',
    params: params
  })
}
