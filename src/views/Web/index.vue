<template>
  <div class="box-essays box">
    <span class="text">5555</span>
  </div>
</template>

<script setup lang="ts">
import { reactive, withDefaults, onMounted } from 'vue'

interface Props {
  msg?: string,
  labels: string []
}
onMounted(() => {
  console.log(props.msg)
  console.log(props.labels)
})
const props = withDefaults(defineProps<Props>(), {
  msg: 'kkkkk',
  labels: () => ['hhh', 'hhh'],
})
const state = reactive({
  color: 'pink',
})
</script>
<style lang="scss" scoped>
.box-essays {
  width: 750px;
  min-height: 837px;
  margin: 0 auto;
}
.text {
  color: v-bind('state.color');
}
</style>
