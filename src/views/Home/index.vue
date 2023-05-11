<template>
  <div class="home-first-screen">
    <div class="home-tag">
      <div class="tag-title" data-value="HI, CUTEBABY!">HI, CUTEBABY!</div>
      <div class="tag-content">
        <div class="tag-text">死は生の対極としてではなく、その一部として存在している。</div>
        <div class="tag-link">
          <svg
            class="link-item"
            v-for="(item,index) in socialMedia"
            :key="index"
            @click="toLink(item)"
          >
            <use :xlink:href="`${svgIcons}${item.icon}`"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <HomeContent />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import svgIcons from '@/assets/img/yancey-official-blog-svg-icons.svg';
import HomeContent from './components/HomeContent.vue'

const socialMedia = [
  {
    label:'github',
    url: 'https://github.com/yufudongburry',
    icon: '#github'
  },
  {
    label:'wechat',
    url: '/',
    icon: '#wechat'
  },
  {
    label: 'email',
    url: 'mailto:yufudongburry@outlook.com',
    icon: '#mail'
  }
]


const toLink = (item: object): any => {
  if(item.label != 'wechat') return window.open(item.url)
}

</script>

<style lang="scss">
$img: '../../assets/img';
@import "./styles/index.scss";
</style>
