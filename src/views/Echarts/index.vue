<template>
  <div class="echarts-box" ref="echartsRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

onMounted(() => {
  // init()
  // setInterval(function() {
  //   update();
  // }, 3000);
})
const echartsRef = ref()
// const init = () => {
  // const myEchart = echarts.init(echartsRef.value)
  // let options = {
    // title: {
    //   text: 'ECharts 入门示例'
    // },
    // tooltip: {},
    // xAxis: {
    //   data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    // },
    // yAxis: {},
    // series: [
    //   // 普通柱状图
    //   {
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20]
    //   },
    //   {
    //     name: '销量',
    //     type: 'bar',
    //     data: [5, 20, 36, 10, 10, 20],
    //     barWidth: '20%',
    //     itemStyle: {
    //       color: '#0286df',
    //     }
    //   },

    //   // 堆叠柱状图
    //   {
    //     data: [5, 20, 36, 10, 10, 20],
    //     type: 'bar',
    //     stack: 'x', // stack值相同则堆叠再一起，具体取值无具体要求
    //   },
    //   {
    //     data: [5, 2, 66, 36, 1, 12],
    //     type: 'bar',
    //     stack: 'x'
    //   }
    // ],
    // 高亮样式。
    // emphasis: {
    //   itemStyle: {
    //     // 高亮时点的颜色。
    //     color: 'pink'
    //   },
    //   label: {
    //     show: true,
    //     // 高亮时标签的文字。
    //     formatter: function(param:any) {
    //       return param.data
    //     }
    //   }
    // }
  // }
  // myEchart.setOption(options)
// }

// 动态排序
// let data = []
// for (let i = 0; i < 5; ++i) {
//   data.push(Math.round(Math.random() * 200));
// }
// let options = {
//   xAxis: {
//     max: 'dataMax'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['A', 'B', 'C', 'D', 'E'],
//     inverse: true,
//     animationDuration: 300,
//     animationDurationUpdate: 300,
//     max: 2 
//   },
//   series: [
//     {
//       realtimeSort: true,
//       name: '销售量',
//       type: 'bar',
//       data: data,
//       label: {
//         show: true,
//         position: 'right',
//         valueAnimation: true
//       }
//     }
//   ],
// }
// const update = () => {
//   const myEchart = echarts.init(echartsRef.value)
//   var data = options.series[0].data;
//   for (var i = 0; i < data.length; ++i) {
//     if (Math.random() > 0.9) {
//       data[i] += Math.round(Math.random() * 2000);
//     } else {
//       data[i] += Math.round(Math.random() * 200);
//     }
//   }
//   myEchart.setOption(options);
// }

</script>

<style lang='scss' scoped>
.echarts-box {
  width: 700px;
  height: 500px;
}
</style>