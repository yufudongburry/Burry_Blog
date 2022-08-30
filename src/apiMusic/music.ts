import musicHttp from '@/http/musicHttp'

const musicApi = {
  musicLogin: (data: object) => musicHttp.get('/login/cellphone', data), // 登录
  sign: (data: object) => musicHttp.get('/register/cellphone', data), // 注册
  isSign: (phone: string) => musicHttp.get(`/cellphone/existence/check?phone=${phone}`), // 检验是否已注册
  getCode: (phone: string) => musicHttp.get(`/captcha/sent?phone=${phone}`), // 获取验证码
  verifyCode: (phone: string, code: string) => musicHttp.get(`/captcha/verify?phone=${phone}&captcha=${code}`), // 验证验证码
}

export default musicApi
