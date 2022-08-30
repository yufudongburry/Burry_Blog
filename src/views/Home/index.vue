<template>
  <div class="box-home box">
    <!-- 轮播图 -->
    <Carousel></Carousel>
    <!-- title -->
    <div class="home-title">
      <el-divider>欢迎来到Burry的手工作坊</el-divider>
    </div>
    <!-- 内容 -->
    <AllArticleList></AllArticleList>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Carousel from './components/Carousel.vue'
import AllArticleList from './components/AllArticleList.vue'

const state = reactive({
  
})

onMounted(() => {
  
})
</script>

<style lang="scss" scoped>
.box-home {
  width: 750px;
  min-height: 837px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.home-title{
  margin-top: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}
.home-title:deep(.el-divider__text){
  font-weight: bold;
}
</style>