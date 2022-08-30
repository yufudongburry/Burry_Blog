<template>
  <div class="box-music box">
    <div class="title wyy">
      欢迎来到网易云音乐
      <span class="login cursor" @click="openLogin('login')">登录</span>
      <span class="slash">/</span>
      <span class="login cursor" @click="openLogin('sign')">注册</span>
    </div>
  </div>
  <!--  登录弹框-->
  <LoginDialog ref="loginRef" :type="state.type"></LoginDialog>>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import LoginDialog from '@/views/Music/components/LoginDialog.vue'
import { IndexState } from '@/views/Music/music'

const loginRef: any = ref()

const state = reactive<IndexState>({
  type: '',
})
const openLogin = (type: string): void => {
  state.type = type
  loginRef.value.dialogShow()
}
</script>
<style lang="scss" scoped>
.box-music {
  width: 750px;
  min-height: 837px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.wyy {
  color: #dd001b;
  border-bottom: 2px solid #dd001b;
}
.login {
  color: #dd001b;
  float: right;
  &:hover {
    color: #0286df;
  }
}
.slash {
  float: right;
}
</style>
