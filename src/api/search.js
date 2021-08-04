/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/suggestion',
    url: 'v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取用户搜索结果
export const getSearchResult = params => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/search',
    url: 'v1_0/search',
    params
  })
}
// 获取用户搜索历史
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    // url: '/app/v1_0/search/histories',
    url: 'v1_0/search/histories',
  })
}