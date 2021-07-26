import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/storage"
Vue.use(Vuex)

// 在多个地方使用同一个字符串将字符串以常量进行保存
// 将tokenuser保存为常量
const TOKEN_KEY = 'TOUTIAO_USER'
// vuex容器中的数据是响应式的，但不具有持久化，对于持久化需要使用本地存储
export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息，转化为对象
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)),
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 防止刷新丢失需要将数据备份到本地存储，转化我json字符串
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
