<template>
  <div class="app">
    <Header />
    <router-view />
    <Player />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Player from '@/components/Player.vue'
</script>

<style lang="scss" scoped>

</style>
