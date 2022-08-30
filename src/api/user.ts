import http from '@/http'

const userApi = {
  getUserInfo: () => http.get('E:/project/Burry_Blog/src/assets/testData/user'),
}
export default userApi
