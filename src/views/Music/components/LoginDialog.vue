<template>
  <el-dialog
    v-model="state.loginDialogShow"
    :title="`${type === 'login' ? '登录' : '注册'}`"
    width="25%"
    @close="dialogClose(loginFormRef)"
  >
    <div class="dialog-box">
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="90px"
        label-position="right"
      >
        <el-form-item label="手机号：" prop="phone">
          <el-input
            v-model="loginForm.phone"
            :style="{width: type === 'sign'? '60%' : '100%' }"
            placeholder="请输入手机号"
          ></el-input>
          <el-button
            v-if="type === 'sign'"
            type="danger"
            :loading="state.codeLoading"
            class="code"
            @click="getCode"
          >
            获取验证码
          </el-button>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <template v-if="type === 'sign'">
          <el-form-item label="昵称：" prop="nickname">
            <el-input
              v-model="loginForm.nickname"
              placeholder="请输入昵称"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码：" prop="captcha">
            <el-input
              v-model="loginForm.captcha"
              style="width: 40%"
              placeholder="请输入验证码"
              maxlength="20"
            ></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div class="btn-group">
        <el-button
          type="danger"
          class="first-btn"
          circle
          :icon="Close"
          @click="dialogClose(loginFormRef)"
        ></el-button>
        <el-button
          type="danger"
          circle
          :icon="Check"
          :loading="state.sumbitLoading"
          @click="setSumbit(loginFormRef)"
        ></el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { LoginDialogState, LoginFormState } from '@/views/Music/music'
import { ElForm, ElMessage } from 'element-plus'
import { FormRulesMap } from 'element-plus/es/components/form/src/form.type'
import { Close, Check } from '@element-plus/icons-vue'
import musicApi from '@/apiMusic/music'
import cookie from '@/storage/cookies'

// 解决element-plus目前不向外暴露实例类型
type ElFormInstance = InstanceType<typeof ElForm>

const props = defineProps({
  type: String,
})
const { type } = toRefs(props)

const loginFormRef = ref<ElFormInstance>()
const state = reactive<LoginDialogState>({
  loginDialogShow: false,
  codeLoading: false,
  sumbitLoading: false,
})
const loginForm = reactive<LoginFormState>({
  phone: '',
  password: '',
  nickname: '',
  captcha: '',
})
const rules = reactive<FormRulesMap>({
  phone: [
    { required: true, message: '请输入手机号' },
  ],
  password: [
    { required: true, message: '请输入密码' },
  ],
  nickname: [
    { required: true, message: '请输入昵称' },
  ],
  captcha: [
    { required: true, message: '请输入验证码' },
  ],
})
// 获取验证码
const getCode = (): void => {
  let phone = loginForm.phone
  if (phone) {
    musicApi.isSign(phone).then(res => {
      if (res.status === 200) {
        if (res.data.exist === -1) {
          // 未注册
          getCodeVal(phone)
        } else {
          ElMessage.error('该手机号已经注册')
        }
      } else {
        ElMessage.error(res.statusText)
      }
    }).catch(err => {
      ElMessage.error(err)
    })
  } else {
    ElMessage.error('请输入手机号再获取验证码')
  }
}
const getCodeVal = (phone: string): void => {
  state.codeLoading = true
  musicApi.getCode(phone).then(res => {
    if (res.data.data) {
      ElMessage({
        message: '获取成功',
        type: 'success',
      })
    } else {
      ElMessage.error('获取失败')
    }
    setInterval(() => {
      state.codeLoading = false
    }, 60000)
  }).catch(err => {
    ElMessage.error(err)
  })
}
// 关闭
const dialogClose = (formEl: ElFormInstance | undefined): void => {
  state.loginDialogShow = false
  if (!formEl) return
  formEl.resetFields()
}
// 保存登录
const setSumbit = (formEl: ElFormInstance | undefined): void => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 通过校验
      if (type?.value === 'login') {
        // 登录
        let { phone, password } = loginForm
        state.sumbitLoading = true
        musicApi.musicLogin({ phone, password }).then(res => {
          console.log(res, 'kksjsjsjsjs')
          if (res.data.code === 200) {
            ElMessage({
              type: 'success',
              message: '登录成功',
            })
            state.loginDialogShow = false
            // 储存token
            cookie.cookieSet('musicToken', res.data.token)
          } else {
            ElMessage.error(res.data.msg)
          }
          state.sumbitLoading = false
        }).catch(err => {
          ElMessage.error(err.msg)
          state.sumbitLoading = false
        })
      } else {
        // 注册
        let { phone, captcha } = loginForm
        // 校验验证码
        musicApi.verifyCode(phone, captcha).then(res => {
          if (res.data.code === 200 && res.data.data) {
            // 注册
            signSubmit()
          } else {
            ElMessage.error(res.data.msg)
          }
        }).catch(err => {
          ElMessage.error('验证码错误')
        })
      }
    } else {
      return false
    }
  })
}
const signSubmit = (): void => {
  state.sumbitLoading = true
  musicApi.sign(loginForm).then(res => {
    if (res.data.code === 200) {
      ElMessage({
        type: 'success',
        message: '注册成功,请登录！',
      })
      state.loginDialogShow = false
    } else {
      ElMessage.error(res.data.msg)
    }
    state.sumbitLoading = false
  }).catch(err => {
    ElMessage.error(err.msg)
    state.sumbitLoading = false
  })
}
// 向外暴露打开弹框
const dialogShow = (): void => {
  state.loginDialogShow = true
}
// eslint-disable-next-line no-undef
defineExpose({
  dialogShow,
})
</script>
<style lang="scss" scoped>
.btn-group {
  text-align: center;
  margin-top: 5px;
}
.first-btn {
  margin-right: 20px;
}
.dialog-box {
  margin-top: 10px;
  //:deep(.el-input__icon.el-icon){
  //  top: 30%;
  //}
}
.code {
  margin-left: 25px;
}
</style>
