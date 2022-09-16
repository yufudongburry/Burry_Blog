<template>
  <v-md-editor v-model="state.content" height="400px"></v-md-editor>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const state = reactive({
  content: ''
})
</script>

<style scoped lang="scss">

</style>
