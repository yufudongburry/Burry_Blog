<template>
  <div class="box-share box">
    <!-- 益智小游戏 -->
    <div v-if="false" class="game-box">
      <div class="title">益智小游戏</div>
      <div class="game-list">
        <div
          v-for="item in state.gameList"
          :key="item.id"
          class="game-list-item"
          :style="{background:item.color}"
          @click="toGame(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <!-- 下班倒计时 -->
    <div class="time-box">
      <div class="title">
        倒计时
        <span class="now-date">现在是{{ timeResult(timeState.nowDate, 'YYYY/MM/DD HH:mm') }}</span>
      </div>
      <div class="countdown">还有{{ `${ timeState.hour } 小时 ${ timeState.minute } 分 ${ timeState.second } 秒` }}就啦</div>
      <div class="compensation">
        <div class="img-gif">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="点击下方动图设置"
            placement="top-start"
          >
            <el-icon class="icon-tag"><PriceTag /></el-icon>
          </el-tooltip>
          <img
            class="gif"
            src="@/assets/img/gif/wifi.gif"
            alt=""
            @click="timeState.setDialogShow = true"
          >
        </div>
        <div @click="getCompensation">{{ timeState.getCompensationNum }}</div>
      </div>
    </div>
  </div>
  <!--  设置弹框-->
  <el-dialog
    v-model="timeState.setDialogShow"
    width="25%"
    @close="dialogClose(setFormRef)"
  >
    <div class="dialog-box">
      <div class="icon-set">
        <el-icon><Setting /></el-icon>
      </div>
      <el-form
        ref="setFormRef"
        :model="setForm"
        :rules="rules"
        label-width="107px"
        label-position="right"
      >
        <el-form-item label="上下班时间：" prop="timePeriod">
          <el-time-picker
            v-model="setForm.timePeriod"
            is-range
            range-separator="-"
            start-placeholder="上班时间"
            end-placeholder="下班时间"
            value-format="x"
          />
        </el-form-item>
        <el-form-item label="月上班天数：" prop="days">
          <el-input v-model="setForm.days" placeholder="请输入每月上班天数">
            <template #append>天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="月基本薪酬：" prop="salary">
          <el-input v-model="setForm.salary" placeholder="请输入每月薪酬">
            <template #append>元</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn-group">
        <el-button
          class="first-btn"
          circle
          :icon="Close"
          @click="dialogClose(setFormRef)"
        ></el-button>
        <el-button
          type="primary"
          circle
          :icon="Check"
          @click="setSumbit(setFormRef)"
        ></el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'
import { GameTypeState, TimeTypeState, SetFormState } from './shareType'
import moment from 'moment'
import { Close, Check } from '@element-plus/icons-vue'
import type { ElForm } from 'element-plus'
import type { FormRulesMap } from 'element-plus/es/components/form/src/form.type'
import { SessionStorageService } from '@/utils/session'

// 解决element-plus目前不向外暴露实例类型
type ElFormInstance = InstanceType<typeof ElForm>

onMounted(() => {
  // 获取随机颜色
  getColor()
  // 执行一次金额避免空白
  getCompensation()
  // 监测当前时间
  timer.value = setInterval(() => {
    timeState.nowDate = getNowDate()
    getCompensation()
  }, 1000)
  countDown() // 开启定时器之前执行一次 避免出现空白
  timer1.value = setInterval(countDown, 1000)
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  if (timer1.value) {
    clearInterval(timer1.value)
  }
})

// 时间处理函数
const timeResult = (value: number, format: string): string => moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
const router = useRouter()

