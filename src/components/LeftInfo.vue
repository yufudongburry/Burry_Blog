<template>
  <div class="left-info">
    <span @click="toPath()">route</span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LeftInfoState } from './type'

const router = useRouter()
const state = reactive<LeftInfoState>({
  infoData: {
    imgUrl:
      'https://shigongbang.oss-cn-hangzhou.aliyuncs.com/member_center/610000/20210718617021877418769.png',
    name: 'Burry',
    introduction: 'Burry的手工作坊',
  },
  searchVal: '',
})
const toPath = (): void => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.left-info {
  background: #0286df;
  grid-area: left;
  overflow: auto;
}
</style>
