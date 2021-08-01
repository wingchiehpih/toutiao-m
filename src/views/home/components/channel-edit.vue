<template>
  <div class="channel-edit">
    <van-cell>
      <template slot="title">
        <div class="title-text">我的频道</div>
      </template>
      <!-- 不用插槽是因为单元格默认插槽为右侧 -->
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit === true ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <!-- 在属性中无法单独控制样式，所以要通过自定义插槽的形式 -->
        <template #icon>
          <van-icon
            name="clear"
            v-show="isEdit && !fiexdChannels.includes(channel.id)"
          ></van-icon>
        </template>
        <template #text>
          <!-- 
            v-bind:class语法
            一个对象：对象中的key表示要作用的CSS类名
            对象中的value表示要计算出布尔值
            true表示作用该类名
            false表示不作用该类名
           -->
          <!-- 判断传入的active和当前的index是否相同，相等则添加类名 -->
          <span class="text" :class="{ active: index === active }">
            {{ channel.name }}</span
          ></template
        ></van-grid-item
      >
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell>
      <template slot="title">
        <div class="title-text">频道推荐</div>
      </template>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        icon="plus"
        :key="index"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channel';
// 加载vuex
import { mapState } from 'vuex';
// 加载封装好的本地存储
import { setItem } from '@/utils/storage';
export default {
  name: '',
  data() {
    return {
      // 所有频道
      allChannels: [],
      // 控制编辑状态的显示与隐藏
      isEdit: false,
      // 存放不显示icon关闭图标的id
      fiexdChannels: [0],
    };
  },
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  created() {
    this.loadAllChannels();
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels();
      this.allChannels = data.data.channels;
      try {
      } catch (err) {
        this.$toast('数据获取失败');
      }
    },
    async onAddChannel(channel) {
      // 页面展示
      this.myChannels.push(channel);
      // 数据持久化处理
      // 未登录，将数据添加到本地存储
      // 已登录，将数据添加到后端接口
      if (this.user) {
        try {
          await addUserChannel({
            // 频道ID
            id: channel.id,
            // 序号
            seq: this.myChannels.length,
          });
        } catch (err) {
          this.$toast('保存失败，请重试');
        }
      } else {
        setItem('TOUTIAO_CHANNELS', this.myChannels);
      }
    },
    // 通过index下标控制标签栏的切换
    onMyChannelClick(channel, index) {
      // 如果是编辑状态则删除频道
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fiexdChannels.includes(channel.id)) {
          return;
        }
        this.myChannels.splice(index, 1);
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true);
        }
        // 持久化处理
        this.deleteChannel(channel);
      }
      // 非编辑，切换频道
      else {
        this.$emit('update-active', index, false);
      }
    },
    async deleteChannel(channel) {
      if (this.user) {
        // 已登录将数据更新到后台
        try {
          await deleteUserChannel(channel.id);
        } catch (err) {
          this.$toast('操作失败请重试');
        }
      } else {
        // 未登录将数据保存在本地
        // 本地存储的数据只需要重新存储一遍，覆盖本地存储总原本的数据
        setItem('TOUTIAO_CHANNELS', this.myChannels);
      }
    },
  },
  computed: {
    // 映射vuex中state中的user数据
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖数据发生变化，计算属性会重新执行
    recommendChannels() {
      // const channels = [];
      // this.allChannels.forEach((channel) => {
      //   // find编辑数组找到满足条件的元素项,找到则返回元素项，未找到返回underfined
      //   const res = this.myChannels.find((item) => {
      //     return item === channel;
      //   });
      //   // 如果有返回值，则往channels中推入数据
      //   if (!res) {
      //     channels.push(channel);
      //   }
      // });
      // return channels;
      // 这两段代码的理解
      return this.allChannels.filter((channel) => {
        return !this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border-color: #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    white-space: nowrap;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      // 去掉父元素的定位方式
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.my-grid {
    .van-icon-clear {
      // 在页面测试时用到的代码在在编写时需要乘以二
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 30px;
      color: #cacaca;
      z-index: 2;
    }
  }

  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
