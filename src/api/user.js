import request from '@/utils/request'
// 登录请求
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码请求
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}
// 获取用户自己的信息,token在axios请求拦截器中自动添加
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`,
    // axios会自动添加Content-Type请求头，只需要手动添加token
    // 发送请求头数据
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/channels`,
  })
}
