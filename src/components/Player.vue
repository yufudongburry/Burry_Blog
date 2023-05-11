<template>
  <div class="player" ref="playRef"></div>
</template>

<script setup lang="ts">
import APlayer from 'APlayer'
import 'APlayer/dist/APlayer.min.css';
import {reactive, onBeforeUnmount,getCurrentInstance, onMounted, ref} from 'vue'

const playRef = ref()
const { proxy } = getCurrentInstance()
const state = reactive({
  instance:null
})
const props = defineProps({
  // 音频自动播放
  autoplay: {
    type: Boolean,
    default: false
  },
  // 主题色
  theme: {
    type: String,
    default: '#b7daff'
  },
  // 音频循环播放
  loop: {
    type: String,
    default: 'all' //'all' | 'one' | 'none'
  },
  // 音频循环顺序
  order: {
    type: String,
    default: 'random' //'list' | 'random'
  },
  // 预加载
  preload: {
    type: String,
    default: 'auto' //'auto' | 'metadata' | 'none'
  },
  // 默认音量
  volume: {
    type: Number,
    default: 0.7,
    validator: (value) => {
      return value >= 0 && value <= 1;
    }
  },
  // 互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
  mutex: {
    type: Boolean,
    default: true
  },
  // 传递歌词方式
  lrcType: {
    type: Number,
    default: 1
  },
  // 列表是否默认折叠
  listFolded: {
    type: Boolean,
    default: true
  },
  // 列表最大高度
  listMaxHeight: {
    type: String,
    default: '100px'
  },
  // 存储播放器设置的 localStorage key
  storageName: {
    type: String,
    default: 'aplayer-setting'
  },
  audioList: {
    type: Array,
    default: () => {
      return [
        {
          name: 'HLS',
          artist: 'artist',
          url: 'https://anime-music-files.jijidown.com/5b850d00b02de24c618855ad_128.mp3?t=1678269196&sign=B6A41EDECA3BD00432041473196DA561',
          cover: 'https://shigongbang.obs.cn-east-3.myhuaweicloud.com/member_center/610000/2021092511519193019933.JPG',
          lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing'
        },
        {
          name: 'HLS',
          artist: 'artist',
          url: 'https://anime-music-files.jijidown.com/5b850d00b02de24c618855ad_128.mp3?t=1678269196&sign=B6A41EDECA3BD00432041473196DA561',
          cover: 'https://shigongbang.obs.cn-east-3.myhuaweicloud.com/member_center/610000/2021092511519193019933.JPG',
          lrc: '[00:00.00]APlayer\n[00:04.01]is\n[00:08.02]amazing'
        }
      ]
    }
  }
})
onMounted(() => {
  state.instance = new APlayer({
    container: playRef.value,
    fixed: true,
    autoplay: props.autoplay,
    theme: props.theme,
    loop: props.loop,
    order: props.order,
    preload: props.preload,
    volume: props.volume,
    mutex: props.mutex,
    lrcType: props.lrcType,
    listFolded: props.listFolded,
    listMaxHeight: props.listMaxHeight,
    storageName: props.storageName,
    audio: props.audioList
  })
})
// 销毁
onBeforeUnmount(() => {
  state.instance.destroy()
})
</script>

<style lang="scss" scoped>
  @import "./styles/player.scss";
</style>
