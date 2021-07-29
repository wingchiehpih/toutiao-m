import Vue from "vue"
// 通过es的形式引入dayjs
import dayjs from 'dayjs' // ES 2015
// 加载中文语言包
import 'dayjs/locale/zh-cn' // ES 2015 
// 加载相对时间语言包
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相对时间的插件 
dayjs.extend(relativeTime)



dayjs.locale('zh-cn') // 全局使用

// 获取当前最新的时间
dayjs()
// 定义一个全局过滤器，实现在任何组件的模板中使用
// 过滤器相当于一个全局可用的方法（仅供模板使用）
// 参数一：过滤器名称
// 参数二：过滤器处理函数
// 使用方法{{表达式|过滤器名称}}
// 管道符前面的表达式结果会作为参数传递到过滤器函数中
// 过滤器返回值会渲染到使用过滤器的模板位置
Vue.filter('relativeTime', value => {
  // 返回当前时间相对于value时间的间隔日期
  return dayjs().to(dayjs(value))
})