<template>
  <div class="blog-item" v-if="props.index % 2 === 0">
    <ItemImg />
    <ItemText />
  </div>
  <div class="blog-item" v-else>
    <ItemText />
    <ItemImg />
  </div>
</template>

<script setup lang="ts">
import ItemImg from './components/ItemImg.vue'
import ItemText from './components/ItemText.vue'
const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
  @import "../styles/blogItem.scss";
</style>
