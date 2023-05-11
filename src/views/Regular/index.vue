<template>
  <!-- <div class="regular-box" @click="click">
    888
  </div> -->
  <div>

  </div>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance, onMounted  } from 'vue'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'

const { proxy } = getCurrentInstance ()

// const click = ():void => {
//   proxy?.$toast('jjjjjj')
// }
onMounted(() => {
  initWebSocket('测试')
})
const initWebSocket = (data) => {
  onnection(data)
}
const onnection = (data) => {
  let baseUrl = 'https://mydomain.com/my_prefix';//实时的服务路径
  let nowMethod = ''
  let socket = new SockJS(baseUrl)
  let stompClient = Stomp.over(socket)
  stompClient.connect(nowMethod, msg => {
    let resData = JSON.parse(msg.body)
    if(pageName == '作业管控') {
      let res = {}
      res.data = resData

    }
  })
}

const successSocket = (data) => {
  proxy?.$toast(data)
}

</script>

<style lang='scss' scoped>

</style>
