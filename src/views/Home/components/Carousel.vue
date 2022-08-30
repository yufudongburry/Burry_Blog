<template>
  <div class="shuffling">
    <el-carousel type="card" height="190px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img class="shuffling-img" src="@/assets/img/1.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'
import { carouselTypeState } from '../homeType'

const state = reactive<carouselTypeState>({
  imgList: [],
})
</script>

<style lang='scss' scoped>
.shuffling{
  width: 100%;
  height: 210px;
  padding: 0 20px;
  box-sizing: border-box;
}
.shuffling-img{
  border-radius: 10px;
}
</style>