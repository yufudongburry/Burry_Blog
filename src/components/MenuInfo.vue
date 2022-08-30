<template>
  <div
    v-for="item in meunData"
    :key="item.key"
    class="common item-box"
    :class="{ 'item-box--active': item.key === route.path }"
    @click="menuHandle(item.key)"
  >
    <span>{{ item.val }}</span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const meunData = [
  {
    key: '/',
    val: '首页',
  },
  {
    key: '/essays',
    val: '心情随笔',
  },
  {
    key: '/web',
    val: '前端笔记',
  },
  {
    key: '/share',
    val: '摸鱼圣地',
  },
]

const router = useRouter()
const route = useRoute()
const state = reactive({})
const menuHandle = (val: string): void => {
  if (val) {
    router.push(val)
  }
}
</script>

<style lang="scss" scoped>
.common {
  cursor: pointer;
  width: 100%;
  height: 45px;
  line-height: 45px;
  border-top: 1px solid #f3f3f3;
  text-align: center;
  font-size: 14px;

  &:hover {
    background: #44cef6;
    color: #fff;
  }

  &:last-child {
    border-bottom: 1px solid #f3f3f3;
  }
}

.item-box {
  color: #666;
}

.item-box--active {
  background: #44cef6;
  color: #fff;
}
</style>
