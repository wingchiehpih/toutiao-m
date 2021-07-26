import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant组件库
import Vant from 'vant';
import 'vant/lib/index.css';
// 加载全局样式文件
import "./style/index.less"
// 1、加载动态设置REM基准值 npm i amfe-flexible
import 'amfe-flexible'
// 2、使用pxtorem将px转化为rem npm install postcss-pxtorem -D  开发依赖
// 3、postcss.config.js中进行配置相关参数
Vue.use(Vant);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
