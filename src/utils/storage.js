// 封装本地存储操作模块
// 存储数据
export const setItem = (key, value) => {
  // 将数组、对象类型的数据转换为 JSON 格式字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取数据
export const getItem = key => {
  // 通过判断是否为JSON格式字符串有一定难度，需要通过正则表达式形式
  // 如何判断一个字符串是否为JSON格式字符串很难处理
  // 通过JSON.parse将数据进行转换，如果是一个有效的JSON格式字符串则程序执行成功
  // 如果不是一个有效的JSON格式字符串则代码报错进入catch直接返回数据
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