// 益智小游戏js
const state = reactive<GameTypeState>({
  gameList: [
    {
      name: '身高计算',
      id: 1,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '年龄计算',
      id: 2,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '血压测量',
      id: 3,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '物流查询',
      id: 4,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '下班倒计时',
      id: 5,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '天气预报',
      id: 6,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '智能电风扇',
      id: 7,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '干饭人辅助器',
      id: 8,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
    {
      name: '这个你猜',
      id: 9,
      color: 'rgba(' + Math.floor(Math.random() * 255) + ','
			+ Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',0.8)',
    },
  ],
  color: '',
})
const getColor = (): void => {
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  state.color = 'rgba(' + r + ',' + g + ',' + b + ',0.8)'
}
const toGame = (item: any): void => {
  router.push({
    path: '/game',
    query: {
      id: item.id,
      name: item.name,
    },
  })
}

// 下班倒计时js
const timeState = reactive<TimeTypeState>({
  upWorkTime: 0, // 上班时间
  underWorkTime: 0, // 下班时间
  nowDate: 0, // 当前时间
  setDialogShow: false,
  hour: 0,
  minute: 0,
  second: 0,
  getCompensationNum: '',
})
// formData
const setForm = reactive<SetFormState>({
  timePeriod: [],
  salary: '',
  days: 22,
})
const timer: any = ref()
const timer1: any = ref()
const setFormRef = ref<ElFormInstance>()
const rules = reactive<FormRulesMap>({
  timePeriod: [
    { required: true, message: '请选择上下班时间' },
  ],
  days: [
    { required: true, message: '请输入月上班天数' },
    { pattern: /^([12][0-9]|30|[0-9])$/, message: '请输入0-30的整数' },
  ],
  salary: [
    { required: true, message: '请输入月基本薪酬' },
    { pattern: /^[1-9]\d*(\.\d+)?$/, message: '请输入大于0的薪资' },
  ],
})
// 获取最新时间
const getNowDate = (): number => new Date().getTime()
// 设置弹框关闭
const dialogClose = (formEl: ElFormInstance | undefined): void => {
  timeState.setDialogShow = false
  if (!formEl) return
  formEl.resetFields()
}
// 设置保存
const setSumbit = (formEl: ElFormInstance | undefined): void => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 将获取的数据存到session中
      SessionStorageService.set('countDownData', setForm)
      countDown()
      dialogClose(setFormRef.value)
    } else {
      return false
    }
  })
}
// 倒计时
const countDown = ():void => {
  // 获取储存在session
  let data:SetFormState = SessionStorageService.get('countDownData') || {}
  if (data.timePeriod && data.timePeriod.length) {
    let remainingTime: number = (Number(data.timePeriod[1]) - getNowDate()) / 1000
    timeState.hour = parseInt(`${(remainingTime / 3600) % 24}`)
    timeState.minute = parseInt(`${(remainingTime / 60) % 60}`)
    timeState.second = parseInt(`${remainingTime % 60}`)
  }
}
// 获取薪酬
const getCompensation = ():void => {
  let data:SetFormState = SessionStorageService.get('countDownData') || {}
  if (data.days && data.salary) {
    // 计算全部秒数
    let allSeconds:number = (Number(data.timePeriod[1]) - Number(data.timePeriod[0])) / 1000
    // 计算已经过了的秒数
    let passedSec:number = (getNowDate() - Number(data.timePeriod[0])) / 1000
    // 计算每秒薪酬
    let sCompensation:string = ((Number(data.salary) / Number(data.days)) / allSeconds).toFixed(2)
    timeState.getCompensationNum = (passedSec * Number(sCompensation)).toFixed(2)
  }
}
</script>
<style lang="scss" scoped>
.box-share {
  width: 750px;
  min-height: 837px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}
.game-box {
  width: 100%;
}
.game-list {
  width: 100%;
  padding: 20px 20px 0 20px;
  box-sizing: border-box;
}
.game-list-item {
  width: 190px;
  height: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
  border-radius: 7px;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: #fff;
  display: inline-block;

  &:nth-child(3n) {
    margin-right: 0;
  }
}
.countdown {
  text-align: center;
  box-sizing: border-box;
  padding: 10px 0;
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
.compensation {
  position: relative;
  height: 140px;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f1f2f9;
}
.set-btn {
  cursor:pointer;
  height: 20px;
  width: 40px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  margin-left: 5px;
  padding-top: 5px;
  color: #0286df;
}
.img-gif {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.gif {
  width: 100px;
  height: 100px;
  cursor: pointer;
  border-radius: 50%;
}
.icon-tag {
  position: absolute;
  cursor: pointer;
  top: 15px;
  left: 15px;
  transform: rotate(135deg);
}
.dialog-box {
  margin-top: 10px;
}
.icon-set {
  font-size: 20px;
  position: absolute;
  top: 17px;
}
.btn-group {
  text-align: center;
  margin-top: 5px;
}
.first-btn {
  margin-right: 20px;
}
:deep(.el-range-editor) {
  width: 100%;
}
.now-date {
  color: #333333;
  font-size: 14px;
  float: right;
}
</style>
