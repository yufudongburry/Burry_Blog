<template>
  <div class="header-box">
    <div class="blog-log cursor">Burry-Blog</div>
    <div class="nav">
      <div
        class="nav-item cursor"
        v-for="(item, index) in headerList"
        :key="index"
        :class="{ active: item.url == route.path }"
        @click="toPage(item)"
      >
        <svg class="item-icon">
          <use :xlink:href="`${svgIcons}${item.icon}`"></use>
        </svg>
        <span>{{ item.label }}</span>
      </div>
      <div class="search">
        <el-input v-model="searchVal" placeholder="Search...">
          <template #append>
            <el-button :icon="Search" @click="searchChange" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Search } from '@element-plus/icons-vue'
import svgIcons from '@/assets/img/yancey-official-blog-svg-icons.svg';

const headerList: {
  
} = [
  {
    label: 'Home',
    url: '/',
    icon: '#home'
  },
  {
    label: 'Blog',
    url: '/blog',
    icon: '#app-store-apple-symbol'
  },
  {
    label: 'Music',
    url: '/music',
    icon: '#music-player'
  },
  {
    label: 'Share',
    url: '/share',
    icon: '#curriculum-vitae'
  },
  {
    label: 'Secret',
    url: '/secret',
    icon: '#archive-black-box'
  },
]
const router = useRouter()
const route = useRoute()
// 搜索
const searchVal = ref('')
const searchChange = (): void => {
  console.log(searchVal.value)
}

const toPage = (item: {
  label: string,
  url: string,
  icon: string
}):void => {
  console.log(item,'pppp');
  router.push(item.url)
}
</script>

<style lang="scss" scoped>
@import "./styles/header.scss";
</style>
