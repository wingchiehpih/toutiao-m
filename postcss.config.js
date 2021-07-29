module.exports = {
  plugins: {
    /*'autoprefixer': {
        配置要兼容的环境信息，cli内部已经集成了相关配置
          browers: ['Android>=4.0', 'iOS>=8']
        }, */
    'postcss-pxtorem': {
      /*      flexible的REM适配方案，默认把一行设置为10等份，rootValue设置为设计稿的十分之一
              所以应该设置为750/10=75
              vant建议设置为37.5因为vant是基于375设计稿书写的
              如果是vant组件库就按照37.5
              如果是自己写的样式，就按照75 */
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 表示要转化为rem的css属性
      propList: ['*'],
    },
  },
};