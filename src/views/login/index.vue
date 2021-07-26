<template>
  <div class="login-container">
    <!-- 导航栏区域 -->
    <van-nav-bar title="标题">
      <template #left>
        <van-icon name="cross" @click="$router.back()"></van-icon>
      </template>
    </van-nav-bar>
    <!-- form表单组件 -->

    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        autocomplete="off"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!-- 具名插槽 #号代替v-slot-->
        <template #left-icon>
          <div class="iconfont icon-shouji"></div>
        </template>
      </van-field>
      <van-field
        name="code"
        autocomplete="off"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <div>
            <div class="iconfont icon-yanzhengma"></div>
          </div>
        </template>
        <template #button>
          <!-- 监听倒计时的finish事件，当倒计时结束后自动隐藏倒计时 -->
          <van-count-down
            :time="1000 * 10"
            format=" ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            @click="onSendSms"
            native-type="button"
            v-else
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误',
          },
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误',
          },
        ],
      },
      isCountDownShow: false,
    };
  },
  methods: {
    // 登录
    async onSubmit() {
      // 1、获取表单数据
      // 2、表单验证
      this.$toast.loading({
        message: '加载中...',
        // 禁用背景点击
        forbidClick: true,
        // toast提示组件展示时间，如果为0则为持续展示
        duration: 0,
      });
      // 3、提交表单请求登录
      try {
        const { data } = await login(this.user);
        // 调用store中mutation中的setUser方法
        this.$store.commit('setUser', data.data);
        // 任何一个新的toast被调用都会关闭前一个调用的toast
        this.$toast.success('登录成功');
        this.$router.push('/my');
      } catch (err) {
        // catch中捕获所有错误情况，
        // 一个是根据状态码判断是账号或密码错误
        // 另一个是网络或服务器异常的报错
        if (err.response.status === 400) {
          this.$toast.fail('手机号码或验证码错误');
          console.log('登录失败', err);
        } else {
          this.$toast.fail('登录失败，请稍后重试');
        }
      }
      // 4、根据请求响应结果处理后续操作
    },
    // 获取验证码
    async onSendSms() {
      try {
        // 1、验证手机号码
        const res = await this.$refs.loginFormRef.validate('mobile');
      } catch (err) {
        return console.log('验证失败', err);
      }
      // 2、验证通过显示倒计时
      this.isCountDownShow = !this.isCountDownShow;
      // 3、请求发布验证码
      try {
        await sendSms(this.user.mobile);
        this.$toast('发送成功');
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false;
        if (err.response.status === 429) {
          this.$toast('发送过于频繁，请稍后重试');
        } else {
          this.$toast('发送失败，请稍后重试');
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .iconfont {
    // 根据设计稿的图标高度设置字体图标的大小
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px 0;
    .van-button {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
