<template>
  <div></div>
  <div v-loading="state.loading" class="game-box box">
    <div class="title mb30">{{ state.gameName }}</div>
    <el-input
      v-model="state.inputVal"
      maxlength="13"
      clearable
      :placeholder="`请输入你的${state.gameName.slice(0,2)}`"
    >
      <template #append>cm</template>
    </el-input>
    <div class="btn">
      <el-button type="primary" round @click="calculate">开始计算</el-button>
    </div>
    <!-- 计算结果 -->
    <div v-if="state.resultShow" class="results">
      <div class="title mb30">{{ state.gameName }}结果</div>
      <div class="results-message">
        您的身高是{{ state.inputVal }}cm！！！
      </div>
    </div>
    <!-- 消息提示 -->
    <div
      class="message"
      :style="{background:state.randomColor,right:state.randomRight,
               bottom:state.randomBottom,display:state.messageShow}"
    >
      {{ state.promptMessage }}
      <span class="close" @click="closeMessage()">o</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
// const router = useRouter()
const state = reactive({
  gameName: route.query.name,
  inputVal: '',
  randomColor: '',
  randomRight: '',
  randomBottom: '',
  promptMessage: '', // 提示消息
  messageShow: 'none',
  resultShow: false,
  loading: false,
})
const timer: any = ref()
// 随机值重新赋值
const assignmentRandom = () => {
  state.randomColor = 'rgba(' + Math.floor(Math.random() * 255)
	+ ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.5)'
  state.randomRight = Math.floor(Math.random() * 1650) + 'px'
  state.randomBottom = Math.floor(Math.random() * 800) + 'px'
}
const calculate = () => {
  let timers
  let value = +state.inputVal
  assignmentRandom()
  // 为了实现多功能提示  因此手动检验
  if (typeof (value) === 'number') {
    if (value === 0) { // 为空
      state.promptMessage = '大哥你填点东西吧'
      state.messageShow = 'block'
      state.resultShow = false
      setTimer()
    } else if (+value < 50) {
      state.promptMessage = '胡说八道，没有这么矮的！！！'
      state.messageShow = 'block'
      state.resultShow = false
      setTimer()
    } else if (+value > 250) {
      state.promptMessage = '巨人症都都没这么高！！！'
      state.messageShow = 'block'
      state.resultShow = false
      setTimer()
    } else {
      state.messageShow = 'none'
      state.loading = true
      clearTimeout(timers)
      timers = setTimeout(() => {
        state.resultShow = true
        state.loading = false
      }, 5000)
    }
  } else {
    state.promptMessage = '请输入阿拉伯数字好嘛！！！'
    state.messageShow = 'block'
    setTimer()
  }
}
// 定时器hook
const setTimer = () => {
  clearTimer()
  timer.value = setTimeout(() => {
    closeMessage()
  }, 2000)
}
const clearTimer = () => {
  clearTimeout(timer.value)
}
const closeMessage = () => {
  state.messageShow = 'none'
}
onMounted(() => {
  assignmentRandom()
})
</script>

<style lang="scss" scoped>
.game-box {
  width: 750px;
  min-height: 837px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  box-sizing: border-box;
}

.btn {
  height: 40px;
  width: 710px;
  margin-top: 20px;
  text-align: center;
}

.message {
  height: 50px;
  padding: 0 30px;
  color: rgba(255, 255, 255, .8);
  font-size: 16px;
  line-height: 50px;
  position: absolute;
  z-index: 10;
  font-family: sans-serif;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, .4);
  border-left: 1px solid rgba(255, 255, 255, .4);
  box-shadow:
    10px -10px 20px rgba(0, 0, 0, .2),
    -10px 10px 20px rgba(255, 255, 255, .1);
  backdrop-filter: blur(6px); /*  元素后面区域添加模糊效果 */
  border-radius: 20px;
}

.close {
  position: relative;
  right: -10px;
  color: #fff;
  cursor: pointer;
}

.results {
  width: 710px;
  height: 100px;
  margin-top: 50px;
}

.results-message {
  text-indent: 2rem;
  font-size: 18px;
}
</style>
