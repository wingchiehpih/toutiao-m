<template>
  <div id="app">
    <h1>河马</h1>
    <div>
      <van-button type="primary">主要按钮</van-button>
      <van-button type="info">信息按钮</van-button>
      <van-button type="default">默认按钮</van-button>
      <van-button type="warning">警告按钮</van-button>
      <van-button type="danger">危险按钮</van-button>
      <i class="iconfont icon-lishi"></i>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  nane: 'App',
};
</script>
<style lang="less"></style>
