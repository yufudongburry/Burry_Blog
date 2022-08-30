<template>
  <div class="top-box">
    <img class="box-avatar" src="@/assets/img/avatar.jpg" alt="">
    <div class="box-banner">
      <div class="banner-text">
        <span class="text">绝代风华。</span>
      </div>
    </div>
    <div class="box-tag">
      <!--      占位-->
      <div></div>
      <div class="tag-list">
        <div class="tag-item">收藏</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.top-box {
  height: 30vh;
  min-height: 180px;
  background: #F8F8F8;
  display: grid;
  grid-template-rows: 1fr 45px;
  position: relative;
  border-radius: 5px;
}
.box-banner {
  background-image: url("../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
}
.banner-text {
  color: #fff;
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 25vh;
}
.text {
  animation: color 3s infinite;
}
.box-avatar {
  width: 150px;
  height: 150px;
  position: absolute;
  bottom: 20px;
  left: 40px;
  border: 4px solid #fff;
  border-radius: 50%;
}
.box-tag {
  display: grid;
  grid-template-columns: 12vw 1fr;
}
.tag-list {
  height: 45px;
  display: flex;
}
.tag-item {
  width: 60px;
  color: #666;
  text-align: center;
  line-height: 45px;
  font-family: HarmonyOS_Regular !important;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #0286df;
  }
}
@keyframes color {
  0% {
    color: #44cef6;
  }
  10% {
    color: #333333;
  }
  20% {
    color: #f3f3f3;
  }
  30% {
    color: #666666;
  }
  40% {
    color: #dd001b;
  }
  50% {
    color: yellow;
  }
  60% {
    color: orange;
  }
  70% {
    color: green;
  }
  80% {
    color: purple;
  }
  90% {
    color: pink;
  }
  100% {
    color: #757f9a;
  }
}
</style>
