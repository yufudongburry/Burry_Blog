<template>
  <div class="box-recently">
    <div class="link"></div>
    <div v-if="0" class="directory">sss</div>
    <div class="date">
      <img class="autumn-img" src="@/assets/img/autumn.png" alt="">
      <div class="motto">今日事，今日毕。</div>
      <div class="time">
        {{ dateFormat(state.newDate, 'DD') }}&nbsp;
        {{ monthAbb(dateFormat(state.newDate, 'M')) }}，
        {{ dateFormat(state.newDate,'YYYY') }}
      </div>
      <div class="tag-time">
        <div class="tag-month">{{ monthAbb(dateFormat(state.newDate, 'M')) }}</div>
        <div class="tag-day">{{ dateFormat(state.newDate, 'DD') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { RightRecentlyState } from './type'
import { dateFormat, monthAbb } from '@/utils/time'

onMounted(() => {
  getNewDate()
})

const state = reactive<RightRecentlyState>({
  newDate: 0,
})

// 获取当前时间
const getNewDate = (): void => {
  state.newDate = new Date().getTime()
  console.log()
}
</script>

<style lang="scss" scoped>
.box-recently {
  grid-area: right;
  background: #fff;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}
.link {
  height: 60px;
  background: pink;
}
.date {
  width: 100%;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  background: #f6f8fa;
  margin-top: 20px;
  color: #6E6E6E;
  position: relative;
}
.autumn-img {
  width: 100%;
  height: 110px;
}
.motto {
  margin-top: 10px;
  font-size: 14px;
}
.time {
  margin-top: 5px;
  font-size: 14px;
  color: #B3B3B3;
}
.tag-time {
  height: 30px;
  width: 42px;
  position: absolute;
  top: -8px;
  left: -12px;
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  line-height: 15px;
}
.tag-month {
  height: 15px;
  background: #1687FA;
  border-radius: 4px 4px 0 0;
}
.tag-day {
  border-top: 1px solid #fff;
  height: 15px;
  background: #00000066;
}
</style>
