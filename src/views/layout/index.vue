<template>
  <div class="layout-container">
    <!-- 路由出口 -->
    <router-view></router-view>
    <!-- 标签导航栏 -->
    <!-- route开启路由模式，使用to属性设置导航到的路由路径 -->
    <!-- 开启路由模式后，高亮显示通过路由路径设置，v-model已经不起作用了 -->
    <!-- 根据激活的路径显示对应的标签 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <template #icon>
          <div class="iconfont icon-shouye"></div>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <div class="iconfont icon-wenda"></div>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <div class="iconfont icon-shipin"></div>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <div class="iconfont icon-wode"></div>
        </template>
        <span class="text">{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: '',
  data() {
    return {};
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    div.iconfont {
      font-size: 40px;
    }
    div.text {
      font-size: 20px;
    }
  }
}
</style>
