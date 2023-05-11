<template>
  <div class="home-content">
    <BlogItem v-for="(item,index) in 10" :key="item" :index="index+1"></BlogItem>
  </div>
</template>

<script setup lang="ts">
import BlogItem from '@/components/BlogItem/index.vue'
import { reactive } from 'vue'


</script>

<style lang="scss">
@import "../styles/homeContent.scss";
</style>
