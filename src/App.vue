<template>
  <div class="app">
    <!-- 左侧信息 -->
    <LeftInfo></LeftInfo>
    <div class="main">
      <div class="main-search">
        <el-input
          v-model="state.searchData"
          placeholder="search..."
          maxlength="50"
          @change="searchChange"
        ></el-input>
      </div>
      <div class="main-content">
        <div class="main-content__top">
          <MainContentTop></MainContentTop>
        </div>
        <div class="main-content__bottom">
          <router-view></router-view>
        </div>
      </div>
      <div class="main-footer">Copyright © 2022 Burry</div>
    </div>
    <!-- 右侧最新文章 -->
    <RightRecently></RightRecently>
    <!-- 返回顶部 -->
    <el-backtop />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { appTypeState } from '@/appType'
import LeftInfo from '@/components/LeftInfo.vue'
import RightRecently from '@/components/RightRecently.vue'
import MainContentTop from '@/components/mainContentTop.vue'

const state = reactive<appTypeState>({
  searchData: '',
})
// 搜索
const searchChange = (): void => {
  console.log(state.searchData)
}
</script>

<style lang="scss">
.app {
  min-width: 1200px;
  height: 100vh;
  display: grid;
  grid-template-columns: 17vw 1fr 17vw;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    "left main right"
    "left main right"
    "left main right"
  ;
}
.main {
  background: #fff;
  grid-area: main;
  display: grid;
  grid-template-rows: 40px 1fr 30px;
  grid-template-columns: 1fr;
}
.main-search {
  position: relative;
  z-index: 5;
}
.main-content {
  position: relative;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40vh 1fr;
  background: linear-gradient(135deg,#757f9a,#d7dde8);
  padding: 20px;
  overflow: auto;
}
.main-footer {
  background: #fff;
  color: #6E6E6E;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
}
//.scroll-img {
//  cursor: pointer;
//  position: fixed;
//  top: -700px;
//  right: 250px;
//  transition: all .5s ease-in-out;
//  transform-origin: 50% 0%;
//  animation: rollMao1 1.5s linear infinite;
//}

//@keyframes rollMao1 {
//  0% {
//    transform: translateY(0);
//  }
//
//  50% {
//    transform: translateY(-10px);
//  }
//
//  100% {
//    transform: translateY(0);
//  }
//}
//
//@keyframes rollMao2 {
//  0% {
//    transform: none;
//  }
//
//  25% {
//    transform: rotate(30deg);
//  }
//
//  50% {
//    transform: none;
//  }
//
//  75% {
//    transform: rotate(-30deg);
//  }
//
//  100% {
//    transform: none;
//  }
//}
</style>
