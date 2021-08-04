<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          class="search-btn"
          type="info"
          size="small"
          round
          icon="search"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tab标签栏 -->
    <!-- animated设置切换动画 -->
    <!-- swipeable设置手滑，滑动范围由内容撑开 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表 -->
        <article-list ref="article-list" :channel="item" />
      </van-tab>
      <!-- 不要在template上添加class类名 -->
      <template #nav-right>
        <!-- 右侧占位符 -->
        <div class="placeholder"></div>
        <i
          class="iconfont icon-gengduo hamburger-btn"
          @click="isChannelEditShow = true"
        >
          <span class="icon-left"></span>
        </i>
      </template>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list';
import ChannelEdit from './components/channel-edit.vue';

import { getUserChannels } from '@/api/user';

import { mapState } from 'vuex';

import { getItem } from '@/utils/storage';

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      // 频道列表
      channels: [],
      // 控制频道弹出层的状态
      isChannelEditShow: false,
    };
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
  created() {
    this.loadChannels();
  },
  methods: {
    // 加载用户频道数据
    async loadChannels() {
      try {
        let channels = [];
        if (this.user) {
          // 已登录，通过调用接口获取用户频道列表
          const { data } = await getUserChannels();
          channels = data.data.channels;
        } else {
          // 未登录，判断本地存储是否保存相关数据
          const localChannels = getItem('TOUTIAO_CHANNELS');
          // 判断本地存储是否保存数据
          if (localChannels) {
            channels = localChannels;
          } else {
            // 本地存储没有数据，请求获取默认的请求列表
            // 用户未登录获取的是默认的频道列表数据
            const { data } = await getUserChannels();
            channels = data.data.channels;
          }
        }
        this.channels = channels;
      } catch (err) {
        this.$toast('获取频道数据失败');
      }
    },
    onUpdateActive(index, isChannelEditShow = true) {
      // 更新激活的频道项
      this.active = index;
      // 关闭频道弹出层
      this.isChannelEditShow = isChannelEditShow;
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>
<style scoped lang="less">
.home-container {
  padding-top: 174px;
  // 布局效果的高度是50px，根据视口*2的原则宽度应该设置为100px
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    font-size: 28px;
    background-color: #5babfb;
    border: none;
    .van-icon {
      font-size: 32px;
    }
  }
  // 通过deep实现影响后代元素
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      height: 82px;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      // 通过ps复制图层的透明度
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
      .icon-left {
        position: absolute;
        left: 0;
        content: '';
        width: 2px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder {
      // 因为tabs是根据flex布局的，没有设置flex默认宽度为0，使用flex-shrink不参与flex布局计算，直接给定固定宽度
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
