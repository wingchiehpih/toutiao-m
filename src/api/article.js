import request from '@/utils/request'
// 文章请求模块
// 请求获取文章列表数据
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    // 一般通过params接收query的查询参数
    params
  })
}
