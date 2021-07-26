import axios from 'axios'
// 如果入口是index.js则可以省略文件名
import store from "@/store"

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
})

// 请求拦截器
request.interceptors.request.use(config => {
  // Content-Type参数axios发送请求会自动带上
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token} `
  }
  // token设置后必须返回config对象
  return config;
}, error => {
  // Do something with request error
  return Promise.reject(error);
});
// 响应拦截器



export default request