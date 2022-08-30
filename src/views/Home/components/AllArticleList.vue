<template>
  <div class="all-article">
    <div v-for="item in 10" :key="item" class="list-item">
      <div class="item-title line-ellipsis-1">剪影流殇，光影华年</div>
      <div class="item-content line-ellipsis-3">
        染指流沙，回绕不尽的世界繁华； 青灯孤伴，镌刻不完的午夜落花； 锦帛残卷，撰写不到的城南旧事； 蓦然回首，消逝不见的绝美年华。[...]
        华年剪影影华年剪影流殇，光影华年剪影流殇，光影华年剪影流殇，光影华年剪影流殇，光影华年
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue'

const state = reactive({})

</script>

<style lang='scss' scoped>
.all-article{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.list-item{
  width: 100%;
  margin-bottom: 20px;
  background-color: pink;
  .item-title{
    width: 650px;
    font-size: 22px;
    color: #333333;
  }
  .item-content{
    margin: 10px 0;
    letter-spacing: 2px;
    font-size: 14px;
    color: #666;
  }
}
</style>