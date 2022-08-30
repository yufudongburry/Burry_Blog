// cookies
import cookies from 'js-cookie'
// 创建cookies （名字，值，时间）  时间单位为天
function cookieSet(cName:string, value:any) {
  let millisecond = new Date().getTime()
  let expiresTime = new Date(millisecond + 1209600000) //  当前时间 + 14天
  cookies.set(cName, value, { expires: expiresTime })
}

function cookieRead(key:string, getAll = false) {
  return getAll ? cookies.get() : cookies.get(key)
}

function cookieClear(key:string) {
  cookies.remove(key)
}
const cookie = {
  cookieSet,
  cookieRead,
  cookieClear,
}
export default cookie
